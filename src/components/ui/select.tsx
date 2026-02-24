"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
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
