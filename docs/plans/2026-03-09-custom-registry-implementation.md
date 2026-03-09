# kasumi-ui カスタムレジストリ Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** shadcn CLI のカスタムレジストリとして kasumi-ui のコンポーネントを公開し、`npx shadcn@latest add @kasumi/button` で使えるようにする

**Architecture:** `registry.json` にコンポーネント定義 → `shadcn build` で `public/r/` にJSON生成 → Vercel で配信。コンポーネントソースは `src/registry/` にコピーして管理。

**Tech Stack:** shadcn CLI (build), Next.js (hosting), Vercel (deploy)

---

### Task 1: .gitignore に public/r/ を追加

**Files:**
- Modify: `.gitignore`

**Step 1: .gitignore に追記**

`.gitignore` の末尾に以下を追加:

```
# shadcn registry build output
/public/r
```

**Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: public/r/ を .gitignore に追加"
```

---

### Task 2: registry 用ユーティリティファイルをコピー

**Files:**
- Create: `src/registry/lib/utils.ts`（`src/lib/utils.ts` のコピー）
- Create: `src/registry/lib/use-mobile.ts`（`src/lib/use-mobile.ts` のコピー）

**Step 1: ディレクトリ作成とファイルコピー**

```bash
mkdir -p src/registry/lib
cp src/lib/utils.ts src/registry/lib/utils.ts
cp src/lib/use-mobile.ts src/registry/lib/use-mobile.ts
```

**Step 2: Commit**

```bash
git add src/registry/lib/
git commit -m "chore: registry用ユーティリティファイルをコピー"
```

---

### Task 3: registry 用コンポーネントファイルをコピー

**Files:**
- Create: `src/registry/ui/*.tsx`（全27ファイル、`src/components/ui/` からコピー）

**Step 1: ディレクトリ作成と全コンポーネントコピー**

```bash
mkdir -p src/registry/ui
cp src/components/ui/*.tsx src/registry/ui/
```

**Step 2: インポートパスの確認**

registry 内のファイルが `@/lib/utils` を参照している場合、shadcn build がパスを解決してくれる。
ただし、コンポーネント間の内部参照（field → label, sidebar → tooltip）が `@/components/ui/` になっている場合は修正が必要。

確認するファイル:
- `src/registry/ui/field.tsx` — `@/components/ui/label` → レジストリ依存で解決されるか確認
- `src/registry/ui/sidebar.tsx` — `@/components/ui/tooltip` → 同上

shadcn build がレジストリ依存を正しく解決する形に修正する。import パスが `@/components/ui/label` のままだと利用者側で壊れる可能性がある。`registryDependencies` で指定した上で、実際のimportパスは利用者のプロジェクト構造に依存するため、shadcn の規約に合わせて修正する。

**Step 3: Commit**

```bash
git add src/registry/ui/
git commit -m "chore: registry用コンポーネントファイルをコピー"
```

---

### Task 4: registry.json を作成

**Files:**
- Create: `registry.json`（プロジェクトルート）

**Step 1: registry.json を作成**

全27コンポーネント + 2ユーティリティを定義。各コンポーネントの npm 依存と registry 依存を正確に記述する。

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "kasumi-ui",
  "homepage": "https://kasumi-ui.vercel.app",
  "items": [
    {
      "name": "utils",
      "type": "registry:lib",
      "dependencies": ["clsx", "tailwind-merge"],
      "files": [
        { "path": "src/registry/lib/utils.ts", "type": "registry:lib" }
      ]
    },
    {
      "name": "use-mobile",
      "type": "registry:lib",
      "files": [
        { "path": "src/registry/lib/use-mobile.ts", "type": "registry:lib" }
      ]
    },
    {
      "name": "accordion",
      "type": "registry:component",
      "title": "Accordion",
      "description": "Radix UIベースの開閉パネル。type: single/multiple対応。",
      "dependencies": ["@radix-ui/react-accordion", "lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/accordion.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "alert",
      "type": "registry:component",
      "title": "Alert",
      "description": "variant: default/success/info/warning/error のアラート。",
      "dependencies": ["lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/alert.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "avatar",
      "type": "registry:component",
      "title": "Avatar",
      "description": "size: sm/md/lg。画像エラー時フォールバック対応。",
      "dependencies": ["lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/avatar.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "badge",
      "type": "registry:component",
      "title": "Badge",
      "description": "variant: default/outline、size: sm/md。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/badge.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "breadcrumb",
      "type": "registry:component",
      "title": "Breadcrumb",
      "description": "パンくずリスト。ChevronRightセパレーター。",
      "dependencies": ["lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/breadcrumb.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "button",
      "type": "registry:component",
      "title": "Button",
      "description": "variant: primary/secondary/ghost/outline/destructive、size: sm/md/lg。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/button.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "card",
      "type": "registry:component",
      "title": "Card",
      "description": "6パーツ構成のカードコンポーネント。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/card.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "checkbox",
      "type": "registry:component",
      "title": "Checkbox",
      "description": "size: sm/md/lg、error状態対応。",
      "dependencies": ["lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/checkbox.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "dialog",
      "type": "registry:component",
      "title": "Dialog",
      "description": "Radix UIベースのダイアログ。フォーカストラップ・Escapeキー対応。",
      "dependencies": ["@radix-ui/react-dialog", "lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/dialog.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "dropdown-menu",
      "type": "registry:component",
      "title": "Dropdown Menu",
      "description": "Radix UIベースのドロップダウンメニュー。",
      "dependencies": ["@radix-ui/react-dropdown-menu"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/dropdown-menu.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "field",
      "type": "registry:component",
      "title": "Field",
      "description": "フォームフィールドのレイアウト・セマンティクス担当。",
      "registryDependencies": ["utils", "label"],
      "files": [
        { "path": "src/registry/ui/field.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "input",
      "type": "registry:component",
      "title": "Input",
      "description": "variant: outline/underline、size: sm/md/lg、パスワードトグル自動表示。",
      "dependencies": ["lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/input.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "label",
      "type": "registry:component",
      "title": "Label",
      "description": "peer-disabled連動のラベル。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/label.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "pagination",
      "type": "registry:component",
      "title": "Pagination",
      "description": "ページ番号型ページネーション。",
      "dependencies": ["lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/pagination.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "popover",
      "type": "registry:component",
      "title": "Popover",
      "description": "Radix UIベースのポップオーバー。",
      "dependencies": ["@radix-ui/react-popover"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/popover.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "progress",
      "type": "registry:component",
      "title": "Progress",
      "description": "進捗バー。value propで0〜100指定。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/progress.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "radio",
      "type": "registry:component",
      "title": "Radio",
      "description": "size: sm/md/lg、error状態対応。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/radio.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "select",
      "type": "registry:component",
      "title": "Select",
      "description": "Radix UIベースのセレクト。typeahead対応。",
      "dependencies": ["@radix-ui/react-select", "lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/select.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "separator",
      "type": "registry:component",
      "title": "Separator",
      "description": "horizontal/verticalのセパレーター。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/separator.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "sidebar",
      "type": "registry:component",
      "title": "Sidebar",
      "description": "デスクトップ: ミニサイドバー折りたたみ、モバイル: ドロワーモード。",
      "dependencies": ["@radix-ui/react-slot", "@radix-ui/react-collapsible", "@radix-ui/react-dialog", "lucide-react"],
      "registryDependencies": ["utils", "use-mobile", "tooltip"],
      "files": [
        { "path": "src/registry/ui/sidebar.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "skeleton",
      "type": "registry:component",
      "title": "Skeleton",
      "description": "ローディング表示用スケルトン。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/skeleton.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "switch",
      "type": "registry:component",
      "title": "Switch",
      "description": "size: sm/md/lg、error状態対応。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/switch.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "table",
      "type": "registry:component",
      "title": "Table",
      "description": "横スクロール対応のテーブル。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/table.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "tabs",
      "type": "registry:component",
      "title": "Tabs",
      "description": "Radix UIベースのタブ。variant: underline/pill。",
      "dependencies": ["@radix-ui/react-tabs"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/tabs.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "textarea",
      "type": "registry:component",
      "title": "Textarea",
      "description": "error状態対応のテキストエリア。",
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/textarea.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "toast",
      "type": "registry:component",
      "title": "Toast",
      "description": "Radix UIベースのトースト。variant: default/success/info/warning/error。",
      "dependencies": ["@radix-ui/react-toast", "lucide-react"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/toast.tsx", "type": "registry:component" }
      ]
    },
    {
      "name": "tooltip",
      "type": "registry:component",
      "title": "Tooltip",
      "description": "Radix UIベースのツールチップ。",
      "dependencies": ["@radix-ui/react-tooltip"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "src/registry/ui/tooltip.tsx", "type": "registry:component" }
      ]
    }
  ]
}
```

**Step 2: Commit**

```bash
git add registry.json
git commit -m "feat: registry.json を作成（全27コンポーネント）"
```

---

### Task 5: registry コンポーネントのインポートパスを修正

**Files:**
- Modify: `src/registry/ui/field.tsx` — `@/components/ui/label` → `@/components/ui/label`（shadcn が registryDependencies で解決するか確認、必要なら修正）
- Modify: `src/registry/ui/sidebar.tsx` — `@/components/ui/tooltip` の参照、`@/lib/use-mobile` の参照を確認

**Step 1: field.tsx のインポートを確認・修正**

`@/components/ui/label` を使っている場合、利用者側のパスに合わせる必要がある。shadcn の規約では `@/components/ui/` が標準なので、そのままで問題ないはず。確認して必要なら修正。

**Step 2: sidebar.tsx のインポートを確認・修正**

- `@/components/ui/tooltip` → そのままでOK（shadcn 規約通り）
- `@/lib/use-mobile` → そのままでOK（shadcn が `registry:lib` として配置）

**Step 3: Commit（変更があれば）**

```bash
git add src/registry/ui/
git commit -m "fix: registry用コンポーネントのインポートパスを修正"
```

---

### Task 6: package.json に registry:build スクリプトを追加

**Files:**
- Modify: `package.json`

**Step 1: scripts に追加**

```json
{
  "scripts": {
    "registry:build": "shadcn build"
  }
}
```

**Step 2: Commit**

```bash
git add package.json
git commit -m "chore: registry:build スクリプトを追加"
```

---

### Task 7: shadcn build を実行して動作確認

**Step 1: shadcn build を実行**

```bash
pnpm registry:build
```

Expected: `public/r/` に各コンポーネントの JSON ファイルが生成される。

**Step 2: 生成された JSON を確認**

```bash
ls public/r/
cat public/r/button.json
```

Expected: button.json にコンポーネントのソースコード、依存関係等が含まれている。

**Step 3: エラーがあれば修正**

shadcn build がエラーを出した場合、registry.json のパスや型定義を修正する。

**Step 4: Commit**

設計書の最終更新があればコミット。

---

### Task 8: Next.js ビルドで全体確認

**Step 1: Next.js ビルド**

```bash
pnpm build
```

Expected: ドキュメントサイトのビルドが成功し、`public/r/` のJSONも含まれる。

**Step 2: 最終コミット**

```bash
git add -A
git commit -m "feat: kasumi-ui カスタムレジストリを追加"
```
