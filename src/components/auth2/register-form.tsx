import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">新規登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="name">ユーザー名</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="山田太郎"
                  variant="underline"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  variant="underline"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">パスワード</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  variant="underline"
                  required
                />
              </Field>
              <Field className="flex flex-col gap-4">
                <Button type="submit">新規登録</Button>
                <FieldDescription className="text-center text-sm">
                  アカウントをお持ちの方は{` `}
                  <Link href="/login2" className="underline hover:text-primary">
                    ログイン
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
