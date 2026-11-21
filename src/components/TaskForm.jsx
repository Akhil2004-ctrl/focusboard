import { useEffect, useState } from "react";

const emptyValues = {
  title: "",
  description: "",
  category: "Work",
  status: "To do",
  priority: "Medium",
  dueDate: "",
};

export default function TaskForm({ open, onClose, onSave, task }) {
  const [values, setValues] = useState(emptyValues);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setValues(task ? { ...emptyValues, ...task } : emptyValues);
      setError("");
    }
  }, [open, task]);

  if (!open) return null;

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (!values.title.trim()) {
      setError("Task title is required.");
      return;
    }

    onSave({ ...values, title: values.title.trim() });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <h2 id="task-form-title">{task ? "Edit task" : "Add new task"}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={submit}>
          <label>
            Title
            <input value={values.title} onChange={update("title")} autoFocus />
          </label>
          {error && <p className="form-error">{error}</p>}

          <label>
            Description
            <textarea value={values.description} onChange={update("description")} />
          </label>

          <div className="form-row">
            <label>
              Category
              <input value={values.category} onChange={update("category")} />
            </label>

            <label>
              Due date
              <input type="date" value={values.dueDate || ""} onChange={update("dueDate")} />
            </label>
          </div>

          <div className="form-row">
            <label>
              Status
              <select value={values.status} onChange={update("status")}>
                <option>To do</option>
                <option>In progress</option>
                <option>Completed</option>
              </select>
            </label>

            <label>
              Priority
              <select value={values.priority} onChange={update("priority")}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
