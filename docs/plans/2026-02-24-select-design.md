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

## 設計判断の根拠

### なぜフルスクラッチなのか

ネイティブ `<select>` やライブラリ（Radix UI）ではなくフルスクラッチで実装した理由：

- **ネイティブ `<select>` を使わない理由**: ドロップダウンの見た目がブラウザ/OS 依存で、デザインシステムとしてスタイルを統一できない。特に選択肢のフォント・色・チェックマーク・ホバー表現が制御不能
- **Radix UI を使わない理由**: プロジェクトの方針が依存ゼロ（YAGNI）。Select 1つのために Radix を導入すると、バンドルサイズと依存管理のコストが発生する。ただし、アクセシビリティやエッジケース対応が辛くなったら Radix に切り替える選択肢は残している

### なぜ複合コンポーネントパターンなのか

Select は内部に複数の関心事（トリガー表示、ドロップダウン配置、選択肢管理）を持つ。これを1つのコンポーネントに押し込むと props が爆発する：

```tsx
// こうなる（悪い例）
<Select items={[...]} renderTrigger={...} renderItem={...} placement="bottom" />
```

複合コンポーネント（Select / SelectTrigger / SelectValue / SelectContent / SelectItem）に分けることで：
- 各パーツの責務が明確になる
- JSX の構造がそのまま UI の構造を表す
- Card コンポーネントと同じパターンで一貫性がある

### なぜ Portal を使わないのか

ドロップダウンを `document.body` に Portal で配置する方法もあるが：

- 現時点でオーバーフロー問題が発生していない（カタログページは余白が十分）
- Portal を使うと z-index 管理やスクロール追従のコードが必要になる
- absolute 配置で十分動いているうちは追加の複雑さを入れない（YAGNI）
- 実際にモーダル内で Select を使うなど、表示が切れる問題が起きたら Portal に切り替える

### なぜ controlled only なのか

`value` + `onValueChange` の controlled パターンのみを提供する。uncontrolled（内部 state で value を管理）も実装できるが：

- フォームライブラリ（React Hook Form 等）との統合では controlled が必須
- uncontrolled は value の初期値と変更通知だけでよく、controlled の subset として表現できる
- 両方サポートすると内部のロジックが複雑になる

### なぜグループ分けを作らないのか

`<SelectGroup>` + `<SelectLabel>` のようなグルーピング機能は、選択肢が多い場合（都道府県の地方別グルーピング等）に便利だが：

- 現時点の用途で必要になっていない
- グルーピングを追加しても既存の API に破壊的変更は不要（後から足せる）
- YAGNI
