import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";

const inputProps = [
  {
    name: "variant",
    type: '"outline" | "underline"',
    default: '"outline"',
    description: "入力フィールドのスタイル",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "入力フィールドのサイズ",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "エラー状態を表示する",
  },
];

export default function InputPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-h2 font-bold tracking-tight">Input</h1>
        <p className="mt-2 text-muted-foreground text-ui">
          テキスト入力のためのコンポーネント。
        </p>
      </div>

      {/* Basic usage */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">基本の使い方</h2>
        <ComponentPreview>
          <Input placeholder="テキストを入力" className="max-w-sm" />
        </ComponentPreview>
        <CodeBlock
          code={`import { Input } from "@/components/ui/input";

<Input placeholder="テキストを入力" />`}
        />
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">Variant</h2>
        <ComponentPreview className="flex-col gap-4">
          <Input variant="outline" placeholder="Outline" className="max-w-sm" />
          <Input
            variant="underline"
            placeholder="Underline"
            className="max-w-sm"
          />
        </ComponentPreview>
        <CodeBlock
          code={`<Input variant="outline" placeholder="Outline" />
<Input variant="underline" placeholder="Underline" />`}
        />
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">Size</h2>
        <ComponentPreview className="flex-col gap-4">
          <Input size="sm" placeholder="Small" className="max-w-sm" />
          <Input size="md" placeholder="Medium" className="max-w-sm" />
          <Input size="lg" placeholder="Large" className="max-w-sm" />
        </ComponentPreview>
        <CodeBlock
          code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
        />
      </section>

      {/* Error state */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">エラー状態</h2>
        <ComponentPreview>
          <Input error placeholder="エラーのある入力" className="max-w-sm" />
        </ComponentPreview>
        <CodeBlock code={`<Input error placeholder="エラーのある入力" />`} />
      </section>

      {/* Password */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">パスワード</h2>
        <p className="text-body text-muted-foreground">
          type=&quot;password&quot;
          を指定すると、表示切替トグルが自動で表示されます。
        </p>
        <ComponentPreview>
          <Input
            type="password"
            placeholder="パスワード"
            className="max-w-sm"
          />
        </ComponentPreview>
        <CodeBlock
          code={`<Input type="password" placeholder="パスワード" />`}
        />
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">Props</h2>
        <PropsTable props={inputProps} />
      </section>
    </div>
  );
}
