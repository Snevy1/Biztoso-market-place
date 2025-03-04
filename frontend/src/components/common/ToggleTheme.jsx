// src/components/ToggleTheme.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ToggleTheme;