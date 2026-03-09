import { CodeBlock } from "@/components/docs/code-block";

export default function IntroductionPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-h2 font-bold tracking-tight">kasumi/ui</h1>
        <p className="mt-2 text-muted-foreground text-ui">
          あさひの自分専用デザインシステム＆UIコンポーネントライブラリ。
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">特徴</h2>
        <ul className="list-disc pl-6 space-y-2 text-ui">
          <li>日本語に最適化されたタイポグラフィ（Minor Third スケール）</li>
          <li>Tailwind CSS 4 のデザイントークンベース</li>
          <li>ライト／ダークモード対応</li>
          <li>Radix UI でアクセシビリティ担保</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">使い方</h2>
        <p className="text-ui">
          コンポーネントのコードをプロジェクトにコピーして使います。
          前提として以下が必要です:
        </p>
        <h3 className="text-h5 font-semibold tracking-tight">
          1. cn() ユーティリティ
        </h3>
        <CodeBlock
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
          lang="ts"
        />
        <h3 className="text-h5 font-semibold tracking-tight">
          2. 依存パッケージ
        </h3>
        <CodeBlock code={`pnpm add clsx tailwind-merge`} lang="bash" />
      </div>
    </div>
  );
}
