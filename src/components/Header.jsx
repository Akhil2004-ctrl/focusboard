import { Bell, Menu, Plus, Search } from "lucide-react";

export default function Header({
  search,
  setSearch,
  onAdd,
  onMenu,
  searchInputRef,
}) {
  return (
    <header className="topbar">
      <button
        className="icon-button menu-button"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu size={21} />
      </button>

      <div className="breadcrumb">
        <span>Workspace</span>
        <b>/</b>
        <strong>Overview</strong>
      </div>

      <div className="topbar-actions">
        <label className="search-box">
          <Search size={17} />

          <input
            ref={searchInputRef}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks by title"
          />

          <kbd>Ctrl K</kbd>
        </label>

        <button
          className="icon-button notification-button"
          type="button"
          aria-label="Notifications (not implemented)"
          title="Notifications are not implemented"
        >
          <Bell size={19} />
          <i />
        </button>

        <button
          className="primary-button header-add"
          type="button"
          onClick={onAdd}
        >
          <Plus size={17} />
          <span>New task</span>
        </button>
      </div>
    </header>
  );
}
