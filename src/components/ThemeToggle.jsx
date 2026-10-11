import useTheme from "../hooks/useTheme";
import Icon from "./Icon";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} size={18} />
      <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}

export default ThemeToggle;
