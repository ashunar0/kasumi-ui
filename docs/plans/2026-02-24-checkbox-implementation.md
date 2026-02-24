# Checkbox コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** ネイティブ `<input type="checkbox">` ベースの Checkbox コンポーネントを実装し、カタログに追加する

**Architecture:** `appearance-none` でネイティブチェックボックスの見た目をリセットし、Tailwind CSS のユーティリティクラスでスタイリング。チェックマークは `checked:` 修飾子 + インライン SVG data URL で表現。既存の Input コンポーネントと同じ props パターン（`ComponentProps<"input">` 拡張 + `size`/`error`）を踏襲。

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4

**設計ドキュメント:** `docs/plans/2026-02-24-checkbox-design.md`

---

### Task 1: Checkbox コンポーネント実装

**Files:**
- Create: `src/components/ui/checkbox.tsx`

**Step 1: コンポーネントファイルを作成**

```tsx
import { type ComponentProps } from "react";

type CheckboxSize = "sm" | "md" | "lg";

type CheckboxProps = Omit<ComponentProps<"input">, "type" | "size"> & {
  size?: CheckboxSize;
  error?: boolean;
};

const sizeStyles: Record<CheckboxSize, string> = {
  sm: "size-4 rounded",
  md: "size-4.5 rounded",
  lg: "size-5 rounded-md",
};

const checkSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E")`;

export function Checkbox({
  size = "md",
  error,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <input
      type="checkbox"
      (実装済み — peer + SVG 方式に変更)
    />
  );
}
```

注意: 当初の background-image インライン方式は Turbopack が data URL を解決しようとしてビルドエラーになるため、peer + SVG 要素方式に変更済み。

**Step 2: ブラウザで動作確認**

Run: `pnpm dev` でローカルサーバーを起動し、次の Task のカタログ追加後に確認。

---

### Task 2: カタログページに Checkbox セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import を追加**

`page.tsx` の import セクションに追加:
```tsx
import { Checkbox } from "@/components/ui/checkbox";
```

**Step 2: Select セクションの下、Label セクションの上に Checkbox セクションを追加**

```tsx
{/* Checkbox */}
<Section title="チェックボックス">
  <div className="space-y-8 max-w-sm">
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground">md</p>
      <label className="flex items-center gap-2">
        <Checkbox />
        <span className="text-sm">利用規約に同意する</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked />
        <span className="text-sm">メール通知を受け取る</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox error />
        <span className="text-sm text-destructive">必須項目です</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox disabled />
        <span className="text-sm text-muted-foreground">選択できません</span>
      </label>
    </div>

    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground">lg</p>
      <label className="flex items-center gap-2">
        <Checkbox size="lg" />
        <span className="text-sm">利用規約に同意する</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox size="lg" defaultChecked />
        <span className="text-sm">メール通知を受け取る</span>
      </label>
    </div>
  </div>
</Section>
```

**Step 3: ブラウザで全状態を確認**

確認項目:
- 未チェック → ボーダーのみ、透明背景
- クリックでチェック → 背景が primary に、白チェックマーク表示
- error 状態 → ボーダーが赤
- disabled → 半透明、クリック不可
- フォーカス → ボーダーが foreground に
- ダークモードで色が正しいか

---

### Task 3: CLAUDE.md 更新 & コミット

**Files:**
- Modify: `CLAUDE.md` — 実装済みコンポーネント一覧に Checkbox を追加

**Step 1: CLAUDE.md を更新**

実装済みコンポーネントセクションに追加:
```
- **Checkbox** — size: sm/md/lg、error prop でエラー状態切り替え
```

**Step 2: コミット**

```bash
git add src/components/ui/checkbox.tsx src/app/page.tsx CLAUDE.md
git commit -m "feat(checkbox): Checkbox コンポーネントを実装し、カタログに追加"
```
