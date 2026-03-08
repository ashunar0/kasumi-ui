# Sidebar コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** サイドバー＋メインコンテンツの汎用レイアウトコンポーネントを実装する

**Architecture:** SidebarProvider で開閉状態を Context 管理し、13個の複合コンポーネントで構成。デスクトップではミニサイドバーに折りたたみ、モバイルでは Radix Dialog によるドロワーに切り替え。

**Tech Stack:** React 19, Tailwind CSS 4, Radix UI (Collapsible, Dialog, Slot), lucide-react

**設計ドキュメント:** `docs/plans/2026-03-08-sidebar-design.md`

---

### Task 1: 依存パッケージのインストール

**Files:**
- Modify: `package.json`

**Step 1: @radix-ui/react-collapsible をインストール**

```bash
pnpm add @radix-ui/react-collapsible
```

`@radix-ui/react-slot` はトランジティブ依存として既にインストール済み。明示的に追加する:

```bash
pnpm add @radix-ui/react-slot
```

**Step 2: コミット**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: Sidebar 実装に必要な Radix パッケージを追加"
```

---

### Task 2: useIsMobile フックの実装

**Files:**
- Create: `src/lib/use-mobile.ts`

**Step 1: useIsMobile フックを実装**

```typescript
"use client"

import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mql.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
```

**Step 2: コミット**

```bash
git add src/lib/use-mobile.ts
git commit -m "feat: useIsMobile フックを追加"
```

---

### Task 3: SidebarProvider と useSidebar の実装

**Files:**
- Create: `src/components/ui/sidebar.tsx`

**Step 1: Context と Provider を実装**

SidebarProvider が管理する状態:
- `open`: boolean（デスクトップの展開/折りたたみ）
- `isMobile`: boolean（useIsMobile フックから取得）
- `openMobile`: boolean（モバイルドロワーの開閉）
- `toggleSidebar()`: デスクトップなら open を、モバイルなら openMobile をトグル

```typescript
"use client"

import {
  type ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { Slot } from "@radix-ui/react-slot"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/lib/use-mobile"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_COLLAPSED = "3rem"

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

type SidebarProviderProps = ComponentProps<"div"> & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = true,
  onOpenChange,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [open, setOpenState] = useState(defaultOpen)
  const [openMobile, setOpenMobile] = useState(false)

  const setOpen = useCallback(
    (value: boolean) => {
      setOpenState(value)
      onOpenChange?.(value)
    },
    [onOpenChange]
  )

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
    } else {
      setOpen(!open)
    }
  }, [isMobile, open, setOpen])

  const value = useMemo(
    () => ({ open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar }),
    [open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div
        className={cn("flex min-h-svh w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
```

**Step 2: コミット**

```bash
git add src/components/ui/sidebar.tsx
git commit -m "feat(sidebar): SidebarProvider と useSidebar を実装"
```

---

### Task 4: Sidebar 本体の実装

**Files:**
- Modify: `src/components/ui/sidebar.tsx`

**Step 1: Sidebar コンポーネントを追加**

デスクトップとモバイルで描画を分岐する:
- デスクトップ: 固定幅のサイドバー（`transition-[width]` でアニメーション）
- モバイル: Radix Dialog によるドロワー（左からスライドイン）

```typescript
export function Sidebar({
  className,
  children,
  ...props
}: ComponentProps<"aside">) {
  const { open, openMobile, setOpenMobile, isMobile } = useSidebar()

  if (isMobile) {
    return (
      <DialogPrimitive.Root open={openMobile} onOpenChange={setOpenMobile}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
          />
          <DialogPrimitive.Content
            className={cn(
              "fixed inset-y-0 left-0 z-50 flex w-[16rem] flex-col bg-secondary",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
              "duration-200",
              className
            )}
            {...props}
          >
            <DialogPrimitive.Title className="sr-only">
              ナビゲーションメニュー
            </DialogPrimitive.Title>
            {children}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }

  return (
    <>
      {/* スペーサー（メインコンテンツの margin-left 代わり） */}
      <div
        className="shrink-0 transition-[width] duration-200 ease-in-out"
        style={{ width: open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED }}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-secondary border-r border-border overflow-hidden transition-[width] duration-200 ease-in-out",
          className
        )}
        style={{ width: open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED }}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}
```

**Step 2: コミット**

```bash
git add src/components/ui/sidebar.tsx
git commit -m "feat(sidebar): Sidebar 本体を実装（デスクトップ + モバイルドロワー）"
```

---

### Task 5: レイアウト枠コンポーネントの実装

**Files:**
- Modify: `src/components/ui/sidebar.tsx`

**Step 1: SidebarHeader, SidebarContent, SidebarFooter を追加**

```typescript
export function SidebarHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2 px-4 py-3", className)}
      {...props}
    />
  )
}

export function SidebarContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-2 py-2", className)}
      {...props}
    />
  )
}

