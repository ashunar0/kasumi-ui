import { type ComponentProps } from "react";

type TextareaProps = ComponentProps<"textarea"> & {
  error?: boolean;
};

export function Textarea({
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={`flex w-full min-h-20 resize-y rounded-lg border bg-background px-3.5 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
        error
          ? "border-destructive focus-visible:border-destructive"
          : "border-input focus-visible:border-foreground"
      } ${className}`}
      {...props}
    />
  );
}
