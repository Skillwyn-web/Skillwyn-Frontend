"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "skillwyn_theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-9 w-9 items-center justify-center border border-white/12 bg-white/[0.04] text-white/62 transition-colors hover:border-white/30 hover:text-white [.light-theme_&]:border-black/10 [.light-theme_&]:bg-black/[0.04] [.light-theme_&]:text-black/62 [.light-theme_&]:hover:border-black/25 [.light-theme_&]:hover:text-black"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("light-theme", theme === "light");
  document.body.classList.toggle("light-theme", theme === "light");
}
