import Link from "next/link";

const components = [
  {
    name: "Accordion",
    href: "/docs/components/accordion",
    description: "折りたたみ可能なコンテンツセクション",
  },
  {
    name: "Alert",
    href: "/docs/components/alert",
    description: "通知やフィードバックの表示",
  },
  {
    name: "Avatar",
    href: "/docs/components/avatar",
    description: "ユーザーのプロフィール画像",
  },
  {
    name: "Badge",
    href: "/docs/components/badge",
    description: "ステータスやカテゴリのラベル",
  },
  {
    name: "Breadcrumb",
    href: "/docs/components/breadcrumb",
    description: "ページの階層ナビゲーション",
  },
  {
    name: "Button",
    href: "/docs/components/button",
    description: "アクションを実行するボタン",
  },
  {
    name: "Card",
    href: "/docs/components/card",
    description: "コンテンツをグループ化するコンテナ",
  },
  {
    name: "Checkbox",
    href: "/docs/components/checkbox",
    description: "複数選択のためのチェックボックス",
  },
  {
    name: "Dialog",
    href: "/docs/components/dialog",
    description: "モーダルダイアログ",
  },
  {
    name: "Dropdown Menu",
    href: "/docs/components/dropdown-menu",
    description: "アクションを表示するドロップダウン",
  },
  {
    name: "Field",
    href: "/docs/components/field",
    description: "フォーム入力フィールドのレイアウト",
  },
  {
    name: "Input",
    href: "/docs/components/input",
    description: "テキスト入力フィールド",
  },
  {
    name: "Label",
    href: "/docs/components/label",
    description: "フォーム要素のラベル",
  },
  {
    name: "Pagination",
    href: "/docs/components/pagination",
    description: "ページ送りナビゲーション",
  },
  {
    name: "Popover",
    href: "/docs/components/popover",
    description: "要素に紐づくフローティングコンテンツ",
  },
  {
    name: "Progress",
    href: "/docs/components/progress",
    description: "進捗状況の表示バー",
  },
  {
    name: "Radio",
    href: "/docs/components/radio",
    description: "単一選択のラジオボタン",
  },
  {
    name: "Select",
    href: "/docs/components/select",
    description: "ドロップダウン型の選択UI",
  },
  {
    name: "Separator",
    href: "/docs/components/separator",
    description: "コンテンツの区切り線",
  },
  {
    name: "Skeleton",
    href: "/docs/components/skeleton",
    description: "ローディング中のプレースホルダー",
  },
  {
    name: "Switch",
    href: "/docs/components/switch",
    description: "ON/OFFのトグルスイッチ",
  },
  {
    name: "Table",
    href: "/docs/components/table",
    description: "データを表形式で表示",
  },
  {
    name: "Tabs",
    href: "/docs/components/tabs",
    description: "コンテンツを切り替えるタブ",
  },
  {
    name: "Textarea",
    href: "/docs/components/textarea",
    description: "複数行のテキスト入力",
  },
  {
    name: "Toast",
    href: "/docs/components/toast",
    description: "一時的な通知メッセージ",
  },
  {
    name: "Tooltip",
    href: "/docs/components/tooltip",
    description: "ホバー時の補足情報",
  },
];

export default function ComponentsPage() {
  return (
    <div>
      <h1 className="text-h1 font-bold tracking-tight">Components</h1>
      <p className="text-ui text-muted-foreground mt-2">
        日常的に使えるUIコンポーネントを揃えています。
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link
            key={component.href}
            href={component.href}
            className="text-lg font-semibold py-1 transition-colors hover:text-foreground"
          >
            {component.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
