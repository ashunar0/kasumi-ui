"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-1 rounded-lg border border-border p-1">
      {(["light", "system", "dark"] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`rounded-md px-3 py-1 text-sm transition-colors ${
            theme === t
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t === "light" ? "Light" : t === "dark" ? "Dark" : "System"}
        </button>
      ))}
    </div>
  );
}
