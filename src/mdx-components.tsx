import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/docs/component-preview";
import { CodeBlock } from "@/components/docs/code-block";
import { PropsTable } from "@/components/docs/props-table";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Markdown要素のスタイルマッピング
    h1: (props) => (
      <h1 className="text-h1 font-bold tracking-tight" {...props} />
    ),
    h2: (props) => (
      <h2
        className="text-h3 font-semibold tracking-tight mt-16 mb-8"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-base font-semibold tracking-tight mt-8 mb-4"
        {...props}
      />
    ),
    p: (props) => <p className="text-body mt-8" {...props} />,
    ul: (props) => (
      <ul className="list-disc pl-6 space-y-2 text-body mt-4" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal pl-6 space-y-2 text-body mt-4" {...props} />
    ),
    li: (props) => <li {...props} />,
    code: (props) => (
      <code
        className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
        {...props}
      />
    ),
    strong: (props) => <strong className="font-semibold" {...props} />,
    a: (props) => (
      <a
        className="underline underline-offset-4 hover:text-primary"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-2 border-border pl-4 text-muted-foreground mt-4"
        {...props}
      />
    ),

    // ドキュメント用コンポーネント
    Description: (props: React.ComponentProps<"div">) => (
      <div className="text-ui text-muted-foreground mt-2" {...props} />
    ),

    // カスタムコンポーネント（MDX用にマージン付きでラップ）
    ComponentPreview: (
      props: React.ComponentProps<typeof ComponentPreview>,
    ) => (
      <div className="mt-4">
        <ComponentPreview {...props} />
      </div>
    ),
    CodeBlock: (props: React.ComponentProps<typeof CodeBlock>) => (
      <div className="mt-4">
        <CodeBlock {...props} />
      </div>
    ),
    PropsTable,

    ...components,
  };
}
