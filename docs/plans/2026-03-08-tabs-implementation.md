# Tabs コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Radix UI ベースの Tabs コンポーネントを underline / pill の2 variant で実装し、カタログページに追加する

**Architecture:** `@radix-ui/react-tabs` をラップした複合コンポーネント（Tabs, TabsList, TabsTrigger, TabsContent）。variant は TabsList に持たせる。既存の Dialog/Select と同じ Radix ラップパターンに従う。

**Tech Stack:** React 19, Radix UI (`@radix-ui/react-tabs`), Tailwind CSS 4, cn() ユーティリティ

---

### Task 1: Radix UI パッケージをインストール

**Step 1: パッケージ追加**

Run: `pnpm add @radix-ui/react-tabs`

**Step 2: インストール確認**

Run: `pnpm ls @radix-ui/react-tabs`
Expected: バージョンが表示される

---

### Task 2: Tabs コンポーネントを実装

**Files:**
- Create: `src/components/ui/tabs.tsx`

**Step 1: コンポーネントファイルを作成**

```tsx
"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// --- Tabs Root ---
export function Tabs({
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root className={cn("w-full", className)} {...props}>
      {children}
    </TabsPrimitive.Root>
  );
}

// --- Tabs List ---
type TabsListVariant = "underline" | "pill";

export function TabsList({
  variant = "underline",
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.List> & {
  variant?: TabsListVariant;
}) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex items-center",
        variant === "underline" && "gap-1 border-b border-border",
        variant === "pill" &&
          "gap-1 rounded-lg bg-muted p-1",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );
}

// --- Tabs Trigger ---
export function TabsTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

// --- Tabs Content ---
export function TabsContent({
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("mt-4 focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </TabsPrimitive.Content>
  );
}
```

注意: TabsTrigger のスタイルは variant に依存しない共通スタイルのみ記述。variant 別のスタイル（underline の下線、pill の背景）は `data-[state=active]` を使って TabsTrigger 側で切り替える必要がある。ただし TabsTrigger は TabsList の variant を知らないため、以下のいずれかで対応:

**方式: TabsList 側の CSS 子セレクタで制御**

TabsList の variant クラスに応じて、子要素の Trigger に `data-[state=active]` スタイルを当てる。Tailwind の子セレクタバリアントはないため、TabsTrigger に直接 variant 別のアクティブスタイルを入れる必要がある。

→ 実際の実装では **TabsList が variant を context や data 属性で伝えるか、直接 TabsTrigger に variant 別スタイルを含める** のがシンプル。ここでは data 属性方式を採用:

TabsList に `data-variant` を付与し、TabsTrigger は以下のように variant 別アクティブスタイルを適用:

```tsx
// TabsList に data-variant を付ける
<TabsPrimitive.List data-variant={variant} ...>

// TabsTrigger で親の data-variant を参照
// → Tailwind では直接参照できないため、CSS か別の方法が必要
```

**最もシンプルな方式: TabsList が children を clone して variant を渡す、もしくは CSS 変数を使う**

→ 実装時に最もシンプルな方法を選択する。推奨は **TabsList に variant クラスを付け、globals.css で子セレクタスタイルを定義する** か、**React Context で variant を共有する** 方式。

以下は Context 方式の完成形コード:

```tsx
"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { createContext, use, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// --- Variant Context ---
type TabsVariant = "underline" | "pill";
const TabsVariantContext = createContext<TabsVariant>("underline");

// --- Tabs Root ---
export function Tabs({
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root className={cn("w-full", className)} {...props}>
      {children}
    </TabsPrimitive.Root>
  );
}

// --- Tabs List ---
export function TabsList({
  variant = "underline",
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.List> & {
  variant?: TabsVariant;
}) {
  return (
    <TabsVariantContext value={variant}>
      <TabsPrimitive.List
        className={cn(
          "inline-flex items-center",
          variant === "underline" && "gap-1 border-b border-border",
          variant === "pill" && "gap-1 rounded-lg bg-muted p-1",
          className
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsVariantContext>
  );
}

// --- Tabs Trigger ---
const triggerVariantStyles: Record<TabsVariant, string> = {
  underline:
    "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground",
  pill: "rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
};

export function TabsTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = use(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        triggerVariantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

// --- Tabs Content ---
export function TabsContent({
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("mt-4 focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </TabsPrimitive.Content>
  );
}
```

