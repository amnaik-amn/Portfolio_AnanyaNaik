"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full rounded-xl border-2 border-dark px-4 py-3 text-sm tracking-wide text-dark placeholder:text-dark/40 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/40",
        className
      )}
      {...props}
    />
  );
});

