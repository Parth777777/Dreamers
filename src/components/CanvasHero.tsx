"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { MousePointer2, Hand, Square, Type as TypeIcon } from "lucide-react";

export function CanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const width = useMotionValue(600);
  const height = useMotionValue(250);
  const rotate = useMotionValue(0);

  // Smooth springs for choreographed animation
  const smoothX = useSpring(x, { damping: 40, stiffness: 200, mass: 1 });
  const smoothY = useSpring(y, { damping: 40, stiffness: 200, mass: 1 });
  const smoothWidth = useSpring(width, { damping: 40, stiffness: 200, mass: 1 });
  const smoothHeight = useSpring(height, { damping: 40, stiffness: 200, mass: 1 });
  const smoothRotate = useSpring(rotate, { damping: 40, stiffness: 200 });

  const [isSelected, setIsSelected] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(true);
  const [showSubtext, setShowSubtext] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // To trigger re-renders for the dimensions indicator
  const [dim, setDim] = useState({ w: 600, h: 250 });
  
  useEffect(() => {
    const unsubW = smoothWidth.on("change", (v) => setDim(d => ({ ...d, w: v })));
    const unsubH = smoothHeight.on("change", (v) => setDim(d => ({ ...d, h: v })));
    return () => { unsubW(); unsubH(); };
  }, [smoothWidth, smoothHeight]);

  useEffect(() => {
    const runDemo = async () => {
      // 1. Logo appears normally
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 2. Selection box activates
      setIsSelected(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // 3. Stretch (DREAM offscreen, ERS remains)
      await Promise.all([
        animate(width, 2800, { duration: 1.5, ease: [0.16, 1, 0.3, 1] }),
        animate(x, -1200, { duration: 1.5, ease: [0.16, 1, 0.3, 1] })
      ]);
      
      await new Promise(resolve => setTimeout(resolve, 200));

      // 4. Compress vertically
      await animate(height, 60, { duration: 0.8, ease: "easeInOut" });
      
      // 5. Dragged back and snap to center
      await Promise.all([
        animate(width, 600, { duration: 1.2, ease: "backOut" }),
        animate(height, 250, { duration: 1.2, ease: "backOut" }),
        animate(x, 0, { duration: 1.2, ease: "backOut" }),
        animate(y, 0, { duration: 1.2, ease: "backOut" }),
      ]);
      
      await new Promise(resolve => setTimeout(resolve, 400));

      // 6. End demo
      setIsSelected(false);
      setShowSubtext(true);
      setIsDemoRunning(false);
    };

    runDemo();
  }, [width, height, x, y]);

  // Handle pointer down on background
  const handleBgPointerDown = () => {
    if (isDemoRunning) return;
    setIsSelected(false);
  };

  // Resize Logic
  const handleResizeDown = (e: React.PointerEvent, handlePos: string) => {
    e.stopPropagation();
    if (isDemoRunning) return;
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = width.get();
    const startH = height.get();
    const startPosX = x.get();
    const startPosY = y.get();

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newW = startW;
      let newH = startH;
      let newX = startPosX;
      let newY = startPosY;

      // Update based on which handle is being dragged
      if (handlePos.includes('e')) {
        newW = Math.max(50, startW + dx);
        newX = startPosX + dx / 2;
      }
      if (handlePos.includes('w')) {
        newW = Math.max(50, startW - dx);
        newX = startPosX + dx / 2;
      }
      if (handlePos.includes('s')) {
        newH = Math.max(20, startH + dy);
        newY = startPosY + dy / 2;
      }
      if (handlePos.includes('n')) {
        newH = Math.max(20, startH - dy);
        newY = startPosY + dy / 2;
      }

      width.set(newW);
      height.set(newH);
      x.set(newX);
      y.set(newY);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const figmaBlue = "#18A0FB";
  const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

  return (
    <section 
      ref={containerRef}
      onPointerDown={handleBgPointerDown}
      className="hero-stage relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-void touch-none"
    >
      {/* Background Canvas Dot Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" 
           style={{
             backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)',
             backgroundSize: '32px 32px'
           }}
      />

      {/* Toolbar */}
      <motion.div 
        className="absolute top-8 z-50 flex items-center gap-1.5 bg-[#2c2c2c] border border-[#3e3e3e] rounded-lg p-1.5 shadow-xl backdrop-blur-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="p-1.5 bg-[#404040] rounded text-white cursor-default"><MousePointer2 size={16} /></div>
        <div className="p-1.5 text-[#a0a0a0] hover:text-white transition-colors cursor-pointer"><Hand size={16} /></div>
        <div className="p-1.5 text-[#a0a0a0] hover:text-white transition-colors cursor-pointer"><Square size={16} /></div>
        <div className="p-1.5 text-[#a0a0a0] hover:text-white transition-colors cursor-pointer"><TypeIcon size={16} /></div>
      </motion.div>

      {/* The Logo Canvas Object */}
      <motion.div
        drag={!isDemoRunning && !isResizing}
        dragMomentum={true}
        onPointerDown={(e) => {
          if (!isDemoRunning) setIsSelected(true);
        }}
        style={{
          x: smoothX,
          y: smoothY,
          width: smoothWidth,
          height: smoothHeight,
          rotate: smoothRotate,
        }}
        className="relative z-10 flex items-center justify-center group touch-none"
      >
        <div 
          className="w-full h-full relative" 
          style={{ 
            cursor: (!isDemoRunning && !isResizing) ? (isSelected ? 'move' : 'pointer') : 'default' 
          }}
        >
          {/* Using an SVG wrapper with preserveAspectRatio="none" so both logo and text stretch/compress together */}
          <svg viewBox="0 0 800 300" className="w-full h-full pointer-events-none select-none" preserveAspectRatio="none">
            <image href="/logo.svg" x="100" y="0" width="600" height="200" preserveAspectRatio="none" />
            <text x="400" y="270" textAnchor="middle" fill="white" fontSize="42" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
              DREAMERS CREATIVE STUDIOS
            </text>
          </svg>
        </div>

        {/* Figma-style Selection Outline */}
        {isSelected && (
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{ border: `1px solid ${figmaBlue}` }}
          >
            {/* Dimensions Indicator */}
            <div 
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white px-1 py-0.5 font-mono tracking-wider whitespace-nowrap"
              style={{ fontSize: '10px', color: figmaBlue }}
            >
              W {Math.round(dim.w)} × H {Math.round(dim.h)}
            </div>

            {/* Rotation indicator (line + dot) */}
            <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-[1px] h-[12px]" style={{ backgroundColor: figmaBlue }}></div>
              <div className="w-2 h-2 rounded-full cursor-crosshair pointer-events-auto" style={{ border: `1px solid ${figmaBlue}`, backgroundColor: '#fff' }}></div>
            </div>

            {/* Resize Handles */}
            {handles.map((pos) => {
              let top = pos.includes('n') ? '-3px' : pos.includes('s') ? 'calc(100% - 3px)' : 'calc(50% - 3px)';
              let left = pos.includes('w') ? '-3px' : pos.includes('e') ? 'calc(100% - 3px)' : 'calc(50% - 3px)';
              let cursor = pos === 'nw' || pos === 'se' ? 'nwse-resize' : pos === 'ne' || pos === 'sw' ? 'nesw-resize' : pos === 'n' || pos === 's' ? 'ns-resize' : 'ew-resize';

              return (
                <div
                  key={pos}
                  onPointerDown={(e) => handleResizeDown(e, pos)}
                  className="absolute bg-white pointer-events-auto"
                  style={{
                    top,
                    left,
                    width: '6px',
                    height: '6px',
                    border: `1px solid ${figmaBlue}`,
                    cursor,
                  }}
                />
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Final Subtext Reveal */}
      <motion.div 
        className="absolute z-10 mt-64 text-paper/70 font-mono text-[10px] sm:text-xs tracking-[0.3em] pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showSubtext ? 1 : 0, y: showSubtext ? 0 : 10 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        WE DON&apos;T JUST DESIGN BRANDS. WE MANIPULATE THEM.
      </motion.div>
    </section>
  );
}
