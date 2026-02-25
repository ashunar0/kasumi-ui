# Toast カラー設計 v2 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Toast コンポーネントの色設計を hex 直指定から Tailwind スケール + dark: prefix に全面刷新する

**Architecture:** `toast.tsx` の `variantClasses` と `variantIcons` を書き換えるだけ。CSS 変数追加なし。

**Tech Stack:** Tailwind CSS 4, Radix UI Toast

**Design doc:** `docs/plans/2026-02-25-toast-color-redesign.md`

---

### Task 1: variantClasses を Tailwind スケールに書き換え

**Files:**
- Modify: `src/components/ui/toast.tsx:97-103`

**Step 1: variantClasses を更新**

```typescript
const variantClasses: Record<ToastVariant, string> = {
  default: "border-border bg-background text-foreground",
  success:
    "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-200",
  info:
    "border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-200",
  warning:
    "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-200",
  error:
    "border-red-300 bg-red-100 text-red-800 dark:border-red-700 dark:bg-red-900 dark:text-red-200",
};
```

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git add src/components/ui/toast.tsx
git commit -m "fix(toast): バリアント色を Tailwind スケールに統一、ダークモード対応"
```

---

### Task 2: variantIcons のアイコン色をダークモード対応

**Files:**
- Modify: `src/components/ui/toast.tsx:105-111`

**Step 1: variantIcons を更新**

```typescript
const variantIcons: Record<ToastVariant, ReactNode> = {
  default: null,
  success: <CircleCheck size={16} className="text-emerald-600 dark:text-emerald-400" />,
  info: <Info size={16} className="text-blue-600 dark:text-blue-400" />,
  warning: <TriangleAlert size={16} className="text-amber-600 dark:text-amber-400" />,
  error: <OctagonAlert size={16} className="text-red-600 dark:text-red-400" />,
};
```

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git add src/components/ui/toast.tsx
git commit -m "fix(toast): アイコン色をダークモード対応に更新"
```

---

### Task 3: ブラウザで目視確認

**Step 1: dev サーバー起動**

Run: `pnpm dev`

**Step 2: 確認項目**

- [ ] ライトモードで各バリアント（success/info/warning/error）の背景色がしっかり色付いている
- [ ] テキストが同系色の濃い色で読みやすい
- [ ] ダークモードで背景が濃い色、テキストが明るい色に反転している
- [ ] アイコンがライト/ダーク両方で適切な色になっている
- [ ] default バリアントが変わっていないこと
