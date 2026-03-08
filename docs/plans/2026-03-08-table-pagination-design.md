# Table & Pagination 設計

## 概要

データ表示用の Table コンポーネントと、ページ送り用の Pagination コンポーネントを追加する。
shadcn/ui と同じ複合コンポーネントパターンで、HTML要素をラップしたスタイリング用コンポーネントとして実装する。

## Table

### 方針

- `<table>` 系のHTML要素を薄くラップしたスタイリングコンポーネント
- ソートやフィルタのロジックは持たない（後から `TableHead` に `onClick` + アイコンで拡張しやすい構造）
- shadcn/ui の Table と同じ API

### コンポーネント一覧

| コンポーネント | ラップする要素 | 役割 |
|---|---|---|
| `Table` | `<table>` | ルート。`<div>` でラップして横スクロール対応 |
| `TableHeader` | `<thead>` | ヘッダーグループ |
| `TableBody` | `<tbody>` | ボディグループ |
| `TableFooter` | `<tfoot>` | フッターグループ。集計行などに使用 |
| `TableRow` | `<tr>` | 行。hover/selected スタイル付き |
| `TableHead` | `<th>` | ヘッダーセル。text-left, font-medium, text-muted-foreground |
| `TableCell` | `<td>` | データセル |
| `TableCaption` | `<caption>` | テーブルのキャプション（アクセシビリティ用） |

### スタイリング

- `Table`: `w-full caption-bottom text-sm`、`<div className="relative w-full overflow-auto">` でラップ
- `TableHeader`: `[&_tr]:border-b`
- `TableBody`: `[&_tr:last-child]:border-0`
- `TableFooter`: `border-t bg-muted/50 font-medium [&>tr:last-child]:border-b-0`
- `TableRow`: `border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted`
- `TableHead`: `h-10 px-3 text-left align-middle font-medium text-muted-foreground`
- `TableCell`: `p-3 align-middle`
- `TableCaption`: `mt-4 text-sm text-muted-foreground`

### ソート拡張の想定

`TableHead` は `<th>` をラップしているだけなので、将来的に以下のように拡張できる：
- `onClick` でソートハンドラを受け取る
- `ArrowUpDown` / `ArrowUp` / `ArrowDown` アイコンを表示
- ソートロジックはカスタムフック (`useSortedData` 等) として外部に切り出す

今回は構造のみ用意し、ソート機能は実装しない。

## Pagination

### 方針

- ページ番号型（`< 1 2 3 ... 10 >`）
- Headless — ページ計算ロジックは持たない
- shadcn/ui の Pagination と同じ API
- `<button>` ベース（ルーティング統合時は呼び出し側で `<a>` や `<Link>` に差し替え可能）

### コンポーネント一覧

| コンポーネント | 役割 |
|---|---|
| `Pagination` | `<nav>` ルート。`aria-label="pagination"` 付き |
| `PaginationContent` | `<ul>` リスト。flex レイアウト |
| `PaginationItem` | `<li>` 各アイテム |
| `PaginationPrevious` | 前へボタン。`ChevronLeft` アイコン + テキスト |
| `PaginationNext` | 次へボタン。テキスト + `ChevronRight` アイコン |
| `PaginationLink` | ページ番号ボタン。`isActive` prop で現在ページ表示 |
| `PaginationEllipsis` | `...` 省略表示。`MoreHorizontal` アイコン + sr-only テキスト |

### Props

**PaginationLink:**
- `isActive?: boolean` — 現在のページかどうか
- `size?: "default" | "icon"` — ボタンサイズ（デフォルト `"icon"`）
- `ComponentProps<"button">` を拡張

**PaginationPrevious / PaginationNext:**
- `PaginationLink` を内部で使用
- テキストは日本語（「前へ」「次へ」）

### スタイリング

- `Pagination`: `mx-auto flex w-full justify-center`
- `PaginationContent`: `flex flex-row items-center gap-1`
- `PaginationLink`: Button の ghost variant 相当のスタイル。`isActive` 時は `outline` variant 相当
- `PaginationPrevious` / `PaginationNext`: `gap-1 px-2.5` でアイコンとテキストの間隔調整
- `PaginationEllipsis`: `flex h-9 w-9 items-center justify-center`

## 自作 vs ライブラリ

両方とも CSS + HTML で完結するため **自作**。Radix UI は不要。

## ファイル構成

```
src/components/ui/
├── table.tsx       # Table 複合コンポーネント
└── pagination.tsx  # Pagination 複合コンポーネント
```
