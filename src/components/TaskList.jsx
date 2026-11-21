import { useMemo, useState } from "react";

import {
  CalendarDays,
  Check,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

const statuses = ["To do", "In progress", "Completed"];

const priorities = ["All priorities", "Low", "Medium", "High"];

const tabs = ["All tasks", "To do", "In progress", "Completed"];

function formatDate(value) {
  if (!value) return "No due date";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function TaskList({
  tasks,
  search,
  onEdit,
  onDelete,
  onStatus,
}) {
  const [activeTab, setActiveTab] = useState("All tasks");
  const [priority, setPriority] = useState("All priorities");
  const [menuId, setMenuId] = useState(null);

  // Apply search, status and priority filters together.
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesStatus =
        activeTab === "All tasks" || task.status === activeTab;

      const matchesPriority =
        priority === "All priorities" || task.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, activeTab, priority]);

  return (
    <section className="tasks-section" aria-labelledby="tasks-heading">
      <div className="section-heading task-heading">
        <div>
          <span className="eyebrow">STAY ON TRACK</span>

          <h2 id="tasks-heading">
            Your tasks
            <span className="task-total">{filteredTasks.length}</span>
          </h2>
        </div>

        <label className="priority-filter">
          <span className="sr-only">Filter by priority</span>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            {priorities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Status filter tabs */}
      <div
        className="task-tabs"
        role="tablist"
        aria-label="Filter tasks by status"
      >
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={activeTab === item}
            className={activeTab === item ? "selected" : ""}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Task items */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-symbol">✦</div>

            <strong>No tasks found</strong>

            <p>Try changing your search or filters, or create a new task.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <article className="task-row" key={task.id}>
              <button
                type="button"
                className={`task-check ${
                  task.status === "Completed" ? "checked" : ""
                }`}
                aria-label={
                  task.status === "Completed"
                    ? `Mark ${task.title} as To do`
                    : `Mark ${task.title} as Completed`
                }
                onClick={() =>
                  onStatus(
                    task.id,
                    task.status === "Completed" ? "To do" : "Completed",
                  )
                }
              >
                {task.status === "Completed" && <Check size={14} />}
              </button>

              <div className="task-main">
                <strong
                  className={task.status === "Completed" ? "task-done" : ""}
                >
                  {task.title}
                </strong>

                <span>{task.category}</span>
              </div>

              <div className="task-due">
                <CalendarDays size={14} />
                <span>{formatDate(task.dueDate)}</span>
              </div>

              <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>

              <label className="status-select-wrap">
                <span className="sr-only">Status for {task.title}</span>

                <select
                  className={`status-select ${task.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  value={task.status}
                  onChange={(event) => onStatus(task.id, event.target.value)}
                >
                  {statuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <div className="task-menu-wrap">
                <button
                  type="button"
                  className="icon-button task-menu-button"
                  aria-label={`Actions for ${task.title}`}
                  aria-expanded={menuId === task.id}
                  onClick={() =>
                    setMenuId((current) =>
                      current === task.id ? null : task.id,
                    )
                  }
                >
                  <MoreHorizontal size={19} />
                </button>

                {menuId === task.id && (
                  <div className="task-menu">
                    <button
                      type="button"
                      onClick={() => {
                        onEdit(task);
                        setMenuId(null);
                      }}
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-action"
                      onClick={() => {
                        onDelete(task);
                        setMenuId(null);
                      }}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
