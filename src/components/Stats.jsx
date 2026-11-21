import { CheckCheck, CircleDashed, ListTodo, TrendingUp } from "lucide-react";

const cards = [
  {
    key: "total",
    label: "Total tasks",
    note: "Across all categories",
    icon: ListTodo,
    tone: "purple",
  },
  {
    key: "inProgress",
    label: "In progress",
    note: "Currently underway",
    icon: CircleDashed,
    tone: "orange",
  },
  {
    key: "completed",
    label: "Completed",
    note: "Great work so far",
    icon: CheckCheck,
    tone: "green",
  },
  {
    key: "completionRate",
    label: "Completion rate",
    note: "Based on completed tasks",
    icon: TrendingUp,
    tone: "blue",
    percent: true,
  },
];

export default function Stats({ stats }) {
  return (
    <section className="stats-grid" aria-label="Task statistics">
      {cards.map(({ key, label, note, icon: Icon, tone, percent }) => {
        const value = stats[key];

        return (
          <article className="stat-card" key={key}>
            <div className={`stat-icon ${tone}`}>
              <Icon size={19} />
            </div>

            <div className="stat-label">{label}</div>

            <div className="stat-value">{percent ? `${value}%` : value}</div>

            {percent && (
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Completion rate"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={value}
              >
                <span style={{ width: `${value}%` }} />
              </div>
            )}

            <div className="stat-note">{note}</div>
          </article>
        );
      })}
    </section>
  );
}
