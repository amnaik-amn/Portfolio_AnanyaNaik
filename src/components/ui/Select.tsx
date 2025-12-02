"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={clsx(
        "w-full appearance-none rounded-xl border-2 border-dark bg-white px-4 py-3 text-sm tracking-wide text-dark focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/40",
        "bg-[url('data:image/svg+xml;utf8,<svg fill=%22%23080708%22 height=%2218%22 viewBox=%220 0 24 24%22 width=%2218%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')] bg-[length:18px] bg-[right_16px_center] bg-no-repeat",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

