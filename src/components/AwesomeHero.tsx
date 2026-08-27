"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "./Logo";

const brandImages = [
  "/landing/DSC07028 2.jpg.jpeg",
  "/landing/IMG_9389.jpg.jpeg",
  "/landing/bouche 2 .jpg.jpeg",
  "/landing/meir living 2 .jpg.jpeg",
  "/landing/Colorful and Animated Good Morning Motivational Quote Your Story - 2.jpg (1).jpeg",
  "/landing/shvetah 1 .jpg.jpeg",
  "/landing/1111.PNG",
  "/landing/222.PNG",
];

// Spread images vertically across 250vh
// Scatter all 8 images strictly to the TOP and BOTTOM edges.
// We are completely avoiding the middle of the screen (30vh to 70vh) so the text has a massive empty corridor to be perfectly visible.
const positions = [
  // Top Edge Group
  { top: '0vh', left: '5vw', width: 'clamp(100px, 12vw, 160px)', depth: 2, rotate: 0, scrollSpeed: 150 },
  { top: '-5vh', left: '30vw', width: 'clamp(120px, 14vw, 180px)', depth: -3, rotate: 0, scrollSpeed: 250 },
  { top: '8vh', right: '35vw', width: 'clamp(110px, 13vw, 170px)', depth: 1.5, rotate: 0, scrollSpeed: 100 },
  { top: '2vh', right: '5vw', width: 'clamp(130px, 15vw, 190px)', depth: -2, rotate: 0, scrollSpeed: 200 },
  
  // Bottom Edge Group
  { top: '75vh', left: '8vw', width: 'clamp(110px, 13vw, 170px)', depth: 4, rotate: 0, scrollSpeed: 300 },
  { top: '85vh', left: '35vw', width: 'clamp(100px, 12vw, 160px)', depth: -1.5, rotate: 0, scrollSpeed: 150 },
  { top: '78vh', right: '28vw', width: 'clamp(140px, 16vw, 200px)', depth: 3, rotate: 0, scrollSpeed: 350 },
  { top: '82vh', right: '8vw', width: 'clamp(120px, 14vw, 180px)', depth: -2.5, rotate: 0, scrollSpeed: 200 },
];

export function AwesomeHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Text starts centered (0vw) so it's fully visible, then slides right slightly on scroll
  const textX = useTransform(scrollYProgress, [0, 1], ["0vw", "15vw"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // STRICTLY 100vh. No physical scroll padding.
    <section ref={containerRef} className="curved-section relative z-20 h-screen min-h-[600px] w-full bg-void overflow-hidden" style={{ borderBottomLeftRadius: '0%', borderBottomRightRadius: '0%' }}>
      
      {/* Scattered Parallax Collage */}
      {brandImages.map((src, i) => {
        const pos = positions[i % positions.length];
        
        // Images move up/down slightly as you scroll past this 100vh section
        const yScroll = useTransform(scrollYProgress, [0, 1], [0, -pos.scrollSpeed]);
        
        return (
          <motion.div 
            key={src}
            className="absolute drop-shadow-lg opacity-40 md:opacity-100 pointer-events-none"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              width: pos.width,
              rotate: pos.rotate,
              y: yScroll,
              zIndex: 10 + i,
            }}
          >
            <div 
              className="relative w-full h-full overflow-hidden rounded-[2rem]"
              style={{ transform: `translateX(${mousePos.x * pos.depth}px) translateY(${mousePos.y * pos.depth}px)` }}
            >
              <Image 
                src={src}
                alt="Brand image"
                width={400}
                height={600}
                priority={i < 4}
                className="w-full h-auto object-contain rounded-[2rem]"
              />
            </div>
          </motion.div>
        );
      })}

      {/* Content - Absolute center, no sticky wrapper needed for 100vh */}
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full pointer-events-none z-[100] overflow-visible">
        
        {/* Center Logo Icon */}
        <div className="absolute z-[90] opacity-30 md:opacity-50">
          <Logo href={null} className="w-64 h-64 md:w-[32rem] md:h-[32rem] lg:w-[45rem] lg:h-[45rem] text-red" />
        </div>

        {/* Centered Text - Sized to fit exactly across the screen, starting center, sliding gently */}
        <motion.div 
          className="w-full flex items-center justify-center z-[100] relative px-4"
          style={{ x: textX }}
        >
          {/* text-[6.5vw] usually fits a long phrase cleanly on one line across desktop */}
          <h1 className="text-[8vw] md:text-[8vw] lg:text-[6.5vw] leading-[0.95] tracking-tighter text-center text-red drop-shadow-2xl whitespace-nowrap">
            Dreamers creative studios
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
