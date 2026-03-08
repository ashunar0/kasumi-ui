# Accordion コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Radix UI ベースの Accordion コンポーネントを実装し、カタログページに追加する

**Architecture:** `@radix-ui/react-accordion` をヘッドレスプリミティブとして使い、4つの複合コンポーネント（Accordion/AccordionItem/AccordionTrigger/AccordionContent）でラップ。開閉アニメーションは `globals.css` にキーフレームを追加して実現。

**Tech Stack:** React 19, Radix UI Accordion, Tailwind CSS 4, lucide-react (ChevronDown)

---

### Task 1: Radix UI パッケージをインストール

**Step 1: パッケージ追加**

Run: `pnpm add @radix-ui/react-accordion`

**Step 2: コミット**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: @radix-ui/react-accordion を追加"
```

---

### Task 2: globals.css にアコーディオンのアニメーションキーフレームを追加

**Files:**
- Modify: `src/app/globals.css`

**Step 1: キーフレームを追加**

`globals.css` の末尾（`body` ルールの後）に以下を追加：

```css
@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
```

また、`@theme inline` ブロック内にアニメーショントークンを追加：

```css
--animate-accordion-down: accordion-down 0.2s ease-out;
--animate-accordion-up: accordion-up 0.2s ease-out;
```

**Step 2: コミット**

```bash
git add src/app/globals.css
git commit -m "feat: accordion 用アニメーションキーフレームを追加"
```

---

### Task 3: Accordion コンポーネントを実装

**Files:**
- Create: `src/components/ui/accordion.tsx`

**Step 1: コンポーネント実装**

既存の Dialog / Tabs コンポーネントのパターンに従い、以下の4つのサブコンポーネントを1ファイルに実装：

```tsx
"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// --- Accordion Root ---
export function Accordion({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root className={cn("w-full", className)} {...props}>
      {children}
    </AccordionPrimitive.Root>
  );
}

// --- Accordion Item ---
export function AccordionItem({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-border", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  );
}

// --- Accordion Trigger ---
export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// --- Accordion Content ---
export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0 text-sm", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
```

**Step 2: コミット**

```bash
git add src/components/ui/accordion.tsx
git commit -m "feat(accordion): Accordion コンポーネントを追加"
```

---

### Task 4: カタログページにアコーディオンセクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import を追加**

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
```

**Step 2: セクションを追加**

タブセクションの後、ツールチップセクションの前に「アコーディオン」セクションを追加。日程調整アプリを想定した日本語テキストで2つのデモを配置：

1. **single モード** — よくある質問（FAQ）形式。`type="single"` `collapsible` で1つだけ開く
2. **multiple モード** — 設定カテゴリ形式。`type="multiple"` で複数同時に開ける

```tsx
{/* Accordion */}
<Section title="アコーディオン">
  <div className="space-y-8">
    <div>
      <p className="text-ui text-muted-foreground mb-3">single（1つだけ開く）</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>日程調整の作成方法は？</AccordionTrigger>
          <AccordionContent>
            「新規作成」ボタンからイベント名と候補日を入力してください。参加者にはリンクを共有するだけで回答してもらえます。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>候補日は何件まで追加できますか？</AccordionTrigger>
          <AccordionContent>
            1つのイベントにつき最大20件の候補日を追加できます。カレンダーから複数選択すると効率的です。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>回答を変更することはできますか？</AccordionTrigger>
          <AccordionContent>
            はい、同じリンクからいつでも回答を変更できます。確定前であれば何度でも更新可能です。
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <div>
      <p className="text-ui text-muted-foreground mb-3">multiple（複数開ける）</p>
      <Accordion type="multiple">
        <AccordionItem value="notifications">
          <AccordionTrigger>通知設定</AccordionTrigger>
          <AccordionContent>
            メール通知やプッシュ通知のオン・オフを切り替えられます。リマインダーの送信タイミングも設定可能です。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="calendar">
          <AccordionTrigger>カレンダー連携</AccordionTrigger>
          <AccordionContent>
            Google カレンダーや Outlook と連携すると、空き時間が自動で反映されます。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy">
          <AccordionTrigger>プライバシー</AccordionTrigger>
          <AccordionContent>
            回答内容の公開範囲を設定できます。「主催者のみ」「参加者全員」から選べます。
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</Section>
```

**Step 3: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(catalog): Accordion セクションをカタログページに追加"
```

---

### Task 5: CLAUDE.md を更新

**Files:**
- Modify: `CLAUDE.md`

**Step 1: 更新内容**

- ファイル構成に `accordion.tsx` を追加
- 実装済みコンポーネント一覧に Accordion を追加（内容：Radix UI ベース、複合コンポーネント（Accordion/AccordionItem/AccordionTrigger/AccordionContent）、type: single/multiple、開閉アニメーション付き）
- カタログページのセクション順にアコーディオンを追加（タブの後、ツールチップの前）

**Step 2: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md に Accordion コンポーネント情報を追加"
```
