# Compact Elegance 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** my-uiのデザイントークンをCompact Eleganceデザイン（14pxベース、Airyスペーシング、2カラーテーマ）に刷新する

**Architecture:** globals.cssのCSS変数とTailwindテーマトークンを更新し、カタログページとコンポーネントのスペーシングを調整する。カラーテーマはCSS変数の切り替えで実現し、既存のThemeProvider/ThemeToggleを拡張する。

**Tech Stack:** Tailwind CSS 4 (`@theme inline`)、CSS変数、React Context

---

### Task 1: タイポグラフィトークンを14pxベースに更新

**Files:**
- Modify: `src/app/globals.css:84-92`

**Step 1: globals.cssのタイポグラフィトークンを更新**

`@theme inline` 内のタイポグラフィ部分を以下に置き換える:

```css
/* Typography Scale: Minor Third (1.2), base 14px */
--text-ui: 0.75rem;               /* 12px — 最小可読サイズ */
--text-ui--line-height: 1.6;      /* ×1.6 */
--text-body: 0.875rem;            /* 14px — base */
--text-body--line-height: 1.8;    /* ×1.8 — コンパクトだが窮屈でない */
--text-h4: 1.0625rem;             /* 17px — base × 1.2¹ */
--text-h3: 1.25rem;               /* 20px — base × 1.2² */
--text-h2: 1.5rem;                /* 24px — base × 1.2³ */
--text-h1: 1.8125rem;             /* 29px — base × 1.2⁴ */
```

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git add src/app/globals.css
git commit -m "feat: タイポグラフィを14pxベースのCompact Eleganceに変更"
```

---

### Task 2: カタログページのスペーシングをAiryに更新

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: ページ全体のスペーシングを更新**

`page.tsx` の以下の値を変更:

- `space-y-12` → `space-y-16`（セクション間: 48px → 64px）
- Section内の `space-y-4` → `space-y-6`（内部gap: 16px → 24px）
- カード grid の `gap-4` → `gap-6`（カード間: 16px → 24px）
- ボタンの `gap-3` → `gap-4`（ボタン間: 12px → 16px）

**Step 2: タイポグラフィのpxアノテーションを更新**

カタログ内の表示テキストを新しいサイズに合わせる:
- 「H1 日程調整アプリ（33px）」→「H1 日程調整アプリ（29px）」
- 「H2 スケジュール管理（28px）」→「H2 スケジュール管理（24px）」
- 「H3 今週の予定（23px）」→「H3 今週の予定（20px）」
- 「H4 ミーティング一覧（19px）」→「H4 ミーティング一覧（17px）」
- 「本文（16px）」→「本文（14px）」
- 「UI文（14px）」→「UI文（12px）」

**Step 3: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: カタログのスペーシングをAiryに更新、タイポグラフィ表記を修正"
```

---

### Task 3: カードコンポーネントのpaddingをAiryに更新

**Files:**
- Modify: `src/components/ui/card.tsx`

**Step 1: CardHeader, CardContent, CardFooterのpaddingを更新**

```tsx
// CardHeader: p-6 → p-8
export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={`flex flex-col gap-1.5 p-8 ${className}`} {...props} />;
}

// CardContent: px-6 pb-6 → px-8 pb-8
export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={`px-8 pb-8 ${className}`} {...props} />;
}

// CardFooter: px-6 pb-6 → px-8 pb-8
export function CardFooter({ className = "", ...props }: DivProps) {
  return (
    <div className={`flex items-center px-8 pb-8 ${className}`} {...props} />
  );
}
```

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git add src/components/ui/card.tsx
git commit -m "feat: カードのpaddingをAiry(32px)に拡大"
```

---

### Task 4: カラーテーマ用CSS変数を追加

**Files:**
- Modify: `src/app/globals.css`

**Step 1: :rootに山吹テーマのaccent色を設定（デフォルト）**

`:root` セクション内の `--accent` 関連を山吹色に変更:

```css
--accent: #FFCC00;
--accent-foreground: #18181b;
```

**Step 2: ティール×オレンジテーマ用のCSSクラスを追加**

`.dark` セレクタの後に追加:

```css
.theme-teal {
  --accent: #14b8a6;
  --accent-foreground: #ffffff;
  --secondary: #e8590c;
  --secondary-foreground: #ffffff;
}

