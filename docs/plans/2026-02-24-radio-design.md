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

## カタログ表示

Checkbox セクションの直後に追加。md / lg サイズで以下の状態を表示:

- 通常（未選択）
- チェック済み（defaultChecked）
- エラー状態
- 無効状態
