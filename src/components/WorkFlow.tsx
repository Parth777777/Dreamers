"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function WorkFlow({ brandShots = [] }: { brandShots: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for the grid rows
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  // We split the shots into two rows
  const topRow = brandShots.slice(0, Math.ceil(brandShots.length / 2));
  const bottomRow = brandShots.slice(Math.ceil(brandShots.length / 2));

  return (
    <div ref={containerRef} className="w-full py-32 flex flex-col items-center justify-center overflow-hidden">
      
      <h2 className="font-display text-[8rem] md:text-[15rem] leading-[0.8] mb-12 text-center text-red uppercase tracking-tight">
        Work
      </h2>

      {brandShots.length > 0 ? (
        <div className="w-full flex flex-col gap-8 md:gap-16 mt-16 px-4">
          <motion.div style={{ x: xLeft }} className="flex gap-8 md:gap-16 whitespace-nowrap min-w-max">
            {topRow.map((src, idx) => (
              <div key={`top-${idx}`} className="relative w-[300px] md:w-[500px] h-[200px] md:h-[350px] rounded-2xl overflow-hidden shrink-0 shadow-2xl">
                {src.includes("youtube.com") || src.includes("instagram.com") ? (
                  <iframe src={src} className="w-full h-full object-cover" />
                ) : (
                  <Image src={src} alt="Work" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                )}
              </div>
            ))}
          </motion.div>
          
          <motion.div style={{ x: xRight }} className="flex gap-8 md:gap-16 whitespace-nowrap min-w-max">
            {bottomRow.map((src, idx) => (
              <div key={`bottom-${idx}`} className="relative w-[300px] md:w-[500px] h-[200px] md:h-[350px] rounded-2xl overflow-hidden shrink-0 shadow-2xl">
                {src.includes("youtube.com") || src.includes("instagram.com") ? (
                  <iframe src={src} className="w-full h-full object-cover" />
                ) : (
                  <Image src={src} alt="Work" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      ) : (
        <p className="text-red/50 text-center">No brand shots found.</p>
      )}
    </div>
  );
}
