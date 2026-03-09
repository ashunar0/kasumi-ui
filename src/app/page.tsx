import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <h1 className="text-h1 font-bold tracking-tight">kasumi/ui</h1>
        <p className="text-body text-muted-foreground mt-4">
          日本語のためのUIコンポーネントライブラリ。
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/components">Components</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
