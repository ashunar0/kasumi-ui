# サイトナビゲーション整理 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** kasumi-ui サイトにグローバルナビ（Docs / Components / Blocks）を追加し、サイドバーをグループ分けし、Blocks ページの骨格を用意する

**Architecture:** 既存の SiteHeader にナビリンクを追加し、(docs)/layout.tsx のサイドバーをグループ構成に変更する。新規ファイルは Blocks ページ1つのみ。/demo は削除。

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, lucide-react

**Spec:** `docs/superpowers/specs/2026-03-11-navigation-restructure-design.md`

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/components/site-header.tsx` | グローバルナビリンク追加、ロゴリンク先変更 |
| Modify | `src/app/(docs)/layout.tsx` | サイドバーのグループ分け（Getting Started / Components / Blocks） |
| Create | `src/app/(docs)/docs/blocks/page.tsx` | Blocks 一覧ページ（Coming Soon プレースホルダー） |
| Delete | `src/app/demo/page.tsx` | 不要ページの削除 |

---

## Chunk 1: Navigation Restructure

### Task 1: SiteHeader にナビリンクを追加

**Files:**
- Modify: `src/components/site-header.tsx`

- [ ] **Step 1: ロゴリンク先を `/` に変更し、ナビリンクを追加**

`src/components/site-header.tsx` を以下に置き換える:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "Docs", href: "/docs", exact: true },
  { name: "Components", href: "/docs/components", exact: false },
  { name: "Blocks", href: "/docs/blocks", exact: false },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-semibold text-md flex items-center gap-2"
          >
            <Image src="/kasumi.svg" alt="kasumi/ui" width={32} height={32} />
            kasumi/ui
          </Link>
          <nav className="hidden sm:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors hover:text-foreground",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground",
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ashunar0/kasumi-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: 動作確認**

Run: `pnpm dev`

確認項目:
- ロゴクリックで `/` (LP) に遷移する
- Docs / Components / Blocks リンクが表示される
- `/docs` では「Docs」がアクティブ
- `/docs/components/button` では「Components」がアクティブ
- sm未満の画面幅ではナビリンクが非表示になる

- [ ] **Step 3: コミット**

```bash
git add src/components/site-header.tsx
git commit -m "feat: SiteHeader にグローバルナビリンクを追加"
```

---

### Task 2: サイドバーのグループ分け

**Files:**
- Modify: `src/app/(docs)/layout.tsx`

- [ ] **Step 1: サイドバーのデータ構造とレンダリングを変更**

`src/app/(docs)/layout.tsx` の `navItems`, `components` 配列と `DocsNav` コンポーネントを以下に置き換える（レイアウト部分 `DocsLayout` はそのまま）:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TableOfContents } from "@/components/docs/toc";

type NavGroup = {
  label: string;
  items: { name: string; href: string }[];
};

const sidebarGroups: NavGroup[] = [
  {
    label: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs" },
    ],
  },
  {
    label: "Components",
    items: [
      { name: "Overview", href: "/docs/components" },
      { name: "Accordion", href: "/docs/components/accordion" },
      { name: "Alert", href: "/docs/components/alert" },
      { name: "Avatar", href: "/docs/components/avatar" },
      { name: "Badge", href: "/docs/components/badge" },
      { name: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { name: "Button", href: "/docs/components/button" },
      { name: "Card", href: "/docs/components/card" },
      { name: "Checkbox", href: "/docs/components/checkbox" },
      { name: "Dialog", href: "/docs/components/dialog" },
      { name: "DropdownMenu", href: "/docs/components/dropdown-menu" },
      { name: "Field", href: "/docs/components/field" },
      { name: "Input", href: "/docs/components/input" },
      { name: "Label", href: "/docs/components/label" },
      { name: "Pagination", href: "/docs/components/pagination" },
      { name: "Popover", href: "/docs/components/popover" },
      { name: "Progress", href: "/docs/components/progress" },
      { name: "Radio", href: "/docs/components/radio" },
      { name: "Select", href: "/docs/components/select" },
      { name: "Separator", href: "/docs/components/separator" },
      { name: "Skeleton", href: "/docs/components/skeleton" },
      { name: "Switch", href: "/docs/components/switch" },
      { name: "Table", href: "/docs/components/table" },
      { name: "Tabs", href: "/docs/components/tabs" },
      { name: "Textarea", href: "/docs/components/textarea" },
      { name: "Toast", href: "/docs/components/toast" },
      { name: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  {
    label: "Blocks",
    items: [
      { name: "Overview", href: "/docs/blocks" },
    ],
  },
];

function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {sidebarGroups.map((group) => (
        <div key={group.label} className="space-y-1">
          <p className="text-xs text-muted-foreground mb-2">{group.label}</p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block text-sm py-1 transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
```

