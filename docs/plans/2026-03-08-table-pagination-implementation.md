# Table & Pagination Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** データ表示用の Table とページ送り用の Pagination コンポーネントを実装し、カタログページに追加する

**Architecture:** shadcn/ui と同じ複合コンポーネントパターン。HTML要素を薄くラップしたスタイリングコンポーネント。Radix UI 不要（CSS + HTML で完結）

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, lucide-react

---

### Task 1: Table コンポーネント実装

**Files:**
- Create: `src/components/ui/table.tsx`

**Step 1: Table コンポーネントを作成**

```tsx
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// --- Table ---
export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

// --- TableHeader ---
export function TableHeader({
  className,
  ...props
}: ComponentProps<"thead">) {
  return (
    <thead className={cn("[&_tr]:border-b", className)} {...props} />
  );
}

// --- TableBody ---
export function TableBody({
  className,
  ...props
}: ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

// --- TableFooter ---
export function TableFooter({
  className,
  ...props
}: ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr:last-child]:border-b-0",
        className
      )}
      {...props}
    />
  );
}

// --- TableRow ---
export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  );
}

// --- TableHead ---
export function TableHead({
  className,
  ...props
}: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-10 px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

// --- TableCell ---
export function TableCell({
  className,
  ...props
}: ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "p-3 align-middle [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

// --- TableCaption ---
export function TableCaption({
  className,
  ...props
}: ComponentProps<"caption">) {
  return (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
```

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git add src/components/ui/table.tsx
git commit -m "feat(table): Table コンポーネントを追加"
```

---

### Task 2: Pagination コンポーネント実装

**Files:**
- Create: `src/components/ui/pagination.tsx`

**Step 1: Pagination コンポーネントを作成**

```tsx
import { type ComponentProps } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Pagination ---
export function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="ページネーション"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

// --- PaginationContent ---
export function PaginationContent({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

// --- PaginationItem ---
export function PaginationItem({
  className,
  ...props
}: ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />;
}

// --- PaginationLink ---
type PaginationLinkProps = ComponentProps<"button"> & {
  isActive?: boolean;
};

export function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive && "border border-border bg-background",
        className
      )}
      {...props}
    />
  );
}

// --- PaginationPrevious ---
export function PaginationPrevious({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="前のページへ"
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>前へ</span>
    </PaginationLink>
  );
}

// --- PaginationNext ---
export function PaginationNext({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="次のページへ"
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <span>次へ</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

// --- PaginationEllipsis ---
export function PaginationEllipsis({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-9 w-9 items-center justify-center",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">その他のページ</span>
    </span>
  );
}
```

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git add src/components/ui/pagination.tsx
git commit -m "feat(pagination): Pagination コンポーネントを追加"
```

---

### Task 3: カタログページに Table セクション追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import 追加**

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
```

**Step 2: Table セクション追加**

カタログページのポップオーバーセクションの後（ツールチップの前）に配置。日程調整アプリを想定したサンプルデータで表示する。

```tsx
{/* テーブル */}
<section>
  <h2 className="text-h2 font-semibold tracking-tight">テーブル</h2>
  <p className="mt-2 text-body text-muted-foreground">
    データを行と列で整理して表示します。
  </p>
  <div className="mt-6">
    <Table>
      <TableCaption>2026年3月の予定一覧</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">日付</TableHead>
          <TableHead>タイトル</TableHead>
          <TableHead>参加者</TableHead>
          <TableHead className="text-right">ステータス</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">3/5</TableCell>
          <TableCell>デザインレビュー</TableCell>
          <TableCell>3人</TableCell>
          <TableCell className="text-right">確定</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">3/8</TableCell>
          <TableCell>スプリント振り返り</TableCell>
          <TableCell>5人</TableCell>
          <TableCell className="text-right">確定</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">3/12</TableCell>
          <TableCell>1on1 ミーティング</TableCell>
          <TableCell>2人</TableCell>
          <TableCell className="text-right">調整中</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">3/15</TableCell>
          <TableCell>チーム合宿</TableCell>
          <TableCell>8人</TableCell>
          <TableCell className="text-right">調整中</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">3/20</TableCell>
          <TableCell>プロダクトリリース</TableCell>
          <TableCell>4人</TableCell>
          <TableCell className="text-right">未定</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>合計</TableCell>
          <TableCell className="text-right">5件</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
</section>
```

**Step 3: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(catalog): Table セクションをカタログページに追加"
```

---

### Task 4: カタログページに Pagination セクション追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import 追加**

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
```

**Step 2: Pagination セクション追加**

Table セクションの直後に配置。

```tsx
{/* ページネーション */}
<section>
  <h2 className="text-h2 font-semibold tracking-tight">ページネーション</h2>
  <p className="mt-2 text-body text-muted-foreground">
    コンテンツを複数ページに分けてナビゲーションを提供します。
  </p>
  <div className="mt-6 space-y-8">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
</section>
```

**Step 3: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(catalog): Pagination セクションをカタログページに追加"
```

---

### Task 5: CLAUDE.md ドキュメント更新

**Files:**
- Modify: `CLAUDE.md`

**Step 1: ファイル構成に table.tsx と pagination.tsx を追加**

**Step 2: カタログページのセクション順序を更新**

テーブル → ページネーション をポップオーバーの後に追加。

**Step 3: 実装済みコンポーネントに Table と Pagination の説明を追加**

- **Table** — 自作、複合コンポーネント（Table/TableHeader/TableBody/TableFooter/TableRow/TableHead/TableCell/TableCaption）、横スクロール対応、hover スタイル付き
- **Pagination** — 自作、複合コンポーネント（Pagination/PaginationContent/PaginationItem/PaginationLink/PaginationPrevious/PaginationNext/PaginationEllipsis）、ページ番号型、isActive で現在ページ表示

**Step 4: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: Table & Pagination コンポーネントのドキュメントを追加"
```
