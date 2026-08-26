"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const props = [
  { id: "a", src: "/space/prop-01.png", className: "left-[8%] top-[18%] hidden md:block" },
  { id: "b", src: "/space/prop-02.png", className: "right-[6%] top-[28%] hidden md:block" },
  { id: "c", src: "/space/prop-03.png", className: "right-[14%] bottom-[12%]" },
] as const;

export function ScrollStage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.to(".prop-a", {
        y: -160,
        rotateY: 28,
        rotateX: -18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=140%", scrub: 1.1 },
      });
      gsap.to(".prop-b", {
        y: 120,
        rotateY: -36,
        rotateZ: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=160%", scrub: 1.2 },
      });
      gsap.to(".prop-c", {
        y: -90,
        x: -40,
        rotateX: 22,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=180%", scrub: 0.9 },
      });
      gsap.to(".mesh-cube", {
        rotateY: 220,
        rotateX: 80,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=200%", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
      style={{ perspective: "1400px" }}
      aria-hidden
    >
      <div className="mesh-cube absolute top-[42%] left-[52%] hidden h-24 w-24 lg:block">
        <span className="face face-front" />
        <span className="face face-back" />
        <span className="face face-left" />
        <span className="face face-right" />
        <span className="face face-top" />
      </div>
      {props.map((item) => (
        <div
          key={item.id}
          className={`prop-${item.id} absolute h-40 w-40 will-change-transform ${item.className}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="mesh-slab">
            <img
              src={item.src}
              alt=""
              className="h-full w-full object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
