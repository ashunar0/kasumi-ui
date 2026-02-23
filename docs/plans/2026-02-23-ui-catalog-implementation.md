# my-ui UIカタログ Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tailwind CSS 4ベースのオリジナルUIコンポーネント（Button, Input, Label, Card）を作り、1ページのカタログで一覧表示する。

**Architecture:** `src/components/ui/` にコンポーネントを配置し、`globals.css` でデザイントークンをCSS変数として定義。`page.tsx` をカタログページとしてセクション区切り型で全コンポーネントを表示する。

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript strict

---

### Task 1: デザイントークンの設定

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: globals.css にデザイントークンを追加**

`src/app/globals.css` を以下に置き換える。Tailwind CSS 4の `@theme inline` でCSS変数をTailwindユーティリティとして使えるようにする。

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #18181b;
  --primary-foreground: #fafafa;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --accent: #f4f4f5;
  --accent-foreground: #18181b;
  --destructive: #ef4444;
  --destructive-foreground: #fafafa;
  --border: #e4e4e7;
  --input: #e4e4e7;
  --ring: #18181b;
  --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #09090b;
    --foreground: #fafafa;
    --primary: #fafafa;
    --primary-foreground: #18181b;
    --secondary: #27272a;
    --secondary-foreground: #fafafa;
    --muted: #27272a;
    --muted-foreground: #a1a1aa;
    --accent: #27272a;
    --accent-foreground: #fafafa;
    --destructive: #dc2626;
    --destructive-foreground: #fafafa;
    --border: #27272a;
    --input: #27272a;
    --ring: #d4d4d8;
    --radius: 0.5rem;
  }
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

**Step 2: layout.tsx を更新**

`lang="en"` を `lang="ja"` に変更。metadata のtitle/descriptionも更新。

```tsx
export const metadata: Metadata = {
  title: "my-ui",
  description: "あさひのUIライブラリ",
};
```

```tsx
<html lang="ja">
```

**Step 3: コミット**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: デザイントークンをCSS変数で定義"
```

---

### Task 2: Button コンポーネント

**Files:**
- Create: `src/components/ui/button.tsx`

**Step 1: Button コンポーネントを作成**

`src/components/ui/button.tsx` を作成。variant（primary/secondary/ghost/outline/destructive）とsize（sm/md/lg）をpropsで受け取る。

```tsx
import { type ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Step 2: コミット**

```bash
git add src/components/ui/button.tsx
git commit -m "feat: Button コンポーネントを追加"
```

---

### Task 3: Label コンポーネント

**Files:**
- Create: `src/components/ui/label.tsx`

**Step 1: Label コンポーネントを作成**

```tsx
import { type ComponentProps } from "react";

type LabelProps = ComponentProps<"label">;

export function Label({ className = "", ...props }: LabelProps) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  );
}
```

**Step 2: コミット**

```bash
git add src/components/ui/label.tsx
git commit -m "feat: Label コンポーネントを追加"
```

---

### Task 4: Input コンポーネント

**Files:**
- Create: `src/components/ui/input.tsx`

**Step 1: Input コンポーネントを作成**

```tsx
import { type ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  error?: boolean;
};

export function Input({ error, className = "", ...props }: InputProps) {
  return (
    <input
      className={`flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        error
          ? "border-destructive focus-visible:ring-destructive"
          : "border-input"
      } ${className}`}
      {...props}
    />
  );
}
```

**Step 2: コミット**

```bash
git add src/components/ui/input.tsx
git commit -m "feat: Input コンポーネントを追加"
```

---

### Task 5: Card コンポーネント

**Files:**
- Create: `src/components/ui/card.tsx`

**Step 1: Card コンポーネントを作成**

Card, CardHeader, CardTitle, CardContent, CardFooter を1ファイルにまとめる。

```tsx
import { type ComponentProps } from "react";

type DivProps = ComponentProps<"div">;

export function Card({ className = "", ...props }: DivProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-background shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={`flex flex-col gap-1.5 p-6 ${className}`} {...props} />;
}

export function CardTitle({
  className = "",
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={`px-6 pb-6 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: DivProps) {
  return (
    <div
      className={`flex items-center px-6 pb-6 ${className}`}
      {...props}
    />
  );
}
```

**Step 2: コミット**

```bash
git add src/components/ui/card.tsx
git commit -m "feat: Card コンポーネントを追加"
```

---

### Task 6: カタログページを構築

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: page.tsx をカタログページに置き換える**

テンプレートの内容を削除し、各コンポーネントをセクションごとに表示するカタログに置き換える。

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="border-t border-border pt-4">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">my-ui</h1>
        <p className="mt-2 text-muted-foreground">あさひのUIライブラリ</p>
      </header>

      {/* Button */}
      <Section title="Button">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </Section>

      {/* Input */}
      <Section title="Input">
        <div className="space-y-4 max-w-sm">
          <Input placeholder="Default input" />
          <Input placeholder="Error state" error />
          <Input placeholder="Disabled" disabled />
        </div>
      </Section>

      {/* Label */}
      <Section title="Label">
        <div className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="demo-email">メールアドレス</Label>
            <Input id="demo-email" type="email" placeholder="you@example.com" />
          </div>
        </div>
      </Section>

      {/* Card */}
      <Section title="Card">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>基本カード</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">シンプルなカードコンポーネント。</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>フッター付き</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">アクション付きのカード。</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">アクション</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>
    </div>
  );
}
```

**Step 2: dev サーバーで確認**

```bash
pnpm dev
```

ブラウザで `http://localhost:3000` を開き、全コンポーネントが正しく表示されることを確認。

**Step 3: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: UIカタログページを構築"
```

---

### Task 7: ビルド確認

**Step 1: ビルドが通ることを確認**

```bash
pnpm build
```

エラーがなければ完了。

**Step 2: lint確認**

```bash
pnpm lint
```

**Step 3: 問題があれば修正してコミット**
