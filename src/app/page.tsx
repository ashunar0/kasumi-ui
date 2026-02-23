import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="border-t border-border pt-4">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">my-ui</h1>
        <p className="mt-2 text-muted-foreground">あさひのUIライブラリ</p>
      </header>

      {/* Button */}
      <Section title="Button">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </Section>

      {/* Input */}
      <Section title="Input">
        <div className="space-y-4 max-w-sm">
          <Input placeholder="Default input" />
          <Input placeholder="Error state" error />
          <Input placeholder="Disabled" disabled />
        </div>
      </Section>

      {/* Label */}
      <Section title="Label">
        <div className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="demo-email">メールアドレス</Label>
            <Input id="demo-email" type="email" placeholder="you@example.com" />
          </div>
        </div>
      </Section>

      {/* Card */}
      <Section title="Card">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>基本カード</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">シンプルなカードコンポーネント。</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>フッター付き</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">アクション付きのカード。</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">アクション</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>
    </div>
  );
}
