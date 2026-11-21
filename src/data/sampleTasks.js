const getDate = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

export const sampleTasks = [
  {
    id: "task-1",
    title: "Finalize landing page design",
    description: "Review the responsive layout and prepare the final design.",
    category: "Design",
    status: "In progress",
    priority: "High",
    dueDate: getDate(2),
  },
  {
    id: "task-2",
    title: "Prepare project presentation",
    description: "Create a presentation covering project goals and progress.",
    category: "Work",
    status: "To do",
    priority: "Medium",
    dueDate: getDate(4),
  },
  {
    id: "task-3",
    title: "Review React components",
    description: "Check reusable components and application state.",
    category: "Development",
    status: "Completed",
    priority: "Low",
    dueDate: getDate(-1),
  },
  {
    id: "task-4",
    title: "Update portfolio projects",
    description: "Add project descriptions, screenshots and GitHub links.",
    category: "Personal",
    status: "In progress",
    priority: "Medium",
    dueDate: getDate(6),
  },
  {
    id: "task-5",
    title: "Test mobile navigation",
    description: "Verify navigation on mobile and tablet screen sizes.",
    category: "Development",
    status: "To do",
    priority: "High",
    dueDate: getDate(1),
  },
  {
    id: "task-6",
    title: "Organize weekly notes",
    description: "Collect important ideas and plan the upcoming week.",
    category: "Personal",
    status: "Completed",
    priority: "Low",
    dueDate: getDate(-2),
  },
];
