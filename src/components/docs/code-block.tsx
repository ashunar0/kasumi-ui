import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

type CodeBlockProps = {
  code: string;
  lang?: string;
};

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });

  return (
    <div className="relative">
      <CopyButton code={code.trim()} />
      <div
        className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-sm [&_pre]:bg-transparent! [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
