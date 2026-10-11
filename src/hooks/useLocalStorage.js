import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue, validate = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue === null) {
        return initialValue;
      }

      const parsedValue = JSON.parse(savedValue);
      return validate(parsedValue) ? parsedValue : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("TaskFlow could not save to localStorage.", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
