import { useEffect } from "react";
import ThemeContext from "./ThemeContext";
import useLocalStorage from "../hooks/useLocalStorage";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(
    "taskflow-theme",
    "light",
    (value) => value === "light" || value === "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((previous) => (previous === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
