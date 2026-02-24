import { type ComponentProps } from "react";

type InputSize = "sm" | "md" | "lg";
type InputVariant = "outline" | "underline";

type InputProps = Omit<ComponentProps<"input">, "size"> & {
  error?: boolean;
  size?: InputSize;
  variant?: InputVariant;
};

const outlineSizeStyles: Record<InputSize, string> = {
  sm: "h-9 rounded-md",
  md: "h-10 rounded-lg",
  lg: "h-11 rounded-lg",
};

const underlineSizeStyles: Record<InputSize, string> = {
  sm: "h-9",
  md: "h-10",
  lg: "h-11",
};

export function Input({
  error,
  size = "md",
  variant = "outline",
  className = "",
  ...props
}: InputProps) {
  if (variant === "underline") {
    return (
      <input
        className={`flex w-full border-b bg-transparent px-2 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${underlineSizeStyles[size]} ${
          error
            ? "border-destructive focus-visible:border-destructive"
            : "border-input focus-visible:border-foreground"
        } ${className}`}
        {...props}
      />
    );
  }

  return (
    <input
      className={`flex w-full border bg-background px-3.5 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${outlineSizeStyles[size]} ${
        error
          ? "border-destructive focus-visible:ring-destructive"
          : "border-input"
      } ${className}`}
      {...props}
    />
  );
}
