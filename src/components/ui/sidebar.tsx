"use client";

import {
  type ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { PanelLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_COLLAPSED = "3rem";

// --- Context ---

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

// --- useSidebar ---

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar は SidebarProvider の中で使用してください");
  }
  return context;
}

// --- SidebarProvider ---

type SidebarProviderProps = ComponentProps<"div"> & {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function SidebarProvider({
  defaultOpen = true,
  onOpenChange,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [open, setOpenState] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);

  const setOpen = useCallback(
    (value: boolean) => {
      setOpenState(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev);
    } else {
      setOpen(!open);
    }
  }, [isMobile, open, setOpen]);

  const value = useMemo<SidebarContextValue>(
    () => ({
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div className={cn("flex min-h-svh w-full", className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

// --- Sidebar ---

type SidebarProps = ComponentProps<"aside"> & {
  children?: React.ReactNode;
};

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { open, openMobile, setOpenMobile, isMobile } = useSidebar();

  if (isMobile) {
    return (
      <DialogPrimitive.Root open={openMobile} onOpenChange={setOpenMobile}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-200" />
          <DialogPrimitive.Content
            className={cn(
              "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left duration-200",
              className,
            )}
            style={{ width: SIDEBAR_WIDTH }}
          >
            <DialogPrimitive.Title className="sr-only">
              ナビゲーションメニュー
            </DialogPrimitive.Title>
            {children}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  return (
    <>
      {/* Spacer div for layout push */}
      <div
        className="shrink-0 transition-[width] duration-200"
        style={{ width: open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED }}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
          className,
        )}
        style={{ width: open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED }}
        {...props}
      >
        {children}
      </aside>
    </>
  );
}

// --- SidebarHeader ---

export function SidebarHeader({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      style={{ minWidth: SIDEBAR_WIDTH }}
      className={cn("flex items-center gap-2 px-3.5 py-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// --- SidebarContent ---

export function SidebarContent({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-2 py-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// --- SidebarFooter ---

export function SidebarFooter({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t border-sidebar-border px-2 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// --- SidebarGroup ---

export function SidebarGroup({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("space-y-1 py-2", className)} {...props}>
      {children}
    </div>
  );
}

// --- SidebarGroupLabel ---

export function SidebarGroupLabel({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  const { open, isMobile } = useSidebar();
  const collapsed = !open && !isMobile;

  return (
    <span
      className={cn(
        "block overflow-hidden px-1.5 text-xs text-muted-foreground font-medium transition-all duration-200",
        collapsed ? "h-0 opacity-0" : "h-5 opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// --- SidebarMenu ---

export function SidebarMenu({
  className,
  children,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul className={cn(className)} {...props}>
      {children}
    </ul>
  );
}

// --- SidebarMenuItem ---

export function SidebarMenuItem({
  className,
  children,
  ...props
}: ComponentProps<"li">) {
  return (
    <li className={cn("list-none", className)} {...props}>
      {children}
    </li>
  );
}

// --- SidebarMenuButton ---

type SidebarMenuButtonProps = ComponentProps<"button"> & {
  icon?: LucideIcon;
  isActive?: boolean;
  asChild?: boolean;
};

export function SidebarMenuButton({
  icon: Icon,
  isActive,
  asChild,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { open, isMobile } = useSidebar();
  const collapsed = !open && !isMobile;
  const Comp = asChild ? Slot : "button";

  const button = (
    <Comp
      data-active={isActive ? "" : undefined}
      className={cn(
        "cursor-pointer flex w-full items-center gap-2 rounded-md px-1.5 py-2 text-ui transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-active:font-medium",
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="size-4.5 shrink-0" strokeWidth={1.5} />}
      <span className="flex flex-1 items-center gap-2 text-[13px] font-[550] truncate whitespace-nowrap">
        {children}
      </span>
    </Comp>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">{children}</TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

// --- SidebarMenuSub ---

export function SidebarMenuSub({
  className,
  children,
  ...props
}: ComponentProps<"ul">) {
  return (
    <CollapsiblePrimitive.Content className="overflow-hidden data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out]">
      <ul
        className={cn(
          "ml-4 space-y-0.5 border-l border-border pl-2 py-1",
          className,
        )}
        {...props}
      >
        {children}
      </ul>
    </CollapsiblePrimitive.Content>
  );
}

// --- SidebarTrigger ---

export function SidebarTrigger({
  className,
  ...props
}: ComponentProps<"button">) {
  const { open, toggleSidebar } = useSidebar();
  const label = open ? "サイドバーを閉じる" : "サイドバーを開く";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors",
            className,
          )}
          onClick={toggleSidebar}
          aria-label={label}
          {...props}
        >
          <PanelLeft className="size-4.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

// --- SidebarCollapsible ---

function SidebarCollapsibleRoot({
  open: openProp,
  onOpenChange,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const { open: sidebarOpen } = useSidebar();
  const [open, setOpen] = useState(openProp ?? false);

  useEffect(() => {
    if (!sidebarOpen) {
      setOpen(false);
    }
  }, [sidebarOpen]);

  return (
    <CollapsiblePrimitive.Root
      open={openProp ?? open}
      onOpenChange={(value) => {
        setOpen(value);
        onOpenChange?.(value);
      }}
      {...props}
    />
  );
}

export const SidebarCollapsible = {
  Root: SidebarCollapsibleRoot,
  Trigger: CollapsiblePrimitive.Trigger,
  Content: CollapsiblePrimitive.Content,
};
