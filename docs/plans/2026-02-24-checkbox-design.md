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

`peer` + SVG 要素方式。`peer-checked:block` でチェック時のみ SVG を表示。
Turbopack が CSS の `url()` を解決しようとする問題を回避。

## 設計判断の根拠

### なぜネイティブ input を使うのか

button + aria-checked で実装する方法（Select コンポーネントで採用したカスタム実装）も検討したが、Checkbox は十分シンプルなためネイティブ要素で十分と判断した。

- フォーム送信が追加コードなしで動く（name/value が自動送信される）
- ブラウザ組み込みのアクセシビリティ（スクリーンリーダー対応、キーボード操作）がそのまま使える
- Input コンポーネントと同じ `ComponentProps<"input">` パターンで API が統一できる
- 依存ゼロの方針と合致する

Select は「ネイティブ select では見た目のカスタマイズが困難」という制約があったためカスタム実装にしたが、Checkbox にはその制約がない。

### なぜ peer + SVG パターンなのか

チェックマークの表示方法として3つの選択肢を検討した：

1. **CSS `background-image` + data URL** — 最初に試したが、Turbopack が CSS 内の `url()` をモジュールとして解決しようとしてビルドエラーになった
2. **CSS `::after` 擬似要素** — Tailwind CSS ではやや冗長になる
3. **peer + SVG 兄弟要素**（採用）— `peer-checked:block` で表示切り替え。Turbopack の制約を回避しつつ、Tailwind のユーティリティだけで完結する

### サイズの根拠

- **md (18px)**: `text-sm`（14px）のラベルテキストと並べたとき、視覚的にバランスが取れるサイズ。16px だと小さすぎ、20px だと主張が強すぎる
- **sm (16px)**: コンパクト UI 用。md から 2px 小さくして最小限の差をつける
- **lg (20px)**: 大きめフォーム用。lg サイズの Input（h-11 = 44px）と組み合わせたときの比率
- 角丸は sm/md が `rounded`（4px）、lg のみ `rounded-md`（6px）。小さいボックスに大きい角丸をつけると形が崩れるため

### なぜ専用の Label wrapper を作らないのか

`<label className="flex items-center gap-2">` で十分機能する。wrapper コンポーネントを作ると gap やレイアウトの自由度が下がるため、HTML の `<label>` をそのまま使う方がシンプル（YAGNI）。

## カタログ配置

Select の下、Label の上にセクションを追加。
md と lg の2サイズで各状態（通常・チェック済・エラー・disabled）を一覧表示。
