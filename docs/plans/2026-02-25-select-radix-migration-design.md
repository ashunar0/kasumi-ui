# Select コンポーネント Radix UI 移行設計

## 概要

自作の Select コンポーネントを `@radix-ui/react-select` ベースに差し替える。
見た目（デザイントークン・スタイル）は現状を維持し、振る舞いを Radix に委譲する。

## 方針

- **API 維持**: page.tsx 側のコードは一切変更しない
- **Radix ラップ方式**: shadcn/ui と同じパターンで、Radix を内部に隠蔽
- **カスタム props 維持**: `error`, `size` はそのまま残す

## 依存追加

```
@radix-ui/react-select
```

## コンポーネントマッピング

| 自作コンポーネント | 内部で使う Radix パーツ |
|---|---|
| `Select` | `Radix.Root` |
| `SelectTrigger` | `Radix.Trigger` |
| `SelectValue` | `Radix.Value` |
| `SelectContent` | `Radix.Portal` + `Radix.Content` + `Radix.Viewport` |
| `SelectItem` | `Radix.Item` + `Radix.ItemText` + `Radix.ItemIndicator` |

## 削除されるコード

Radix が肩代わりするため不要になる：
- `useState` での開閉管理
- `useRef` + `useEffect` での外側クリック検出
- `requestAnimationFrame` でのフォーカス管理
- `onKeyDown` でのキーボードナビゲーション
- `React.createContext` での状態共有
- `useSelectContext` フック
- `itemLabels` Map によるラベル管理

## 維持されるコード

- `error` prop → ボーダー色の切り替え（Tailwind クラス）
- `size` prop → `h-9/h-10/h-11` のサイズ切り替え
- デザイントークンに基づく全スタイリング

## 得られる改善

- Portal による `overflow: hidden` 問題の解消
- 画面端での自動位置調整
- 型文字検索（typeahead）
- 完全な WAI-ARIA 準拠

## 設計判断

### なぜ Radix ラップ方式か

Radix を直接 re-export する方法もあるが、ラップ方式を採用する理由：
- 既存 API との互換性を維持できる（page.tsx 変更不要）
- `error`, `size` 等のカスタム props を自然に組み込める
- shadcn/ui と同じパターンで、業界標準の手法
- 将来 Radix 以外のライブラリに差し替えても API が変わらない
