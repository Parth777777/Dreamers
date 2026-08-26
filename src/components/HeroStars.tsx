"use client";

import { useEffect, useRef } from "react";
import "./HeroStars.css";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

export function HeroStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = canvas.closest(".hero-stage");
    if (!section) return;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = Math.floor(rect.width);
      canvas.height = Math.floor(rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const spawn = (x: number, y: number, count = 4) => {
      for (let i = 0; i < count; i += 1) {
        starsRef.current.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.4,
          life: 1,
          size: Math.random() * 2.2 + 0.8,
        });
      }
      if (starsRef.current.length > 140) {
        starsRef.current.splice(0, starsRef.current.length - 140);
      }
    };

    const onMove = (event: Event) => {
      if (reduced || !(event instanceof PointerEvent)) return;
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      spawn(x, y);
    };

    section.addEventListener("pointermove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current = starsRef.current.filter((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.022;

        if (star.life <= 0) return false;

        const alpha = star.life * 0.95;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(star.x - star.size * 2.2, star.y);
        ctx.lineTo(star.x + star.size * 2.2, star.y);
        ctx.moveTo(star.x, star.y - star.size * 2.2);
        ctx.lineTo(star.x, star.y + star.size * 2.2);
        ctx.stroke();

        return true;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    if (!reduced) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-stars" aria-hidden />;
}
