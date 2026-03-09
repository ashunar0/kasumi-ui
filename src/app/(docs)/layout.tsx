"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { TableOfContents } from "@/components/docs/toc";
import Image from "next/image";

const navItems = [{ name: "Introduction", href: "/docs" }];

const components = [
  { name: "Button", href: "/docs/components/button" },
  { name: "Input", href: "/docs/components/input" },
];

function DocsHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/docs"
          className="font-semibold text-md flex items-center gap-2"
        >
          <Image src="/kasumi.svg" alt="kasumi/ui" width={32} height={32} />
          kasumi/ui
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      <div className="space-y-1">
        {navItems.map((item) => (
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

      <div className="space-y-1">
        <p className="text-sm font-semibold mb-2">Components</p>
        {components.map((item) => (
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
      <DocsHeader />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex gap-10">
          {/* Left navigation */}
          <aside className="hidden md:block w-52 shrink-0 py-10">
            <div className="sticky top-26">
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