`DocsLayout` はそのまま変更なし。

- [ ] **Step 2: 動作確認**

Run: `pnpm dev`

確認項目:
- サイドバーに「Getting Started」「Components」「Blocks」の3グループが表示される
- 各グループにラベルが表示される
- Introduction が「Getting Started」グループに入っている
- 「Blocks > Overview」クリックで `/docs/blocks` に遷移する（404になるのは次タスクで解消）

- [ ] **Step 3: コミット**

```bash
git add src/app/(docs)/layout.tsx
git commit -m "refactor: サイドバーをグループ構成に変更"
```

---

### Task 3: Blocks ページ新設

**Files:**
- Create: `src/app/(docs)/docs/blocks/page.tsx`

- [ ] **Step 1: Blocks 一覧ページを作成**

`src/app/(docs)/docs/blocks/page.tsx` を作成:

```tsx
export default function BlocksPage() {
  return (
    <div>
      <h1 className="text-h1 font-bold tracking-tight">Blocks</h1>
      <p className="text-ui text-muted-foreground mt-2">
        コンポーネントを組み合わせた実用的なページテンプレート集です。
      </p>

      <div className="mt-10 rounded-lg border border-border p-8 text-center">
        <p className="text-body text-muted-foreground">
          Coming Soon — ログイン、ダッシュボード等のページテンプレートを追加予定です。
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 動作確認**

Run: `pnpm dev`

確認項目:
- `/docs/blocks` にアクセスして Coming Soon ページが表示される
- サイドバーの「Blocks > Overview」からの遷移が正しく動く
- グローバルナビの「Blocks」からの遷移が正しく動く
- 「Blocks」リンクがアクティブ状態になる

- [ ] **Step 3: コミット**

```bash
git add src/app/(docs)/docs/blocks/page.tsx
git commit -m "feat: Blocks 一覧ページを追加（Coming Soon）"
```

---

### Task 4: /demo ページ削除

**Files:**
- Delete: `src/app/demo/page.tsx`

- [ ] **Step 1: demo ディレクトリを削除**

```bash
rm -rf src/app/demo
```

- [ ] **Step 2: demo への参照がないか確認**

プロジェクト内で `/demo` へのリンクを検索する。もし見つかったら削除またはリダイレクト先を変更する。

```bash
grep -r "/demo" src/ --include="*.tsx" --include="*.ts"
```

- [ ] **Step 3: 動作確認**

Run: `pnpm build`

ビルドが成功することを確認する。

- [ ] **Step 4: コミット**

```bash
git add -A
git commit -m "chore: 不要な /demo ページを削除"
```

---

### Task 5: 最終確認

- [ ] **Step 1: 全体の動作確認**

Run: `pnpm build && pnpm dev`

確認項目:
- LP (`/`) が正常に表示される
- グローバルナビの3リンクが全て正しく遷移する
- サイドバーの3グループが正しく表示・遷移する
- `/docs/blocks` が Coming Soon で表示される
- `/demo` が 404 になる
- ダークモードで表示が崩れないか
- ビルドエラーがないか
