# ドキュメントサイト実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** my-ui のコンポーネントドキュメントサイトを、自分のコンポーネント（Sidebar, Table 等）で構築する。初回は Introduction + Button + Input の3ページ。

**Architecture:** `(docs)` ルートグループに Sidebar ナビゲーション付きレイアウトを作り、各コンポーネントのページを TSX で記述。コードブロックは shiki でビルド時ハイライト。

**Tech Stack:** Next.js 16 (App Router), shiki, 既存の my-ui コンポーネント

---

### Task 1: shiki をインストール

**Files:**
- Modify: `package.json`

**Step 1: shiki をインストール**

Run: `pnpm add shiki`

**Step 2: コミット**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: shikiを追加"
```

---

### Task 2: CodeBlock コンポーネントを作成

**Files:**
- Create: `src/components/docs/code-block.tsx`

shiki の `codeToHtml` を使ってサーバーコンポーネントとしてコードブロックを作る。コピーボタンも付ける。

**Step 1: コンポーネントを作成**

```tsx
// src/components/docs/code-block.tsx
import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

type CodeBlockProps = {
  code: string;
  lang?: string;
};

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "github-light",
  });

  return (
    <div className="relative">
      <CopyButton code={code.trim()} />
      <div
        className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-sm [&_pre]:!bg-transparent [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
```

**Step 2: CopyButton（クライアントコンポーネント）を作成**

```tsx
// src/components/docs/copy-button.tsx
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="コードをコピー"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}
```

**Step 3: コミット**

```bash
git add src/components/docs/
git commit -m "feat: CodeBlock コンポーネントを追加（shiki + コピーボタン）"
```

---

### Task 3: ComponentPreview コンポーネントを作成

**Files:**
- Create: `src/components/docs/component-preview.tsx`

コンポーネントのプレビュー枠。子要素をそのまま表示する。

**Step 1: コンポーネントを作成**

```tsx
// src/components/docs/component-preview.tsx
import { cn } from "@/lib/utils";

type ComponentPreviewProps = {
  children: React.ReactNode;
  className?: string;
};

export function ComponentPreview({
  children,
  className,
}: ComponentPreviewProps) {
  return (
    <div
      className={cn(
        "flex min-h-[120px] items-center justify-center rounded-lg border border-border p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
```

**Step 2: コミット**

```bash
git add src/components/docs/component-preview.tsx
git commit -m "feat: ComponentPreview コンポーネントを追加"
```

---

### Task 4: PropsTable コンポーネントを作成

**Files:**
- Create: `src/components/docs/props-table.tsx`

自分の Table コンポーネントをラップして、Props 一覧を表示する。

**Step 1: コンポーネントを作成**

```tsx
// src/components/docs/props-table.tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type PropDef = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

type PropsTableProps = {
  props: PropDef[];
};

export function PropsTable({ props }: PropsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((prop) => (
          <TableRow key={prop.name}>
            <TableCell className="font-mono text-sm">{prop.name}</TableCell>
            <TableCell className="font-mono text-sm text-muted-foreground">
              {prop.type}
            </TableCell>
            <TableCell className="font-mono text-sm">
              {prop.default ?? "—"}
            </TableCell>
            <TableCell>{prop.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

**Step 2: コミット**

```bash
git add src/components/docs/props-table.tsx
git commit -m "feat: PropsTable コンポーネントを追加"
```

---

### Task 5: (docs) レイアウトを作成

**Files:**
- Create: `src/app/(docs)/layout.tsx`

`(main)/layout.tsx` をベースに、ドキュメント用のサイドバーナビゲーションを作る。

**Step 1: レイアウトを作成**

```tsx
// src/app/(docs)/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Component } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";

const components = [
  { name: "Button", href: "/docs/components/button" },
  { name: "Input", href: "/docs/components/input" },
];

function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/docs" className="flex items-center gap-2 font-semibold text-sm">
          my-ui
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                icon={BookOpen}
                isActive={pathname === "/docs"}
                asChild
              >
                <Link href="/docs">Introduction</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarMenu>
            {components.map((component) => (
              <SidebarMenuItem key={component.name}>
                <SidebarMenuButton
                  isActive={pathname === component.href}
                  asChild
                >
                  <Link href={component.href}>{component.name}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function DocsHeader() {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-2">
        {isMobile && <SidebarTrigger />}
      </div>
      <ThemeToggle />
    </header>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <DocsSidebar />
        <main className="flex-1 min-w-0">
          <DocsHeader />
          <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
```

**Step 2: コミット**

```bash
git add src/app/\(docs\)/layout.tsx
git commit -m "feat: ドキュメントサイトのレイアウトを追加"
```

---

### Task 6: Introduction ページを作成

**Files:**
- Create: `src/app/(docs)/docs/page.tsx`

**Step 1: ページを作成**

```tsx
// src/app/(docs)/docs/page.tsx
import { CodeBlock } from "@/components/docs/code-block";

export default function IntroductionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-bold tracking-tight">my-ui</h1>
        <p className="mt-2 text-muted-foreground text-body">
          あさひの自分専用デザインシステム＆UIコンポーネントライブラリ。
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-h3 font-semibold tracking-tight">特徴</h2>
        <ul className="list-disc pl-6 space-y-2 text-body">
          <li>日本語に最適化されたタイポグラフィ（Minor Third スケール）</li>
          <li>Tailwind CSS 4 のデザイントークンベース</li>
          <li>ライト／ダークモード対応</li>
          <li>Radix UI でアクセシビリティ担保</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-h3 font-semibold tracking-tight">使い方</h2>
        <p className="text-body">
          コンポーネントのコードをプロジェクトにコピーして使います。
          前提として以下が必要です:
        </p>
        <h3 className="text-h4 font-semibold tracking-tight">
          1. cn() ユーティリティ
        </h3>
        <CodeBlock
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
          lang="ts"
        />
        <h3 className="text-h4 font-semibold tracking-tight">
          2. 依存パッケージ
        </h3>
        <CodeBlock code={`pnpm add clsx tailwind-merge`} lang="bash" />
      </div>
    </div>
  );
}
```

**Step 2: コミット**

```bash
git add src/app/\(docs\)/docs/page.tsx
git commit -m "feat: Introduction ページを追加"
```

---

### Task 7: Button ドキュメントページを作成

**Files:**
- Create: `src/app/(docs)/docs/components/button/page.tsx`

**Step 1: ページを作成**

Button の全バリエーション（variant × size）のプレビュー + コード + Props テーブルを含むページ。

実装内容:
- H1: Button + 一行説明
- 基本の使用例: Primary ボタンのプレビュー + コード
- Variant セクション: primary / secondary / ghost / outline / destructive を並べて表示
- Size セクション: sm / md / lg を並べて表示
- Props テーブル: variant, size, disabled + 標準 button props

**Step 2: コミット**

```bash
git add src/app/\(docs\)/docs/components/button/page.tsx
git commit -m "feat: Button ドキュメントページを追加"
```

---

### Task 8: Input ドキュメントページを作成

**Files:**
- Create: `src/app/(docs)/docs/components/input/page.tsx`

**Step 1: ページを作成**

Input の全バリエーション（variant × size × error × password）のプレビュー + コード + Props テーブルを含むページ。

実装内容:
- H1: Input + 一行説明
- 基本の使用例: outline variant のプレビュー + コード
- Variant セクション: outline / underline
- Size セクション: sm / md / lg
- Error 状態セクション
- Password トグルセクション
- Props テーブル: variant, size, error, type + 標準 input props

**Step 2: コミット**

```bash
git add src/app/\(docs\)/docs/components/input/page.tsx
git commit -m "feat: Input ドキュメントページを追加"
```

---

### Task 9: 動作確認 & 微調整

**Step 1: dev サーバーを起動して確認**

Run: `pnpm dev`

確認項目:
- `/docs` で Introduction ページが表示される
- `/docs/components/button` で Button ページが表示される
- `/docs/components/input` で Input ページが表示される
- サイドバーのナビゲーションが機能する
- コードブロックの shiki ハイライトが効いている
- コピーボタンが動作する
- ダークモードで問題ないか
- モバイル表示でサイドバーがドロワーになるか

**Step 2: 問題があれば修正してコミット**

```bash
git add -A
git commit -m "fix: ドキュメントサイトの微調整"
```

---

### Task 10: CLAUDE.md を更新

**Files:**
- Modify: `/Users/a.kawanobe/dev/ui/my-ui/CLAUDE.md`

ファイル構成セクションに `(docs)` ルートグループと `src/components/docs/` を追記。

**Step 1: CLAUDE.md を更新**

`(docs)` のルーティングと docs 用コンポーネント（CodeBlock, CopyButton, ComponentPreview, PropsTable）の説明を追記。

**Step 2: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md にドキュメントサイトの情報を追記"
```
