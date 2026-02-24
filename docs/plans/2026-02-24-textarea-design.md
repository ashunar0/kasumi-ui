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

## カタログ表示

Input セクションの直後に追加。通常・エラー・無効の3状態を表示。
