"use client"

import {
  type ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { Slot } from "@radix-ui/react-slot"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { PanelLeft } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/lib/use-mobile"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_COLLAPSED = "3rem"

// --- Context ---

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

// --- useSidebar ---

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar は SidebarProvider の中で使用してください")
  }
  return context
}

// --- SidebarProvider ---

type SidebarProviderProps = ComponentProps<"div"> & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = true,
  onOpenChange,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [open, setOpenState] = useState(defaultOpen)
  const [openMobile, setOpenMobile] = useState(false)

  const setOpen = useCallback(
    (value: boolean) => {
      setOpenState(value)
      onOpenChange?.(value)
    },
    [onOpenChange]
  )

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
    } else {
      setOpen(!open)
    }
  }, [isMobile, open, setOpen])

  const value = useMemo<SidebarContextValue>(
    () => ({
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div className={cn("flex min-h-svh w-full", className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

// --- Sidebar ---

type SidebarProps = ComponentProps<"aside"> & {
  children?: React.ReactNode
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { open, openMobile, setOpenMobile, isMobile } = useSidebar()

  if (isMobile) {
    return (
      <DialogPrimitive.Root open={openMobile} onOpenChange={setOpenMobile}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/60" />
          <DialogPrimitive.Content
            className={cn(
              "fixed inset-y-0 left-0 z-50 flex flex-col bg-secondary",
              className
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
    )
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
          "fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-secondary transition-[width] duration-200",
          className
        )}
        style={{ width: open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED }}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}

// --- SidebarHeader ---

export function SidebarHeader({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2 px-4 py-3", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// --- SidebarContent ---

export function SidebarContent({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-2 py-2", className)}
      {...props}
    >
      {children}
    </div>
  )
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
        "flex items-center gap-2 border-t border-border px-4 py-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
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
  )
}

// --- SidebarGroupLabel ---

export function SidebarGroupLabel({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  const { open, isMobile } = useSidebar()
  const collapsed = !open && !isMobile

  return (
    <span
      className={cn(
        "px-3 text-ui text-muted-foreground font-medium transition-opacity duration-200",
        collapsed && "opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// --- SidebarMenu ---

export function SidebarMenu({
  className,
  children,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul className={cn("space-y-0.5", className)} {...props}>
      {children}
    </ul>
  )
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
  )
}

// --- SidebarMenuButton ---

type SidebarMenuButtonProps = ComponentProps<"button"> & {
  icon?: LucideIcon
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuButton({
  icon: Icon,
  isActive,
  asChild,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { open, isMobile } = useSidebar()
  const collapsed = !open && !isMobile
  const Comp = asChild ? Slot : "button"

  const button = (
    <Comp
      data-active={isActive ? "" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-ui transition-colors hover:bg-accent data-[active]:bg-accent data-[active]:font-medium",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      <span
        className={cn(
          "transition-all duration-200",
          collapsed && "opacity-0 w-0 overflow-hidden"
        )}
      >
        {children}
      </span>
    </Comp>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">{children}</TooltipContent>
      </Tooltip>
    )
  }

  return button
}

// --- SidebarMenuSub ---

type SidebarMenuSubProps = ComponentProps<"ul"> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarMenuSub({
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: SidebarMenuSubProps) {
  return (
    <CollapsiblePrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <CollapsiblePrimitive.Content className="overflow-hidden transition-all data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <ul
          className={cn(
            "ml-4 space-y-0.5 border-l border-border pl-2 py-1",
            className
          )}
          {...props}
        >
          {children}
        </ul>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}

// --- SidebarTrigger ---

export function SidebarTrigger({
  className,
  ...props
}: ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
        className
      )}
      onClick={toggleSidebar}
      aria-label="サイドバーの開閉"
      {...props}
    >
      <PanelLeft className="size-5" />
    </button>
  )
}

// --- Re-export CollapsiblePrimitive ---

export { CollapsiblePrimitive as SidebarCollapsible }
