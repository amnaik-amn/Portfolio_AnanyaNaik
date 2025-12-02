"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={clsx(
          "w-full rounded-xl border-2 border-dark px-4 py-3 text-sm tracking-wide text-dark placeholder:text-dark/40 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/40",
          "min-h-[160px]",
          className
        )}
        {...props}
      />
    );
  }
);

