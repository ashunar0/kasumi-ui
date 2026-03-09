"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";

const components = [
  { name: "Button", href: "/docs/components/button" },
  { name: "Input", href: "/docs/components/input" },
];

function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/docs"
          className="flex items-center gap-2 font-semibold text-sm"
        >
          kasumi/ui
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/docs">
                <SidebarMenuButton
                  icon={BookOpen}
                  isActive={pathname === "/docs"}
                >
                  Introduction
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarMenu>
            {components.map((component) => (
              <SidebarMenuItem key={component.name}>
                <Link href={component.href}>
                  <SidebarMenuButton isActive={pathname === component.href}>
                    {component.name}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function DocsHeader() {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-2">
        {isMobile && <SidebarTrigger />}
      </div>
      <ThemeToggle />
    </header>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <DocsSidebar />
        <main className="flex-1 min-w-0">
          <DocsHeader />
          <div className="mx-auto max-w-3xl px-6 py-10 mb-10">{children}</div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
