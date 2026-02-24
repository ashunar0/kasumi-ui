# Radio コンポーネント設計

## 概要

ネイティブ `<input type="radio">` ベースのラジオボタンコンポーネント。
Checkbox と同じ設計パターン（peer + CSS による視覚表現）を踏襲する。

## API

```tsx
type RadioProps = Omit<ComponentProps<"input">, "size" | "type"> & {
  error?: boolean;
  size?: "sm" | "md" | "lg";
};
```

- `size`: sm / md / lg（デフォルト: md）
- `error`: エラー状態の切り替え
- `name` 属性でグルーピング（ネイティブ HTML の仕組みを利用）
- RadioGroup コンポーネントは作らない（YAGNI）

## 使い方

```tsx
<fieldset>
  <legend>参加可否</legend>
  <label className="flex items-center gap-2">
    <Radio name="attendance" value="yes" />
    参加する
  </label>
  <label className="flex items-center gap-2">
    <Radio name="attendance" value="no" />
    参加しない
  </label>
</fieldset>
```

## ビジュアル実装

### 構造

```
<span class="relative inline-flex">
  <input type="radio" class="peer appearance-none rounded-full ..." />
  <span class="...hidden peer-checked:block rounded-full bg-white" />
</span>
```

Checkbox の peer + SVG パターンを踏襲。チェックマークは SVG ではなく CSS 丸ドット。

### サイズ体系（Checkbox と統一）

| サイズ | 外枠 | 内丸（直径） |
|--------|------|-------------|
| sm | 16px (h-4 w-4) | 8px |
| md | 18px (h-[18px] w-[18px]) | 9px |
| lg | 20px (h-5 w-5) | 10px |

### 状態スタイル（Checkbox と統一）

- デフォルト: `border-input`
- チェック時: `bg-primary border-primary` + 白い丸ドット中央配置
- フォーカス: `border-foreground`
- エラー: `border-destructive`
- 無効: `opacity-50 pointer-events-none`

## 設計判断の根拠

### なぜ Checkbox と同じパターンなのか

Radio は Checkbox の兄弟コンポーネント。どちらもネイティブ `<input>` で、ON/OFF の二値状態を持ち、フォーム内で使われる。違いは「複数選択 vs 排他選択」だけなので、実装パターンを統一することで学習コストを下げ、コードの一貫性を保てる。

### なぜ SVG ではなく CSS 丸ドットなのか

Checkbox のチェックマークは形状が複雑（✓の折れ線）なので SVG が適切だが、Radio の選択表示は単純な丸点。`rounded-full` + 固定サイズの `<span>` で十分表現でき、SVG を持ち出す理由がない。

### なぜ RadioGroup を作らないのか

ネイティブ HTML の `name` 属性だけでラジオボタンのグルーピングと排他選択が実現できる。RadioGroup wrapper を作ると：

- `name` を自動付与する程度のことしかできず、コンポーネントの価値が薄い
- レイアウト（縦並び / 横並び / グリッド）を wrapper に閉じ込めると自由度が下がる
- 将来必要になったら追加すればいい（YAGNI）

### 内丸のサイズ根拠

外枠の約半分を内丸のサイズとした（sm: 16→8, md: 18→9, lg: 20→10）。外枠に対して小さすぎると点が見えにくく、大きすぎると枠との余白がなくなり「丸の中に丸」に見えなくなる。50% は視覚的に最もバランスが良い比率。

### ダークモード対応

内丸の色は `bg-primary-foreground` を使用。`bg-white` だとダークモードで primary 背景（`#f5f3f0`）に溶けてしまう。`primary-foreground` はライト/ダークモード両方で primary に対するコントラスト色が定義されている。

## カタログ表示

Checkbox セクションの直後に追加。md / lg サイズで以下の状態を表示:

- 通常（未選択）
- チェック済み（defaultChecked）
- エラー状態
- 無効状態
