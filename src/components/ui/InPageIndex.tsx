"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

export type InPageItem = { id: string; label: string };

export function InPageIndex({ items, className }: { items: InPageItem[]; className?: string }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]?.target instanceof HTMLElement) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        // Top and bottom root margins tune when a section becomes active
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav className={clsx("text-sm", className)} aria-label="In-page navigation">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] opacity-70">On this page</p>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={clsx(
                  "block rounded-md px-3 py-2 transition-colors",
                  "border border-transparent",
                  isActive
                    ? "border-paper-line-accent text-paper-text dark:border-ink-line-accent dark:text-ink-text"
                    : "text-paper-text-muted hover:bg-black/5 dark:text-ink-text-muted dark:hover:bg-white/5"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
