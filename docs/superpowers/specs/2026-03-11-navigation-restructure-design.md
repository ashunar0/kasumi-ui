# サイトナビゲーション整理 設計書

## 概要

kasumi-ui サイトのナビゲーションを再構成する。グローバルナビにDocs / Components / Blocksの導線を追加し、サイドバーをグループ分けし、Blocksページの骨格を用意する。

## 背景

現状のサイトヘッダーにはナビリンクがなく、ドキュメントへの導線がロゴクリックのみ。また `/demo`, `/login`, `/dashboard` 等のページが整理されずに並存している。shadcn/ui のようなグローバルナビ構成に統一する。

## ルーティング構成

### 変更後

```
/                         → LP（変更なし）
/docs                     → Introduction（Getting Started）
/docs/components          → コンポーネント一覧（既存ページ、変更なし）
/docs/components/[name]   → 各コンポーネントドキュメント（既存26個、変更なし）
/docs/blocks              → ブロック一覧（新設、Coming Soon プレースホルダー）
/catalog                  → 残す（ナビには出さない、自分用）
/compare                  → 残す（ナビには出さない）
```

### 削除

- `/demo` — 不要
- `/login`, `/register`, `/login2`, `/register2`, `/dashboard` — ブロック移植時に削除（次フェーズ）

## 変更箇所

### 1. SiteHeader にナビリンク追加

**ファイル:** `src/components/site-header.tsx`

ロゴとアイコン群の間にナビリンクを追加する。

```
[kasumi/ui ロゴ → /]    Docs    Components    Blocks    ────    [GitHub] [テーマトグル]
```

- ロゴのリンク先を `/docs` → `/` に変更（LP に戻れるようにする）
- `Docs` → `/docs`
- `Components` → `/docs/components`
- `Blocks` → `/docs/blocks`
- アクティブ判定ロジック:
  - `Docs`: `pathname === "/docs"` の完全一致（Introduction ページのみ）
  - `Components`: `pathname.startsWith("/docs/components")` の前方一致
  - `Blocks`: `pathname.startsWith("/docs/blocks")` の前方一致
- モバイル（sm未満）: ナビリンクを `hidden sm:flex` で非表示にし、ハンバーガーメニューは次フェーズで必要になったら追加する（YAGNI）

### 2. サイドバーのグループ分け

**ファイル:** `src/app/(docs)/layout.tsx`

現状の `navItems` と `components` を以下のグループ構成に変更する。

```
Getting Started
  └ Introduction        → /docs

Components
  ├ Accordion           → /docs/components/accordion
  ├ Alert               → /docs/components/alert
  ├ ...（26個）
  └ Tooltip             → /docs/components/tooltip

Blocks
  └ (Coming Soon)       → /docs/blocks
```

- 各グループにセクション見出し（`text-xs text-muted-foreground`、既存の「Components」ラベルと同じスタイル）
- 「Getting Started」グループを新設し、Introduction を移動
- Installation リンクは今回追加しない（ページが存在しないため）
- Blocks グループにはリンク1つ（`/docs/blocks` への一覧リンク）のみ配置。個別ブロックのリンクは次フェーズでページが揃ってから追加する

### 3. `/docs/blocks` ページ新設

**ファイル:** `src/app/(docs)/docs/blocks/page.tsx`

ブロック一覧ページを作成する。

- タイトル「Blocks」と説明文
- 「Coming Soon — ログイン、ダッシュボード等のページテンプレートを追加予定」的なプレースホルダー
- 既存の `/docs/components/page.tsx` と同じレイアウトパターンを踏襲

### 4. `/demo` ページ削除

**ファイル:** `src/app/demo/` ディレクトリごと削除

## スコープ外（次フェーズ）

- 認証ブロック（login, register）のブロックショーケースへの移植と既存ページ削除
- ダッシュボードブロックの移植と既存ページ削除
- 新規コンポーネント追加（Sheet等）
- トップページの改善
- Installation ページの実装
- モバイルハンバーガーメニュー

## 今後のロードマップ（参考）

1. **今回:** ナビゲーション整理 + ブロック基盤
2. ブロック移植（login, register, dashboard）
3. コンポーネント追加（Sheet等）
4. トップページ改善
