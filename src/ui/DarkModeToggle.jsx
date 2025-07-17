import React from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../hooks/useDarkMode"
export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div>
      <button className="icon-button" onClick={toggleDarkMode}>
        {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
      </button>
    </div>
  );
}
