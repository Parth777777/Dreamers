"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeys } from "@/content/site";
import "./JourneyMap.css";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function JourneyMap() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!container.current || !track.current) return;

    const ctx = gsap.context(() => {
      const trackEl = track.current;
      if (!trackEl) return;

      const trackWidth = 3600; 
      const scrollDist = trackWidth - window.innerWidth;

      // Animate the track purely based on the section's scroll progress (no pin:true)
      const scrollTween = gsap.to(trackEl, {
        x: -scrollDist,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom", // Scrubs exactly until the container finishes scrolling
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      if (pathRef.current) {
        try {
          const pathLength = pathRef.current.getTotalLength() || 4000;
          gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

          gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        } catch (e) {
          console.warn("SVG measurement failed", e);
        }
      }

      // Station highlights
      const stations = gsap.utils.toArray<HTMLElement>(".journey-station");
      stations.forEach((station) => {
        gsap.to(station, {
          scrollTrigger: {
            trigger: container.current,
            start: () => `top+=${Math.max(0, station.offsetLeft - window.innerWidth / 2)} top`,
            end: () => `top+=${station.offsetLeft + 200} top`,
            scrub: true,
            toggleClass: { targets: station, className: "is-on" },
            invalidateOnRefresh: true,
          }
        });
      });

    }, container);

    return () => ctx.revert();
  }, []);

  const chaoticPath = "M 0,500 C 300,500 500,100 800,150 S 1000,750 1400,700 C 1800,650 1900,200 2300,300 S 2600,800 3000,600 C 3300,450 3500,200 3600,200 S 3900,200 4200,300";

  const stationPositions = [
    { left: "19.04%", top: "18.75%", isBottom: false },
    { left: "33.33%", top: "87.5%", isBottom: true },
    { left: "54.76%", top: "37.5%", isBottom: false },
    { left: "71.42%", top: "75%", isBottom: true },
    { left: "82.14%", top: "31.25%", isBottom: false },
  ];

  return (
    // The container height is arbitrarily set to track width to allow sufficient scroll distance
    <section ref={container} className="journey-map" id="journey" style={{ height: '4200px' }}>
      {/* Position Sticky entirely prevents GSAP's pin spacer bugs */}
      <div className="journey-map__sticky">
        <div className="journey-map__copy pointer-events-none">
          <span className="journey-map__cue">Our Process</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-white mt-2 drop-shadow-md">How We Work</h2>
        </div>

        <div className="journey-map__stage">
          <div ref={track} className="journey-map__track h-full" style={{ width: '4200px' }}>
            
            <svg className="journey-map__field" viewBox="0 0 4200 800" preserveAspectRatio="none">
              <path className="journey-map__ghost opacity-30" d={chaoticPath} />
              <path ref={pathRef} className="journey-map__line" d={chaoticPath} />
            </svg>

            <div className="journey-map__stations">
              {journeys.map((journey, index) => (
                <button 
                  key={journey.id}
                  className={`journey-station absolute ${stationPositions[index].isBottom ? 'journey-station--bottom' : ''}`}
                  style={{ left: stationPositions[index].left, top: stationPositions[index].top }}
                >
                  <div className="journey-station__dot" />
                  <div className="journey-station__name drop-shadow-md">
                    <span className="text-sm text-red-500 tracking-widest uppercase block mb-1">{journey.kicker}</span>
                    {journey.title}
                  </div>
                  <div className="journey-station__body drop-shadow-md bg-void/80 p-2 rounded backdrop-blur-sm">
                    {journey.body}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
