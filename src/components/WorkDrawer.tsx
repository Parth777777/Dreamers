"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function WorkDrawer({ brandShots = [] }: { brandShots: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="w-full relative bg-void">
      {/* Title */}
      <div className="w-full py-16 sticky top-20 z-10 bg-void flex justify-center items-center">
        <h2 className="font-display text-5xl md:text-8xl text-center text-red uppercase tracking-tight">
          Our Work
        </h2>
      </div>

      {/* Cards container */}
      <div className="w-full flex flex-col items-center pb-32">
        {brandShots.map((src, index) => {
          const isVideo = src.match(/\.(mp4|mov|webm)$/i);
          const isIframe = src.includes("youtube.com") || src.includes("instagram.com");

          return (
            <motion.div 
              key={src} 
              initial={{ opacity: 0, y: 100, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-[80%] md:w-[50%] max-w-3xl h-[40vh] md:h-[60vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl mb-24"
            >
              {isIframe ? (
                <iframe src={src} className="w-full h-full object-cover" />
              ) : isVideo ? (
                <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <Image 
                  src={src} 
                  alt={`Work ${index + 1}`} 
                  fill 
                  className="object-cover" 
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
