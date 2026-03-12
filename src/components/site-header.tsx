"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Github, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { sidebarGroups } from "@/app/(docs)/layout";

const navLinks = [
  { name: "Docs", href: "/docs", exact: true },
  { name: "Components", href: "/docs/components", exact: false },
  { name: "Blocks", href: "/docs/blocks", exact: false },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {isDocs ? (
            <>
              {/* Mobile menu button — docs pages only, below md */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground md:hidden"
                aria-label="メニューを開く"
              >
                <Menu className="h-5 w-5" />
              </button>
              {/* Logo — desktop only when in docs */}
              <Link
                href="/"
                className="hidden md:flex font-semibold text-md items-center gap-2"
              >
                <Image
                  src="/kasumi_light.svg"
                  alt="kasumi/ui"
                  width={24}
                  height={24}
                  className="dark:hidden"
                />
                <Image
                  src="/kasumi_dark.svg"
                  alt="kasumi/ui"
                  width={24}
                  height={24}
                  className="hidden dark:block"
                />
                kasumi/ui
              </Link>
            </>
          ) : (
            <Link
              href="/"
              className="font-semibold text-md flex items-center gap-2"
            >
              <Image
                src="/kasumi_light.svg"
                alt="kasumi/ui"
                width={24}
                height={24}
                className="dark:hidden"
              />
              <Image
                src="/kasumi_dark.svg"
                alt="kasumi/ui"
                width={24}
                height={24}
                className="hidden dark:block"
              />
              kasumi/ui
            </Link>
          )}

          <nav
            className={
              isDocs
                ? "hidden md:flex items-center gap-4"
                : "hidden sm:flex items-center gap-4"
            }
          >
            {navLinks.map((link) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors hover:text-foreground",
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ashunar0/kasumi-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile sidebar sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-6">
          <SheetTitle className="sr-only">ナビゲーション</SheetTitle>
          <nav className="space-y-6">
            {sidebarGroups.map((group) => (
              <div key={group.label} className="space-y-1">
                <p className="text-xs text-muted-foreground mb-2">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
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
        </SheetContent>
      </Sheet>
    </header>
  );
}
