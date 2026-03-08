# Progress コンポーネント設計

## 概要

進捗バー。タスク完了率やファイルアップロード等の進捗表示に使用。

## ベース

自作（CSS + HTML）。Radix UI 不要。

## コンポーネント構成

単体コンポーネント `Progress` のみ。複合構成なし。

## Props

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `value` | `number` | `0` | 進捗率（0〜100） |
| `className` | `string` | — | 外枠のスタイル上書き |

## スタイル

- 外枠: `h-2 rounded-full bg-secondary` — 角丸の背景バー
- 内側: `h-full rounded-full bg-primary transition-all` — 進捗表示
- 幅: `style={{ width: \`${value}%\` }}` で制御
- 値変更時は `transition-all` でスムーズにアニメーション

## 設計判断

- size なし — YAGNI。高さ変更は className で外から対応
- variant なし — バー型1種類で十分
- インデターミネート（不定進捗）なし — 必要になってから追加
- Radix UI 不使用 — CSS + HTML で完結する単純な見た目コンポーネント
