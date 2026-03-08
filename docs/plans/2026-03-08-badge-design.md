# Badge コンポーネント設計

## 概要

インラインで使う小さなラベルコンポーネント。テーブル内のステータス表示や見出し横の補足情報に使用する。

## 設計判断

- **スタイル型アプローチ**: variant は `default` / `outline` の2つのみ。色は `className` で外から自由に変更する。カラーバリエーションを variant として持たない（YAGNI）
- **Toast との色統一は不要**: 使用文脈が異なる（インラインラベル vs 通知ポップアップ）ため、色体系を揃える必要なし
- **ピル型は className で対応**: `rounded-full` を外から渡す。Button と同じ方針（CLAUDE.md 準拠）
- **HTML 要素は `<span>`**: クリックしない表示専用要素のため

## Props

| prop | 型 | デフォルト | 説明 |
|------|----|-----------|------|
| `variant` | `"default" \| "outline"` | `"default"` | default: 塗りつぶし、outline: 枠線のみ |
| `size` | `"sm" \| "md"` | `"md"` | sm: 英語やコンパクト用、md: 日本語テキスト向け |
| `className` | `string` | `""` | 色やピル型の上書き用 |

## スタイル

### Variant

- **default**: `bg-primary text-primary-foreground`
- **outline**: `border border-border text-foreground`

### Size

- **sm**: `text-xs px-2 py-0.5 rounded-md`
- **md**: `text-sm px-3 py-1 rounded-md`

### 共通

- `inline-flex items-center font-medium`
- hover / focus スタイルなし（非インタラクティブ）

## カタログ表示

- default / outline × sm / md の組み合わせ
- `className` でカスタムカラーをつけた例
- ピル型（`rounded-full`）の例
