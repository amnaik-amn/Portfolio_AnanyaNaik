"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg border border-paper-line dark:border-ink-line hover:bg-paper-surface dark:hover:bg-ink-surface transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="h-5 w-5 text-paper-text" /> : <Sun className="h-5 w-5 text-ink-text" />}
    </button>
  );
}
