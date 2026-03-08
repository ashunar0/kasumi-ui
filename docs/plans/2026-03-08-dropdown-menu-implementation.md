# Dropdown Menu コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Radix UI ベースの Dropdown Menu を実装し、カタログページに追加する

**Architecture:** `@radix-ui/react-dropdown-menu` をラップした複合コンポーネント。Select の Content スタイルと統一感を持たせる。

**Tech Stack:** React 19, Radix UI (`@radix-ui/react-dropdown-menu`), Tailwind CSS 4, cn()

---

### Task 1: Radix UI パッケージをインストール

Run: `pnpm add @radix-ui/react-dropdown-menu`

---

### Task 2: Dropdown Menu コンポーネントを実装

**Files:**
- Create: `src/components/ui/dropdown-menu.tsx`

```tsx
"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// --- DropdownMenu Root ---
export function DropdownMenu({
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return (
    <DropdownMenuPrimitive.Root {...props}>
      {children}
    </DropdownMenuPrimitive.Root>
  );
}

// --- DropdownMenu Trigger ---
export function DropdownMenuTrigger({
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger {...props}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
}

// --- DropdownMenu Content ---
export function DropdownMenuContent({
  sideOffset = 4,
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-background p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

// --- DropdownMenu Item ---
export function DropdownMenuItem({
  destructive = false,
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  destructive?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        destructive && "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

// --- DropdownMenu Label ---
export function DropdownMenuLabel({
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  );
}

// --- DropdownMenu Separator ---
export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

// --- DropdownMenu Shortcut ---
export function DropdownMenuShortcut({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn("ml-auto text-xs text-muted-foreground", className)}
      {...props}
    >
      {children}
    </span>
  );
}
```

Run: `pnpm exec tsc --noEmit`
Commit: `git commit -m "feat(dropdown-menu): DropdownMenu コンポーネントを追加"`

---

### Task 3: カタログページに DropdownMenu セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

Import を追加:
```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
```

ツールチップセクションの後、テキスト入力セクションの前に追加:

```tsx
{/* DropdownMenu */}
<Section title="ドロップダウンメニュー">
  <div className="flex flex-wrap items-center gap-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">メニューを開く</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>アクション</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          編集
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          複製
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          削除
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">シンプル</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>プロフィール</DropdownMenuItem>
        <DropdownMenuItem>設定</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>ログアウト</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</Section>
```

Run: `pnpm exec tsc --noEmit`
Commit: `git commit -m "feat(catalog): DropdownMenu セクションをカタログページに追加"`

---

### Task 4: CLAUDE.md を更新

- ファイル構成に `dropdown-menu.tsx` 追加
- 実装済みコンポーネントに追加
- カタログセクション順を更新

Commit: `git commit -m "docs: CLAUDE.md に DropdownMenu コンポーネント情報を追加"`
