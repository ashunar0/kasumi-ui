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

/* ============================================================
   Sidebar
   ============================================================ */
function SidebarItem({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-ui cursor-pointer transition-colors ${
        active
          ? "bg-accent text-foreground font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {children}
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-secondary">
      {/* Workspace */}
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-ui font-bold">
          A
        </div>
        <span className="text-ui font-semibold text-foreground">my-ui</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        <div className="px-2 py-1.5 text-ui text-muted-foreground font-medium">
          設計
        </div>
        <SidebarItem active>
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          デザインシステム
        </SidebarItem>
        <SidebarItem>
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
            />
          </svg>
          カラー設計
        </SidebarItem>
        <SidebarItem>
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          タイポグラフィ
        </SidebarItem>
        <SidebarItem>
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.491 48.491 0 0 1-4.163-.3c-1.585-.233-2.708-1.626-2.708-3.228V6.741c0-1.602 1.123-2.995 2.708-3.228A48.394 48.394 0 0 1 12 3c2.392 0 4.744.175 7.043.513 1.585.233 2.708 1.626 2.708 3.228v.019c0 1.602-1.123 2.995-2.708 3.228a48.486 48.486 0 0 1-4.163.3.64.64 0 0 1-.657-.643v0Z"
            />
          </svg>
          設計判断ログ
        </SidebarItem>

        <div className="px-2 py-1.5 mt-4 text-ui text-muted-foreground font-medium">
          コンポーネント
        </div>
        <SidebarItem>
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
            />
          </svg>
          UIカタログ
        </SidebarItem>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-2 py-3 space-y-0.5">
        <SidebarItem>
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          設定
        </SidebarItem>
      </div>
    </aside>
  );
}

/* ============================================================
   Main Content
   ============================================================ */
export default function DemoPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-background/80 backdrop-blur-sm px-8 py-2">
          <div className="flex items-center gap-2 text-ui text-muted-foreground">
            <span>設計</span>
            <span>/</span>
            <span className="text-foreground">デザインシステム</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Document content */}
        <article className="mx-auto max-w-3xl px-8 py-12 space-y-8">
          {/* Title & Meta */}
          <div className="space-y-3">
            <h1 className="text-h2 font-bold tracking-tight">
              my-ui デザインシステム
            </h1>
            <div className="flex items-center gap-4 text-ui text-muted-foreground">
              <span>最終更新: 2026年2月24日</span>
              <span>作成者: あさひ</span>
            </div>
          </div>

          <hr className="border-border" />

          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">概要</h2>
            <p className="text-body">
              my-uiは、日本語に最適化されたオリジナルUIコンポーネントライブラリです。shadcn/uiのシンプルさをベースにしつつ、日本語特有のタイポグラフィ課題を解決し、数学的根拠のあるデザイントークンで構成されています。
            </p>
            <p className="text-body">
              「なんとなく」ではなく「なぜこの値か」を説明できる設計を目指しています。フォントサイズはModular
              Scale、カラーはWCAGコントラスト比、行間はJLREQ準拠。すべてのトークンに選定理由があります。
            </p>
          </section>

          {/* Color System */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">
              カラーシステム
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>ライトモード</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-ui text-muted-foreground">
                    <li>背景: #ffffff（純白）</li>
                    <li>テキスト: #1c1917（17.5:1）</li>
                    <li>セカンダリ: #f3f2f0（暖白）</li>
                    <li>ボーダー: #e6e4e1（控えめ）</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>ダークモード</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-ui text-muted-foreground">
                    <li>背景: #0f0e0d（暖黒）</li>
                    <li>テキスト: #f5f3f0（17.4:1）</li>
                    <li>セカンダリ: #1f1e1c</li>
                    <li>ボーダー: #2e2c2a</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Philosophy */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">設計思想</h2>
            <blockquote className="border-l-2 border-border pl-4 text-body text-muted-foreground italic">
              「なんとなくNotionっぽい」ではなく、各値にWCAGコントラスト比の根拠を持つ。背景は純白、暖かさはテキストとサーフェスで出す。
            </blockquote>
            <p className="text-body">以下の3つの原則を設計の柱としています:</p>
            <ol className="list-decimal list-inside space-y-2 text-body pl-2">
              <li>
                <strong>数学的根拠</strong> — Modular
                Scale、WCAG準拠など、すべてのトークンに「なぜこの値か」の理由がある
              </li>
              <li>
                <strong>日本語最適化</strong> — Hiragino
                Sansのウェイト制約、JLREQの行間推奨を考慮した設計
              </li>
              <li>
                <strong>YAGNI</strong> —
                cn関数、Typographyコンポーネント、Webフォント等は必要になるまで入れない
              </li>
            </ol>
          </section>

          {/* Typography Scale Table */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">
              タイポグラフィスケール
            </h2>
            <p className="text-body">
              Minor Third（×1.2）のModular
              Scaleを採用。基準サイズ16pxに比率を掛けて段階を生成しています。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-ui">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      用途
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      サイズ
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      行間
                    </th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5 font-medium">UI文</td>
                    <td className="px-4 py-2.5">14px</td>
                    <td className="px-4 py-2.5">×1.6</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5 font-medium">本文</td>
                    <td className="px-4 py-2.5">16px（base）</td>
                    <td className="px-4 py-2.5">×1.8</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5 font-medium">H4</td>
                    <td className="px-4 py-2.5">19px</td>
                    <td className="px-4 py-2.5">
                      <span className="text-muted-foreground">デフォルト</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5 font-medium">H3</td>
                    <td className="px-4 py-2.5">23px</td>
                    <td className="px-4 py-2.5">
                      <span className="text-muted-foreground">デフォルト</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5 font-medium">H2</td>
                    <td className="px-4 py-2.5">28px</td>
                    <td className="px-4 py-2.5">
                      <span className="text-muted-foreground">デフォルト</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium">H1</td>
                    <td className="px-4 py-2.5">33px</td>
                    <td className="px-4 py-2.5">
                      <span className="text-muted-foreground">デフォルト</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Form section using existing components */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">
              コンポーネント追加
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>新しいコンポーネントを登録</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo-name">コンポーネント名</Label>
                    <Input id="demo-name" placeholder="例: Dialog" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="demo-category">カテゴリ</Label>
                      <Input id="demo-category" placeholder="フィードバック" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-variants">バリアント数</Label>
                      <Input id="demo-variants" placeholder="3" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>登録する</Button>
                <Button variant="outline">下書き保存</Button>
              </CardFooter>
            </Card>
          </section>

          {/* Implementation Notes */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">実装メモ</h2>
            <p className="text-body">
              デザイントークンは{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-ui font-mono">
                globals.css
              </code>{" "}
              のCSS変数として定義し、Tailwind CSS 4 の{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-ui font-mono">
                @theme inline
              </code>{" "}
              でユーティリティクラスに登録しています。
            </p>
            <p className="text-body">
              テキスト色がNotionより暗い（#1c1917 vs #37352F）のは、Hiragino
              Sansのウェイト制約が理由です。W3とW6しかなく中間ウェイトが取れないため、コントラストを上げて可読性を確保しています。将来Noto
              Sans JPを導入すれば、より明るい暖色に移行する余地があります。
            </p>
          </section>

          {/* Footer spacer */}
          <div className="h-16" />
        </article>
      </main>
    </div>
  );
}