.theme-teal.dark,
.theme-teal:not(.light) {
  /* ダークモードでもテーマ色は同じ（必要に応じて後で調整） */
  --accent: #14b8a6;
  --accent-foreground: #ffffff;
  --secondary: #e8590c;
  --secondary-foreground: #ffffff;
}
```

**Step 3: @theme inlineにsecondary色のマッピングを追加（まだなければ）**

`--color-secondary` と `--color-secondary-foreground` は既に存在するので追加不要。

**Step 4: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 5: コミット**

```bash
git add src/app/globals.css
git commit -m "feat: 山吹・ティール×オレンジの2カラーテーマを追加"
```

---

### Task 5: ThemeProviderにカラーテーマを追加

**Files:**
- Modify: `src/components/theme-provider.tsx`

**Step 1: ColorTheme型とContextを追加**

```tsx
type Theme = "system" | "light" | "dark";
type ColorTheme = "yamabuki" | "teal";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorTheme: ColorTheme;
  setColorTheme: (colorTheme: ColorTheme) => void;
}>({
  theme: "system",
  setTheme: () => {},
  colorTheme: "yamabuki",
  setColorTheme: () => {},
});

const STORAGE_KEY = "my-ui-theme";
const COLOR_THEME_KEY = "my-ui-color-theme";
```

**Step 2: ThemeProvider内にcolorThemeのstate管理を追加**

- localStorage から復元（キー: `my-ui-color-theme`）
- `<html>` に `.theme-teal` クラスを付与/除去
- yamabukiはデフォルト（クラスなし）

**Step 3: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 4: コミット**

```bash
git add src/components/theme-provider.tsx
git commit -m "feat: ThemeProviderにカラーテーマ切り替え機能を追加"
```

---

### Task 6: ThemeToggleにカラーテーマ切り替えUIを追加

**Files:**
- Modify: `src/components/theme-toggle.tsx`

**Step 1: カラーテーマ切り替えボタンを追加**

既存のLight/System/Darkトグルの下に、カラーテーマ切り替え（山吹 / ティール×オレンジ）を追加。
各ボタンにアクセントカラーの小さい丸を表示して直感的にする。

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git add src/components/theme-toggle.tsx
git commit -m "feat: ThemeToggleにカラーテーマ切り替えUIを追加"
```

---

### Task 7: ドキュメント更新

**Files:**
- Modify: `CLAUDE.md` — タイポグラフィテーブル、デザイントークンセクションを更新
- Modify: `docs/design-decisions/typography.md` — 14pxベースの根拠に更新

**Step 1: CLAUDE.mdのタイポグラフィテーブルを更新**

新しいサイズ（14pxベース）と行間（1.8/1.6）に合わせる。

**Step 2: typography.mdを更新**

16px→14pxの変更理由、行間変更の根拠を追記。

**Step 3: コミット**

```bash
git add CLAUDE.md docs/design-decisions/typography.md
git commit -m "docs: タイポグラフィ・カラーテーマのドキュメントを更新"
```

---

### Task 8: 比較ページの削除

**Files:**
- Delete: `src/app/compare/page.tsx`

**Step 1: 比較ページを削除**

プロトタイプ用の比較ページはデザイン決定後は不要。

**Step 2: ビルド確認**

Run: `pnpm build`
Expected: ビルド成功

**Step 3: コミット**

```bash
git rm src/app/compare/page.tsx
git commit -m "chore: デザイン比較プロトタイプページを削除"
```
