"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "Docs", href: "/docs", exact: true },
  { name: "Components", href: "/docs/components", exact: false },
  { name: "Blocks", href: "/docs/blocks", exact: false },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-semibold text-md flex items-center gap-2"
          >
            <Image src="/kasumi.svg" alt="kasumi/ui" width={32} height={32} />
            kasumi/ui
          </Link>
          <nav className="hidden sm:flex items-center gap-4">
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
                    isActive ? "text-foreground font-medium" : "text-muted-foreground",
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
    </header>
  );
}
