"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/#work", label: "Work", sectionId: "work" },
  { href: "/#contact", label: "Contact", sectionId: "contact" }
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const ids = ["work", "about", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]?.target instanceof HTMLElement) {
          setActiveSection(visible[0].target.id);
        }
      },
      { root: null, rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-paper-bg/80 dark:bg-ink-bg/80 backdrop-blur-sm border-b border-paper-line dark:border-ink-line transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          {/* Left: initials + Work/About */}
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-bold tracking-tight text-paper-text dark:text-ink-text uppercase">
              AN
            </Link>
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks
                .filter((l) => l.label !== "Contact")
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "text-sm font-medium tracking-wide uppercase transition-colors relative group",
                      activeSection === link.sectionId
                        ? "text-paper-accent dark:text-ink-accent"
                        : "text-paper-text-muted dark:text-ink-text-muted hover:text-paper-text dark:hover:text-ink-text"
                    )}
                  >
                    {link.label}
                    {activeSection === link.sectionId && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-paper-accent dark:bg-ink-accent" />
                    )}
                  </Link>
                ))}
            </nav>
          </div>

          {/* Right: Contact next to Theme toggle */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex">
              {navLinks
                .filter((l) => l.label === "Contact")
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "text-sm font-medium tracking-wide uppercase transition-colors relative",
                      activeSection === link.sectionId
                        ? "text-paper-accent dark:text-ink-accent"
                        : "text-paper-text-muted dark:text-ink-text-muted hover:text-paper-text dark:hover:text-ink-text"
                    )}
                  >
                    {link.label}
                    {activeSection === link.sectionId && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-paper-accent dark:bg-ink-accent" />
                    )}
                  </Link>
                ))}
            </nav>
            <ThemeToggle />
            <button
              type="button"
              className="rounded-lg border border-paper-line dark:border-ink-line p-2 md:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-paper-line dark:border-ink-line px-8 py-6 md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "py-2 text-base font-medium tracking-wide uppercase transition-colors",
                    pathname === link.href
                      ? "text-paper-accent dark:text-ink-accent"
                      : "text-paper-text-muted dark:text-ink-text-muted hover:text-paper-text dark:hover:text-ink-text"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      <main className="pt-24">{children}</main>
      <footer className="border-t border-paper-line dark:border-ink-line py-16 mt-32">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 md:flex-row">
          <p className="text-sm text-paper-text-muted dark:text-ink-text-muted">
            © {new Date().getFullYear()} Ananya Naik. All rights reserved
          </p>
          <div className="flex items-center gap-8">
            <a 
              href="mailto:hello@example.com" 
              className="text-sm text-paper-text-muted dark:text-ink-text-muted hover:text-paper-accent dark:hover:text-ink-accent transition-colors"
            >
              Email
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener" 
              className="text-sm text-paper-text-muted dark:text-ink-text-muted hover:text-paper-accent dark:hover:text-ink-accent transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener" 
              className="text-sm text-paper-text-muted dark:text-ink-text-muted hover:text-paper-accent dark:hover:text-ink-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

