"use client";

import { PaintBrushIcon } from "@heroicons/react/24/solid";
import { useLayoutEffect, useState } from "react";

export default function ThemeDropdown({
  showText = true,
}: {
  showText?: boolean;
}) {
  const [theme, setTheme] = useState<string>();

  function handleThemeChange(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const value = e.currentTarget.value;

    setTheme(value);
    document.firstElementChild?.setAttribute("data-theme", value);
    localStorage.setItem("data-theme", value);
  }

  useLayoutEffect(() => {
    const currentTheme = localStorage.getItem("data-theme");

    if (currentTheme) {
      setTheme(currentTheme);
      document.firstElementChild?.setAttribute("data-theme", currentTheme);
    }
  }, []);

  const themes = [
    "corporate",
    "cupcake",
    "pastel",
    "cmyk",
    "dracula",
    "business",
    "halloween",
  ];

  return (
    <div className="dropdown dropdown-end z-10">
      <div
        aria-label="Selação de tema"
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-btn"
      >
        <PaintBrushIcon className="w-5 sm:w-6 h-5 sm:h-6" />
        {showText && <span>Tema</span>}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content p-2 shadow bg-base-100 text-base-content rounded-box w-52"
      >
        {themes.map((themeOption, i) => (
          <li key={i}>
            <button
              type="button"
              className={`btn btn-sm btn-block capitalize justify-start ${theme === themeOption ? "btn-primary" : "btn-ghost"}`}
              value={themeOption}
              onClick={handleThemeChange}
            >
              {themeOption}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
