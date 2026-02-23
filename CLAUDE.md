# my-ui

あさひのオリジナルUIコンポーネントライブラリ。

## 技術スタック

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4（CSS変数ベースのデザイントークン）
- TypeScript strict
- pnpm

## ファイル構成

```
src/
├── app/
│   ├── page.tsx          # UIカタログページ（1ページに全コンポーネント表示）
│   ├── layout.tsx        # ルートレイアウト（lang="ja"）
│   └── globals.css       # デザイントークン（CSS変数）
└── components/
    └── ui/               # UIコンポーネント置き場
        ├── button.tsx
        ├── input.tsx
        ├── label.tsx
        └── card.tsx
```

## デザイン方針

- shadcn/uiのシンプルさをベースに、日本語に最適化する
- 独自の個性・ユーモアを入れる余地を持つ
- Catnoseさんのような「シンプル・機能的・ユーモア」を目指す

## コンポーネント設計ルール

- `src/components/ui/` に1コンポーネント1ファイルで配置
- propsは `ComponentProps<"要素名">` を拡張する形で定義
- Tailwind CSS のユーティリティクラスで直接スタイリング
- `className` を受け取って外部からスタイル上書き可能にする
- デザイントークンは `globals.css` のCSS変数を参照（`bg-primary` 等）

## デザイントークン

`globals.css` でCSS変数として定義し、`@theme inline` でTailwindに登録:
- 色: background, foreground, primary, secondary, muted, accent, destructive, border, input, ring
- 角丸: radius (sm/md/lg/xl)
- フォント: sans (Geist), mono (Geist Mono)
- ライト/ダークモード両対応（`prefers-color-scheme`）

## カタログページ

- `page.tsx` にセクション区切り型で全コンポーネントを縦並び表示
- 各セクション: コンポーネント名見出し + バリエーション実物表示
- コードスニペットやProps一覧は不要（シンプルに保つ）

## 実装計画

`docs/plans/2026-02-23-ui-catalog-implementation.md` に詳細な実装計画あり。
