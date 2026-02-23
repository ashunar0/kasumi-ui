# my-ui UIカタログ 設計

## 目的

実プロジェクト（日程調整アプリ等）で再利用するためのオリジナルUIコンポーネントライブラリ。

## デザイン方針

- shadcn/uiのシンプルさをベースに、日本語に最適化
- あさひさんらしい個性・ユーモアを入れる余地を持つ
- Catnoseさんのように「シンプル・機能的・ユーモア」を目指す

## カタログページ構成

**1ページ・セクション区切り型**

- `page.tsx` に全コンポーネントをセクションごとに縦並び
- 各セクション: コンポーネント名の見出し + バリエーション表示
- コードスニペットやProps一覧は初期段階では不要

## ファイル構成

```
src/
├── app/
│   ├── page.tsx          # カタログページ
│   ├── layout.tsx        # ルートレイアウト
│   └── globals.css       # デザイントークン（CSS変数）
└── components/
    └── ui/
        ├── button.tsx
        ├── input.tsx
        ├── label.tsx
        └── card.tsx
```

## 最初に作るコンポーネント（優先順）

1. **Button** — variant（primary/secondary/ghost/outline）、size（sm/md/lg）、状態（disabled/loading）
2. **Input** — default/error/disabled、ラベル・プレースホルダー付き
3. **Label** — 基本ラベル
4. **Card** — 基本/ヘッダー付き/フッター付き

## 技術スタック

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript (strict)

## デザイントークン

`globals.css` のCSS変数で管理:
- 色（background, foreground, primary, muted等）
- フォント（日本語最適化）
- spacing, radius等
