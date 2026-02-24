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

type SelectTriggerSize = "sm" | "md" | "lg";

const triggerSizeStyles: Record<SelectTriggerSize, string> = {
  sm: "h-9 rounded-md",
  md: "h-10 rounded-lg",
  lg: "h-11 rounded-lg",
};

export function SelectTrigger({
  error,
  size = "md",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { error?: boolean; size?: SelectTriggerSize }) {
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
      className={`flex w-full items-center justify-between border bg-background px-3.5 py-2 text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${triggerSizeStyles[size]} ${
        error
          ? "border-destructive focus-visible:border-destructive"
          : "border-input focus-visible:border-foreground"
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
  const { open, setOpen, value, onValueChange, contentRef, triggerRef } =
    useSelectContext();

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

  // ドロップダウンが開いたら、選択中のアイテム（なければ最初のアイテム）にフォーカス
  useEffect(() => {
    if (!open || !contentRef.current) return;

    // レンダリング後にフォーカスを当てるため requestAnimationFrame を使う
    const id = requestAnimationFrame(() => {
      if (!contentRef.current) return;
      const items = contentRef.current.querySelectorAll<HTMLElement>(
        '[role="option"]:not([data-disabled])'
      );
      if (items.length === 0) return;

      // 選択中のアイテムがあればそこへ、なければ最初のアイテムへ
      const selected = value
        ? contentRef.current.querySelector<HTMLElement>(
            `[role="option"][data-value="${value}"]`
          )
        : null;
      const target =
        selected && !selected.hasAttribute("data-disabled")
          ? selected
          : items[0];
      target.focus();
    });

    return () => cancelAnimationFrame(id);
  }, [open, value, contentRef]);

  // キーボードナビゲーション
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!contentRef.current) return;

      const items = Array.from(
        contentRef.current.querySelectorAll<HTMLElement>(
          '[role="option"]:not([data-disabled])'
        )
      );
      if (items.length === 0) return;

      const currentIndex = items.findIndex(
        (item) => item === document.activeElement
      );

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const next =
            currentIndex < 0 || currentIndex >= items.length - 1
              ? 0
              : currentIndex + 1;
          items[next].focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev =
            currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
          items[prev].focus();
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          const focused = document.activeElement as HTMLElement | null;
          const itemValue = focused?.getAttribute("data-value");
          if (itemValue) onValueChange(itemValue);
          break;
        }
        case "Escape": {
          e.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
          break;
        }
        case "Tab": {
          // Tab はデフォルト動作を止めずにドロップダウンを閉じる
          setOpen(false);
          triggerRef.current?.focus();
          break;
        }
      }
    },
    [contentRef, triggerRef, setOpen, onValueChange]
  );

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      role="listbox"
      onKeyDown={handleKeyDown}
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
      data-value={itemValue}
      tabIndex={disabled ? undefined : 0}
      onClick={() => {
        if (!disabled) onValueChange(itemValue);
      }}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
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
