"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

type ComponentCard = {
  name: string;
  slug: string;
  preview: React.ReactNode;
};

const components: ComponentCard[] = [
  {
    name: "Button",
    slug: "button",
    preview: (
      <div className="flex items-center gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
      </div>
    ),
  },
  {
    name: "Badge",
    slug: "badge",
    preview: (
      <div className="flex items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    ),
  },
  {
    name: "Input",
    slug: "input",
    preview: <Input placeholder="テキストを入力" />,
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    preview: (
      <div className="flex items-center gap-4">
        <Checkbox defaultChecked />
        <Checkbox />
      </div>
    ),
  },
  {
    name: "Radio",
    slug: "radio",
    preview: (
      <div className="flex items-center gap-4">
        <Radio name="preview-radio" defaultChecked />
        <Radio name="preview-radio" />
      </div>
    ),
  },
  {
    name: "Switch",
    slug: "switch",
    preview: <Switch defaultChecked />,
  },
  {
    name: "Progress",
    slug: "progress",
    preview: <Progress value={65} className="w-full" />,
  },
  {
    name: "Avatar",
    slug: "avatar",
    preview: (
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar size="md">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    preview: (
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    ),
  },
  {
    name: "Separator",
    slug: "separator",
    preview: (
      <div className="w-full">
        <Separator />
      </div>
    ),
  },
  {
    name: "Alert",
    slug: "alert",
    preview: (
      <Alert variant="info" className="w-full">
        <AlertTitle>お知らせ</AlertTitle>
        <AlertDescription>新機能が追加されました。</AlertDescription>
      </Alert>
    ),
  },
  {
    name: "Tabs",
    slug: "tabs",
    preview: (
      <Tabs defaultValue="tab1" className="w-full">
        <TabsList>
          <TabsTrigger value="tab1">概要</TabsTrigger>
          <TabsTrigger value="tab2">詳細</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" />
        <TabsContent value="tab2" />
      </Tabs>
    ),
  },
  {
    name: "Accordion",
    slug: "accordion",
    preview: (
      <Accordion type="single" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>よくある質問</AccordionTrigger>
          <AccordionContent>回答がここに表示されます。</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">ホーム</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">設定</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>プロフィール</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },
  {
    name: "Pagination",
    slug: "pagination",
    preview: (
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
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    preview: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              ホバー
            </Button>
          </TooltipTrigger>
          <TooltipContent>ツールチップ</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    name: "Card",
    slug: "card",
    preview: (
      <Card className="w-full">
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle className="text-sm">プロジェクト設定</CardTitle>
          <CardDescription className="text-xs">
            基本情報を管理します。
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4" />
      </Card>
    ),
  },
  {
    name: "Select",
    slug: "select",
    preview: (
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="選択してください" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">オプション A</SelectItem>
          <SelectItem value="b">オプション B</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    name: "Label",
    slug: "label",
    preview: <Label>ラベルテキスト</Label>,
  },
  {
    name: "Textarea",
    slug: "textarea",
    preview: <Textarea placeholder="メッセージを入力" className="w-full" />,
  },
  {
    name: "Table",
    slug: "table",
    preview: (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">名前</TableHead>
            <TableHead className="text-xs">役割</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-xs">田中</TableCell>
            <TableCell className="text-xs">開発</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-xs">佐藤</TableCell>
            <TableCell className="text-xs">デザイン</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  },
  {
    name: "Dialog",
    slug: "dialog",
    preview: (
      <Button size="sm" variant="outline">
        開く
      </Button>
    ),
  },
  {
    name: "DropdownMenu",
    slug: "dropdown-menu",
    preview: (
      <Button size="sm" variant="outline">
        メニュー
      </Button>
    ),
  },
  {
    name: "Popover",
    slug: "popover",
    preview: (
      <Button size="sm" variant="outline">
        詳細
      </Button>
    ),
  },
  {
    name: "Toast",
    slug: "toast",
    preview: (
      <Alert variant="info" className="w-full">
        <AlertTitle>トースト通知</AlertTitle>
        <AlertDescription>操作が完了しました。</AlertDescription>
      </Alert>
    ),
  },
  {
    name: "Field",
    slug: "field",
    preview: (
      <Field className="w-full">
        <FieldLabel>メールアドレス</FieldLabel>
        <Input placeholder="you@example.com" />
        <FieldDescription>連絡先として使用します。</FieldDescription>
      </Field>
    ),
  },
];

function ComponentGrid({ components }: { components: ComponentCard[] }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {components.map((component) => (
        <div
          key={component.slug}
          role="link"
          tabIndex={0}
          onClick={() => router.push(`/docs/components/${component.slug}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              router.push(`/docs/components/${component.slug}`);
            }
          }}
          className="cursor-pointer rounded-xl border border-border bg-background transition-colors hover:border-foreground/20 hover:bg-muted/50"
        >
          {/* Preview area */}
          <div className="flex h-36 items-center justify-center p-4 pointer-events-none">
            {component.preview}
          </div>
          {/* Name */}
          <div className="border-t border-border px-4 py-3">
            <span className="text-ui font-medium">{component.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center px-6 bg-background overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, color-mix(in srgb, var(--foreground) 15%, transparent) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h1 className="text-[2.75rem] font-bold leading-[1.1] tracking-tight sm:text-[3.5rem]">
            日本語のための
            <br />
            UIコンポーネント
          </h1>
          <p className="text-body text-muted-foreground mt-6 text-balance">
            行間・文字サイズ・余白を日本語に最適化。
            <br className="hidden sm:inline" />
            Radix UI + Tailwind CSS ベースの26コンポーネント。
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/docs/components">Components</Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="bg-sidebar">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* Component Grid */}
          <ComponentGrid components={components} />
        </div>
      </main>
    </div>
  );
}
