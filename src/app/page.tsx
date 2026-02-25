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
import { Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";

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
    <div className="flex gap-8">
      <div className="space-y-3 flex-1">
        <p className="text-ui text-muted-foreground">md</p>
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

      <div className="space-y-3 flex-1">
        <p className="text-ui text-muted-foreground">lg</p>
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

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="primary"
        onClick={() =>
          toast({ title: "保存しました", description: "予定を保存しました。" })
        }
      >
        成功 Toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: "エラーが発生しました",
            description: "保存に失敗しました。もう一度お試しください。",
            variant: "destructive",
          })
        }
      >
        エラー Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast({ title: "リンクをコピーしました" })}
      >
        タイトルのみ
      </Button>
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
        <div className="space-y-8">
          {/* outline */}
          <div className="flex gap-8">
            <div className="space-y-3 flex-1">
              <p className="text-ui text-muted-foreground">outline — md</p>
              <Input placeholder="お名前を入力してください" />
              <Input placeholder="正しいメールアドレスを入力してください" error />
              <Input placeholder="入力できません" disabled />
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-ui text-muted-foreground">outline — lg</p>
              <Input size="lg" placeholder="お名前を入力してください" />
              <Input size="lg" placeholder="正しいメールアドレスを入力してください" error />
              <Input size="lg" placeholder="入力できません" disabled />
            </div>
          </div>

          {/* password */}
          <div className="flex gap-8">
            <div className="space-y-3 flex-1">
              <p className="text-ui text-muted-foreground">password — md</p>
              <Input type="password" placeholder="パスワードを入力" />
              <Input type="password" placeholder="パスワードが短すぎます" error />
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-ui text-muted-foreground">password — lg</p>
              <Input type="password" size="lg" placeholder="パスワードを入力" />
              <Input type="password" size="lg" placeholder="パスワードが短すぎます" error />
            </div>
          </div>

          {/* underline */}
          <div className="flex gap-8">
            <div className="space-y-3 flex-1">
              <p className="text-ui text-muted-foreground">underline — md</p>
              <Input variant="underline" placeholder="お名前を入力してください" />
              <Input variant="underline" placeholder="正しいメールアドレスを入力してください" error />
              <Input variant="underline" placeholder="入力できません" disabled />
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-ui text-muted-foreground">underline — lg</p>
              <Input variant="underline" size="lg" placeholder="お名前を入力してください" />
              <Input variant="underline" size="lg" placeholder="正しいメールアドレスを入力してください" error />
              <Input variant="underline" size="lg" placeholder="入力できません" disabled />
            </div>
          </div>

          {/* underline password */}
          <div className="flex gap-8">
            <div className="space-y-3 flex-1">
              <p className="text-ui text-muted-foreground">underline password — md</p>
              <Input variant="underline" type="password" placeholder="パスワードを入力" />
              <Input variant="underline" type="password" placeholder="パスワードが短すぎます" error />
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-ui text-muted-foreground">underline password — lg</p>
              <Input variant="underline" type="password" size="lg" placeholder="パスワードを入力" />
              <Input variant="underline" type="password" size="lg" placeholder="パスワードが短すぎます" error />
            </div>
          </div>
        </div>
      </Section>

      {/* Textarea */}
      <Section title="テキストエリア">
        <div className="flex gap-8">
          <div className="space-y-3 flex-1">
            <p className="text-ui text-muted-foreground">md</p>
            <Textarea placeholder="メッセージを入力してください" />
            <Textarea placeholder="正しい内容を入力してください" error />
            <Textarea placeholder="入力できません" disabled />
          </div>
          <div className="space-y-3 flex-1">
            <p className="text-ui text-muted-foreground">lg</p>
            <Textarea size="lg" placeholder="メッセージを入力してください" />
            <Textarea size="lg" placeholder="正しい内容を入力してください" error />
            <Textarea size="lg" placeholder="入力できません" disabled />
          </div>
        </div>
      </Section>

      {/* Select */}
      <Section title="セレクト">
        <SelectDemo />
      </Section>

      {/* Checkbox */}
      <Section title="チェックボックス">
        <div className="flex gap-8">
          <div className="space-y-3 flex-1">
            <p className="text-ui text-muted-foreground">md</p>
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

          <div className="space-y-3 flex-1">
            <p className="text-ui text-muted-foreground">lg</p>
            <label className="flex items-center gap-2">
              <Checkbox size="lg" />
              <span className="text-sm">利用規約に同意する</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox size="lg" defaultChecked />
              <span className="text-sm">メール通知を受け取る</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox size="lg" error />
              <span className="text-sm text-destructive">必須項目です</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox size="lg" disabled />
              <span className="text-sm text-muted-foreground">選択できません</span>
            </label>
          </div>
        </div>
      </Section>

      {/* Radio */}
      <Section title="ラジオボタン">
        <div className="flex gap-8">
          <div className="space-y-3 flex-1">
            <p className="text-ui text-muted-foreground">md</p>
            <label className="flex items-center gap-2">
              <Radio name="demo-md" value="a" />
              <span className="text-sm">参加する</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio name="demo-md" value="b" defaultChecked />
              <span className="text-sm">不参加</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio name="demo-md-state" value="error" error />
              <span className="text-sm text-destructive">必須項目です</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio name="demo-md-state" value="disabled" disabled />
              <span className="text-sm text-muted-foreground">選択できません</span>
            </label>
          </div>

          <div className="space-y-3 flex-1">
            <p className="text-ui text-muted-foreground">lg</p>
            <label className="flex items-center gap-2">
              <Radio name="demo-lg" value="a" size="lg" />
              <span className="text-sm">参加する</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio name="demo-lg" value="b" size="lg" defaultChecked />
              <span className="text-sm">不参加</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio name="demo-lg-state" value="error" size="lg" error />
              <span className="text-sm text-destructive">必須項目です</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio name="demo-lg-state" value="disabled" size="lg" disabled />
              <span className="text-sm text-muted-foreground">選択できません</span>
            </label>
          </div>
        </div>
      </Section>

      {/* Switch */}
      <Section title="スイッチ">
        <div className="flex gap-8">
          <div className="space-y-3 flex-1">
            <p className="text-ui text-muted-foreground">md</p>
            <label className="flex items-center gap-2">
              <Switch />
              <span className="text-sm">通知を受け取る</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch defaultChecked />
              <span className="text-sm">ダークモード</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch error />
              <span className="text-sm text-destructive">必須項目です</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch disabled />
              <span className="text-sm text-muted-foreground">変更できません</span>
            </label>
          </div>

          <div className="space-y-3 flex-1">
            <p className="text-ui text-muted-foreground">lg</p>
            <label className="flex items-center gap-2">
              <Switch size="lg" />
              <span className="text-sm">通知を受け取る</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch size="lg" defaultChecked />
              <span className="text-sm">ダークモード</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch size="lg" error />
              <span className="text-sm text-destructive">必須項目です</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch size="lg" disabled />
              <span className="text-sm text-muted-foreground">変更できません</span>
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

      {/* Dialog */}
      <Section title="ダイアログ">
        <div className="flex flex-wrap gap-4">
          {/* 確認ダイアログ */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">予定を削除</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>本当に削除しますか？</DialogTitle>
                <DialogDescription>
                  この操作は取り消せません。予定に関するデータはすべて削除されます。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">キャンセル</Button>
                </DialogClose>
                <Button variant="destructive">削除する</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 情報ダイアログ */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">詳細を見る</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ミーティングの詳細</DialogTitle>
                <DialogDescription>
                  来週の月曜日 10:00〜11:00 に予定されています。
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm">
                参加者：田中さん、佐藤さん、鈴木さん
              </p>
              <p className="text-sm">
                議題：第3四半期のスケジュール調整
              </p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">閉じる</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Section>

      {/* Toast */}
      <Section title="トースト">
        <ToastDemo />
      </Section>
    </div>
  );
}
