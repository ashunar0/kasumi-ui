# Tooltip コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Radix UI ベースの Tooltip コンポーネントを shadcn/ui と同じ複合コンポーネントパターンで実装し、カタログページに追加する

**Architecture:** `@radix-ui/react-tooltip` をラップした複合コンポーネント（TooltipProvider, Tooltip, TooltipTrigger, TooltipContent）。既存の Dialog/Select/Tabs と同じ Radix ラップパターン。

**Tech Stack:** React 19, Radix UI (`@radix-ui/react-tooltip`), Tailwind CSS 4, cn() ユーティリティ

---

### Task 1: Radix UI パッケージをインストール

**Step 1: パッケージ追加**

Run: `pnpm add @radix-ui/react-tooltip`

**Step 2: インストール確認**

Run: `pnpm ls @radix-ui/react-tooltip`

---

### Task 2: Tooltip コンポーネントを実装

**Files:**
- Create: `src/components/ui/tooltip.tsx`

**Step 1: コンポーネントファイルを作成**

```tsx
"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// --- Tooltip Provider ---
export function TooltipProvider({
  delayDuration = 200,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

// --- Tooltip Root ---
export function Tooltip({
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
  );
}

// --- Tooltip Trigger ---
export function TooltipTrigger({
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger {...props}>{children}</TooltipPrimitive.Trigger>
  );
}

// --- Tooltip Content ---
export function TooltipContent({
  sideOffset = 4,
  className,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 overflow-hidden rounded-md bg-foreground px-3 py-1.5 text-xs text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
```

**Step 2: 型チェック**

Run: `pnpm exec tsc --noEmit`

**Step 3: コミット**

```bash
git add src/components/ui/tooltip.tsx
git commit -m "feat(tooltip): Tooltip コンポーネントを追加"
```

---

### Task 3: カタログページに Tooltip セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import を追加**

```tsx
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
```

**Step 2: TooltipProvider でページ全体をラップ**

`Home` コンポーネントの return で、既存の `<div>` の外側を `<TooltipProvider>` で囲む。

**Step 3: Tooltip セクションを追加**

タブセクションの後、テキスト入力セクションの前に追加:

```tsx
{/* Tooltip */}
<Section title="ツールチップ">
  <div className="flex flex-wrap items-center gap-4">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">上に表示</Button>
      </TooltipTrigger>
      <TooltipContent>
        デフォルトは上に表示されます
      </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">下に表示</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        side=&quot;bottom&quot; で下に表示
      </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">左に表示</Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        side=&quot;left&quot; で左に表示
      </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">右に表示</Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        side=&quot;right&quot; で右に表示
      </TooltipContent>
    </Tooltip>
  </div>
</Section>
```

**Step 4: 型チェック**

Run: `pnpm exec tsc --noEmit`

**Step 5: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(catalog): Tooltip セクションをカタログページに追加"
```

---

### Task 4: CLAUDE.md を更新

**Files:**
- Modify: `CLAUDE.md`

**Step 1: ファイル構成に tooltip.tsx を追加**（アルファベット順）

**Step 2: 実装済みコンポーネントに追加**

```
- **Tooltip** — Radix UI ベース、複合コンポーネント（TooltipProvider/Tooltip/TooltipTrigger/TooltipContent）、side 指定可能（デフォルト top）、Portal・自動位置調整対応
```

**Step 3: カタログページのセクション順を更新**（タブの後にツールチップを追加）

**Step 4: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md に Tooltip コンポーネント情報を追加"
```
