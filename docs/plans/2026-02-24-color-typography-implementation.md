# カラー＆タイポグラフィ改定 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** my-uiのカラーとタイポグラフィを、日本語最適化・WCAG AA準拠・Notion参考のウォームグレー設計に改定する

**Architecture:** globals.cssのデザイントークンを変更し、warmth機能を削除してシンプル化。タイポグラフィはbase 16px / text-ui 14pxの2層構造に移行。

**Tech Stack:** Tailwind CSS 4, CSS custom properties, Next.js 16

---

### Task 1: globals.css — ライトモードのカラートークン更新

**Files:**
- Modify: `src/app/globals.css:3-20`

**Step 1: ライトモードの色を更新**

`:root` ブロックを以下に書き換え:

```css
:root {
  --background: #ffffff;
  --foreground: #33312b;
  --primary: #33312b;
  --primary-foreground: #ffffff;
  --secondary: #f3f2f0;
  --secondary-foreground: #33312b;
  --muted: #f3f2f0;
  --muted-foreground: #75726e;
  --accent: #f3f2f0;
  --accent-foreground: #33312b;
  --destructive: #c4431a;
  --destructive-foreground: #ffffff;
  --border: #e6e4e1;
  --input: #e6e4e1;
  --ring: #33312b;
  --radius: 0.5rem;
}
```

**Step 2: dev server起動して目視確認**

Run: `pnpm dev`
Expected: ライトモードで背景が白、テキストがウォームグレーに変化

**Step 3: コミット**

```bash
git add src/app/globals.css
git commit -m "refactor: ライトモードのカラートークンをウォームグレーに改定"
```

---

### Task 2: globals.css — ダークモードのカラートークン更新

**Files:**
- Modify: `src/app/globals.css:22-60`

**Step 1: ダークモード（media query + .dark クラス両方）を更新**

`@media (prefers-color-scheme: dark)` ブロックと `.dark` ブロックの両方で以下の値を変更:

```
--primary-foreground: #1c1917 → #33312b
--destructive: #d44a20 → #c4431a
--destructive-foreground: #faf8f5 → #ffffff
```

他のダークモード値は据え置き。

**Step 2: ダークモードで目視確認**

ブラウザでダークモードに切り替えて確認。

**Step 3: コミット**

```bash
git add src/app/globals.css
git commit -m "refactor: ダークモードのカラートークンを改定"
```

---

### Task 3: globals.css — warmth関連のCSSを削除

**Files:**
- Modify: `src/app/globals.css:62-89`

**Step 1: warmth-honnori 関連を全削除**

以下のブロックを丸ごと削除:
- `.warmth-honnori { ... }` (L62-69)
- `@media (prefers-color-scheme: dark) { .warmth-honnori:not(.light) { ... } }` (L71-80)
- `.warmth-honnori.dark { ... }` (L82-89)

**Step 2: コミット**

```bash
git add src/app/globals.css
git commit -m "refactor: warmth切り替え機能のCSSを削除"
```

---

### Task 4: globals.css — タイポグラフィスケール更新

**Files:**
- Modify: `src/app/globals.css` の `@theme inline` ブロック内

**Step 1: タイポグラフィトークンを更新**

`@theme inline` 内のタイポグラフィ部分を以下に書き換え:

```css
  /* Typography Scale: Minor Third (1.2), base 16px */
  --text-ui: 0.875rem;              /* 14px — コンパクトUI文 */
  --text-ui--line-height: 1.6;      /* ×1.6 */
  --text-body: 1rem;                /* 16px — base */
  --text-body--line-height: 1.8;    /* ×1.8 — JLREQ準拠 */
  --text-h4: 1.1875rem;             /* 19px — base × 1.2¹ */
  --text-h3: 1.4375rem;             /* 23px — base × 1.2² */
  --text-h2: 1.75rem;               /* 28px — base × 1.2³ */
  --text-h1: 2.0625rem;             /* 33px — base × 1.2⁴ */
```

**Step 2: ブラウザで確認**

カタログページでタイポグラフィセクションのサイズ変化を確認。

**Step 3: コミット**

```bash
git add src/app/globals.css
git commit -m "refactor: タイポグラフィスケールをbase 16pxに変更"
```

---

### Task 5: ThemeProvider — warmth機能を削除

**Files:**
- Modify: `src/components/theme-provider.tsx`

**Step 1: warmth関連のコードを削除**

変更後の全体:

```tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "system" | "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "system",
  setTheme: () => {},
});

const STORAGE_KEY = "my-ui-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // localStorage から復元
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  // テーマ変更時に HTML クラスと localStorage を更新
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme !== "system") {
      root.classList.add(theme);
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  return (
    <ThemeContext value={{ theme, setTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

削除するもの:
- `Warmth` type
- `warmth`, `setWarmth` from context
- `WARMTH_KEY`
- warmth の useState, useEffect, localStorage 処理

**Step 2: コミット**

```bash
git add src/components/theme-provider.tsx
git commit -m "refactor: ThemeProviderからwarmth機能を削除"
```

---

### Task 6: ThemeToggle — warmth UIを削除

**Files:**
- Modify: `src/components/theme-toggle.tsx`

**Step 1: warmth切り替えUIを削除**

変更後の全体:

```tsx
"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-1 rounded-lg border border-border p-1">
      {(["light", "system", "dark"] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`rounded-md px-3 py-1 text-sm transition-colors ${
            theme === t
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t === "light" ? "Light" : t === "dark" ? "Dark" : "System"}
        </button>
      ))}
    </div>
  );
}
```

**Step 2: ブラウザで確認**

ThemeToggleが Light/System/Dark の1行だけになっていることを確認。

**Step 3: コミット**

```bash
git add src/components/theme-toggle.tsx
git commit -m "refactor: ThemeToggleからwarmth切り替えUIを削除"
```

---

### Task 7: カタログページ — タイポグラフィ表記更新

**Files:**
- Modify: `src/app/page.tsx:42-64`

**Step 1: タイポグラフィセクションのサイズ表記を更新**

```tsx
{/* Typography */}
<Section title="タイポグラフィ">
  <div className="space-y-4">
    <h1 className="text-h1 font-bold tracking-tight">
      H1 日程調整アプリ（33px）
    </h1>
    <h2 className="text-h2 font-semibold tracking-tight">
      H2 スケジュール管理（28px）
    </h2>
    <h3 className="text-h3 font-semibold tracking-tight">
      H3 今週の予定（23px）
    </h3>
    <h4 className="text-h4 font-semibold tracking-tight">
      H4 ミーティング一覧（19px）
    </h4>
    <p className="text-body">
      本文（16px） —
      日程調整アプリは、参加者全員の空き時間を自動で照合し、最適な候補日を提案します。複数のカレンダーと連携できるため、手動で調整する手間がなくなります。
    </p>
    <p className="text-ui">
      UI文（14px） —
      予定が3件あります。タップして詳細を確認してください。次のミーティングは来週の月曜日10:00からで、参加者は田中さん、佐藤さん、鈴木さんの3名です。議題は「第3四半期のスケジュール調整」となっています。
    </p>
  </div>
</Section>
```

**Step 2: ブラウザで全体表示確認**

カタログページ全体をライト/ダークで確認。

**Step 3: コミット**

```bash
git add src/app/page.tsx
git commit -m "refactor: カタログのタイポグラフィ表記をbase 16pxに更新"
```

---

### Task 8: typography.md — 設計ドキュメント更新

**Files:**
- Modify: `docs/design-decisions/typography.md`

**Step 1: ドキュメント全体を更新**

base 16px への変更理由、text-uiの使い分け基準、汎用デザインシステムとしての設計判断を反映。

主な変更点:
- base: 14px → 16px の理由（汎用DS、WCAG、Notion等との整合性）
- text-ui (14px) の位置付け（「操作する」テキスト用）
- 「なぜ 14px ベースか」セクションを「なぜ 16px ベースか」に改訂
- スケール一覧テーブルの値を更新

**Step 2: コミット**

```bash
git add docs/design-decisions/typography.md
git commit -m "docs: タイポグラフィ設計ドキュメントをbase 16pxに更新"
```

---

### Task 9: CLAUDE.md — プロジェクト説明更新

**Files:**
- Modify: `/Users/a.kawanobe/dev/ui/my-ui/CLAUDE.md`

**Step 1: タイポグラフィテーブルを更新**

タイポグラフィセクションのテーブルを新しい値に書き換え:

| 用途 | クラス | サイズ | line-height | 根拠 |
|------|--------|--------|-------------|------|
| H1 | `text-h1 font-bold tracking-tight` | 33px | デフォルト | base × 1.2⁴ |
| H2 | `text-h2 font-semibold tracking-tight` | 28px | デフォルト | base × 1.2³ |
| H3 | `text-h3 font-semibold tracking-tight` | 23px | デフォルト | base × 1.2² |
| H4 | `text-h4 font-semibold tracking-tight` | 19px | デフォルト | base × 1.2¹ |
| 本文（記事・説明文） | `text-body` | 16px | ×1.8 | base, JLREQ + 実測 |
| UI文（アプリ内テキスト） | `text-ui` | 14px | ×1.6 | コンパクトUI用 |

**Step 2: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.mdのタイポグラフィ情報をbase 16pxに更新"
```

---

### Task 10: 最終確認

**Step 1: dev serverでライトモード確認**
- 背景が白、テキストがウォームグレー
- ボタンのコントラストが十分
- muted textが読める

**Step 2: ダークモード確認**
- 色の整合性確認

**Step 3: warmth機能が完全に消えていること確認**
- ThemeToggleにwarmth UIがない
- HTMLにwarmth-honnoriクラスが付かない
