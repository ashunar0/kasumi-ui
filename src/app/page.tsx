"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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

function SelectDemo() {
  const [value, setValue] = useState("");
  const [valueLg, setValueLg] = useState("");
  return (
    <div className="space-y-8 max-w-sm">
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">md</p>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="都道府県を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tokyo">東京</SelectItem>
            <SelectItem value="osaka">大阪</SelectItem>
            <SelectItem value="fukuoka">福岡</SelectItem>
          </SelectContent>
        </Select>
        <Select value="" onValueChange={() => {}}>
          <SelectTrigger error>
            <SelectValue placeholder="必須項目です" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">選択肢A</SelectItem>
          </SelectContent>
        </Select>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="選択できません" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">選択肢A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">lg</p>
        <Select value={valueLg} onValueChange={setValueLg}>
          <SelectTrigger size="lg">
            <SelectValue placeholder="都道府県を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tokyo">東京</SelectItem>
            <SelectItem value="osaka">大阪</SelectItem>
            <SelectItem value="fukuoka">福岡</SelectItem>
          </SelectContent>
        </Select>
        <Select value="" onValueChange={() => {}}>
          <SelectTrigger size="lg" error>
            <SelectValue placeholder="必須項目です" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">選択肢A</SelectItem>
          </SelectContent>
        </Select>
        <Select disabled>
          <SelectTrigger size="lg">
            <SelectValue placeholder="選択できません" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">選択肢A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
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
        <div className="space-y-8 max-w-sm">
          {/* outline (デフォルト) — md */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">
              outline — md
            </p>
            <Input placeholder="お名前を入力してください" />
            <Input placeholder="正しいメールアドレスを入力してください" error />
            <Input placeholder="入力できません" disabled />
          </div>

          {/* outline — lg */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">
              outline — lg
            </p>
            <Input placeholder="お名前を入力してください" size="lg" />
            <Input
              placeholder="正しいメールアドレスを入力してください"
              size="lg"
              error
            />
            <Input placeholder="入力できません" size="lg" disabled />
          </div>

          {/* underline — md */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">
              underline — md
            </p>
            <Input variant="underline" placeholder="お名前を入力してください" />
            <Input
              variant="underline"
              placeholder="正しいメールアドレスを入力してください"
              error
            />
            <Input variant="underline" placeholder="入力できません" disabled />
          </div>

          {/* underline — lg */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">
              underline — lg
            </p>
            <Input
              variant="underline"
              size="lg"
              placeholder="お名前を入力してください"
            />
            <Input
              variant="underline"
              size="lg"
              placeholder="正しいメールアドレスを入力してください"
              error
            />
            <Input
              variant="underline"
              size="lg"
              placeholder="入力できません"
              disabled
            />
          </div>
        </div>
      </Section>

      {/* Select */}
      <Section title="セレクト">
        <SelectDemo />
      </Section>

      {/* Checkbox */}
      <Section title="チェックボックス">
        <div className="space-y-8 max-w-sm">
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">md</p>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">利用規約に同意する</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox defaultChecked />
              <span className="text-sm">メール通知を受け取る</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox error />
              <span className="text-sm text-destructive">必須項目です</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox disabled />
              <span className="text-sm text-muted-foreground">選択できません</span>
            </label>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">lg</p>
            <label className="flex items-center gap-2">
              <Checkbox size="lg" />
              <span className="text-sm">利用規約に同意する</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox size="lg" defaultChecked />
              <span className="text-sm">メール通知を受け取る</span>
            </label>
          </div>
        </div>
      </Section>

      {/* Label */}
      <Section title="ラベル">
        <div className="space-y-8 max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="demo-email">メールアドレス</Label>
            <Input
              variant="underline"
              size="lg"
              id="demo-email"
              type="email"
              placeholder="taro@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="demo-name">お名前</Label>
            <Input variant="outline" size="lg" id="demo-name" placeholder="山田 太郎" />
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
