"use client"

import {
  Home,
  Calendar,
  Users,
  Settings,
  Bell,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarTrigger,
  SidebarCollapsible,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <span className="text-h4 font-bold tracking-tight">CalSync</span>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>メニュー</SidebarGroupLabel>
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
                  <SidebarMenuButton icon={Users}>
                    メンバー
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>その他</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarCollapsible.Root>
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
                  <SidebarMenuButton icon={Bell}>
                    お知らせ
                  </SidebarMenuButton>
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
            <Avatar size="sm">
              <AvatarFallback>あ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-ui">
              <span className="font-medium">あさひ</span>
              <span className="text-xs text-muted-foreground">
                asahi@example.com
              </span>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background px-4">
            <SidebarTrigger />
            <h1 className="text-h4 font-semibold tracking-tight">
              ダッシュボード
            </h1>
          </header>
          {children}
        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}
