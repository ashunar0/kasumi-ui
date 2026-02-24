"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
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

export function SelectContent({
  className = "",
  children,
  ...props
}: ComponentProps<"div">) {
  const { open, setOpen, contentRef, triggerRef } = useSelectContext();

  // クリック外で閉じる
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen, contentRef, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      role="listbox"
      className={`absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-background shadow-md ${className}`}
      {...props}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  );
}

export function SelectItem({
  value: itemValue,
  disabled = false,
  className = "",
  children,
  ...props
}: ComponentProps<"div"> & { value: string; disabled?: boolean }) {
  const { value, onValueChange, registerItemLabel } = useSelectContext();
  const isSelected = value === itemValue;

  // ラベル登録（SelectValue 用）
  useEffect(() => {
    const label =
      typeof children === "string"
        ? children
        : itemValue;
    registerItemLabel(itemValue, label);
  }, [itemValue, children, registerItemLabel]);

  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      onClick={() => {
        if (!disabled) onValueChange(itemValue);
      }}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
        isSelected ? "bg-accent text-accent-foreground" : ""
      } ${className}`}
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
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
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      )}
      {children}
    </div>
  );
}
