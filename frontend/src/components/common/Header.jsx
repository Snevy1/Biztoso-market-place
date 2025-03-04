// src/components/Header.jsx
import React, { useContext, useEffect } from "react";
import ToggleTheme from "./ToggleTheme";
import { ThemeContext } from "../../context/ThemeContext";
import Content from "./Content";

export default function Header() {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme]);
  return (
    <header className={`${theme === 'dark'? "bg-gray-800 ": "bg-white"} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Content />
        <ToggleTheme />
      </div>
    </header>
  );
}