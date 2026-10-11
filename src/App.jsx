import { useCallback, useMemo, useRef, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import TaskStatistics from "./components/TaskStatistics";
import DeleteModal from "./components/DeleteModal";
import ThemeToggle from "./components/ThemeToggle";
import Icon from "./components/Icon";
import useLocalStorage from "./hooks/useLocalStorage";
import { isTaskList, priorityOrder } from "./utils/taskUtils";
import "./App.css";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", [], isTaskList);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [message, setMessage] = useState("");
  const formPanel = useRef(null);

  const statistics = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => task.status === "Pending").length,
      inProgress: tasks.filter((task) => task.status === "In Progress").length,
      completed: tasks.filter((task) => task.status === "Completed").length,
    }),
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    const result = tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus = status === "All" || task.status === status;
      return matchesSearch && matchesStatus;
    });

    return result.sort((a, b) => {
      const newestFirst = Date.parse(b.createdAt) - Date.parse(a.createdAt);

      if (sort === "oldest") return -newestFirst;
      if (sort === "priority-high")
        return (
          priorityOrder[b.priority] - priorityOrder[a.priority] || newestFirst
        );
      if (sort === "priority-low")
        return (
          priorityOrder[a.priority] - priorityOrder[b.priority] || newestFirst
        );
      return newestFirst;
    });
  }, [tasks, search, status, sort]);

  const handleEdit = useCallback((task) => {
    setEditingTask(task);
    setMessage("");
    formPanel.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const handleDelete = useCallback((task) => {
    setDeletingTask(task);
  }, []);

  function handleSave(values) {
    if (editingTask) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === editingTask.id ? { ...task, ...values } : task,
        ),
      );
      setEditingTask(null);
      setMessage("Task updated.");
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        ...values,
        createdAt: new Date().toISOString(),
      };
      setTasks((previous) => [newTask, ...previous]);
      setMessage("Task added.");
    }

    setSearch("");
    setStatus("All");
  }

  function confirmDelete() {
    setTasks((previous) =>
      previous.filter((task) => task.id !== deletingTask.id),
    );
    if (editingTask?.id === deletingTask.id) {
      setEditingTask(null);
    }
    setDeletingTask(null);
    setMessage("Task deleted.");
  }

  function clearFilters() {
    setSearch("");
    setStatus("All");
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <a
            className="brand"
            href="#main-content"
            aria-label="TaskFlow dashboard"
          >
            <span className="brand-mark">
              <Icon name="logo" size={24} />
            </span>
            <span>
              Task<span className="brand-light">Flow</span>
            </span>
          </a>
          <div className="header-divider" />
          <span className="header-location">
            <Icon name="grid" size={16} />
            My dashboard
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="main-content" id="main-content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
            <h1>
              Task overview<span>.</span>
            </h1>
            <p className="page-subtitle">
              Less to remember. More room to get things done.
            </p>
          </div>
          <span className="workspace-tag">
            <span />
            One task at a time
          </span>
        </div>

        <TaskStatistics statistics={statistics} />

        <div className="workspace">
          <aside className="form-area" ref={formPanel}>
            <TaskForm
              key={editingTask?.id ?? "new-task"}
              task={editingTask}
              onSave={handleSave}
              onCancel={() => setEditingTask(null)}
            />
            <div
              className={`feedback ${message ? "visible" : ""}`}
              role="status"
              aria-live="polite"
            >
              {message && (
                <>
                  <Icon name="checkCircle" size={17} />
                  <span>{message}</span>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label="Dismiss notification"
                    onClick={() => setMessage("")}
                  >
                    <Icon name="close" size={15} />
                  </button>
                </>
              )}
            </div>
          </aside>

          <section className="tasks-area" aria-labelledby="tasks-heading">
            <div className="section-heading">
              <h2 id="tasks-heading">
                Your tasks <span className="count-pill">{tasks.length}</span>
              </h2>
              <span className="results-count" aria-live="polite">
                Showing {filteredTasks.length} of {tasks.length}
              </span>
            </div>
            <TaskFilter
              search={search}
              onSearchChange={setSearch}
              status={status}
              onStatusChange={setStatus}
              sort={sort}
              onSortChange={setSort}
            />
            <TaskList
              tasks={filteredTasks}
              total={tasks.length}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onClearFilters={clearFilters}
            />
          </section>
        </div>

        <footer className="app-footer">
          <span>TaskFlow</span>
          <span>Small steps. Meaningful progress.</span>
        </footer>
      </main>

      {deletingTask && (
        <DeleteModal
          task={deletingTask}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
