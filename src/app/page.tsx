import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-h3 font-semibold tracking-tight">{title}</h2>
      <div className="border-t border-border pt-6">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-16">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-h2 font-bold tracking-tight">my-ui</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            あさひのUIライブラリ
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Typography */}
      <Section title="タイポグラフィ">
        <div className="space-y-4">
          <h1 className="text-h1 font-bold tracking-tight">
            H1 日程調整アプリ（33px）
          </h1>
          <h2 className="text-h2 font-semibold tracking-tight">
            H2 スケジュール管理（28px）
          </h2>
          <h3 className="text-h3 font-semibold tracking-tight">
            H3 今週の予定（23px）
          </h3>
          <h4 className="text-h4 font-semibold tracking-tight">
            H4 ミーティング一覧（19px）
          </h4>
          <p className="text-body">
            本文（16px） —
            日程調整アプリは、参加者全員の空き時間を自動で照合し、最適な候補日を提案します。複数のカレンダーと連携できるため、手動で調整する手間がなくなります。
          </p>
          <p className="text-ui">
            UI文（14px） —
            予定が3件あります。タップして詳細を確認してください。次のミーティングは来週の月曜日10:00からで、参加者は田中さん、佐藤さん、鈴木さんの3名です。議題は「第3四半期のスケジュール調整」となっています。
          </p>
        </div>
      </Section>

      {/* Button */}
      <Section title="ボタン">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">保存する</Button>
            <Button variant="secondary">下書き保存</Button>
            <Button variant="outline">キャンセル</Button>
            <Button variant="ghost">もっと見る</Button>
            <Button variant="destructive">削除する</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">小さい</Button>
            <Button size="md">ふつう</Button>
            <Button size="lg">大きい</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button disabled>送信済み</Button>
          </div>
        </div>
      </Section>

      {/* Input */}
      <Section title="テキスト入力">
        <div className="space-y-4 max-w-sm">
          <Input placeholder="お名前を入力してください" />
          <Input placeholder="正しいメールアドレスを入力してください" error />
          <Input placeholder="入力できません" disabled />
        </div>
      </Section>

      {/* Label */}
      <Section title="ラベル">
        <div className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="demo-email">メールアドレス</Label>
            <Input
              id="demo-email"
              type="email"
              placeholder="taro@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-name">お名前</Label>
            <Input id="demo-name" placeholder="山田 太郎" />
          </div>
        </div>
      </Section>

      {/* Card */}
      <Section title="カード">
        <div className="grid items-start gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>予定の確認</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                来週の月曜日、10:00〜11:00にミーティングがあります。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>日程を調整する</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                参加者3人の空き時間から候補を選びましょう。
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">候補を見る</Button>
              <Button size="sm" variant="outline">
                キャンセル
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section>
    </div>
  );
}
