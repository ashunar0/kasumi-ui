"use client";

import { useTheme } from "@/components/theme-provider";

const COLOR_THEMES = [
  { value: "yamabuki", label: "山吹", color: "#FFCC00" },
  { value: "teal", label: "ティール", color: "#14b8a6" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

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
        {COLOR_THEMES.map((ct) => (
          <button
            key={ct.value}
            onClick={() => setColorTheme(ct.value)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-sm transition-colors ${
              colorTheme === ct.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className="inline-block size-3 rounded-full"
              style={{ backgroundColor: ct.color }}
            />
            {ct.label}
          </button>
        ))}
      </div>
    </div>
  );
}