export function SidebarFooter({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t border-border px-4 py-3",
        className
      )}
      {...props}
    />
  )
}
```

**Step 2: コミット**

```bash
git add src/components/ui/sidebar.tsx
git commit -m "feat(sidebar): SidebarHeader, SidebarContent, SidebarFooter を実装"
```

---

### Task 6: ナビゲーショングループの実装

**Files:**
- Modify: `src/components/ui/sidebar.tsx`

**Step 1: SidebarGroup と SidebarGroupLabel を追加**

```typescript
export function SidebarGroup({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("space-y-1 py-2", className)}
      {...props}
    />
  )
}

export function SidebarGroupLabel({
  className,
  ...props
}: ComponentProps<"span">) {
  const { open } = useSidebar()

  return (
    <span
      className={cn(
        "px-3 text-ui text-muted-foreground font-medium transition-opacity duration-200",
        !open && "opacity-0",
        className
      )}
      {...props}
    />
  )
}
```

**Step 2: コミット**

```bash
git add src/components/ui/sidebar.tsx
git commit -m "feat(sidebar): SidebarGroup, SidebarGroupLabel を実装"
```

---

### Task 7: メニューコンポーネントの実装

**Files:**
- Modify: `src/components/ui/sidebar.tsx`

**Step 1: SidebarMenu, SidebarMenuItem, SidebarMenuButton を追加**

SidebarMenuButton は:
- `icon` prop で左アイコン表示
- `isActive` prop でアクティブ状態のスタイル
- `asChild` prop で Radix Slot 経由のポリモーフィック描画（Next.js Link 対応）
- 折りたたみ時はアイコンのみ表示＋ Tooltip でラベル表示

```typescript
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { LucideIcon } from "lucide-react"

export function SidebarMenu({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      className={cn("space-y-0.5", className)}
      {...props}
    />
  )
}

export function SidebarMenuItem({
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      className={cn("list-none", className)}
      {...props}
    />
  )
}

