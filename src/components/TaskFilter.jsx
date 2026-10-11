import Icon from "./Icon";
import { statuses } from "../utils/taskUtils";

function TaskFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="task-filters">
      <div className="filter-top-row">
        <div className="search-field">
          <Icon name="search" size={19} />
          <label className="sr-only" htmlFor="task-search">
            Search tasks by title
          </label>
          <input
            id="task-search"
            type="search"
            placeholder="Search tasks by title..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <div className="sort-field">
          <label htmlFor="task-sort">Sort by</label>
          <select
            id="task-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="priority-high">High priority</option>
            <option value="priority-low">Low priority</option>
          </select>
        </div>
      </div>
      <div
        className="status-filters"
        role="group"
        aria-label="Filter tasks by status"
      >
        {["All", ...statuses].map((item) => (
          <button
            type="button"
            className={`filter-button ${status === item ? "active" : ""}`}
            aria-pressed={status === item}
            onClick={() => onStatusChange(item)}
            key={item}
          >
            {item === "All" ? "All tasks" : item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilter;
