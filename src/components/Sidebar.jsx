import {
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  Settings,
  X,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My Tasks", icon: CheckSquare },
  { label: "Calendar", icon: CalendarDays, disabled: true },
];

export default function Sidebar({ open, onClose, taskCount }) {
  return (
    <>
      {open && (
        <button
          className="mobile-scrim"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">F</div>

          <span className="brand-name">FocusBoard</span>

          <button
            className="icon-button sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <p className="workspace-label">WORKSPACE</p>

        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon, disabled }) => (
            <button
              key={label}
              type="button"
              className={`nav-item ${label === "Overview" ? "active" : ""}`}
              aria-disabled={disabled || undefined}
              onClick={() => {
                if (!disabled) onClose();
              }}
            >
              <Icon size={19} />

              <span>{label}</span>

              {label === "My Tasks" && (
                <span className="nav-count">{taskCount}</span>
              )}

              {disabled && <span className="coming-soon">Soon</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>

            <strong>Make room for focus</strong>

            <p>Small steps every day lead to meaningful progress.</p>
          </div>

          <div className="nav-item settings-placeholder">
            <Settings size={19} />
            <span>Settings</span>
            <span className="coming-soon">Soon</span>
          </div>

          <div className="profile-row">
            <div className="avatar">AK</div>

            <div className="profile-copy">
              <strong>My workspace</strong>
              <span>Personal account</span>
            </div>

            <span className="profile-dots">···</span>
          </div>
        </div>
      </aside>
    </>
  );
}
