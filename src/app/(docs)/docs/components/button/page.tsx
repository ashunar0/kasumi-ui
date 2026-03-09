import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";

const buttonProps = [
  {
    name: "variant",
    type: '"primary" | "secondary" | "ghost" | "outline" | "destructive"',
    default: '"primary"',
    description: "ボタンのスタイルバリエーション",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "ボタンのサイズ",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "無効状態にする",
  },
];

export default function ButtonPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-h2 font-bold tracking-tight">Button</h1>
        <p className="mt-2 text-muted-foreground text-ui">
          アクションを実行するためのボタンコンポーネント。
        </p>
      </div>

      {/* Basic usage */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">基本の使い方</h2>
        <ComponentPreview>
          <Button>ボタン</Button>
        </ComponentPreview>
        <CodeBlock
          code={`import { Button } from "@/components/ui/button";

<Button>ボタン</Button>`}
        />
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">Variant</h2>
        <ComponentPreview className="gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </ComponentPreview>
        <CodeBlock
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>`}
        />
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">Size</h2>
        <ComponentPreview className="gap-3 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ComponentPreview>
        <CodeBlock
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        />
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">Disabled</h2>
        <ComponentPreview>
          <Button disabled>無効なボタン</Button>
        </ComponentPreview>
        <CodeBlock code={`<Button disabled>無効なボタン</Button>`} />
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-h4 font-semibold tracking-tight">Props</h2>
        <PropsTable props={buttonProps} />
      </section>
    </div>
  );
}
