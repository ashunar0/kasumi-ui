import { type ComponentProps } from "react";

type CheckboxSize = "sm" | "md" | "lg";

type CheckboxProps = Omit<ComponentProps<"input">, "size" | "type"> & {
  error?: boolean;
  size?: CheckboxSize;
};

function CheckIcon() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden p-[2px] peer-checked:block"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const sizeStyles: Record<CheckboxSize, string> = {
  sm: "h-4 w-4 rounded",
  md: "h-[18px] w-[18px] rounded",
  lg: "h-5 w-5 rounded-md",
};

export function Checkbox({
  error,
  size = "md",
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <span className="relative inline-flex">
      <input
        type="checkbox"
        className={`peer appearance-none cursor-pointer border bg-transparent transition-colors checked:bg-primary checked:border-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${sizeStyles[size]} ${
          error
            ? "border-destructive focus-visible:border-destructive"
            : "border-input focus-visible:border-foreground"
        } ${className}`}
        {...props}
      />
      <CheckIcon />
    </span>
  );
}
