"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/docs"
          className="font-semibold text-md flex items-center gap-2"
        >
          <Image src="/kasumi.svg" alt="kasumi/ui" width={32} height={32} />
          kasumi/ui
        </Link>
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
