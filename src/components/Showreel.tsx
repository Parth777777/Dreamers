"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showreelSrc, showreelStills } from "@/content/reels";
import "./Showreel.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Showreel() {
  const frame = useRef<HTMLDivElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [still, setStill] = useState(0);

  useEffect(() => {
    const probe = document.createElement("video");
    probe.src = showreelSrc;
    probe.muted = true;
    probe.playsInline = true;
    const onReady = () => setUseVideo(true);
    probe.addEventListener("canplay", onReady);
    probe.addEventListener("error", () => setUseVideo(false));
    probe.load();
    return () => {
      probe.removeEventListener("canplay", onReady);
    };
  }, []);

  useEffect(() => {
    if (useVideo || showreelStills.length < 2) return;
    const id = window.setInterval(() => {
      setStill((value) => (value + 1) % showreelStills.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [useVideo]);

  useGSAP(
    () => {
      const node = frame.current;
      if (!node) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        node.classList.add("is-mini");
        return;
      }

      gsap.fromTo(
        node,
        {
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          top: 0,
          left: 0,
          borderRadius: 0,
        },
        {
          width: 220,
          height: 124,
          top: () => window.innerHeight - 140,
          left: () => window.innerWidth - 236,
          borderRadius: 16,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-stage",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onLeave: () => node.classList.add("is-docked"),
            onEnterBack: () => node.classList.remove("is-docked"),
          },
        },
      );
    },
    { dependencies: [] },
  );

  const jump = () => {
    document.getElementById("videos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={frame} className="showreel-frame">
      <button type="button" className="showreel-hit" onClick={jump} aria-label="Open videos">
        {useVideo ? (
          <video className="showreel-media" src={showreelSrc} muted loop playsInline autoPlay />
        ) : (
          <img
            className="showreel-media"
            src={showreelStills[still] ?? "/work/lti-seo/slide-01.jpg"}
            alt=""
          />
        )}
        <span className="showreel-rec">Rec</span>
      </button>
    </div>
  );
}
