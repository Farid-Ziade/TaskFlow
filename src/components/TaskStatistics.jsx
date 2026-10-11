import Icon from "./Icon";

function TaskStatistics({ statistics }) {
  const cards = [
    {
      label: "Total tasks",
      value: statistics.total,
      icon: "grid",
      color: "purple",
    },
    {
      label: "Pending",
      value: statistics.pending,
      icon: "clock",
      color: "amber",
    },
    {
      label: "In progress",
      value: statistics.inProgress,
      icon: "progress",
      color: "blue",
    },
    {
      label: "Completed",
      value: statistics.completed,
      icon: "checkCircle",
      color: "green",
    },
  ];

  return (
    <section className="statistics" aria-label="Task statistics">
      {cards.map((card) => (
        <article className={`stat-card stat-${card.color}`} key={card.label}>
          <div>
            <p>{card.label}</p>
            <strong>{card.value}</strong>
          </div>
          <span className="stat-icon">
            <Icon name={card.icon} size={21} />
          </span>
        </article>
      ))}
    </section>
  );
}

export default TaskStatistics;
