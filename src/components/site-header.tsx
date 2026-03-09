"use client";

import Link from "next/link";
import Image from "next/image";
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
        <ThemeToggle />
      </div>
    </header>
  );
}
