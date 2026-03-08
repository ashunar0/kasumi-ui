"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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
          toast({
            title: "保存しました",
            description: "予定を保存しました。",
            variant: "success",
          })
        }
      >
        成功
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "新しいバージョンがあります",
            description: "アプリを更新してください。",
            variant: "info",
          })
        }
      >
        情報
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "変更を上書きします",
            description: "既存のデータが失われる可能性があります。",
            variant: "warning",
          })
        }
      >
        警告
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: "エラーが発生しました",
            description: "保存に失敗しました。もう一度お試しください。",
            variant: "error",
          })
        }
      >
        エラー
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast({ title: "リンクをコピーしました" })}
      >
        デフォルト
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <TooltipProvider>
      <div>
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/80 px-12 backdrop-blur">
          <h1 className="text-h4 font-bold tracking-tight">my-ui</h1>
          <ThemeToggle />
        </header>
        <div className="mx-auto max-w-3xl px-6 py-16 space-y-16">
          {/* Page Links */}
          <div className="flex gap-3">
            <Link
              href="/login"
              className="inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              ログイン
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              新規登録
            </Link>
            <Link
              href="/login2"
              className="inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              ログイン2
            </Link>
            <Link
              href="/register2"
              className="inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              新規登録2
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              ダッシュボード
            </Link>
          </div>

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

          {/* Badge */}
          <Section title="バッジ">
            <div className="space-y-4">
              <div>
                <p className="text-ui text-muted-foreground mb-2">default</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="sm">done</Badge>
                  <Badge size="md">承認済み</Badge>
                </div>
              </div>
              <div>
                <p className="text-ui text-muted-foreground mb-2">outline</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" size="sm">
                    draft
                  </Badge>
                  <Badge variant="outline" size="md">
                    下書き
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-ui text-muted-foreground mb-2">
                  カスタムカラー
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    対応中
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    完了
                  </Badge>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    未対応
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    保留
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-ui text-muted-foreground mb-2">ピル型</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full">v1.0</Badge>
                  <Badge variant="outline" className="rounded-full">
                    beta
                  </Badge>
                </div>
              </div>
            </div>
          </Section>

          {/* Tabs */}
          <Section title="タブ">
            <div className="space-y-8">
              <div>
                <p className="text-ui text-muted-foreground mb-3">underline</p>
                <Tabs defaultValue="schedule">
                  <TabsList>
                    <TabsTrigger value="schedule">スケジュール</TabsTrigger>
                    <TabsTrigger value="participants">参加者</TabsTrigger>
                    <TabsTrigger value="settings">設定</TabsTrigger>
                  </TabsList>
                  <TabsContent value="schedule">
                    <p className="text-sm text-muted-foreground">
                      来週のミーティング候補日が3件あります。
                    </p>
                  </TabsContent>
                  <TabsContent value="participants">
                    <p className="text-sm text-muted-foreground">
                      参加者は田中さん、佐藤さん、鈴木さんの3名です。
                    </p>
                  </TabsContent>
                  <TabsContent value="settings">
                    <p className="text-sm text-muted-foreground">
                      通知設定やカレンダー連携を管理できます。
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                <p className="text-ui text-muted-foreground mb-3">pill</p>
                <Tabs defaultValue="all">
                  <TabsList variant="pill">
                    <TabsTrigger value="all">すべて</TabsTrigger>
                    <TabsTrigger value="upcoming">今後の予定</TabsTrigger>
                    <TabsTrigger value="past">過去の予定</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <p className="text-sm text-muted-foreground">
                      すべての予定を表示しています。
                    </p>
                  </TabsContent>
                  <TabsContent value="upcoming">
                    <p className="text-sm text-muted-foreground">
                      今後の予定が2件あります。
                    </p>
                  </TabsContent>
                  <TabsContent value="past">
                    <p className="text-sm text-muted-foreground">
                      過去の予定が5件あります。
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                <p className="text-ui text-muted-foreground mb-3">
                  disabled タブ
                </p>
                <Tabs defaultValue="active">
                  <TabsList>
                    <TabsTrigger value="active">有効</TabsTrigger>
                    <TabsTrigger value="disabled" disabled>
                      無効
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="active">
                    <p className="text-sm text-muted-foreground">
                      このタブは選択できます。隣のタブは無効化されています。
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </Section>

          {/* Accordion */}
          <Section title="アコーディオン">
            <div className="space-y-8">
              <div>
                <p className="text-ui text-muted-foreground mb-3">
                  single（1つだけ開く）
                </p>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>日程調整の作成方法は？</AccordionTrigger>
                    <AccordionContent>
                      「新規作成」ボタンからイベント名と候補日を入力してください。参加者にはリンクを共有するだけで回答してもらえます。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      候補日は何件まで追加できますか？
                    </AccordionTrigger>
                    <AccordionContent>
                      1つのイベントにつき最大20件の候補日を追加できます。カレンダーから複数選択すると効率的です。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      回答を変更することはできますか？
                    </AccordionTrigger>
                    <AccordionContent>
                      はい、同じリンクからいつでも回答を変更できます。確定前であれば何度でも更新可能です。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <p className="text-ui text-muted-foreground mb-3">
                  multiple（複数開ける）
                </p>
                <Accordion type="multiple">
                  <AccordionItem value="notifications">
                    <AccordionTrigger>通知設定</AccordionTrigger>
                    <AccordionContent>
                      メール通知やプッシュ通知のオン・オフを切り替えられます。リマインダーの送信タイミングも設定可能です。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="calendar">
                    <AccordionTrigger>カレンダー連携</AccordionTrigger>
                    <AccordionContent>
                      Google カレンダーや Outlook
                      と連携すると、空き時間が自動で反映されます。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="privacy">
                    <AccordionTrigger>プライバシー</AccordionTrigger>
                    <AccordionContent>
                      回答内容の公開範囲を設定できます。「主催者のみ」「参加者全員」から選べます。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </Section>

          {/* Progress */}
          <Section title="プログレスバー">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>アップロード中...</span>
                  <span className="text-muted-foreground">75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>回答率</span>
                  <span className="text-muted-foreground">3/5人</span>
                </div>
                <Progress value={60} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>未着手</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <Progress value={0} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>完了</span>
                  <span className="text-muted-foreground">100%</span>
                </div>
                <Progress value={100} />
              </div>
            </div>
          </Section>

          {/* Separator */}
          <Section title="セパレーター">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-ui text-muted-foreground">horizontal</p>
                <div className="space-y-4">
                  <p className="text-sm">ミーティングの詳細</p>
                  <Separator />
                  <p className="text-sm">参加者一覧</p>
                  <Separator />
                  <p className="text-sm">コメント</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-ui text-muted-foreground">vertical</p>
                <div className="flex items-center gap-4 h-5">
                  <span className="text-sm">編集</span>
                  <Separator orientation="vertical" />
                  <span className="text-sm">複製</span>
                  <Separator orientation="vertical" />
                  <span className="text-sm">削除</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Alert */}
          <Section title="アラート">
            <div className="space-y-4">
              <Alert>
                <AlertTitle>お知らせ</AlertTitle>
                <AlertDescription>
                  メンテナンスのため、明日 2:00〜4:00 はサービスを停止します。
                </AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>保存しました</AlertTitle>
                <AlertDescription>
                  予定の変更が正常に保存されました。
                </AlertDescription>
              </Alert>
              <Alert variant="info">
                <AlertTitle>新機能</AlertTitle>
                <AlertDescription>
                  カレンダー連携機能が追加されました。設定から有効にできます。
                </AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle>変更を上書きします</AlertTitle>
                <AlertDescription>
                  既存のデータが失われる可能性があります。
                </AlertDescription>
              </Alert>
              <Alert variant="error">
                <AlertTitle>エラーが発生しました</AlertTitle>
                <AlertDescription>
                  保存に失敗しました。もう一度お試しください。
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* Skeleton */}
          <Section title="スケルトン">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-ui text-muted-foreground">テキスト</p>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-ui text-muted-foreground">カード</p>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Avatar */}
          <Section title="アバター">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-ui text-muted-foreground">イニシャル</p>
                <div className="flex items-center gap-4">
                  <Avatar size="sm">
                    <AvatarFallback>田</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>佐</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg">
                    <AvatarFallback>鈴</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-ui text-muted-foreground">
                  フォールバック（アイコン）
                </p>
                <div className="flex items-center gap-4">
                  <Avatar size="sm" />
                  <Avatar />
                  <Avatar size="lg" />
                </div>
              </div>
            </div>
          </Section>

          {/* Breadcrumb */}
          <Section title="パンくずリスト">
            <div className="space-y-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">ホーム</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">イベント</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>第3四半期キックオフ</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">設定</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>通知</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </Section>

          {/* Popover */}
          <Section title="ポップオーバー">
            <div className="flex flex-wrap gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">日時を選択</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">候補日の追加</h4>
                    <p className="text-sm text-muted-foreground">
                      カレンダーから候補日を選択してください。複数の日時を追加できます。
                    </p>
                    <Input placeholder="2026-03-15 10:00" />
                    <Button size="sm" className="w-full">
                      追加する
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost">フィルター</Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">表示フィルター</h4>
                    <label className="flex items-center gap-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">参加予定</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">未回答</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox />
                      <span className="text-sm">不参加</span>
                    </label>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Section>

          <Section title="テーブル">
            <Table>
              <TableCaption>2026年3月の予定一覧</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">日付</TableHead>
                  <TableHead>タイトル</TableHead>
                  <TableHead>参加者</TableHead>
                  <TableHead className="text-right">ステータス</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">3/5</TableCell>
                  <TableCell>デザインレビュー</TableCell>
                  <TableCell>3人</TableCell>
                  <TableCell className="text-right">確定</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3/8</TableCell>
                  <TableCell>スプリント振り返り</TableCell>
                  <TableCell>5人</TableCell>
                  <TableCell className="text-right">確定</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3/12</TableCell>
                  <TableCell>1on1 ミーティング</TableCell>
                  <TableCell>2人</TableCell>
                  <TableCell className="text-right">調整中</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3/15</TableCell>
                  <TableCell>チーム合宿</TableCell>
                  <TableCell>8人</TableCell>
                  <TableCell className="text-right">調整中</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3/20</TableCell>
                  <TableCell>プロダクトリリース</TableCell>
                  <TableCell>4人</TableCell>
                  <TableCell className="text-right">未定</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>合計</TableCell>
                  <TableCell className="text-right">5件</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Section>

          <Section title="ページネーション">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Section>

          {/* Tooltip */}
          <Section title="ツールチップ">
            <div className="flex flex-wrap items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">上に表示</Button>
                </TooltipTrigger>
                <TooltipContent>デフォルトは上に表示されます</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">下に表示</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  side=&quot;bottom&quot; で下に表示
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">左に表示</Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  side=&quot;left&quot; で左に表示
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">右に表示</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  side=&quot;right&quot; で右に表示
                </TooltipContent>
              </Tooltip>
            </div>
          </Section>

          {/* DropdownMenu */}
          <Section title="ドロップダウンメニュー">
            <div className="flex flex-wrap items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">メニューを開く</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>アクション</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    編集
                    <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    複製
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive>
                    削除
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">シンプル</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>プロフィール</DropdownMenuItem>
                  <DropdownMenuItem>設定</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>ログアウト</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  <Input
                    placeholder="正しいメールアドレスを入力してください"
                    error
                  />
                  <Input placeholder="入力できません" disabled />
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-ui text-muted-foreground">outline — lg</p>
                  <Input size="lg" placeholder="お名前を入力してください" />
                  <Input
                    size="lg"
                    placeholder="正しいメールアドレスを入力してください"
                    error
                  />
                  <Input size="lg" placeholder="入力できません" disabled />
                </div>
              </div>

              {/* password */}
              <div className="flex gap-8">
                <div className="space-y-3 flex-1">
                  <p className="text-ui text-muted-foreground">password — md</p>
                  <Input type="password" placeholder="パスワードを入力" />
                  <Input
                    type="password"
                    placeholder="パスワードが短すぎます"
                    error
                  />
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-ui text-muted-foreground">password — lg</p>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="パスワードを入力"
                  />
                  <Input
                    type="password"
                    size="lg"
                    placeholder="パスワードが短すぎます"
                    error
                  />
                </div>
              </div>

              {/* underline */}
              <div className="flex gap-8">
                <div className="space-y-3 flex-1">
                  <p className="text-ui text-muted-foreground">
                    underline — md
                  </p>
                  <Input
                    variant="underline"
                    placeholder="お名前を入力してください"
                  />
                  <Input
                    variant="underline"
                    placeholder="正しいメールアドレスを入力してください"
                    error
                  />
                  <Input
                    variant="underline"
                    placeholder="入力できません"
                    disabled
                  />
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-ui text-muted-foreground">
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

              {/* underline password */}
              <div className="flex gap-8">
                <div className="space-y-3 flex-1">
                  <p className="text-ui text-muted-foreground">
                    underline password — md
                  </p>
                  <Input
                    variant="underline"
                    type="password"
                    placeholder="パスワードを入力"
                  />
                  <Input
                    variant="underline"
                    type="password"
                    placeholder="パスワードが短すぎます"
                    error
                  />
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-ui text-muted-foreground">
                    underline password — lg
                  </p>
                  <Input
                    variant="underline"
                    type="password"
                    size="lg"
                    placeholder="パスワードを入力"
                  />
                  <Input
                    variant="underline"
                    type="password"
                    size="lg"
                    placeholder="パスワードが短すぎます"
                    error
                  />
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
                <Textarea
                  size="lg"
                  placeholder="メッセージを入力してください"
                />
                <Textarea
                  size="lg"
                  placeholder="正しい内容を入力してください"
                  error
                />
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
                  <span className="text-sm text-muted-foreground">
                    選択できません
                  </span>
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
                  <span className="text-sm text-muted-foreground">
                    選択できません
                  </span>
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
                  <span className="text-sm text-muted-foreground">
                    選択できません
                  </span>
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
                  <Radio
                    name="demo-lg-state"
                    value="disabled"
                    size="lg"
                    disabled
                  />
                  <span className="text-sm text-muted-foreground">
                    選択できません
                  </span>
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
                  <span className="text-sm text-muted-foreground">
                    変更できません
                  </span>
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
                  <span className="text-sm text-muted-foreground">
                    変更できません
                  </span>
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
                <Input
                  variant="outline"
                  size="lg"
                  id="demo-name"
                  placeholder="山田 太郎"
                />
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
                  <p className="text-sm">議題：第3四半期のスケジュール調整</p>
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
      </div>
    </TooltipProvider>
  );
}
