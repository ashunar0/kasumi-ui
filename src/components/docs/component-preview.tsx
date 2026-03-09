import { cn } from "@/lib/utils";

type ComponentPreviewProps = {
  children: React.ReactNode;
  className?: string;
};

export function ComponentPreview({
  children,
  className,
}: ComponentPreviewProps) {
  return (
    <div
      className={cn(
        "flex min-h-[120px] items-center justify-center rounded-lg border border-border p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
