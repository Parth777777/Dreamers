"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SmallAbout() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const text = "Dreamers is a growth marketing partner for ambitious brands; combining creative thinking, content, strategy and performance to turn attention into measurable growth.";
  const words = text.split(" ");

  useGSAP(() => {
    gsap.fromTo(
      ".reveal-word",
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current, // Use the actual text container as trigger for better accuracy
          start: "top 85%", // Starts highlighting when text comes into view
          end: "bottom 50%", // Finishes by the time text is in the middle of screen
          scrub: true, // Smooth scrub
        },
      }
    );
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="bg-[#FFF8F2] py-24 md:py-40 overflow-hidden relative z-10 w-full"
    >
      <div className="w-[90%] mx-auto">
        <h3 className="font-mono text-sm tracking-widest uppercase mb-12 text-[#B61D22] opacity-60">About Us</h3>
        
        <div ref={textRef} className="font-display text-3xl md:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight w-full text-[#B61D22]">
          {words.map((word, i) => (
            <span key={i} className="reveal-word inline-block mr-[0.2em] md:mr-[0.25em]">
              {word}
            </span>
          ))}
        </div>

        <div className="mt-16 flex">
          <Button href="/about">Read our full story</Button>
        </div>
      </div>
    </section>
  );
}
