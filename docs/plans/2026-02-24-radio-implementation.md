# Radio コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Checkbox と同じ設計パターンで Radio コンポーネントを実装し、カタログに追加する

**Architecture:** ネイティブ `<input type="radio">` + `appearance-none` + peer modifier パターン。チェック状態は CSS 丸ドット（`peer-checked:block`）で表現。Checkbox の兄弟コンポーネントとしてサイズ体系・状態スタイルを完全統一。

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Radio コンポーネント本体を作成

**Files:**
- Create: `src/components/ui/radio.tsx`
- Reference: `src/components/ui/checkbox.tsx`（パターン参照）

**Step 1: コンポーネントファイルを作成**

```tsx
import { type ComponentProps } from "react";

type RadioSize = "sm" | "md" | "lg";

type RadioProps = Omit<ComponentProps<"input">, "size" | "type"> & {
  error?: boolean;
  size?: RadioSize;
};

const sizeStyles: Record<RadioSize, { container: string; dot: string }> = {
  sm: { container: "h-4 w-4", dot: "h-2 w-2" },
  md: { container: "h-[18px] w-[18px]", dot: "h-[9px] w-[9px]" },
  lg: { container: "h-5 w-5", dot: "h-[10px] w-[10px]" },
};

export function Radio({
  error,
  size = "md",
  className = "",
  ...props
}: RadioProps) {
  const s = sizeStyles[size];
  return (
    <span className="relative inline-flex items-center justify-center">
      <input
        type="radio"
        className={`peer appearance-none cursor-pointer rounded-full border bg-transparent transition-colors checked:bg-primary checked:border-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${s.container} ${
          error
            ? "border-destructive focus-visible:border-destructive"
            : "border-input focus-visible:border-foreground"
        } ${className}`}
        {...props}
      />
      <span
        className={`pointer-events-none absolute hidden rounded-full bg-white peer-checked:block ${s.dot}`}
      />
    </span>
  );
}
```

**Step 2: ビルド確認**

Run: `pnpm dev`（ブラウザでエラーが出ないことを確認）

### Task 2: カタログページに Radio セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import を追加**

`page.tsx` の import セクションに追加:

```tsx
import { Radio } from "@/components/ui/radio";
```

**Step 2: Checkbox セクションの直後に Radio セクションを追加**

Checkbox の `</Section>` と Label の `{/* Label */}` の間に挿入:

```tsx
      {/* Radio */}
      <Section title="ラジオボタン">
        <div className="space-y-8 max-w-sm">
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">md</p>
            <label className="flex items-center gap-2">
              <Radio name="demo-md" value="a" />
              <span className="text-sm">参加する</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio name="demo-md" value="b" defaultChecked />
              <span className="text-sm">不参加</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio name="demo-md-error" error />
              <span className="text-sm text-destructive">必須項目です</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio disabled />
              <span className="text-sm text-muted-foreground">選択できません</span>
            </label>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">lg</p>
            <label className="flex items-center gap-2">
              <Radio name="demo-lg" value="a" size="lg" />
              <span className="text-sm">参加する</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio name="demo-lg" value="b" size="lg" defaultChecked />
              <span className="text-sm">不参加</span>
            </label>
          </div>
        </div>
      </Section>
```

**Step 3: ブラウザで動作確認**

- [ ] 丸い外枠が表示される
- [ ] クリックで丸ドットが表示される
- [ ] 同じ name グループ内で排他選択される
- [ ] エラー状態で赤枠
- [ ] 無効状態で半透明
- [ ] md / lg サイズの違いが確認できる
- [ ] ダークモードで正常に表示される

### Task 3: CLAUDE.md を更新してコミット

**Files:**
- Modify: `CLAUDE.md`

**Step 1: CLAUDE.md の実装済みコンポーネントに Radio を追加**

Checkbox の行の下に追加:

```
- **Radio** — size: sm/md/lg、error prop でエラー状態切り替え、name 属性でグルーピング
```

**Step 2: コミット**

```bash
git add src/components/ui/radio.tsx src/app/page.tsx CLAUDE.md
git commit -m "feat(radio): Radio コンポーネントを実装し、カタログに追加"
```
