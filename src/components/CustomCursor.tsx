"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = dot.current;
    if (!node) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !motion) return;

    const move = (event: PointerEvent) => {
      node.style.transform = `translate(${event.clientX - 14}px, ${event.clientY - 14}px)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden h-7 w-7 rounded-full border border-cream mix-blend-difference md:block"
    />
  );
}
