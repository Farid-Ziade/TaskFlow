import { memo } from "react";
import Icon from "./Icon";
import { getStatusClass } from "../utils/taskUtils";

function TaskItem({ task, onEdit, onDelete }) {
  const statusClass = getStatusClass(task.status);
  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li
      className={`task-card ${task.status === "Completed" ? "task-completed" : ""}`}
    >
      <div className={`task-status-icon status-icon-${statusClass}`}>
        <Icon
          name={
            task.status === "Completed"
              ? "check"
              : task.status === "In Progress"
                ? "progress"
                : "clock"
          }
          size={18}
        />
      </div>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className={`badge status-${statusClass}`}>{task.status}</span>
          <span className={`priority priority-${task.priority.toLowerCase()}`}>
            <span className="priority-dot" />
            {task.priority} priority
          </span>
          <time dateTime={task.createdAt}>
            <Icon name="calendar" size={13} />
            {date}
          </time>
        </div>
      </div>
      <div className="task-actions">
        <button
          type="button"
          className="icon-button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
          title="Edit task"
        >
          <Icon name="edit" size={17} />
        </button>
        <button
          type="button"
          className="icon-button delete-button"
          onClick={() => onDelete(task)}
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          <Icon name="trash" size={17} />
        </button>
      </div>
    </li>
  );
}

export default memo(TaskItem);
