"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mark } from "@/components/Mark";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ContentLibraryProps {
  hideIframes?: boolean;
  brandShots?: string[];
}

export function ContentLibrary({ hideIframes = false, brandShots = [] }: ContentLibraryProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".bento-item").forEach((el) => {
      gsap.from(el, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        }
      });
    });
  }, { scope: container });

  // Filter to just use the dynamic files, removing some very tiny or irrelevant files if needed.
  // For a diverse grid, we dynamically assign sizes based on index
  const gridItems = brandShots.map((src, idx) => {
    const isVideo = src.match(/\.(mp4|mov|webm)$/i);
    const isIframe = src.includes("youtube.com") || src.includes("instagram.com");
    // Assign varying column and row spans to create a bento box look
    let spanClass = "col-span-1 row-span-1 aspect-square md:aspect-auto";
    if (idx % 7 === 0) spanClass = "col-span-1 md:col-span-2 row-span-1 md:row-span-2 aspect-square md:aspect-auto"; // large square
    else if (idx % 5 === 0) spanClass = "col-span-1 md:col-span-2 row-span-1 aspect-video"; // wide
    else if (idx % 3 === 0) spanClass = "col-span-1 row-span-1 md:row-span-2 aspect-[9/16] md:aspect-auto"; // tall

    return { src, isVideo, isIframe, spanClass };
  });

  return (
    <section id="content-library" className="bg-void px-5 py-28 md:px-10" ref={container}>
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <h2 className="font-display text-5xl md:text-7xl mb-12 text-center">
          Our Work
        </h2>

        {gridItems.length > 0 ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[280px] gap-4 md:gap-6 mt-8">
            {gridItems.map((item, i) => (
              <div 
                key={item.src + i} 
                className={`group bento-item relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 ${item.spanClass}`}
              >
                {item.isIframe ? (
                  <iframe
                    src={item.src}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : item.isVideo ? (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => { e.currentTarget.play(); }}
                    onMouseLeave={(e) => { e.currentTarget.pause(); }}
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt="Brand Shot"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
                {/* Subtle overlay for styling */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 text-sm font-medium text-white shadow-lg">
                      View Project
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/50">No brand shots found in public folder.</p>
        )}
      </div>
    </section>
  );
}
