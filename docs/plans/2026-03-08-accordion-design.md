# Accordion コンポーネント設計

## 概要

折りたたみパネル。FAQ、設定画面等で使用。

## ベース

Radix UI `@radix-ui/react-accordion`

## 複合コンポーネント構成

| コンポーネント | 役割 |
|---|---|
| `Accordion` | ルート。`type="single" \| "multiple"` をパススルー |
| `AccordionItem` | 各アイテムのコンテナ。`border-b` で区切り |
| `AccordionTrigger` | クリックで開閉するヘッダー。右端に ChevronDown（開閉で回転） |
| `AccordionContent` | 開閉するコンテンツ領域。高さアニメーション付き |

## スタイル

- ボーダー区切り型（アイテム間 `border-b`）
- トリガーは `hover:underline`、フォントは `font-medium`
- ChevronDown アイコンは開閉時に 180° 回転（`transition-transform`）

## アニメーション

`globals.css` に accordion 用キーフレームを追加：

- `accordion-down`: 高さ 0 → コンテンツ高さ
- `accordion-up`: コンテンツ高さ → 0

Radix の `data-[state=open]` / `data-[state=closed]` で切り替え。

## API

Radix UI の props をそのままパススルー。独自 prop は追加しない。
`className` による外部スタイル上書きは `cn()` で対応。

## 設計判断

- variant なし — YAGNI。ボーダー区切り1種類で始める
- `type` は single/multiple 両対応 — Radix がそのまま提供するため追加コストなし
- アニメーションあり — 他コンポーネント（Dialog, Tooltip 等）と統一
