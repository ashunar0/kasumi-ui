"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const article = document.querySelector("[data-docs-content]");
    if (!article) return;

    const h2Elements = article.querySelectorAll("h2");
    const items: TocItem[] = [];

    h2Elements.forEach((h2) => {
      if (!h2.id) {
        h2.id =
          h2.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\u3000-\u9fff\uf900-\ufaff-]/g, "") ?? "";
      }
      items.push({ id: h2.id, text: h2.textContent ?? "" });
    });

    setHeadings(items);
    setActiveId("");
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    const article = document.querySelector("[data-docs-content]");
    if (!article) return;

    const h2Elements = article.querySelectorAll("h2");
    h2Elements.forEach((h2) => observer.observe(h2));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="text-sm font-semibold mb-3">On this page</p>
      <div className="border-l-2 border-border space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={() => setActiveId(heading.id)}
            className={cn(
              "block text-sm py-1 pl-3 text-muted-foreground transition-colors hover:text-foreground",
              activeId === heading.id && "text-foreground font-medium",
            )}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
