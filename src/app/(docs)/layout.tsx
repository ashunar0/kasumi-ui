"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TableOfContents } from "@/components/docs/toc";

export type NavGroup = {
  label: string;
  items: { name: string; href: string }[];
};

export const sidebarGroups: NavGroup[] = [
  {
    label: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs" },
    ],
  },
  {
    label: "Components",
    items: [
      { name: "Overview", href: "/docs/components" },
      { name: "Accordion", href: "/docs/components/accordion" },
      { name: "Alert", href: "/docs/components/alert" },
      { name: "Avatar", href: "/docs/components/avatar" },
      { name: "Badge", href: "/docs/components/badge" },
      { name: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { name: "Button", href: "/docs/components/button" },
      { name: "Card", href: "/docs/components/card" },
      { name: "Checkbox", href: "/docs/components/checkbox" },
      { name: "Dialog", href: "/docs/components/dialog" },
      { name: "DropdownMenu", href: "/docs/components/dropdown-menu" },
      { name: "Field", href: "/docs/components/field" },
      { name: "Input", href: "/docs/components/input" },
      { name: "Label", href: "/docs/components/label" },
      { name: "Pagination", href: "/docs/components/pagination" },
      { name: "Popover", href: "/docs/components/popover" },
      { name: "Progress", href: "/docs/components/progress" },
      { name: "Radio", href: "/docs/components/radio" },
      { name: "Select", href: "/docs/components/select" },
      { name: "Separator", href: "/docs/components/separator" },
      { name: "Skeleton", href: "/docs/components/skeleton" },
      { name: "Switch", href: "/docs/components/switch" },
      { name: "Table", href: "/docs/components/table" },
      { name: "Tabs", href: "/docs/components/tabs" },
      { name: "Textarea", href: "/docs/components/textarea" },
      { name: "Toast", href: "/docs/components/toast" },
      { name: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  {
    label: "Blocks",
    items: [
      { name: "Overview", href: "/docs/blocks" },
    ],
  },
];

function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {sidebarGroups.map((group) => (
        <div key={group.label} className="space-y-1">
          <p className="text-xs text-muted-foreground mb-2">{group.label}</p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block text-sm py-1 transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex gap-10">
          {/* Left navigation */}
          <aside className="hidden md:block w-52 shrink-0">
            <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-10 no-scrollbar">
              <DocsNav />
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1 py-10" data-docs-content>
            <div className="max-w-3xl">{children}</div>
          </main>

          {/* Right TOC */}
          <aside className="hidden lg:block w-48 shrink-0 py-10">
            <div className="sticky top-26">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
