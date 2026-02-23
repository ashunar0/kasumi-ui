import { type ComponentProps } from "react";

type DivProps = ComponentProps<"div">;

export function Card({ className = "", ...props }: DivProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-background shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={`flex flex-col gap-1.5 px-8 pt-8 pb-4 ${className}`} {...props} />;
}

export function CardTitle({
  className = "",
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={`px-8 pb-6 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: DivProps) {
  return (
    <div
      className={`flex items-center px-8 pt-2 pb-8 ${className}`}
      {...props}
    />
  );
}