type SidebarMenuButtonProps = ComponentProps<"button"> & {
  icon?: LucideIcon
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuButton({
  icon: Icon,
  isActive = false,
  asChild = false,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { open, isMobile } = useSidebar()
  const Comp = asChild ? Slot : "button"

  const button = (
    <Comp
      data-active={isActive || undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-ui transition-colors",
        "hover:bg-accent",
        "data-[active]:bg-accent data-[active]:font-medium",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      <span
        className={cn(
          "truncate transition-opacity duration-200",
          !open && !isMobile && "opacity-0 w-0 overflow-hidden"
        )}
      >
        {children}
      </span>
    </Comp>
  )

  // 折りたたみ時は Tooltip でラベル表示
  if (!open && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">
          {children}
        </TooltipContent>
      </Tooltip>
    )
  }

  return button
}
```

**Step 2: コミット**

```bash
git add src/components/ui/sidebar.tsx
git commit -m "feat(sidebar): SidebarMenu, SidebarMenuItem, SidebarMenuButton を実装"
```

---

### Task 8: ネストメニュー（SidebarMenuSub）の実装

**Files:**
- Modify: `src/components/ui/sidebar.tsx`

**Step 1: SidebarMenuSub を追加**

Radix Collapsible を使って展開/折りたたみアニメーション付きのサブメニューを実装する。

```typescript
import { ChevronDown } from "lucide-react"

type SidebarMenuSubProps = ComponentProps<"ul"> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarMenuSub({
  open: openProp,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: SidebarMenuSubProps) {
  return (
    <CollapsiblePrimitive.Root
      open={openProp}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <CollapsiblePrimitive.Content
        className={cn(
          "overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:slide-up data-[state=open]:slide-down"
        )}
      >
        <ul
          className={cn(
            "ml-4 space-y-0.5 border-l border-border pl-2 py-1",
            className
          )}
          {...props}
        >
          {children}
        </ul>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}
```

SidebarMenuButton に Collapsible.Trigger 機能を組み込む際は、親の SidebarMenuItem に CollapsiblePrimitive.Root を配置し、SidebarMenuButton を CollapsiblePrimitive.Trigger でラップする形にする。

使用例:
```tsx
<CollapsiblePrimitive.Root>
  <SidebarMenuItem>
    <CollapsiblePrimitive.Trigger asChild>
      <SidebarMenuButton icon={Settings}>
        設定
        <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]:rotate-180" />
      </SidebarMenuButton>
    </CollapsiblePrimitive.Trigger>
    <SidebarMenuSub>
      <SidebarMenuItem>
        <SidebarMenuButton>プロフィール</SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenuSub>
  </SidebarMenuItem>
</CollapsiblePrimitive.Root>
```

**Step 2: コミット**

```bash
git add src/components/ui/sidebar.tsx
git commit -m "feat(sidebar): SidebarMenuSub を実装（Radix Collapsible ベース）"
```

---

### Task 9: SidebarTrigger の実装

**Files:**
- Modify: `src/components/ui/sidebar.tsx`

**Step 1: SidebarTrigger を追加**

```typescript
export function SidebarTrigger({
  className,
  ...props
}: ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
        className
      )}
      aria-label="サイドバーの開閉"
      {...props}
    >
      <PanelLeft className="size-4" />
    </button>
  )
}
```

**Step 2: コミット**

```bash
git add src/components/ui/sidebar.tsx
git commit -m "feat(sidebar): SidebarTrigger を実装"
```

---

### Task 10: カタログページにデモセクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: サイドバーのデモセクションを追加**

カタログページにサイドバーのデモを追加する。他のセクションと同じパターンで:
- セクション見出し「サイドバー」
- iframe または専用ページへのリンクで表示（サイドバーはフルページレイアウトのため、カタログページ内に直接埋め込むと表示が崩れる）
- `/sidebar-demo` に専用デモページを作成

**Step 2: デモページを作成**

- Create: `src/app/sidebar-demo/page.tsx`

日程調整アプリ風のデモデータで、サイドバーの全機能（グループ分け、ネストメニュー、アクティブ状態、フッターのアバター）を展示する。

**Step 3: コミット**

```bash
git add src/app/page.tsx src/app/sidebar-demo/page.tsx
git commit -m "feat: Sidebar のデモページをカタログに追加"
```

---

### Task 11: CLAUDE.md の更新

**Files:**
- Modify: `CLAUDE.md`

**Step 1: CLAUDE.md にサイドバーの情報を追加**

- ファイル構成に `sidebar.tsx` を追加
- 実装済みコンポーネントに Sidebar の説明を追加
- カタログページのセクション一覧を更新

**Step 2: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: Sidebar コンポーネントのドキュメントを追加"
```

---

### Task 12: 動作確認と最終調整

**Step 1: dev サーバーで確認**

```bash
pnpm dev
```

確認項目:
- [ ] デスクトップ: サイドバー展開/折りたたみがスムーズにアニメーション
- [ ] デスクトップ折りたたみ時: アイコンのみ表示、ホバーで Tooltip
- [ ] モバイル: ドロワーが左からスライドイン
- [ ] モバイル: オーバーレイクリック/Escape で閉じる
- [ ] ネストメニュー: 展開/折りたたみがアニメーション付きで動作
- [ ] アクティブ状態: 適切なスタイルが適用
- [ ] ダークモード: 正しい配色
- [ ] SidebarTrigger: どこに配置しても動作

**Step 2: 必要に応じて微調整**

**Step 3: 最終コミット（調整があった場合）**

```bash
git add -A
git commit -m "fix(sidebar): スタイル微調整"
```
