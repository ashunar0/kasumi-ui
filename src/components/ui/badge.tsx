import { type ComponentProps } from "react";

type BadgeVariant = "default" | "outline";
type BadgeSize = "sm" | "md";

type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary text-primary-foreground",
  outline: "border border-border text-foreground",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5 rounded-md",
  md: "text-sm px-2.5 py-0.5 rounded-md",
};

export function Badge({
  variant = "default",
  size = "sm",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
