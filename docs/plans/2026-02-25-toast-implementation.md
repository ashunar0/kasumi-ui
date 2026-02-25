# Toast コンポーネント実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Radix UI ベースの Toast コンポーネントを実装し、命令型 API（`useToast`）で呼び出せるようにする

**Architecture:** Radix UI `@radix-ui/react-toast` をヘッドレスとして使い、state 管理は `createContext` + `useReducer` で自前実装。`ToastProvider` をアプリルートに配置し、`useToast` フックで `toast()` 関数を取得する

**Tech Stack:** Radix UI, React 19, Tailwind CSS 4, tw-animate-css, lucide-react

---

### Task 1: Radix UI Toast パッケージをインストール

**Step 1: パッケージインストール**

```bash
pnpm add @radix-ui/react-toast
```

**Step 2: コミット**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: @radix-ui/react-toast を追加"
```

---

### Task 2: Toast コンポーネントを実装

**Files:**
- Create: `src/components/ui/toast.tsx`

**Step 1: Toast コンポーネントファイルを作成**

以下の構成で `src/components/ui/toast.tsx` を作成する:

```tsx
"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import {
  type ComponentProps,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

// --- Types ---

type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

type ToastVariant = "default" | "destructive";

type ToastData = {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastInput = Omit<ToastData, "id">;

// --- State Management ---

type State = { toasts: ToastData[] };
type Action =
  | { type: "ADD"; toast: ToastData }
  | { type: "REMOVE"; id: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return { toasts: [...state.toasts, action.toast] };
    case "REMOVE":
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
  }
}

let idCounter = 0;

// --- Context ---

const ToastContext = createContext<{
  toast: (input: ToastInput) => void;
} | null>(null);

// --- Position → Tailwind class mapping ---

const viewportPositionClasses: Record<Position, string> = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0",
};

// position に応じたスライドイン/アウト方向
const slideAnimationClasses: Record<Position, string> = {
  "top-left":
    "data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-left-full",
  "top-center":
    "data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-top-full",
  "top-right":
    "data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full",
  "bottom-left":
    "data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-left-full",
  "bottom-center":
    "data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full",
  "bottom-right":
    "data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
};

// --- Position Context (内部用) ---

const PositionContext = createContext<Position>("bottom-right");

// --- ToastProvider ---

export function ToastProvider({
  children,
  position = "bottom-right",
  duration = 5000,
}: {
  children: ReactNode;
  position?: Position;
  duration?: number;
}) {
  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  const toast = useCallback(
    (input: ToastInput) => {
      const id = String(++idCounter);
      dispatch({ type: "ADD", toast: { ...input, id } });
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      <PositionContext.Provider value={position}>
        <ToastPrimitive.Provider duration={duration} label="通知">
          {children}
          {state.toasts.map((t) => (
            <ToastItem
              key={t.id}
              data={t}
              onClose={() => dispatch({ type: "REMOVE", id: t.id })}
            />
          ))}
          <ToastPrimitive.Viewport
            className={`fixed z-[100] flex flex-col gap-2 p-4 w-full max-w-sm ${viewportPositionClasses[position]}`}
          />
        </ToastPrimitive.Provider>
      </PositionContext.Provider>
    </ToastContext.Provider>
  );
}

// --- ToastItem (内部コンポーネント) ---

const variantClasses: Record<ToastVariant, string> = {
  default: "bg-background border-border text-foreground",
  destructive: "bg-destructive border-destructive text-destructive-foreground",
};

function ToastItem({
  data,
  onClose,
}: {
  data: ToastData;
  onClose: () => void;
}) {
  const position = useContext(PositionContext);
  const variant = data.variant ?? "default";

  return (
    <ToastPrimitive.Root
      duration={data.duration}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className={`rounded-xl border shadow-lg p-4 pr-10 relative data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 ${slideAnimationClasses[position]} duration-200 ${variantClasses[variant]}`}
    >
      <ToastPrimitive.Title className="text-sm font-semibold">
        {data.title}
      </ToastPrimitive.Title>
      {data.description && (
        <ToastPrimitive.Description className="mt-1 text-sm opacity-80">
          {data.description}
        </ToastPrimitive.Description>
      )}
      <ToastPrimitive.Close className="absolute right-3 top-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <X size={14} />
        <span className="sr-only">閉じる</span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}

// --- useToast ---

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast は ToastProvider の中で使う必要があります");
  }
  return context;
}
```

**Step 2: コミット**

```bash
git add src/components/ui/toast.tsx
git commit -m "feat(toast): Radix UI ベースの Toast コンポーネントを実装"
```

---

### Task 3: layout.tsx に ToastProvider を配置

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: ToastProvider を追加**

`layout.tsx` の `ThemeProvider` の内側に `ToastProvider` をラップする:

```tsx
import { ToastProvider } from "@/components/ui/toast";

// ...

<ThemeProvider>
  <ToastProvider>{children}</ToastProvider>
</ThemeProvider>
```

**Step 2: コミット**

```bash
git add src/app/layout.tsx
git commit -m "feat(toast): layout.tsx に ToastProvider を配置"
```

---

### Task 4: カタログページに Toast デモセクションを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Toast デモセクションを追加**

Dialog セクションの下に Toast セクションを追加する。ボタンをクリックすると各種 Toast が表示されるデモ:

```tsx
import { useToast } from "@/components/ui/toast";

// Home コンポーネント内:
function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="primary"
        onClick={() =>
          toast({ title: "保存しました", description: "予定を保存しました。" })
        }
      >
        成功 Toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: "エラーが発生しました",
            description: "保存に失敗しました。もう一度お試しください。",
            variant: "destructive",
          })
        }
      >
        エラー Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast({ title: "リンクをコピーしました" })}
      >
        タイトルのみ
      </Button>
    </div>
  );
}
```

カタログページの Dialog セクションの後に配置:

```tsx
{/* Toast */}
<Section title="トースト">
  <ToastDemo />
</Section>
```

**Step 2: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(toast): カタログページに Toast デモセクションを追加"
```

---

### Task 5: 動作確認と CLAUDE.md 更新

**Step 1: dev サーバーで動作確認**

```bash
pnpm dev
```

ブラウザでカタログページを開き、以下を確認:
- 「成功 Toast」ボタン → 右下に通常スタイルの Toast が出る
- 「エラー Toast」ボタン → 赤いスタイルの Toast が出る
- 「タイトルのみ」ボタン → description なしの Toast が出る
- 5秒後に自動で消える
- X ボタンで閉じられる
- 複数同時に表示できる
- アニメーションがスムーズ

**Step 2: CLAUDE.md を更新**

実装済みコンポーネントリストに Toast を追加:

```markdown
- **Toast** — Radix UI ベース、命令型 API（useToast フック）、variant: default/destructive、位置設定可能（ToastProvider の position prop）、複数スタック対応
```

ファイル構成に追加:

```markdown
        ├── toast.tsx
```

設計判断メモ「自作 vs ライブラリの使い分け」の Radix UI 側のリストに Toast を追加。

**Step 3: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: Toast コンポーネントを CLAUDE.md に追加"
```
