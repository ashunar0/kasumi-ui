# Field コンポーネント Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** フォーム入力フィールドのレイアウト・セマンティクスを担う Field 複合コンポーネントを実装し、react-hook-form + zod と組み合わせたログインフォームデモをカタログに追加する。

**Architecture:** shadcn/ui の新 Field コンポーネントに準拠。Field 自体は react-hook-form に非依存の純粋なレイアウトコンポーネント。カタログデモで react-hook-form + zod を使いバリデーション付きフォームを実演。

**Tech Stack:** React 19, Tailwind CSS 4, react-hook-form, @hookform/resolvers, zod

---

### Task 1: 依存パッケージのインストール

**Step 1: パッケージ追加**

Run: `pnpm add react-hook-form @hookform/resolvers zod`

**Step 2: インストール確認**

Run: `pnpm ls react-hook-form @hookform/resolvers zod`
Expected: 3パッケージが表示される

**Step 3: コミット**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: react-hook-form, @hookform/resolvers, zod を追加"
```

---

### Task 2: Field コンポーネント実装

**Files:**
- Create: `src/components/ui/field.tsx`

**Step 1: Field コンポーネントを実装**

```tsx
import { type ComponentProps } from "react";
import { type FieldError as RHFFieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// --- Field ---
export function Field({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

// --- FieldLabel ---
export function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn(
        "group-data-[invalid=true]/field:text-destructive",
        className
      )}
      {...props}
    />
  );
}

// --- FieldDescription ---
export function FieldDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-ui text-muted-foreground", className)}
      {...props}
    />
  );
}

// --- FieldError ---
type FieldErrorProps = Omit<ComponentProps<"p">, "children"> & {
  errors?: (RHFFieldError | undefined)[];
};

export function FieldError({ errors, className, ...props }: FieldErrorProps) {
  const message = errors?.find((e) => e?.message)?.message;
  if (!message) return null;

  return (
    <p
      role="alert"
      className={cn("text-ui text-destructive", className)}
      {...props}
    >
      {message}
    </p>
  );
}

// --- FieldGroup ---
export function FieldGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("grid gap-4", className)}
      {...props}
    />
  );
}

// --- FieldSet ---
export function FieldSet({ className, ...props }: ComponentProps<"fieldset">) {
  return (
    <fieldset
      className={cn("grid gap-4", className)}
      {...props}
    />
  );
}

// --- FieldLegend ---
export function FieldLegend({ className, ...props }: ComponentProps<"legend">) {
  return (
    <legend
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}
```

**注意:** FieldError の `errors` prop は `react-hook-form` の `FieldError` 型を受け取るが、これは型のみの import。Field コンポーネントの実行時に react-hook-form は不要（message プロパティを持つオブジェクトなら何でも動く）。

**Step 2: data-invalid の伝播を確認**

Field に `data-invalid={true}` を渡すと FieldLabel が `text-destructive` になる仕組み。Field 側で `group/field` クラスを付ける必要がある。

Field の className を修正:
```tsx
className={cn("group/field grid gap-2", className)}
```

**Step 3: ビルド確認**

Run: `pnpm build`
Expected: エラーなし

**Step 4: コミット**

```bash
git add src/components/ui/field.tsx
git commit -m "feat(field): Field 複合コンポーネントを実装"
```

---

### Task 3: カタログページにフィールドデモを追加

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: import 追加**

page.tsx の import セクションに以下を追加:

```tsx
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
```

**Step 2: ログインフォームデモコンポーネントを作成**

page.tsx 内に `LoginFormDemo` コンポーネントを追加（`SelectDemo` と同じパターンで）:

```tsx
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しい形式で入力してください"),
  password: z.string().min(8, "8文字以上で入力してください"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginFormDemo() {
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: LoginFormValues) {
    toast({
      variant: "success",
      title: "ログイン成功",
      description: `${data.email} でログインしました`,
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="login-email">メールアドレス</FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="login-password">パスワード</FieldLabel>
                  <Input
                    {...field}
                    id="login-password"
                    type="password"
                    placeholder="8文字以上"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="login-form" className="w-full">
          ログイン
        </Button>
      </CardFooter>
    </Card>
  );
}
```

**Step 3: Section を追加**

カタログページのセクション一覧に「フィールド」セクションを追加。配置はフォーム入力系（テキスト入力、ラベル）の後:

```tsx
<Section title="フィールド">
  <div className="space-y-4">
    <p className="text-ui text-muted-foreground">
      ラベル・入力・エラーメッセージをまとめるレイアウトコンポーネント。react-hook-form
      + zod でバリデーション付きフォームを構成できます。
    </p>
    <LoginFormDemo />
  </div>
</Section>
```

**Step 4: ビルド確認**

Run: `pnpm build`
Expected: エラーなし

**Step 5: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat(catalog): Field コンポーネントのデモを追加"
```

---

### Task 4: CLAUDE.md ドキュメント更新

**Files:**
- Modify: `CLAUDE.md`

**Step 1: ファイル構成に field.tsx を追加**

`components/ui/` セクションに `field.tsx` を追加。

**Step 2: 実装済みコンポーネントに Field を追加**

```markdown
- **Field** — 自作、複合コンポーネント（Field/FieldLabel/FieldDescription/FieldError/FieldGroup/FieldSet/FieldLegend）、フォーム入力フィールドのレイアウト・セマンティクス担当、react-hook-form 非依存、data-invalid によるエラー状態伝播
```

**Step 3: カタログページのセクション順にフィールドを追加**

**Step 4: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: Field コンポーネントのドキュメントを追加"
```
