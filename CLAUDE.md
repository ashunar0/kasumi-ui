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
    ├── theme-toggle.tsx   # ライト/ダークモード切り替えボタン
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
- YAGNI: cn関数やTypographyコンポーネント等は必要になるまで入れない

## フォント

- 英語: Inter（`next/font/google`、`inter.className` で body に適用）
- コード: Geist Mono（CSS変数 `--font-geist-mono` で登録）
- 日本語: システムフォントにフォールバック（Hiragino Sans 等）

## タイポグラフィ

| 用途 | クラス | サイズ | 補足 |
|------|--------|--------|------|
| H1 | `text-3xl font-bold tracking-tight` | 30px | — |
| H2 | `text-2xl font-semibold tracking-tight` | 24px | — |
| H3 | `text-xl font-semibold tracking-tight` | 20px | — |
| H4 | `text-lg font-semibold tracking-tight` | 18px | — |
| 本文（記事・説明文） | `text-base leading-7` | 16px | line-height: 28px |
| UI文（アプリ内テキスト） | `text-sm leading-relaxed` | 14px | line-height: 1.625 |

日本語はデフォルトの行間だと窮屈なため、本文系テキストには `leading-7` や `leading-relaxed` を指定する。
見出しやボタンの行間はデフォルトのまま。

## コンポーネント設計ルール

- `src/components/ui/` に1コンポーネント1ファイルで配置
- propsは `ComponentProps<"要素名">` を拡張する形で定義
- Tailwind CSS のユーティリティクラスで直接スタイリング
- `className` を受け取って外部からスタイル上書き可能にする
- デザイントークンは `globals.css` のCSS変数を参照（`bg-primary` 等）
- ピル型ボタン等は `className="rounded-full"` で外から対応（専用propは不要）

## デザイントークン

`globals.css` でCSS変数として定義し、`@theme inline` でTailwindに登録:
- 色: background, foreground, primary, secondary, muted, accent, destructive, border, input, ring
- 角丸: radius (sm/md/lg/xl)
- フォント: sans (Inter), mono (Geist Mono)
- ライト/ダークモード両対応

## ダークモード

3つのモードを切り替え可能:
- **System** — OS設定に従う（`prefers-color-scheme`、デフォルト）
- **Light** — `<html>` に `.light` クラスを付与（メディアクエリを `:root:not(.light)` で無効化）
- **Dark** — `<html>` に `.dark` クラスを付与

カタログページのヘッダー右上にトグルボタン（`ThemeToggle`）あり。

## カタログページ

- `page.tsx` にセクション区切り型で全コンポーネントを縦並び表示
- セクション: タイポグラフィ → ボタン → テキスト入力 → ラベル → カード
- テキストは日本語で記述（日程調整アプリを想定した実用的な内容）
- コードスニペットやProps一覧は不要（シンプルに保つ）

## 実装済みコンポーネント

- **Button** — variant: primary/secondary/ghost/outline/destructive、size: sm/md/lg
- **Input** — error prop でエラー状態切り替え
- **Label** — peer-disabled 連動
- **Card** — Card / CardHeader / CardTitle / CardContent / CardFooter の5パーツ構成

## 設計判断メモ

- **cn関数は不入れない** — 今の規模では三項演算子とテンプレートリテラルで十分。依存（clsx + tailwind-merge）を増やさない
- **Typographyコンポーネントは作らない** — Tailwindクラスがそのままスタイルの説明になるため抽象化不要
- **ピル型は className で対応** — `rounded-full` を外から渡す。多用するようになったらpropに昇格
- **next/font は `className` で適用** — `variable` はCSS変数を定義するだけでフォントは適用されない
