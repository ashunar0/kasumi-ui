"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "system" | "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "system",
  setTheme: () => {},
});

const STORAGE_KEY = "my-ui-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // localStorage から復元
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  // テーマ変更時に HTML クラスと localStorage を更新
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme !== "system") {
      root.classList.add(theme);
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  return (
    <ThemeContext value={{ theme, setTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
