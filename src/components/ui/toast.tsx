"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  CircleCheck,
  Info,
  TriangleAlert,
  OctagonAlert,
} from "lucide-react";
import {
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

type ToastVariant = "default" | "success" | "info" | "warning" | "error";

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
    "data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full",
  "top-center":
    "data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-top-full",
  "top-right":
    "data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full",
  "bottom-left":
    "data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full",
  "bottom-center":
    "data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full",
  "bottom-right":
    "data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full",
};

// --- Position Context (内部用) ---

const PositionContext = createContext<Position>("top-right");

// --- Variant styles (Alert Callout 風) ---

const variantClasses: Record<ToastVariant, string> = {
  default: "border-border bg-background text-foreground",
  success:
    "border-emerald-500/50 bg-emerald-600/10 text-emerald-700 dark:border-emerald-600/50 dark:bg-emerald-600/15 dark:text-emerald-400",
  info: "border-blue-400/50 bg-blue-500/10 text-blue-700 dark:border-blue-600/60 dark:bg-blue-600/20 dark:text-blue-400",
  warning:
    "border-amber-500/50 bg-amber-600/10 text-amber-700 dark:border-amber-600/50 dark:bg-amber-600/15 dark:text-amber-400",
  error:
    "border-destructive/30 bg-destructive/10 text-red-700 dark:border-destructive/50 dark:bg-destructive/15 dark:text-red-400",
};

const variantIcons: Record<ToastVariant, ReactNode> = {
  default: null,
  success: <CircleCheck size={16} />,
  info: <Info size={16} />,
  warning: <TriangleAlert size={16} />,
  error: <OctagonAlert size={16} />,
};

// --- ToastProvider ---

export function ToastProvider({
  children,
  position = "top-right",
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
        <ToastPrimitive.Provider
          duration={duration}
          swipeDirection="right"
          label="通知"
        >
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

function ToastItem({
  data,
  onClose,
}: {
  data: ToastData;
  onClose: () => void;
}) {
  const position = useContext(PositionContext);
  const variant = data.variant ?? "default";
  const icon = variantIcons[variant];

  return (
    <ToastPrimitive.Root
      duration={data.duration}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className={`rounded-xl border shadow-lg p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=end]:animate-out data-[swipe=end]:fade-out-0 data-[swipe=end]:slide-out-to-right-full ${slideAnimationClasses[position]} duration-200 ${variantClasses[variant]}`}
    >
      <div className={`flex gap-3 ${icon ? "items-start" : ""}`}>
        {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
        <div className="flex-1">
          <ToastPrimitive.Title className="text-sm font-semibold">
            {data.title}
          </ToastPrimitive.Title>
          {data.description && (
            <ToastPrimitive.Description className="mt-1 text-sm opacity-80">
              {data.description}
            </ToastPrimitive.Description>
          )}
        </div>
      </div>
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
