# Switch コンポーネント設計

## 概要

ネイティブ `<input type="checkbox" role="switch">` ベースのトグルスイッチコンポーネント。
Checkbox/Radio と同じ設計パターン（peer modifier + Tailwind）を踏襲する。

## API

```tsx
type SwitchProps = Omit<ComponentProps<"input">, "size" | "type" | "role"> & {
  error?: boolean;
  size?: "sm" | "md" | "lg";
};
```

- `size`: sm / md / lg（デフォルト: md）
- `error`: エラー状態の切り替え
- `role="switch"` は内部で固定付与

## 使い方

```tsx
<label className="flex items-center gap-2">
  <Switch />
  <span className="text-sm">通知を受け取る</span>
</label>
```

## ビジュアル実装

### 構造

```
<span class="relative inline-flex">
  <input type="checkbox" role="switch" class="peer appearance-none rounded-full ..." />
  <span class="...transition-transform peer-checked:translate-x-[Npx] rounded-full bg-primary-foreground" />
</span>
```

### サイズ体系

| サイズ | トラック (W×H) | つまみ直径 | translate-x |
|--------|---------------|-----------|-------------|
| sm | 28×16px | 12px | 12px |
| md | 36×20px | 16px | 16px |
| lg | 44×24px | 20px | 20px |

つまみは左端に 2px のオフセットを持ち、checked 時に右端へスライドする。

### 状態スタイル

- OFF: `bg-input`（グレー系トラック）+ つまみ左寄せ
- ON: `checked:bg-primary` + つまみ右にスライド
- フォーカス: `focus-visible:border-foreground`
- エラー: `border-destructive`
- 無効: `opacity-50 pointer-events-none`

つまみは `transition-transform` でスムーズにアニメーションする。
つまみの色は `bg-primary-foreground` でダークモード対応。

## カタログ表示

Radio セクションの直後に追加。md / lg サイズで以下の状態を表示:

- 通常（OFF）
- ON（defaultChecked）
- エラー状態
- 無効状態
