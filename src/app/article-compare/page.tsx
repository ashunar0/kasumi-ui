import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-h3 font-semibold tracking-tight mb-6 mt-16 first:mt-0">
      {children}
    </h2>
  );
}

function CompareRow({
  children,
}: {
  children: [React.ReactNode, React.ReactNode];
}) {
  return (
    <div className="grid grid-cols-2 gap-8 mb-12">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-4">
          shadcn/ui デフォルト
        </p>
        {children[0]}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-4">
          kasumi/ui
        </p>
        {children[1]}
      </div>
    </div>
  );
}

export default function ArticleComparePage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-16">
      <h1 className="text-h1 font-bold tracking-tight mb-2">
        shadcn/ui vs kasumi/ui
      </h1>
      <p className="text-muted-foreground mb-12">
        日本語テキストでの表示比較。左が shadcn/ui のデフォルト、右が
        kasumi/ui。
      </p>

      {/* ========== 本文の行間 ========== */}
      <SectionTitle>本文の行間</SectionTitle>
      <CompareRow>
        {/* shadcn: leading-normal = 1.5 */}
        <div
          className="text-base rounded-lg border border-border p-6"
          style={{ lineHeight: 1.5 }}
        >
          <p>
            日程調整アプリを使えば、複数人のスケジュールを簡単にまとめることができます。
            参加者それぞれが都合の良い日時を入力すると、全員が参加できる候補日が自動で算出されます。
            メールやチャットでのやり取りを減らし、スムーズに予定を決められます。
          </p>
        </div>

        {/* kasumi-ui: text-body (line-height: 2.5) */}
        <div className="text-body rounded-lg border border-border p-6">
          <p>
            日程調整アプリを使えば、複数人のスケジュールを簡単にまとめることができます。
            参加者それぞれが都合の良い日時を入力すると、全員が参加できる候補日が自動で算出されます。
            メールやチャットでのやり取りを減らし、スムーズに予定を決められます。
          </p>
        </div>
      </CompareRow>

      {/* ========== ボタン ========== */}
      <SectionTitle>ボタン</SectionTitle>
      <CompareRow>
        {/* shadcn default: h-9 px-4 py-2 rounded-md font-medium text-sm */}
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-9 px-4 py-2 text-sm font-medium transition-colors">
            予定を作成
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-border bg-background h-9 px-4 py-2 text-sm font-medium transition-colors">
            キャンセル
          </button>
          <button className="inline-flex items-center justify-center rounded-md bg-destructive text-destructive-foreground h-9 px-4 py-2 text-sm font-medium transition-colors">
            削除する
          </button>
        </div>

        {/* kasumi-ui */}
        <div className="flex flex-wrap gap-3">
          <Button>予定を作成</Button>
          <Button variant="outline">キャンセル</Button>
          <Button variant="destructive">削除する</Button>
        </div>
      </CompareRow>

      {/* ========== フォーム ========== */}
      <SectionTitle>フォーム入力</SectionTitle>
      <CompareRow>
        {/* shadcn: outline input × 3 */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              イベント名
            </label>
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="例：チームランチ"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">開催日</label>
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="例：2026-03-20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              参加人数
            </label>
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="例：5"
            />
          </div>
        </div>

        {/* kasumi-ui: underline input × 3 */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>イベント名</Label>
            <Input placeholder="例：チームランチ" />
          </div>
          <div className="space-y-2">
            <Label>開催日</Label>
            <Input placeholder="例：2026-03-20" />
          </div>
          <div className="space-y-2">
            <Label>参加人数</Label>
            <Input placeholder="例：5" />
          </div>
        </div>
      </CompareRow>
    </div>
  );
}
