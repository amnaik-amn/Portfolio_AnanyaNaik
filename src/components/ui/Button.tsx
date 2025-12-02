"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "invert";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  const variants: Record<typeof variant, string> = {
    primary:
      "bg-blue text-white border-2 border-dark rounded-full px-6 py-3 text-sm uppercase tracking-[0.2em] shadow-glow hover:bg-blue/80 transition-colors",
    ghost:
      "rounded-full border border-dark/20 px-5 py-3 text-sm uppercase tracking-[0.2em] text-dark/70 hover:bg-dark/5 transition-colors dark:border-ink-line dark:text-ink-text/70 dark:hover:bg-ink-surface/60",
    outline:
      "rounded-full border-2 border-dark px-5 py-3 text-sm uppercase tracking-[0.2em] text-dark hover:bg-light/60 transition-colors dark:border-ink-line dark:text-ink-text dark:hover:bg-ink-surface/60",
    invert:
      "rounded-full px-5 py-3 text-sm uppercase tracking-[0.4em] border-2 transition-colors bg-paper-bg text-paper-text border-paper-text hover:bg-paper-text hover:text-paper-bg dark:bg-ink-bg dark:text-ink-text dark:border-ink-text dark:hover:bg-ink-text dark:hover:text-ink-bg"
  };
  return <button ref={ref} className={clsx(variants[variant], className)} {...props} />;
});

