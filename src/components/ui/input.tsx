import { type ComponentProps } from "react";

type InputSize = "sm" | "md" | "lg";

type InputProps = Omit<ComponentProps<"input">, "size"> & {
  error?: boolean;
  size?: InputSize;
};

const sizeStyles: Record<InputSize, string> = {
  sm: "h-9 rounded-md",
  md: "h-10 rounded-lg",
  lg: "h-11 rounded-lg",
};

export function Input({ error, size = "md", className = "", ...props }: InputProps) {
  return (
    <input
      className={`flex w-full border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${sizeStyles[size]} ${
        error
          ? "border-destructive focus-visible:ring-destructive"
          : "border-input"
      } ${className}`}
      {...props}
    />
  );
}
