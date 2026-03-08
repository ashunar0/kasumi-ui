"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Calendar,
  Users,
  Settings,
  Bell,
  HelpCircle,
  ChevronDown,
  Command,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarTrigger,
  SidebarCollapsible,
  useSidebar,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TooltipProvider } from "@/components/ui/tooltip";

function SidebarBrand() {
  const { open, isMobile } = useSidebar();
  const collapsed = !open && !isMobile;
  const [showHoverSwap, setShowHoverSwap] = useState(collapsed);

  useEffect(() => {
    if (collapsed) {
      // 幅アニメーション（200ms）完了後に切り替え
      const timer = setTimeout(() => setShowHoverSwap(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowHoverSwap(false);
    }
  }, [collapsed]);

  if (showHoverSwap) {
    return (
      <div className="group relative flex items-center justify-center">
        <Command className="size-4.5 transition-opacity group-hover:opacity-0" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <SidebarTrigger />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-between">
      <Command className="size-4.5" />
      <SidebarTrigger />
    </div>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarBrand />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton icon={Home} isActive>
                    ダッシュボード
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton icon={Calendar}>
                    スケジュール
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton icon={Users}>メンバー</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarMenu>
                <SidebarCollapsible.Root>
                  <SidebarGroupLabel>設定</SidebarGroupLabel>
                  <SidebarMenuItem>
                    <SidebarCollapsible.Trigger asChild>
                      <SidebarMenuButton icon={Settings} className="group">
                        設定
                        <ChevronDown className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </SidebarMenuButton>
                    </SidebarCollapsible.Trigger>
                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        <SidebarMenuButton>プロフィール</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>通知設定</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>アカウント</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarCollapsible.Root>
                <SidebarMenuItem>
                  <SidebarMenuButton icon={Bell}>お知らせ</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton icon={HelpCircle}>
                    ヘルプ
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenuButton icon={HelpCircle}>ヘルプ</SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background px-4">
            <h1 className="text-h4 font-semibold tracking-tight">
              ダッシュボード
            </h1>
          </header>
          {children}
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
