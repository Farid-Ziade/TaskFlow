export const priorities = ["Low", "Medium", "High"];
export const statuses = ["Pending", "In Progress", "Completed"];
export const priorityOrder = { High: 3, Medium: 2, Low: 1 };

export function isTaskList(value) {
  if (!Array.isArray(value)) {
    return false;
  }

  const validTasks = value.every(
    (task) =>
      task !== null &&
      typeof task === "object" &&
      typeof task.id === "string" &&
      task.id.length > 0 &&
      typeof task.title === "string" &&
      task.title.trim().length > 0 &&
      typeof task.description === "string" &&
      priorities.includes(task.priority) &&
      statuses.includes(task.status) &&
      typeof task.createdAt === "string" &&
      !Number.isNaN(Date.parse(task.createdAt)),
  );

  return (
    validTasks && new Set(value.map((task) => task.id)).size === value.length
  );
}

export function getStatusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}
