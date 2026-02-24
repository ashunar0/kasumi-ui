# Select コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** カスタムドロップダウン型 Select コンポーネントをフルスクラッチで実装する

**Architecture:** React Context で状態共有する複合コンポーネント（Select/SelectTrigger/SelectValue/SelectContent/SelectItem）。useState + useRef + useEffect でドロップダウンの開閉、キーボードナビゲーション、クリック外閉じを制御。

**Tech Stack:** React 19, TypeScript strict, Tailwind CSS 4

**設計ドキュメント:** `docs/plans/2026-02-24-select-design.md`

---

### Task 1: Context と Select ルートコンポーネント

**Files:**
- Create: `src/components/ui/select.tsx`

**Step 1: Context の型定義と Select ルートを実装**

```tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type ComponentProps,
} from "react";

type SelectContextValue = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  // 選択肢の value → 表示テキストのマップ（SelectValue 用）
  itemLabels: Map<string, string>;
  registerItemLabel: (value: string, label: string) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select コンポーネントの外で使われています");
  return ctx;
}

type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
};

export function Select({
  value,
  onValueChange,
  disabled = false,
  children,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [itemLabels] = useState(() => new Map<string, string>());

  const registerItemLabel = useCallback(
    (itemValue: string, label: string) => {
      itemLabels.set(itemValue, label);
    },
    [itemLabels]
  );

  const handleValueChange = useCallback(
    (newValue: string) => {
      onValueChange?.(newValue);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [onValueChange]
  );

  return (
    <SelectContext value={{
      value,
      onValueChange: handleValueChange,
      open,
      setOpen,
      disabled,
      triggerRef,
      contentRef,
      itemLabels,
      registerItemLabel,
    }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext>
  );
}
```

**Step 2: コミット**

```bash
git add src/components/ui/select.tsx
git commit -m "feat(select): Context と Select ルートコンポーネントを追加"
```

---

### Task 2: SelectTrigger と SelectValue

**Files:**
- Modify: `src/components/ui/select.tsx`

**Step 1: SelectTrigger を実装**

Input と同じスタイルライン。クリック・キーボードで開閉トグル。

```tsx
export function SelectTrigger({
  error,
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { error?: boolean }) {
  const { open, setOpen, disabled, triggerRef } = useSelectContext();

  return (
    <button
      ref={triggerRef}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      disabled={disabled}
      onClick={() => setOpen(!open)}
      className={`flex h-10 w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        error
          ? "border-destructive focus-visible:ring-destructive"
          : "border-input"
      } ${className}`}
      {...props}
    >
      {children}
      {/* シェブロンアイコン */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2 shrink-0 opacity-50"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}
```

**Step 2: SelectValue を実装**

```tsx
export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value, itemLabels } = useSelectContext();

  if (!value) {
    return <span className="text-muted-foreground">{placeholder}</span>;
  }

  return <span>{itemLabels.get(value) ?? value}</span>;
}
```

**Step 3: コミット**

```bash
git add src/components/ui/select.tsx
git commit -m "feat(select): SelectTrigger と SelectValue を追加"
```

---

### Task 3: SelectContent と SelectItem

**Files:**
- Modify: `src/components/ui/select.tsx`

**Step 1: SelectContent を実装（ドロップダウン本体）**

クリック外閉じ用の useEffect を含む。

```tsx
export function SelectContent({
  className = "",
  children,
  ...props
}: ComponentProps<"div">) {
  const { open, setOpen, contentRef, triggerRef } = useSelectContext();

  // クリック外で閉じる
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen, contentRef, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      role="listbox"
      className={`absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-background shadow-md ${className}`}
      {...props}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  );
}
```

**Step 2: SelectItem を実装**

```tsx
export function SelectItem({
  value: itemValue,
  disabled = false,
  className = "",
  children,
  ...props
}: ComponentProps<"div"> & { value: string; disabled?: boolean }) {
  const { value, onValueChange, registerItemLabel } = useSelectContext();
  const isSelected = value === itemValue;

  // ラベル登録（SelectValue 用）
  useEffect(() => {
    const label =
      typeof children === "string"
        ? children
        : itemValue;
    registerItemLabel(itemValue, label);
  }, [itemValue, children, registerItemLabel]);

  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      onClick={() => {
        if (!disabled) onValueChange(itemValue);
      }}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
        isSelected ? "bg-accent text-accent-foreground" : ""
      } ${className}`}
      {...props}
    >
      {/* チェックマーク */}
      {isSelected && (
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      )}
      {children}
    </div>
  );
}
```

**Step 3: コミット**

```bash
git add src/components/ui/select.tsx
git commit -m "feat(select): SelectContent と SelectItem を追加"
```

---

### Task 4: キーボードナビゲーション

**Files:**
- Modify: `src/components/ui/select.tsx`

**Step 1: SelectContent にキーボードイベントを追加**

- ↑↓ でフォーカス移動（disabled スキップ）
- Enter/Space で選択
- Escape で閉じる
- 開いた時に現在の選択値 or 先頭にフォーカス

SelectContent の中に `onKeyDown` ハンドラと `useEffect` でのフォーカス制御を追加する。
`[data-disabled]` を持たない `[role="option"]` を querySelectorAll で取得してフォーカス管理。

**Step 2: 動作確認（カタログページで実施）**

- Tab でトリガーにフォーカス → Enter で開く → ↓↑ で移動 → Enter で選択 → Escape で閉じる

**Step 3: コミット**

```bash
git add src/components/ui/select.tsx
git commit -m "feat(select): キーボードナビゲーションを追加"
```

---

### Task 5: カタログページに Select セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Select セクションを追加**

「テキスト入力」セクションの後に「セレクト」セクションを追加。
3パターン表示:
1. 通常（都道府県選択）
2. error 状態
3. disabled 状態

`"use client"` にする必要あり（useState を使うため）。
ページ全体を Client Component にするか、Select 部分だけ別コンポーネントに切り出す。

```tsx
// Select のデモ用（状態を持つのでクライアントコンポーネントが必要）
function SelectDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-4 max-w-sm">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="都道府県を選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tokyo">東京</SelectItem>
          <SelectItem value="osaka">大阪</SelectItem>
          <SelectItem value="fukuoka">福岡</SelectItem>
        </SelectContent>
      </Select>

      <Select value="" onValueChange={() => {}}>
        <SelectTrigger error>
          <SelectValue placeholder="必須項目です" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">選択肢A</SelectItem>
        </SelectContent>
      </Select>

      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="選択できません" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">選択肢A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

**Step 2: dev サーバーで目視確認**

```bash
pnpm dev
```

ブラウザで http://localhost:3000 を開き、Select セクションを確認:
- ドロップダウンの開閉
- 選択→値が表示される
- error の赤いボーダー
- disabled のグレーアウト
- キーボード操作
- ダークモード

**Step 3: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(select): カタログページに Select セクションを追加"
```

---

### Task 6: CLAUDE.md を更新

**Files:**
- Modify: `CLAUDE.md`（プロジェクトルート）

**Step 1: 実装済みコンポーネントに Select を追加**

`## 実装済みコンポーネント` セクションに:
```
- **Select** — 複合コンポーネント（Select/SelectTrigger/SelectValue/SelectContent/SelectItem）、error/disabled 対応、キーボードナビゲーション
```

**Step 2: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: 実装済みコンポーネントに Select を追加"
```
