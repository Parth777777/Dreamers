"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  id?: string;
  cue: string;
  axis?: "x" | "y";
  invert?: boolean;
  children: ReactNode;
};

export function SideRail({ id, cue, axis = "x", invert = false, children }: Props) {
  const pin = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const node = track.current;
        const shell = pin.current;
        if (!node || !shell) return;

        const distance = () =>
          axis === "x"
            ? Math.max(0, node.scrollWidth - window.innerWidth)
            : Math.max(0, node.scrollHeight - window.innerHeight);

        const tween = gsap.to(node, {
          x: axis === "x" ? () => (invert ? distance() : -distance()) : 0,
          y: axis === "y" ? () => (invert ? distance() : -distance()) : 0,
          ease: "none",
          scrollTrigger: {
            trigger: shell,
            start: "top top",
            end: () => `+=${Math.max(distance(), window.innerHeight)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    },
    { scope: pin, dependencies: [axis, invert] },
  );

  const trackClass =
    axis === "x"
      ? "side-track flex h-[100svh] w-max flex-row will-change-transform"
      : "side-track flex min-h-[100svh] w-full flex-col will-change-transform";

  return (
    <section
      ref={pin}
      id={id}
      className={`relative bg-void ${axis === "x" ? "overflow-x-auto md:overflow-hidden" : "overflow-y-auto md:overflow-hidden"}`}
    >
      <p className="pointer-events-none absolute top-6 left-5 z-10 font-mono text-[12px] tracking-[0.28em] text-red uppercase md:left-10">
        {cue}
      </p>
      <div ref={track} className={trackClass}>
        {children}
      </div>
    </section>
  );
}

export function RailPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex h-[100svh] w-screen shrink-0 flex-col justify-center px-5 py-24 md:px-16 ${className}`}>
      {children}
    </div>
  );
}
