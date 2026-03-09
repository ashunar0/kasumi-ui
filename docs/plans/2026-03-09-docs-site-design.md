# ドキュメントサイト設計

## 概要

my-ui のコンポーネントドキュメントサイトを、同じ Next.js アプリ内に構築する。
自分のコンポーネントで自分のドキュメントを作る（self-hosting）。

## ターゲット

- 自分のリファレンス（コピペ時の確認用）
- ポートフォリオとして外部公開

## デザイン参考

- shadcn/ui のドキュメントサイト（シンプル・モノトーン・コードコピー重視）

## ルーティング

```
src/app/(docs)/
├── layout.tsx                    ← Sidebar ナビゲーション付きレイアウト
├── docs/
│   ├── page.tsx                  ← Introduction ページ
│   └── components/
│       ├── button/page.tsx
│       └── input/page.tsx
```

- `(docs)` ルートグループで `(main)`, `(auth)` と同列に配置
- URL: `/docs`, `/docs/components/button`, `/docs/components/input`

## レイアウト

- 既存の Sidebar コンポーネントでナビゲーション
- サイドバー内容:
  - Getting Started（Introduction へのリンク）
  - Components グループ（各コンポーネントへのリンク）
- `(main)/layout.tsx` をベースにドキュメント用にカスタマイズ

## コンポーネントページの構成

上から順に:

1. **タイトル & 説明** — H1 + 一行説明
2. **基本の使用例** — プレビュー枠 + コードブロック
3. **バリエーション** — H2 配下に各バリエーション（Variant, Size 等）ごとに H3 + プレビュー + コード
4. **Props テーブル** — H2、自分の Table コンポーネントで表示（Prop / Type / Default / Description）

### プレビュー枠

`border border-border rounded-lg p-6` のシンプルな枠。

### コードブロック

- `shiki` でビルド時シンタックスハイライト
- コピーボタン付き

### Props テーブル

自分の Table コンポーネントを使用。

## Introduction ページ

- タイトル: my-ui
- 一言説明: あさひの自分専用デザインシステム
- 特徴: 日本語最適化、Tailwind CSS 4、ダークモード対応
- Getting Started: コピペで使う手順（cn() + globals.css の最低限ガイド）

## 初回スコープ

3ページのみ:

1. Introduction
2. Button
3. Input

型が固まったら残りのコンポーネントを量産する。

## 使用する自分のコンポーネント

- Sidebar — ナビゲーション
- Table — Props テーブル
- Badge — （必要に応じて）ステータス表示
- Separator — セクション区切り

## 技術選定

| 項目 | 選定 | 理由 |
|------|------|------|
| シンタックスハイライト | shiki | ビルド時ハイライト、軽量、shadcn/ui と同じ |
| ドキュメント形式 | TSX | MDX は YAGNI。TSX で十分 |
| レイアウト | 既存 Sidebar | self-hosting、追加実装が少ない |
