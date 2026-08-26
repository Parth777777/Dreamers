"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function SiteClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="font-sans text-[13px] tracking-[-0.02em] text-cream/75">
      <span suppressHydrationWarning>{time || "--:--"}</span>
      <span className="mx-2 text-ink/30">/</span>
      {site.locationLabel}
    </p>
  );
}
