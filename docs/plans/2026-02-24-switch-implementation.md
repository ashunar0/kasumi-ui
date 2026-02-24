# Switch コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** ネイティブ checkbox ベースの Switch コンポーネントを実装し、カタログに追加する

**Architecture:** `<input type="checkbox" role="switch">` + `appearance-none` + peer modifier パターン。つまみは `peer-checked:translate-x-[Npx]` でスライドアニメーション。Checkbox/Radio と同じ API パターン（size, error props）で統一。

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Switch コンポーネント本体を作成

**Files:**
- Create: `src/components/ui/switch.tsx`
- Reference: `src/components/ui/radio.tsx`（パターン参照）

**Step 1: コンポーネントファイルを作成**

```tsx
import { type ComponentProps } from "react";

type SwitchSize = "sm" | "md" | "lg";

type SwitchProps = Omit<ComponentProps<"input">, "size" | "type" | "role"> & {
  error?: boolean;
  size?: SwitchSize;
};

const sizeStyles: Record<
  SwitchSize,
  { track: string; thumb: string; translate: string }
> = {
  sm: {
    track: "h-4 w-7",
    thumb: "h-3 w-3",
    translate: "peer-checked:translate-x-3",
  },
  md: {
    track: "h-5 w-9",
    thumb: "h-4 w-4",
    translate: "peer-checked:translate-x-4",
  },
  lg: {
    track: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "peer-checked:translate-x-5",
  },
};

export function Switch({
  error,
  size = "md",
  className = "",
  ...props
}: SwitchProps) {
  const s = sizeStyles[size];
  return (
    <span className="relative inline-flex">
      <input
        type="checkbox"
        role="switch"
        className={`peer appearance-none cursor-pointer rounded-full border bg-input transition-colors checked:bg-primary checked:border-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${s.track} ${
          error
            ? "border-destructive focus-visible:border-destructive"
            : "border-transparent focus-visible:border-foreground"
        } ${className}`}
        {...props}
      />
      <span
        className={`pointer-events-none absolute top-1/2 left-0.5 -translate-y-1/2 rounded-full bg-primary-foreground transition-transform ${s.translate} ${s.thumb}`}
      />
    </span>
  );
}
```

**Step 2: ビルド確認**

Run: `pnpm tsc --noEmit`
Expected: エラーなし

### Task 2: カタログページに Switch セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import を追加**

`page.tsx` の import セクションに追加:

```tsx
import { Switch } from "@/components/ui/switch";
```

**Step 2: Radio セクションの直後に Switch セクションを追加**

Radio の `</Section>` と Label の `{/* Label */}` の間に挿入:

```tsx
      {/* Switch */}
      <Section title="スイッチ">
        <div className="space-y-8 max-w-sm">
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">md</p>
            <label className="flex items-center gap-2">
              <Switch />
              <span className="text-sm">通知を受け取る</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch defaultChecked />
              <span className="text-sm">ダークモード</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch error />
              <span className="text-sm text-destructive">必須項目です</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch disabled />
              <span className="text-sm text-muted-foreground">変更できません</span>
            </label>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">lg</p>
            <label className="flex items-center gap-2">
              <Switch size="lg" />
              <span className="text-sm">通知を受け取る</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch size="lg" defaultChecked />
              <span className="text-sm">ダークモード</span>
            </label>
          </div>
        </div>
      </Section>
```

**Step 3: ブラウザで動作確認**

- [ ] トラック（背景）が表示される
- [ ] クリックでつまみが右にスライドする
- [ ] OFF: グレー背景 + つまみ左、ON: primary 背景 + つまみ右
- [ ] アニメーションがスムーズ
- [ ] エラー状態で赤枠
- [ ] 無効状態で半透明
- [ ] md / lg サイズの違いが確認できる
- [ ] ダークモードで正常に表示される

### Task 3: CLAUDE.md を更新してコミット

**Files:**
- Modify: `CLAUDE.md`

**Step 1: CLAUDE.md の実装済みコンポーネントに Switch を追加**

Radio の行の下に追加:

```
- **Switch** — size: sm/md/lg、error prop でエラー状態切り替え、role="switch" 付与
```

ファイル構成にも追加:

```
        ├── switch.tsx
```

**Step 2: コミット**

```bash
git add src/components/ui/switch.tsx src/app/page.tsx CLAUDE.md docs/plans/2026-02-24-switch-design.md docs/plans/2026-02-24-switch-implementation.md
git commit -m "feat(switch): Switch コンポーネントを実装し、カタログに追加"
```
