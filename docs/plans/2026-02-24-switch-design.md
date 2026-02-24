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

## 設計判断の根拠

### なぜ checkbox ベースなのか

Switch の実装方法として2つの選択肢を検討した：

1. **`<input type="checkbox" role="switch">`**（採用）— Checkbox/Radio と同じネイティブ input パターンで統一。フォーム送信・アクセシビリティがネイティブで動く。`role="switch"` を付与することでスクリーンリーダーに「トグルスイッチ」として認識される
2. **`<button role="switch" aria-checked>`** — セマンティックには正しいが、状態管理を自前で持つ必要があり、フォーム送信にも追加ロジックが要る

Checkbox と同じ `<input>` で揃えることで、フォーム系コンポーネント全体の実装パターンが統一される。

### なぜ role を Omit するのか

`role="switch"` は Switch コンポーネントの本質的な属性であり、外部から上書きされるべきではない。`role` を props の型から除外することで、利用者が誤って `role="checkbox"` などを渡すことを防ぐ。

### トラックとつまみのサイズ比率

各サイズでつまみ直径はトラック高さの 80% に統一している（sm: 12/16=75%, md: 16/20=80%, lg: 20/24≈83%）。つまみが小さすぎるとクリック対象が見えにくく、大きすぎるとトラックの余白がなくなりスライドの動きが伝わりにくい。

translate-x の値はトラック幅からつまみ直径と両端オフセット（2px×2）を引いた値：
- sm: 28 - 12 - 4 = 12px
- md: 36 - 16 - 4 = 16px
- lg: 44 - 20 - 4 = 20px

### つまみの色とダークモード対応

つまみの色は状態によって切り替える：
- **OFF 時**: `bg-foreground` — ライトモードでは暗い色（#1c1917）、ダークモードでは明るい色（#f5f3f0）。どちらもグレー系トラック（`bg-input`）に対してコントラストが取れる
- **ON 時**: `peer-checked:bg-primary-foreground` — primary 背景に対するコントラスト色に切り替わる

最初は `bg-primary-foreground` のみだったが、コードレビューで OFF 時にトラックとつまみが溶け合う問題が指摘され、2色切り替えに修正した。

### トラックの border

Checkbox/Radio と同じ `border-input` を採用。最初は `border-transparent`（枠線なし）で実装したが、ダークモードでトラック背景（`bg-input: #2e2c2a`）とページ背景（`bg-background: #0f0e0d`）のコントラストが低く、トラックの輪郭が見えにくくなるため `border-input` に統一した。

## カタログ表示

Radio セクションの直後に追加。md / lg サイズで以下の状態を表示:

- 通常（OFF）
- ON（defaultChecked）
- エラー状態
- 無効状態
