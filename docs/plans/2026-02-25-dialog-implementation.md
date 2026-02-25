# Dialog コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Radix UI ベースの Dialog コンポーネントを実装し、カタログページに追加する

**Architecture:** `@radix-ui/react-dialog` をヘッドレスプリミティブとしてラップし、Select と同じパターンで8パーツの複合コンポーネントを構成する。ビジュアルは自前のデザイントークン + Tailwind CSS で制御。

**Tech Stack:** @radix-ui/react-dialog, lucide-react (X icon), Tailwind CSS animate-in/out

---

### Task 1: Radix UI Dialog パッケージをインストール

**Step 1: パッケージ追加**

Run: `pnpm add @radix-ui/react-dialog`

**Step 2: インストール確認**

Run: `pnpm list @radix-ui/react-dialog`
Expected: `@radix-ui/react-dialog` がバージョン付きで表示される

---

### Task 2: Dialog コンポーネントを実装

**Files:**
- Create: `src/components/ui/dialog.tsx`

**Step 1: dialog.tsx を作成**

Select (`src/components/ui/select.tsx`) のラッパーパターンに従い、8パーツを1ファイルに実装する。

```tsx
"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ComponentProps } from "react";

// --- Dialog Root ---
export function Dialog({
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

// --- Dialog Trigger ---
export function DialogTrigger({
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger {...props}>{children}</DialogPrimitive.Trigger>
  );
}

// --- Dialog Content (Portal + Overlay + Content + Close button) ---
export function DialogContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ${className}`}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <X size={16} />
          <span className="sr-only">閉じる</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

// --- Dialog Header (layout div) ---
export function DialogHeader({
  className = "",
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
}

// --- Dialog Title ---
export function DialogTitle({
  className = "",
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={`text-lg font-semibold ${className}`}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  );
}

// --- Dialog Description ---
export function DialogDescription({
  className = "",
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </DialogPrimitive.Description>
  );
}

// --- Dialog Footer (layout div) ---
export function DialogFooter({
  className = "",
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`mt-6 flex justify-end gap-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// --- Dialog Close ---
export function DialogClose({
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close {...props}>{children}</DialogPrimitive.Close>
  );
}
```

**Step 2: TypeScript チェック**

Run: `pnpm exec tsc --noEmit`
Expected: エラーなし

**Step 3: コミット**

```bash
git add src/components/ui/dialog.tsx
git commit -m "feat(dialog): Radix UI ベースの Dialog コンポーネントを実装"
```

---

### Task 3: カタログページに Dialog デモセクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import 追加**

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
```

**Step 2: Dialog セクションを追加**

Card セクションの後（ページ末尾付近）に追加：

```tsx
{/* Dialog */}
<Section title="ダイアログ">
  <div className="flex flex-wrap gap-4">
    {/* 確認ダイアログ */}
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">予定を削除</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>本当に削除しますか？</DialogTitle>
          <DialogDescription>
            この操作は取り消せません。予定に関するデータはすべて削除されます。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">キャンセル</Button>
          </DialogClose>
          <Button variant="destructive">削除する</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* 情報ダイアログ */}
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">詳細を見る</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ミーティングの詳細</DialogTitle>
          <DialogDescription>
            来週の月曜日 10:00〜11:00 に予定されています。
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm">
          参加者：田中さん、佐藤さん、鈴木さん
        </p>
        <p className="text-sm">
          議題：第3四半期のスケジュール調整
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">閉じる</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</Section>
```

**Step 3: TypeScript チェック**

Run: `pnpm exec tsc --noEmit`
Expected: エラーなし

**Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(dialog): カタログページに Dialog デモセクションを追加"
```

---

### Task 4: ブラウザで動作確認

**Step 1: dev サーバー起動**

Run: `pnpm dev`

**Step 2: 目視確認項目**

- [ ] 「予定を削除」ボタンで確認ダイアログが開く
- [ ] オーバーレイが背景をぼかして表示される
- [ ] fade + scale アニメーションが動作する
- [ ] × ボタンで閉じられる
- [ ] 「キャンセル」ボタンで閉じられる
- [ ] オーバーレイクリックで閉じられる
- [ ] Escape キーで閉じられる
- [ ] 「詳細を見る」ボタンで情報ダイアログが開く
- [ ] ダークモードで正しく表示される

### Task 5: CLAUDE.md を更新

**Files:**
- Modify: `CLAUDE.md`（プロジェクトルート）

**Step 1: 実装済みコンポーネント一覧に Dialog を追加**

```
- **Dialog** — Radix UI ベース、複合コンポーネント（Dialog/DialogTrigger/DialogContent/DialogHeader/DialogTitle/DialogDescription/DialogFooter/DialogClose）、Portal・フォーカストラップ・Escape キー対応
```

**Step 2: ファイル構成に dialog.tsx を追加**

**Step 3: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: Dialog コンポーネントを CLAUDE.md に追加"
```
