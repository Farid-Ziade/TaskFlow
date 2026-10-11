import TaskItem from "./TaskItem";
import Icon from "./Icon";

function TaskList({ tasks, total, onEdit, onDelete, onClearFilters }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">
          <Icon name={total === 0 ? "folder" : "search"} size={27} />
        </span>
        <h3>{total === 0 ? "No tasks yet" : "No matching tasks"}</h3>
        <p>
          {total === 0
            ? "Add your first task using the form. A little progress starts here."
            : "Try a different title or choose another status."}
        </p>
        {total > 0 && (
          <button
            type="button"
            className="button button-secondary"
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
