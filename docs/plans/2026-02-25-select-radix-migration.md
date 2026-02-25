# Select Radix UI 移行 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 自作 Select コンポーネントを `@radix-ui/react-select` ベースに差し替え、API 互換を維持する

**Architecture:** Radix UI の Select プリミティブを内部に隠蔽し、既存の `Select` / `SelectTrigger` / `SelectValue` / `SelectContent` / `SelectItem` API をそのまま維持するラッパー方式。shadcn/ui と同じ構成。

**Tech Stack:** @radix-ui/react-select, React 19, Tailwind CSS 4

---

### Task 1: Radix UI Select パッケージのインストール

**Step 1: パッケージ追加**

Run: `pnpm add @radix-ui/react-select`

**Step 2: インストール確認**

Run: `pnpm ls @radix-ui/react-select`
Expected: バージョンが表示される

---

### Task 2: select.tsx を Radix ベースに書き換え

**Files:**
- Modify: `src/components/ui/select.tsx`

**Step 1: select.tsx を以下の内容に書き換え**

既存の自作コードをすべて置き換える。API（export される関数名・props）は維持。

```tsx
"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { type ComponentProps } from "react";

// --- Select Root ---
type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export function Select({
  value,
  onValueChange,
  disabled = false,
  children,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {children}
    </SelectPrimitive.Root>
  );
}

// --- Select Trigger ---
type SelectTriggerSize = "sm" | "md" | "lg";

const triggerSizeStyles: Record<SelectTriggerSize, string> = {
  sm: "h-9 rounded-md",
  md: "h-10 rounded-lg",
  lg: "h-11 rounded-lg",
};

export function SelectTrigger({
  error,
  size = "md",
  className = "",
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
  error?: boolean;
  size?: SelectTriggerSize;
}) {
  return (
    <SelectPrimitive.Trigger
      className={`flex w-full items-center justify-between border bg-background px-3.5 py-2 text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${triggerSizeStyles[size]} ${
        error
          ? "border-destructive focus-visible:border-destructive"
          : "border-input focus-visible:border-foreground"
      } ${className}`}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
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
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// --- Select Value ---
export function SelectValue({
  placeholder,
  ...props
}: ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value placeholder={placeholder} {...props} />;
}

// --- Select Content ---
export function SelectContent({
  className = "",
  children,
  position = "popper",
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        className={`z-50 overflow-hidden rounded-lg border border-border bg-background shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ${
          position === "popper" ? "translate-y-1" : ""
        } ${className}`}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={`p-1 ${
            position === "popper"
              ? "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
              : ""
          }`}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

// --- Select Item ---
export function SelectItem({
  value,
  disabled = false,
  className = "",
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      value={value}
      disabled={disabled}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
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
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
```

**Step 2: dev サーバーで動作確認**

Run: `pnpm dev`

ブラウザでカタログページを開き、以下を確認:
- Select が開閉できる
- 値が選択できる
- md / lg サイズが正しく表示される
- error 状態のボーダーが赤い
- disabled 状態が効いている
- ESC / Arrow キーが動作する

---

### Task 3: 不要コードの確認と最終調整

**Files:**
- Check: `src/components/ui/select.tsx`
- Check: `src/app/page.tsx`

**Step 1: page.tsx が変更不要なことを確認**

page.tsx の import と使用箇所が既存のまま動作していることを確認する。
`useSelectContext` を page.tsx で使っていないことを確認する。

**Step 2: スタイル微調整（必要に応じて）**

Radix の Content は Portal で描画されるため、位置やアニメーションが自作版と微妙に異なる可能性がある。
ブラウザで見た目を確認し、必要ならクラスを調整する。

**Step 3: コミット**

```bash
git add -A
git commit -m "refactor(select): Radix UI ベースに移行し、API 互換を維持"
```

---

### Task 4: 設計ドキュメント更新

**Files:**
- Modify: `docs/plans/2026-02-24-select-design.md`

**Step 1: 設計ドキュメントに Radix 移行を反映**

「なぜフルスクラッチなのか」セクションを更新し、Radix に移行した経緯を記載する。

**Step 2: コミット**

```bash
git add docs/plans/2026-02-24-select-design.md
git commit -m "docs(select): Radix UI 移行の経緯を設計ドキュメントに反映"
```
