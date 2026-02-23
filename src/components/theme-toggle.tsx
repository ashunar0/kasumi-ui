"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme, warmth, setWarmth } = useTheme();

  return (
    <div className="flex flex-col gap-2">
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
      <div className="flex gap-1 rounded-lg border border-border p-1">
        {(["mecha-honnori", "honnori"] as const).map((w) => (
          <button
            key={w}
            onClick={() => setWarmth(w)}
            className={`rounded-md px-3 py-1 text-sm transition-colors ${
              warmth === w
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {w === "mecha-honnori" ? "めっちゃほんのり" : "ほんのり"}
          </button>
        ))}
      </div>
    </div>
  );
}
