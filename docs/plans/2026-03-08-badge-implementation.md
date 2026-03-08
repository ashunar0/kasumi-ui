# Badge コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** インラインのラベルコンポーネント Badge を実装し、カタログページに追加する

**Architecture:** CSS only のシンプルなコンポーネント。variant（default/outline）× size（sm/md）。色変更は className で外から行う。既存の Button コンポーネントと同じパターンに従う。

**Tech Stack:** React, TypeScript, Tailwind CSS 4

---

### Task 1: Badge コンポーネントを作成

**Files:**
- Create: `src/components/ui/badge.tsx`

**Step 1: コンポーネントを実装**

```tsx
import { type ComponentProps } from "react";

type BadgeVariant = "default" | "outline";
type BadgeSize = "sm" | "md";

type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary text-primary-foreground",
  outline: "border border-border text-foreground",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5 rounded-md",
  md: "text-sm px-2.5 py-0.5 rounded-md",
};

export function Badge({
  variant = "default",
  size = "sm",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
```

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: PASS

**Step 3: コミット**

```bash
git add src/components/ui/badge.tsx
git commit -m "feat(badge): Badge コンポーネントを追加"
```

---

### Task 2: カタログページに Badge セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import を追加**

`page.tsx` の import セクションに追加:
```tsx
import { Badge } from "@/components/ui/badge";
```

**Step 2: Badge セクションを追加**

ボタンセクションの後（Input セクションの前）に Badge セクションを挿入:

```tsx
{/* Badge */}
<Section title="バッジ">
  <div className="space-y-4">
    <div>
      <p className="text-ui text-muted-foreground mb-2">default</p>
      <div className="flex flex-wrap items-center gap-2">
        <Badge size="sm">承認済み</Badge>
        <Badge size="md">承認済み</Badge>
      </div>
    </div>
    <div>
      <p className="text-ui text-muted-foreground mb-2">outline</p>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" size="sm">下書き</Badge>
        <Badge variant="outline" size="md">下書き</Badge>
      </div>
    </div>
    <div>
      <p className="text-ui text-muted-foreground mb-2">カスタムカラー</p>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">対応中</Badge>
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">完了</Badge>
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">未対応</Badge>
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">保留</Badge>
      </div>
    </div>
    <div>
      <p className="text-ui text-muted-foreground mb-2">ピル型</p>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-full">v1.0</Badge>
        <Badge variant="outline" className="rounded-full">beta</Badge>
      </div>
    </div>
  </div>
</Section>
```

**Step 3: ビルド確認**

Run: `pnpm build`
Expected: PASS

**Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(catalog): Badge セクションをカタログページに追加"
```

---

### Task 3: CLAUDE.md を更新

**Files:**
- Modify: `CLAUDE.md`

**Step 1: ファイル構成に badge.tsx を追加**

**Step 2: 実装済みコンポーネントに Badge を追加**

```
- **Badge** — variant: default/outline、size: sm/md、色変更は className で外から指定
```

**Step 3: カタログページのセクション一覧を更新**

Badge を追加。

**Step 4: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md に Badge コンポーネント情報を追加"
```
