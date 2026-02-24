"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type ComponentProps,
} from "react";

type SelectContextValue = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  itemLabels: Map<string, string>;
  registerItemLabel: (value: string, label: string) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select コンポーネントの外で使われています");
  return ctx;
}

type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
};

export function Select({
  value,
  onValueChange,
  disabled = false,
  children,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [itemLabels] = useState(() => new Map<string, string>());

  const registerItemLabel = useCallback(
    (itemValue: string, label: string) => {
      itemLabels.set(itemValue, label);
    },
    [itemLabels]
  );

  const handleValueChange = useCallback(
    (newValue: string) => {
      onValueChange?.(newValue);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [onValueChange]
  );

  return (
    <SelectContext value={{
      value,
      onValueChange: handleValueChange,
      open,
      setOpen,
      disabled,
      triggerRef,
      contentRef,
      itemLabels,
      registerItemLabel,
    }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext>
  );
}

export function SelectTrigger({
  error,
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { error?: boolean }) {
  const { open, setOpen, disabled, triggerRef } = useSelectContext();

  return (
    <button
      ref={triggerRef}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      disabled={disabled}
      onClick={() => setOpen(!open)}
      className={`flex h-10 w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        error
          ? "border-destructive focus-visible:ring-destructive"
          : "border-input"
      } ${className}`}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2 shrink-0 opacity-50"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value, itemLabels } = useSelectContext();

  if (!value) {
    return <span className="text-muted-foreground">{placeholder}</span>;
  }

  return <span>{itemLabels.get(value) ?? value}</span>;
}
