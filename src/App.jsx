import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FocusNotes from "./components/FocusNotes";

import { sampleTasks } from "./data/sampleTasks";

import "./App.css";

const STORAGE_KEY = "focusboard.tasks.v1";

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks === null) {
      return sampleTasks;
    }

    const parsedTasks = JSON.parse(savedTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : sampleTasks;
  } catch {
    return sampleTasks;
  }
}

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";

  return "Good evening";
}

function getToday() {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const searchInputRef = useRef(null);

  // Save tasks whenever the task list changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Unable to save tasks:", error);
    }
  }, [tasks]);

  // Keyboard shortcuts.
  useEffect(() => {
    const handleKeyboard = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "n") {
        event.preventDefault();
        setEditingTask(null);
        setFormOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  // Dynamically calculate dashboard statistics.
  const stats = useMemo(() => {
    const total = tasks.length;

    const inProgress = tasks.filter(
      (task) => task.status === "In progress",
    ).length;

    const completed = tasks.filter(
      (task) => task.status === "Completed",
    ).length;

    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      inProgress,
      completed,
      completionRate,
    };
  }, [tasks]);

  // Open create task form.
  const handleAdd = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  // Open edit task form.
  const handleEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  // Close task form.
  const handleClose = useCallback(() => {
    setFormOpen(false);
    setEditingTask(null);
  }, []);

  // Create or update task.
  const handleSave = (values) => {
    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...values, id: editingTask.id }
            : task,
        ),
      );
    } else {
      const newTask = {
        ...values,
        id: createId(),
        createdAt: new Date().toISOString(),
      };

      setTasks((currentTasks) => [newTask, ...currentTasks]);
    }

    handleClose();
  };

  // Delete task with confirmation.
  const handleDelete = (task) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`,
    );

    if (confirmed) {
      setTasks((currentTasks) =>
        currentTasks.filter((item) => item.id !== task.id),
      );
    }
  };

  // Change task status.
  const handleStatusChange = (id, status) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        taskCount={stats.total}
      />

      <main className="main-area">
        <Header
          search={search}
          setSearch={setSearch}
          onAdd={handleAdd}
          onMenu={() => setSidebarOpen(true)}
          searchInputRef={searchInputRef}
        />

        <div className="page-content">
          {/* Welcome section */}
          <section className="welcome-row">
            <div>
              <span className="eyebrow">{getToday().toUpperCase()}</span>

              <h1>
                {getGreeting()}, Akhil <span className="wave">✦</span>
              </h1>

              <p>Make today count. A little progress goes a long way.</p>
            </div>

            <button
              className="primary-button welcome-add"
              onClick={handleAdd}
              type="button"
            >
              + Add new task
            </button>
          </section>

          {/* Statistics */}
          <Stats stats={stats} />

          {/* Focus notes carousel */}
          <FocusNotes />

          {/* Task management */}
          <TaskList
            tasks={tasks}
            search={search}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatus={handleStatusChange}
          />

          <footer className="app-footer">
            <span>
              <Sparkles size={14} />
              Stay focused, one task at a time.
            </span>

            <span>
              {stats.completed} of {stats.total} tasks completed
            </span>
          </footer>
        </div>
      </main>

      {/* Create and edit task modal */}
      <TaskForm
        open={formOpen}
        onClose={handleClose}
        onSave={handleSave}
        task={editingTask}
      />
    </div>
  );
}
