# Toast コンポーネント設計

## 概要

操作フィードバック（成功・エラー）を一時的に通知する Toast コンポーネント。
Radix UI `@radix-ui/react-toast` をベースに、命令型 API（`useToast` フック）で呼び出す。

## ユースケース

- 「保存しました」「コピーしました」等の成功通知
- 「保存に失敗しました」「ネットワークエラー」等のエラー通知
- アクションボタンは不要（YAGNI）

## ファイル構成

```
src/components/ui/toast.tsx — UI コンポーネント群 + state 管理 + useToast フック
```

## API

### ToastProvider

アプリルート（`layout.tsx`）に配置する。

| prop | 型 | デフォルト | 説明 |
|------|----|-----------|------|
| `position` | `Position` | `"bottom-right"` | 表示位置 |
| `duration` | `number` | `5000` | 自動で閉じるまでのミリ秒 |
| `children` | `ReactNode` | — | アプリ本体 |

Position: `"top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"`

### useToast

```tsx
const { toast } = useToast();
toast({ title: "保存しました" });
toast({ title: "エラー", description: "保存に失敗しました", variant: "destructive" });
```

| prop | 型 | 必須 | 説明 |
|------|----|------|------|
| `title` | `string` | yes | タイトル |
| `description` | `string` | no | 補足説明 |
| `variant` | `"default" \| "destructive"` | no | 見た目（デフォルト: `"default"`） |
| `duration` | `number` | no | 個別に上書き可能 |

## state 管理

- `React.createContext` + `useReducer` で Toast リストを管理
- `toast()` → state に追加 → Radix `Toast.Root` がレンダー
- 閉じたら state から削除
- 外部ライブラリ不要

## バリアント

- **default** — `bg-background border-border`（通常の通知）
- **destructive** — `bg-destructive text-destructive-foreground`（エラー）

## 見た目

- `rounded-xl border shadow-lg p-4 max-w-sm` — Card/Dialog と統一感
- 閉じるボタン（X）右上配置（Dialog と同じパターン）

## アニメーション

- tw-animate-css の `animate-in` / `animate-out`（Dialog と同じ）
- スライドイン方向は position に応じて変える
- `duration-200`

## Viewport 位置

| position | クラス |
|----------|--------|
| top-left | `top-0 left-0` |
| top-center | `top-0 left-1/2 -translate-x-1/2` |
| top-right | `top-0 right-0` |
| bottom-left | `bottom-0 left-0` |
| bottom-center | `bottom-0 left-1/2 -translate-x-1/2` |
| bottom-right | `bottom-0 right-0` |

## スタック

- `flex flex-col gap-2` で縦並び
- 新しい Toast は末尾に追加

## 設計判断

- **Radix UI を使う理由** — アクセシビリティ（`role="status"`, `aria-live`）、スワイプ、フォーカス管理が自動。振る舞いが複雑なコンポーネントは Radix UI を使うルールに合致
- **命令型 API** — `toast()` 1行で呼べる DX。宣言的に `<Toast>` を置くのは使いづらい
- **アクションボタンなし** — 日程調整アプリで具体的に必要になってから追加（YAGNI）
- **1ファイル構成** — Provider + UI + フックが密結合なので分ける意味がない
