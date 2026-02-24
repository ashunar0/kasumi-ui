# Checkbox コンポーネント設計

## 概要

ネイティブ `<input type="checkbox">` ベースの Checkbox コンポーネント。
`appearance-none` で見た目をリセットし、Tailwind CSS でスタイリングする。

## API

```tsx
type CheckboxProps = Omit<ComponentProps<"input">, "type" | "size"> & {
  size?: "sm" | "md" | "lg";
  error?: boolean;
};
```

- `type="checkbox"` は内部で固定
- Input と同じ `ComponentProps<"input">` 拡張 + `size` 上書きパターン
- Label との組み合わせは `<label>` + flexbox で並べる（専用 wrapper は作らない）

### 使い方

```tsx
<Checkbox />
<Checkbox checked onChange={handleChange} />
<Checkbox disabled />
<Checkbox size="lg" error />

// Label と組み合わせ
<label className="flex items-center gap-2">
  <Checkbox />
  <span className="text-sm">利用規約に同意する</span>
</label>
```

## サイズ

| size | ボックス | 角丸 | 根拠 |
|------|---------|------|------|
| sm | 16px (`size-4`) | `rounded` (4px) | 小さめUI用 |
| md | 18px (`size-4.5`) | `rounded` (4px) | デフォルト。text-sm と並べてバランス良い |
| lg | 20px (`size-5`) | `rounded-md` (6px) | 大きめフォーム用 |

## 状態

| 状態 | ボーダー | 背景 | チェックマーク |
|------|---------|------|--------------|
| 未チェック | `border-input` | 透明 | なし |
| チェック済 | `border-primary` | `bg-primary` | 白の SVG チェックマーク |
| フォーカス | `border-foreground` | — | — |
| disabled | `opacity-50` + `pointer-events-none` | — | — |
| error | `border-destructive` | — | — |

## チェックマーク

`checked:` 修飾子 + `bg-[url('data:image/svg+xml,...')]` で SVG チェックマークをインライン表示。
JavaScript 不要でチェック状態に応じて自動切り替え。

## カタログ配置

Select の下、Label の上にセクションを追加。
md と lg の2サイズで各状態（通常・チェック済・エラー・disabled）を一覧表示。
