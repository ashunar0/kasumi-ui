"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "system" | "light" | "dark";
export type ColorTheme = "yamabuki" | "teal";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorTheme: ColorTheme;
  setColorTheme: (colorTheme: ColorTheme) => void;
}>({
  theme: "system",
  setTheme: () => {},
  colorTheme: "yamabuki",
  setColorTheme: () => {},
});

const STORAGE_KEY = "my-ui-theme";
const COLOR_THEME_KEY = "my-ui-color-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("yamabuki");
  const [mounted, setMounted] = useState(false);

  // localStorage から復元
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
    }
    const storedColor = localStorage.getItem(COLOR_THEME_KEY);
    if (storedColor === "yamabuki" || storedColor === "teal") {
      setColorTheme(storedColor);
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

  // カラーテーマ変更時に HTML クラスと localStorage を更新
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("theme-teal");
    if (colorTheme === "teal") {
      root.classList.add("theme-teal");
    }
    localStorage.setItem(COLOR_THEME_KEY, colorTheme);
  }, [colorTheme, mounted]);

  return (
    <ThemeContext value={{ theme, setTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
