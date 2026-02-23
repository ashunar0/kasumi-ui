"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "system" | "light" | "dark";
type Warmth = "mecha-honnori" | "honnori";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  warmth: Warmth;
  setWarmth: (warmth: Warmth) => void;
}>({
  theme: "system",
  setTheme: () => {},
  warmth: "mecha-honnori",
  setWarmth: () => {},
});

const STORAGE_KEY = "my-ui-theme";
const WARMTH_KEY = "my-ui-warmth";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [warmth, setWarmth] = useState<Warmth>("mecha-honnori");
  const [mounted, setMounted] = useState(false);

  // localStorage から復元
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
    }
    const storedWarmth = localStorage.getItem(WARMTH_KEY);
    if (storedWarmth === "mecha-honnori" || storedWarmth === "honnori") {
      setWarmth(storedWarmth);
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

  // Warmth 変更時に HTML クラスと localStorage を更新
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("warmth-honnori");
    if (warmth === "honnori") {
      root.classList.add("warmth-honnori");
    }
    localStorage.setItem(WARMTH_KEY, warmth);
  }, [warmth, mounted]);

  return (
    <ThemeContext value={{ theme, setTheme, warmth, setWarmth }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
