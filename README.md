# Task 2 - TaskFlow

A React task management dashboard with all the required features and all five bonus features from the exercise. Written in JavaScript with separate components and plain CSS.

## Add it to your React app

If you have not created your app yet, run:

```bash
npm create vite@latest taskflow -- --template react
cd taskflow
npm install
```

1. Copy the `src` folder from this download into your React project. Replace the generated `src` folder. If you have already written code in that folder, keep a copy before replacing it.
2. Keep the `index.html`, `package.json`, `vite.config.js`, and other configuration files created by Vite.
3. Inside your React project, install Yup:

```bash
npm install yup
```

4. Start the app:

```bash
npm run dev
```

Open the local URL Vite prints in the terminal. Use the JavaScript React template, not TypeScript. A current Node.js version supported by Vite is required; see the [Vite setup guide](https://vite.dev/guide/).

The download supplies the source files, not a second Vite project. You do not need React Router, an icon package, a backend, or a state-management package. Yup is the only extra dependency.

## Included files

| File                                | Purpose                                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| `src/main.jsx`                      | Starts React and wraps the app with the theme provider.                                 |
| `src/App.jsx`                       | Holds the tasks, handles add/edit/delete, and calculates filtered tasks and statistics. |
| `src/App.css`                       | Dashboard, form, task cards, modal, and responsive layouts.                             |
| `src/index.css`                     | Global styles and light/dark colors.                                                    |
| `src/components/TaskForm.jsx`       | Controlled form, Yup validation, and automatic title focus.                             |
| `src/components/TaskList.jsx`       | Displays task items and empty states.                                                   |
| `src/components/TaskItem.jsx`       | Memoized task card with edit and delete buttons.                                        |
| `src/components/TaskFilter.jsx`     | Title search, status filters, and sorting.                                              |
| `src/components/TaskStatistics.jsx` | Total, pending, in-progress, and completed counts.                                      |
| `src/components/DeleteModal.jsx`    | Accessible confirmation dialog before deletion.                                         |
| `src/components/ThemeToggle.jsx`    | Light/dark mode button.                                                                 |
| `src/components/Icon.jsx`           | Small reusable SVG icons.                                                               |
| `src/context/ThemeContext.js`       | Shared theme context.                                                                   |
| `src/context/ThemeProvider.jsx`     | Theme state, persistence, and theme switching.                                          |
| `src/hooks/useTheme.js`             | Reads the theme with `useContext`.                                                      |
| `src/hooks/useLocalStorage.js`      | Reads saved data safely and saves changes.                                              |
| `src/utils/taskSchema.js`           | Yup rules for task fields.                                                              |
| `src/utils/taskUtils.js`            | Priority/status options and validation of stored tasks.                                 |
| `screenshots/`                      | Example desktop, dark mode, and mobile screenshots.                                     |

## What you can do

- Add a task with a title, optional description, priority, and status.
- Edit any task, including its status, using its pencil button.
- Delete a task using its trash button, then confirm in the dialog.
- Search by title. Search ignores capital letters and spaces around your search.
- Combine search with All, Pending, In Progress, or Completed filters.
- Sort by newest, oldest, high priority, or low priority.
- See statistics for all tasks, even while a search or filter is active.
- Switch between light and dark mode.
- Refresh the page and keep your tasks and theme.

After saving a task, search and status filters reset so the saved task can appear in the list. Editing preserves its original ID and creation date. Canceling an edit leaves the saved task unchanged.

## Hooks used

| Hook          | Where and why                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `useState`    | Tasks in the storage hook; form fields in `TaskForm`; search, filters, sorting, editing, and deletion in `App`. |
| `useEffect`   | Saves changes to localStorage, applies the theme, focuses the title, and opens/closes the dialog.               |
| `useMemo`     | Calculates the filtered/sorted list and task statistics in `App`.                                               |
| `useRef`      | Focuses the title input, controls the dialog, and scrolls to the form when editing.                             |
| `useCallback` | Keeps edit/delete callbacks stable for the memoized `TaskItem`.                                                 |
| `useContext`  | Gives `ThemeToggle` access to the shared theme through `useTheme`.                                              |
| `React.memo`  | Skips unnecessary `TaskItem` renders when its props have not changed.                                           |

`TaskForm` uses the edited task's ID as its React key. Selecting a different task gives the form fresh values and focuses its title.

## The localStorage hook

Basic usage:

```jsx
const [tasks, setTasks] = useLocalStorage("tasks", []);
```

The app also passes `isTaskList` as an optional third argument to check the stored data's shape. Missing data, invalid JSON, or an invalid task array falls back to an empty list. The effect then saves that valid value. Keep the storage key stable for the lifetime of each hook instance.

The app starts with an empty list. Screenshots show example tasks entered for the demonstration; they are not added to your storage automatically.

Storage keys: `tasks` and `taskflow-theme`. Data stays in the current browser and website origin. It does not sync across devices. Browser storage must be available for data to survive a refresh; storage failures are caught and logged to the browser console. Run through Vite on localhost or deploy over HTTPS for `crypto.randomUUID()`.

## Form rules

- Title is required and must contain 3 to 100 characters after trimming.
- Description is optional and limited to 500 characters.
- Priority must be Low, Medium, or High.
- Status must be Pending, In Progress, or Completed.

The delete dialog supports keyboard navigation, Escape, and a Keep task button. It starts focused on Keep task.

## Build and submit

From your completed Vite project, run:

```bash
npm run lint
npm run build
```

