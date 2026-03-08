# Field コンポーネント設計

## 概要

フォーム入力フィールドのレイアウト・セマンティクスを担う複合コンポーネント。
shadcn/ui の新しい Field コンポーネント（旧 Form の後継）に準拠。

**Field 自体は react-hook-form に依存しない。** 純粋なレイアウトコンポーネントとして設計し、react-hook-form を使う場合は Controller を直接組み合わせる。

## 依存追加

- `react-hook-form` — フォーム状態管理（カタログのデモで使用。Field コンポーネント自体は非依存）
- `@hookform/resolvers` — zod 連携用（同上）
- `zod` — スキーマバリデーション（同上）

## コンポーネント構成

ファイル: `src/components/ui/field.tsx`

| コンポーネント | HTML | 役割 |
|---|---|---|
| Field | `<div>` | 1つのフィールドをまとめるレイアウト。gap で間隔管理。`data-invalid` 属性でエラー状態を伝播 |
| FieldLabel | 既存 Label をラップ | ラベル。親の `data-invalid` 時に `text-destructive` |
| FieldDescription | `<p>` | 補足テキスト（`text-muted-foreground text-ui`） |
| FieldError | `<p>` | エラーメッセージ表示（`text-destructive text-ui`）。`errors` prop で受け取る |
| FieldGroup | `<div>` | 複数の Field を縦に並べる。フォーム全体の gap 管理 |
| FieldSet | `<fieldset>` | セマンティックなグルーピング |
| FieldLegend | `<legend>` | FieldSet の見出し |

## 使い方

### react-hook-form なし

```tsx
<Field>
  <FieldLabel htmlFor="name">名前</FieldLabel>
  <Input id="name" placeholder="山田太郎" />
  <FieldDescription>表示名として使われます</FieldDescription>
</Field>
```

### react-hook-form + zod

```tsx
<Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="login-email">メールアドレス</FieldLabel>
      <Input {...field} id="login-email" aria-invalid={fieldState.invalid} />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

## カタログ

ログインフォームのデモを追加。react-hook-form + zod でバリデーション付きのインタラクティブな例。

## スコープ外（YAGNI）

- FieldContent（Switch の横並びレイアウト用）
- FieldSeparator
- useFieldArray 対応
