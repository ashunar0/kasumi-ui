"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import {
  type ComponentProps,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

// --- Types ---

type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

type ToastVariant = "default" | "destructive";

type ToastData = {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastInput = Omit<ToastData, "id">;

// --- State Management ---

type State = { toasts: ToastData[] };
type Action =
  | { type: "ADD"; toast: ToastData }
  | { type: "REMOVE"; id: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return { toasts: [...state.toasts, action.toast] };
    case "REMOVE":
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
  }
}

let idCounter = 0;

// --- Context ---

const ToastContext = createContext<{
  toast: (input: ToastInput) => void;
} | null>(null);

// --- Position → Tailwind class mapping ---

const viewportPositionClasses: Record<Position, string> = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0",
};

// position に応じたスライドイン/アウト方向
const slideAnimationClasses: Record<Position, string> = {
  "top-left":
    "data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-left-full",
  "top-center":
    "data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-top-full",
  "top-right":
    "data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full",
  "bottom-left":
    "data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-left-full",
  "bottom-center":
    "data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full",
  "bottom-right":
    "data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
};

// --- Position Context (内部用) ---

const PositionContext = createContext<Position>("bottom-right");

// --- ToastProvider ---

export function ToastProvider({
  children,
  position = "bottom-right",
  duration = 5000,
}: {
  children: ReactNode;
  position?: Position;
  duration?: number;
}) {
  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  const toast = useCallback(
    (input: ToastInput) => {
      const id = String(++idCounter);
      dispatch({ type: "ADD", toast: { ...input, id } });
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      <PositionContext.Provider value={position}>
        <ToastPrimitive.Provider duration={duration} label="通知">
          {children}
          {state.toasts.map((t) => (
            <ToastItem
              key={t.id}
              data={t}
              onClose={() => dispatch({ type: "REMOVE", id: t.id })}
            />
          ))}
          <ToastPrimitive.Viewport
            className={`fixed z-[100] flex flex-col gap-2 p-4 w-full max-w-sm ${viewportPositionClasses[position]}`}
          />
        </ToastPrimitive.Provider>
      </PositionContext.Provider>
    </ToastContext.Provider>
  );
}

// --- ToastItem (内部コンポーネント) ---

const variantClasses: Record<ToastVariant, string> = {
  default: "bg-background border-border text-foreground",
  destructive: "bg-destructive border-destructive text-destructive-foreground",
};

function ToastItem({
  data,
  onClose,
}: {
  data: ToastData;
  onClose: () => void;
}) {
  const position = useContext(PositionContext);
  const variant = data.variant ?? "default";

  return (
    <ToastPrimitive.Root
      duration={data.duration}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className={`rounded-xl border shadow-lg p-4 pr-10 relative data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 ${slideAnimationClasses[position]} duration-200 ${variantClasses[variant]}`}
    >
      <ToastPrimitive.Title className="text-sm font-semibold">
        {data.title}
      </ToastPrimitive.Title>
      {data.description && (
        <ToastPrimitive.Description className="mt-1 text-sm opacity-80">
          {data.description}
        </ToastPrimitive.Description>
      )}
      <ToastPrimitive.Close className="absolute right-3 top-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <X size={14} />
        <span className="sr-only">閉じる</span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}

// --- useToast ---

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast は ToastProvider の中で使う必要があります");
  }
  return context;
}
