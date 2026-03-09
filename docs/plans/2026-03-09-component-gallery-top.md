# コンポーネントギャラリー トップページ Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** トップページをマーケティング LP からコンポーネントギャラリーに置き換える

**Architecture:** `page.tsx` にタイトル + コンポーネントカードグリッドを配置。各カードは実際のコンポーネントのミニプレビューを表示し、クリックでドキュメントページへ遷移する。インタラクティブなプレビュー（Tabs, Accordion 等）があるため `"use client"` とする。

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, 既存 UI コンポーネント

---

### Task 1: トップページをコンポーネントギャラリーに書き換え

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: `page.tsx` を書き換え**

ページ構成:
- `"use client"` (インタラクティブプレビューのため)
- タイトル: `kasumi/ui` + 1行説明
- グリッド: レスポンシブカード (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`)
- 各カードは Link でラップし `/docs/components/{name}` へ遷移

各コンポーネントのミニプレビュー内容:

| コンポーネント | プレビュー内容 |
|---|---|
| **Button** | primary, outline, ghost の3つ横並び |
| **Badge** | default と outline の2つ |
| **Input** | outline variant のプレースホルダー付き |
| **Checkbox** | チェック済み + 未チェック + ラベル |
| **Radio** | 2つのラジオ（1つ選択済み） |
| **Switch** | ON状態の1つ |
| **Progress** | value=65 のバー |
| **Avatar** | フォールバック表示 sm/md/lg |
| **Skeleton** | テキスト3行風 |
| **Separator** | horizontal の線 |
| **Alert** | info variant、1行メッセージ |
| **Tabs** | underline variant、2タブ |
| **Accordion** | 1項目、閉じた状態 |
| **Breadcrumb** | ホーム > 設定 > プロフィール |
| **Pagination** | 1 2 3 ... のミニ版 |
| **Tooltip** | 「ホバーしてね」ボタン + TooltipProvider |
| **Card** | タイトル + 1行説明のミニカード |
| **Select** | プレースホルダー表示 |
| **Label** | ラベルテキスト1つ |
| **Textarea** | プレースホルダー付き |
| **Table** | 2列×2行のミニテーブル |
| **Dialog** | 「開く」ボタンのみ（実際には開かない） |
| **DropdownMenu** | 「メニュー」ボタンのみ（実際には開かない） |
| **Popover** | 「詳細」ボタンのみ（実際には開かない） |
| **Toast** | info variant の Alert で代用表示 |
| **Field** | Label + Input + 説明文の組み合わせ |

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: トップページをコンポーネントギャラリーに変更"
```

---

### Task 2: 不要ファイルの削除

**Files:**
- Delete: `src/components/showcase-form.tsx`

**Step 1: ShowcaseForm を削除**

`src/components/showcase-form.tsx` を削除。`page.tsx` から import も既に Task 1 で除去済み。

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git rm src/components/showcase-form.tsx
git commit -m "chore: 不要になった ShowcaseForm を削除"
```
