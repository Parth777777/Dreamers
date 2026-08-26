"use client";

import { useEffect, useState } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  delay: number;
}

export function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const createStar = () => {
      return {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        angle: 15 + Math.random() * 30, // Angle down and right
        scale: 0.5 + Math.random() * 1.5,
        speed: 15 + Math.random() * 10,
        distance: 400 + Math.random() * 400,
        delay: Math.random() * 4000,
      };
    };

    // Initial stars
    const initialStars = Array.from({ length: 12 }).map(createStar);
    setStars(initialStars);

    const interval = setInterval(() => {
      setStars((prev) => {
        const newStars = [...prev];
        // Replace oldest star
        newStars.shift();
        newStars.push(createStar());
        return newStars;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {stars.map((star) => (
        <svg
          key={star.id}
          className="absolute animate-shooting-star opacity-0"
          style={{
            top: star.y,
            left: star.x,
            transform: `rotate(${star.angle}deg) scale(${star.scale})`,
            animationDelay: `${star.delay}ms`,
            animationDuration: `${star.distance / star.speed}ms`,
          }}
          width="150"
          height="2"
          viewBox="0 0 150 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1H150"
            stroke="url(#paint0_linear_star)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_star"
              x1="0"
              y1="1"
              x2="150"
              y2="1"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  );
}
