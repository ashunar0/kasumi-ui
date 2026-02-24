# カラー＆タイポグラフィ改定（完了）

設計判断の詳細は以下を参照:
- [`docs/design-decisions/color.md`](../design-decisions/color.md) — カラー設計と根拠
- [`docs/design-decisions/typography.md`](../design-decisions/typography.md) — タイポグラフィ設計と根拠

## 概要

shadcnは英語基準で日本語だと窮屈、日本のDSは広すぎ・角が硬い。
my-uiはその中間 — 日本語に最適化されたミニマム・コンパクトなデザインシステム。

## 実施した変更

### タイポグラフィ
- base を 14px → 16px に変更（汎用DS対応）
- text-ui を 12px → 14px に変更（コンパクトUI用）
- スケール比率 ×1.2 (Minor Third) は維持

### カラー（ライトモード）
- 背景: `#fdfdfc` → `#ffffff`（純白、Notion方式）
- muted-foreground: `#87847f` → `#75726e`（WCAG AA 4.8:1 合格）
- destructive: `#e8572a` → `#c4431a`（WCAG AA 4.8:1 合格）
- foreground/primary: `#1c1917` を維持（システムフォントのウェイト制約により暗色を採用）

### 削除
- warmth切り替え機能（CSS / ThemeProvider / ThemeToggle）

### 追加
- `/demo` — Notion風デモページ（デザイントークン確認用）

## 検討プロセス

1. 現状の色のコントラスト比を全測定
2. Notionの色を調査・比較（背景は純白、テキストで暖かさを出す戦略を発見）
3. foregroundを `#33312b` に変更 → 「細く見える」問題が発生
4. font-weight 500〜600で補正を試行 → Hiragino Sans の固定ウェイト制約で中間値が取れず
5. Noto Sans JP 導入を検討 → YAGNI判断で見送り
6. foreground `#1c1917` に戻す決定（コントラスト重視）
