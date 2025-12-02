"use client";

import { useEffect, useRef, useState } from "react";

export function CursorFollower() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const tailsRef = useRef<HTMLDivElement[]>([]);
  const [variant, setVariant] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    // Create tail segments for the white variant
    const tailContainer = document.createElement("div");
    tailContainer.className = "cursor-tail-container";
    document.body.appendChild(tailContainer);

    const tailCount = 6;
    tailsRef.current = Array.from({ length: tailCount }).map((_, i) => {
      const el = document.createElement("div");
      el.className = "cursor-tail";
      el.style.opacity = `${1 - i * (1 / tailCount)}`;
      tailContainer.appendChild(el);
      return el as HTMLDivElement;
    });

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    const ease = 1; // follow directly under the cursor (no lag)

    const move = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const raf = () => {
      // Follow directly the target to eliminate lag
      x = targetX;
      y = targetY;

      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      // Position tails with zero delay: snap directly under cursor
      tailsRef.current.forEach((tail, i) => {
        tail.style.left = `${x}px`;
        tail.style.top = `${y}px`;
        tail.style.transform = `translate(-50%, -50%) scale(${0.9 - i * 0.1})`;
        tail.style.display = "block";
        tail.style.background = variant === "light" ? "#ffffff" : "#000000";
      });

      requestAnimationFrame(raf);
    };

    const handleEnterGradient = () => setVariant("light");
    const handleLeaveGradient = () => setVariant("dark");

    window.addEventListener("mousemove", move);
    requestAnimationFrame(raf);

    const gradientEls = document.querySelectorAll<HTMLElement>(".hero-gradient");
    gradientEls.forEach((el) => {
      el.addEventListener("mouseenter", handleEnterGradient);
      el.addEventListener("mouseleave", handleLeaveGradient);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      gradientEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnterGradient);
        el.removeEventListener("mouseleave", handleLeaveGradient);
      });
      tailContainer.remove();
    };
  }, [variant]);

  return (
    <div
      ref={circleRef}
      className={`cursor-circle ${variant === "light" ? "cursor-circle--white" : "cursor-circle--black"}`}
    />
  );
}
