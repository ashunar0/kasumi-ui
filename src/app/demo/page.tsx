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
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-ui font-bold">
          A
        </div>
        <span className="text-ui font-semibold text-foreground">
          あさひのワークスペース
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        <div className="px-2 py-1.5 text-ui text-muted-foreground font-medium">
          プライベート
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
          設計ドキュメント
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
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
            />
          </svg>
          議事録
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
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          TODO
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          スケジュール
        </SidebarItem>

        <div className="px-2 py-1.5 mt-4 text-ui text-muted-foreground font-medium">
          チーム
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
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
          プロジェクト共有
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
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-8 py-2">
          <div className="flex items-center gap-2 text-ui text-muted-foreground">
            <span>プライベート</span>
            <span>/</span>
            <span className="text-foreground">設計ドキュメント</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Document content */}
        <article className="mx-auto max-w-3xl px-8 py-12 space-y-8">
          {/* Title & Meta */}
          <div className="space-y-3">
            <h1 className="text-h2 font-bold tracking-tight">
              日程調整アプリ — 設計ドキュメント
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
              日程調整アプリは、参加者全員の空き時間を自動で照合し、最適な候補日を提案するWebアプリケーションです。Googleカレンダーとの連携により、手動で日程を調整する手間を大幅に削減します。
            </p>
            <p className="text-body">
              ターゲットユーザーは、週に複数回のミーティングを調整する必要があるチームリーダーやプロジェクトマネージャーです。既存ツールでは「候補日を3つ挙げてメールで送る」という手間が発生しますが、本アプリではリンクを共有するだけで完結します。
            </p>
          </section>

          {/* Tech Stack */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">
              技術スタック
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>フロントエンド</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-ui text-muted-foreground">
                    <li>Next.js 16 (App Router)</li>
                    <li>React 19</li>
                    <li>Tailwind CSS 4</li>
                    <li>TypeScript strict</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>バックエンド</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-ui text-muted-foreground">
                    <li>Hono (API)</li>
                    <li>Drizzle ORM</li>
                    <li>PostgreSQL</li>
                    <li>Google Calendar API</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Blockquote */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">
              設計思想
            </h2>
            <blockquote className="border-l-2 border-border pl-4 text-body text-muted-foreground italic">
              「最小限のインターフェースで、最大限の効率を。ユーザーが考える時間を減らし、決める時間を増やす。」
            </blockquote>
            <p className="text-body">
              この原則に基づき、以下の3点を重視します:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-body pl-2">
              <li>
                <strong>ワンアクション原則</strong>{" "}
                — 1つの画面で1つの判断だけ求める
              </li>
              <li>
                <strong>コンテキスト保持</strong>{" "}
                — 前回の選択を記憶し、次回の提案に活かす
              </li>
              <li>
                <strong>通知の最小化</strong>{" "}
                — 本当に必要な時だけ、適切な手段で通知する
              </li>
            </ol>
          </section>

          {/* Table */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">
              マイルストーン
            </h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-ui">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      フェーズ
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      内容
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      ステータス
                    </th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5 font-medium">Phase 1</td>
                    <td className="px-4 py-2.5">
                      デザインシステム構築
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                        進行中
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5 font-medium">Phase 2</td>
                    <td className="px-4 py-2.5">
                      カレンダー連携 &amp; API設計
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-muted-foreground">未着手</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5 font-medium">Phase 3</td>
                    <td className="px-4 py-2.5">
                      日程調整ロジック実装
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-muted-foreground">未着手</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium">Phase 4</td>
                    <td className="px-4 py-2.5">通知 &amp; リリース</td>
                    <td className="px-4 py-2.5">
                      <span className="text-muted-foreground">未着手</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Form section using existing components */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">
              クイック作成
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>新しいミーティングを作成</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo-title">タイトル</Label>
                    <Input
                      id="demo-title"
                      placeholder="例: 週次定例ミーティング"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="demo-duration">所要時間</Label>
                      <Input
                        id="demo-duration"
                        placeholder="60分"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-participants">参加者数</Label>
                      <Input
                        id="demo-participants"
                        placeholder="3人"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>候補日を検索</Button>
                <Button variant="outline">下書き保存</Button>
              </CardFooter>
            </Card>
          </section>

          {/* Inline code / small details */}
          <section className="space-y-4">
            <h2 className="text-h3 font-semibold tracking-tight">
              API仕様メモ
            </h2>
            <p className="text-body">
              エンドポイントは{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-ui font-mono">
                /api/v1/schedules
              </code>{" "}
              に統一します。レスポンスは JSON 形式で、ページネーションには
              cursor ベースを採用。一度に返す最大件数はデフォルトで{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-ui font-mono">
                20
              </code>{" "}
              件とします。
            </p>
            <p className="text-body">
              認証には JWT を使用し、アクセストークンの有効期限は15分、リフレッシュトークンは30日に設定します。Google OAuth
              2.0 との連携で、カレンダーの読み取り権限のみを要求します。
            </p>
          </section>

          {/* Footer spacer */}
          <div className="h-16" />
        </article>
      </main>
    </div>
  );
}
