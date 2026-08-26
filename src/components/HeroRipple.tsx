"use client";

import { useEffect, useState } from "react";
import RippleDistortion from "@/components/RippleDistortion";

export function HeroRipple() {
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setClear(true);
      return;
    }
    const start = window.setTimeout(() => setClear(true), 5000);
    const onReveal = () => setClear(true);
    document.addEventListener("click", onReveal, { once: true });
    return () => {
      window.clearTimeout(start);
      document.removeEventListener("click", onReveal);
    };
  }, []);

  return (
    <RippleDistortion
      src="/brand/bg1.png"
      brushSize={160}
      strength={clear ? 0.12 : 0.38}
      swirl={clear ? 0.55 : 1.8}
      rings={4}
      glint={0.45}
      tint="#c8102e"
      tintAmount={0.14}
      grayscale={!clear}
      trigger="both"
      quality="medium"
      clear={clear}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
