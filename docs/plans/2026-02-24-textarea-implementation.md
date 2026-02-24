# Textarea コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Input の outline variant と同じスタイルで Textarea コンポーネントを実装し、カタログに追加する

**Architecture:** ネイティブ `<textarea>` をそのまま使い、Tailwind でスタイリング。Input と違い size/variant は持たずシンプルに保つ。

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Textarea コンポーネント本体を作成

**Files:**
- Create: `src/components/ui/textarea.tsx`
- Reference: `src/components/ui/input.tsx`（outline variant のスタイル参照）

**Step 1: コンポーネントファイルを作成**

```tsx
import { type ComponentProps } from "react";

type TextareaProps = ComponentProps<"textarea"> & {
  error?: boolean;
};

export function Textarea({
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={`flex w-full min-h-20 resize-y rounded-lg border bg-background px-3.5 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
        error
          ? "border-destructive focus-visible:border-destructive"
          : "border-input focus-visible:border-foreground"
      } ${className}`}
      {...props}
    />
  );
}
```

**Step 2: ビルド確認**

Run: `pnpm tsc --noEmit`
Expected: エラーなし

### Task 2: カタログページに Textarea セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import を追加**

```tsx
import { Textarea } from "@/components/ui/textarea";
```

**Step 2: Input セクションの直後に Textarea セクションを追加**

Input の `</Section>` と Select の `{/* Select */}` の間に挿入:

```tsx
      {/* Textarea */}
      <Section title="テキストエリア">
        <div className="space-y-3 max-w-sm">
          <Textarea placeholder="メッセージを入力してください" />
          <Textarea placeholder="正しい内容を入力してください" error />
          <Textarea placeholder="入力できません" disabled />
        </div>
      </Section>
```

**Step 3: ブラウザで動作確認**

- [ ] rounded-lg の枠線が表示される
- [ ] 縦方向にリサイズできる
- [ ] エラー状態で赤枠
- [ ] 無効状態で半透明
- [ ] ダークモードで正常に表示される

### Task 3: CLAUDE.md を更新してコミット

**Files:**
- Modify: `CLAUDE.md`

**Step 1: CLAUDE.md の実装済みコンポーネントに Textarea を追加**

Input の行の下に追加:

```
- **Textarea** — error prop でエラー状態切り替え、resize-y でリサイズ可能
```

ファイル構成にも追加:

```
        ├── textarea.tsx
```

**Step 2: コミット**

```bash
git add src/components/ui/textarea.tsx src/app/page.tsx CLAUDE.md docs/plans/2026-02-24-textarea-design.md docs/plans/2026-02-24-textarea-implementation.md
git commit -m "feat(textarea): Textarea コンポーネントを実装し、カタログに追加"
```
