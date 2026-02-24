# Select コンポーネント設計

## 概要

カスタムドロップダウン型の Select コンポーネント。フルスクラッチで実装し、依存ゼロ。
辛くなったら Radix UI に切り替える判断もあり。

## 方針

- shadcn/ui の Select を参考にした API
- 複合コンポーネントパターン（Card と同じ）
- フルスクラッチ（useState + useRef + useEffect）
- グループ分けは不要（YAGNI）
- ドロップダウンはトリガー直下に absolute 配置（Portal 不要）

## コンポーネント構成

| パーツ | 役割 |
|--------|------|
| `Select` | ルート。Context で value, open 状態を管理 |
| `SelectTrigger` | クリックで開閉するボタン。Input と同じ見た目 |
| `SelectValue` | トリガー内に表示される選択値 or placeholder |
| `SelectContent` | ドロップダウン本体 |
| `SelectItem` | 各選択肢 |

## API

```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="都道府県を選択" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="tokyo">東京</SelectItem>
    <SelectItem value="osaka">大阪</SelectItem>
    <SelectItem value="fukuoka">福岡</SelectItem>
  </SelectContent>
</Select>
```

## Props

- `Select`: `value?: string`, `onValueChange?: (value: string) => void`, `disabled?: boolean`
- `SelectTrigger`: `className?`, `error?: boolean`
- `SelectValue`: `placeholder?: string`
- `SelectContent`: `className?`
- `SelectItem`: `value: string`, `disabled?: boolean`, `className?`

## 振る舞い

### 開閉
- トリガークリック or Enter/Space で開閉トグル
- Escape で閉じる
- ドロップダウン外クリックで閉じる
- 選択したら閉じる

### キーボードナビゲーション
- ↑↓ でフォーカス移動（disabled な項目はスキップ）
- Enter/Space で選択
- 開いた時、現在の選択値にフォーカス（なければ先頭）

### アクセシビリティ（ARIA）
- トリガー: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`
- コンテンツ: `role="listbox"`
- アイテム: `role="option"`, `aria-selected`, `aria-disabled`

## 見た目

- トリガー: Input と同じスタイルライン（`h-10 rounded-lg border-input text-sm`）
- 右端にシェブロン（▼）SVG アイコン
- ドロップダウン: `rounded-lg border shadow-md bg-background`
- 選択中アイテムにチェックマーク（✓）
- ホバー/フォーカスで `bg-accent`

## 状態管理

React Context で Select ルートから子コンポーネントに共有:
- `value`: 現在の選択値
- `onValueChange`: 値変更コールバック
- `open`: ドロップダウンの開閉状態
- `disabled`: 全体の無効状態
