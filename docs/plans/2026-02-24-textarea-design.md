# Textarea コンポーネント設計

## 概要

ネイティブ `<textarea>` ベースの複数行テキスト入力コンポーネント。
Input の outline variant と同じスタイルパターンを踏襲する。

## API

```tsx
type TextareaProps = ComponentProps<"textarea"> & {
  error?: boolean;
};
```

- `error`: エラー状態の切り替え
- size prop は不要（高さは `rows` 属性や CSS で制御）
- variant は outline のみ（underline は1行入力向き）

## 使い方

```tsx
<Textarea placeholder="メッセージを入力してください" />
<Textarea error />
<Textarea disabled />
<Textarea rows={8} />
```

## ビジュアル実装

Input の outline variant をベースにしたスタイル:

- `border border-input rounded-lg bg-background`
- `px-3.5 py-2 text-sm`
- `min-h-20`（デフォルト最小高さ）
- `resize-y`（縦方向のみリサイズ可能）
- フォーカス: `focus-visible:border-foreground`
- エラー: `border-destructive`
- 無効: `opacity-50 pointer-events-none`
- placeholder: `text-muted-foreground`

## 設計判断の根拠

### なぜ size prop を持たないのか

Input は高さ固定の1行入力なので sm/md/lg でサイズを切り替える意味があるが、Textarea は複数行入力であり高さが可変。サイズを prop で制御するよりも：

- HTML ネイティブの `rows` 属性で行数を指定する
- CSS（`className`）で高さを調整する

方が直感的で柔軟。size prop を追加しても「何が変わるか」が曖昧になる（高さ？フォントサイズ？パディング？）。シンプルに保つ。

### なぜ outline のみなのか

Input の underline variant は「1行入力をスッキリ見せる」ための日本語 UI 最適化。Textarea は複数行テキストを囲む必要があるため、下線だけでは入力領域の範囲が視覚的に伝わらない。outline（四辺の枠線）が Textarea の自然な形。

### min-h-20 の根拠

`min-h-20` = 80px で、`text-sm`（14px × line-height 1.5 ≒ 21px）の約3〜4行分。初期状態で「ここに複数行入力できる」ということが伝わる最小限の高さ。小さすぎると Input と区別がつかず、大きすぎるとページを無駄に消費する。

### なぜ resize-y なのか

- `resize: both` — 横方向にリサイズするとレイアウトが崩れる可能性がある
- `resize: none` — ユーザーが長文を書くとき不便
- `resize-y`（採用）— 縦方向のみリサイズを許可。レイアウトは崩れず、ユーザーの利便性も確保

## カタログ表示

Input セクションの直後に追加。通常・エラー・無効の3状態を表示。
