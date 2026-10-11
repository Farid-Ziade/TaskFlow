import { useEffect, useRef, useState } from "react";
import taskSchema from "../utils/taskSchema";
import { priorities, statuses } from "../utils/taskUtils";
import Icon from "./Icon";

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Pending",
};

function TaskForm({ task, onSave, onCancel }) {
  const [form, setForm] = useState(() =>
    task
      ? {
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
        }
      : { ...emptyForm },
  );
  const [errors, setErrors] = useState({});
  const titleInput = useRef(null);

  useEffect(() => {
    titleInput.current?.focus({ preventScroll: true });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    let values;

    try {
      values = taskSchema.validateSync(form, { abortEarly: false });
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((item) => {
        if (!validationErrors[item.path]) {
          validationErrors[item.path] = item.message;
        }
      });
      setErrors(validationErrors);
      const firstInvalidField = event.currentTarget.elements.namedItem(
        error.inner[0]?.path,
      );
      firstInvalidField?.focus();
      return;
    }

    onSave(values);
    setForm({ ...emptyForm });
    setErrors({});
    titleInput.current?.focus({ preventScroll: true });
  }

  return (
    <section
      className="form-panel"
      id="task-form"
      aria-labelledby="form-heading"
    >
      <div className="form-heading">
        <span className="form-icon">
          <Icon name={task ? "edit" : "plus"} size={21} />
        </span>
        <div>
          <h2 id="form-heading">{task ? "Edit task" : "Add a new task"}</h2>
          <p>
            {task
              ? "Make a change. Keep moving."
              : "Turn your next idea into action."}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="task-title">
            Task title <span className="required-mark">*</span>
          </label>
          <input
            id="task-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What needs to get done?"
            ref={titleInput}
            maxLength={100}
            required
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p className="field-error" id="title-error" role="alert">
              {errors.title}
            </p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="task-description">
            Description <span className="optional">Optional</span>
          </label>
          <textarea
            id="task-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add a few details..."
            rows={4}
            maxLength={500}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
          <div className="field-footer">
            {errors.description && (
              <p className="field-error" id="description-error" role="alert">
                {errors.description}
              </p>
            )}
            <span className="character-count">
              {form.description.length}/500
            </span>
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              aria-invalid={Boolean(errors.priority)}
              aria-describedby={errors.priority ? "priority-error" : undefined}
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p className="field-error" id="priority-error" role="alert">
                {errors.priority}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="task-status">Status</label>
            <select
              id="task-status"
              name="status"
              value={form.status}
              onChange={handleChange}
              aria-invalid={Boolean(errors.status)}
              aria-describedby={errors.status ? "status-error" : undefined}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="field-error" id="status-error" role="alert">
                {errors.status}
              </p>
            )}
          </div>
        </div>
        <div className="form-buttons">
          <button className="button button-primary" type="submit">
            <Icon name={task ? "check" : "plus"} size={18} />
            {task ? "Save changes" : "Save task"}
          </button>
          {task && (
            <button
              className="button button-secondary"
              type="button"
              onClick={onCancel}
            >
              Cancel editing
            </button>
          )}
        </div>
      </form>
      <p className="form-note">Your tasks stay in this browser.</p>
    </section>
  );
}

export default TaskForm;