**Step 2: 型チェック**

Run: `pnpm exec tsc --noEmit`
Expected: エラーなし

**Step 3: コミット**

```bash
git add src/components/ui/tabs.tsx
git commit -m "feat(tabs): Tabs コンポーネントを追加"
```

---

### Task 3: カタログページに Tabs セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import を追加**

`page.tsx` の import ブロックに追加:

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
```

**Step 2: Tabs セクションを追加**

Badge セクションの後（テキスト入力セクションの前）に追加:

```tsx
{/* Tabs */}
<Section title="タブ">
  <div className="space-y-8">
    <div>
      <p className="text-ui text-muted-foreground mb-3">underline</p>
      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule">スケジュール</TabsTrigger>
          <TabsTrigger value="participants">参加者</TabsTrigger>
          <TabsTrigger value="settings">設定</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <p className="text-sm text-muted-foreground">
            来週のミーティング候補日が3件あります。
          </p>
        </TabsContent>
        <TabsContent value="participants">
          <p className="text-sm text-muted-foreground">
            参加者は田中さん、佐藤さん、鈴木さんの3名です。
          </p>
        </TabsContent>
        <TabsContent value="settings">
          <p className="text-sm text-muted-foreground">
            通知設定やカレンダー連携を管理できます。
          </p>
        </TabsContent>
      </Tabs>
    </div>

    <div>
      <p className="text-ui text-muted-foreground mb-3">pill</p>
      <Tabs defaultValue="all">
        <TabsList variant="pill">
          <TabsTrigger value="all">すべて</TabsTrigger>
          <TabsTrigger value="upcoming">今後の予定</TabsTrigger>
          <TabsTrigger value="past">過去の予定</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <p className="text-sm text-muted-foreground">
            すべての予定を表示しています。
          </p>
        </TabsContent>
        <TabsContent value="upcoming">
          <p className="text-sm text-muted-foreground">
            今後の予定が2件あります。
          </p>
        </TabsContent>
        <TabsContent value="past">
          <p className="text-sm text-muted-foreground">
            過去の予定が5件あります。
          </p>
        </TabsContent>
      </Tabs>
    </div>

    <div>
      <p className="text-ui text-muted-foreground mb-3">disabled タブ</p>
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">有効</TabsTrigger>
          <TabsTrigger value="disabled" disabled>無効</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <p className="text-sm text-muted-foreground">
            このタブは選択できます。隣のタブは無効化されています。
          </p>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</Section>
```

**Step 3: dev サーバーで動作確認**

Run: `pnpm dev`
ブラウザで確認:
- underline variant: タブ切り替えで下線が移動する
- pill variant: タブ切り替えで背景が移動する
- disabled タブがクリックできない
- キーボード（矢印キー）でタブ切り替え可能

**Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(catalog): Tabs セクションをカタログページに追加"
```

---

### Task 4: CLAUDE.md を更新

**Files:**
- Modify: `CLAUDE.md`（プロジェクトルート）

**Step 1: ファイル構成に tabs.tsx を追加**

`ui/` ディレクトリの一覧に `tabs.tsx` を追加（アルファベット順）。

**Step 2: 実装済みコンポーネントに Tabs を追加**

以下を追記:

```
- **Tabs** — Radix UI ベース、複合コンポーネント（Tabs/TabsList/TabsTrigger/TabsContent）、variant: underline/pill（デフォルト underline）、キーボードナビゲーション対応
```

**Step 3: カタログページのセクション順を更新**

セクション一覧に「タブ」を追加。

**Step 4: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md に Tabs コンポーネント情報を追加"
```
