"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandWall } from "@/components/BrandWall";
import { Button } from "@/components/Button";
import { Mark } from "@/components/Mark";
import dynamic from "next/dynamic";

const SplitDeck = dynamic(() => import("@/components/SplitDeck").then(mod => mod.SplitDeck), { ssr: false });
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { ShootingStars } from "@/components/ui/ShootingStars";
import Galaxy from "@/components/ui/Galaxy";
import { hero } from "@/content/site";
import { AwesomeHero } from "@/components/AwesomeHero";
import { SmallAbout } from "@/components/SmallAbout";
import { JourneyMap } from "@/components/JourneyMap";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeExperience({ brandShots = [] }: { brandShots?: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".loader", { autoAlpha: 0 });
        gsap.set(".site-header", { autoAlpha: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".site-header", { autoAlpha: 0, y: -24 });

        const intro = gsap.timeline();
        intro
          .from(".loader-mark", {
            yPercent: 80,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power4.out",
          })
          .to(".loader-mark", {
            yPercent: -90,
            autoAlpha: 0,
            duration: 0.4,
            delay: 0.1,
            ease: "power3.in",
          })
          .to(".loader", {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.9,
            ease: "power4.inOut",
          })
          .to(".site-header", { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.7");

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 56,
            autoAlpha: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        // Curve Animation
        gsap.utils.toArray<HTMLElement>(".curved-section").forEach((el) => {
          gsap.to(el, {
            borderBottomLeftRadius: "25%",
            borderBottomRightRadius: "25%",
            ease: "none",
            scrollTrigger: { 
              trigger: el, 
              start: "bottom bottom", 
              end: "bottom top", 
              scrub: true 
            },
          });
        });

        gsap.from(".site-footer", {
          y: 32,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".site-footer", start: "top 95%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-void text-paper">
      <ShootingStars />
      <div className="loader fixed inset-0 z-50 flex items-center justify-center bg-void [clip-path:inset(0)]">
        <Logo variant="outline" href={null} className="loader-mark h-20 md:h-24" />
      </div>

      <Header />

      <AwesomeHero />
      <SmallAbout />

      <BrandWall />
      <JourneyMap />
      <section id="content-library" className="curved-section bg-void px-5 py-28 md:px-10 overflow-hidden relative z-10 rounded-b-[4rem]">
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl mb-12 text-center text-red">
          Our Work
        </h2>
        {brandShots.length > 0 ? (
          <CoverflowCarousel
            slides={brandShots.map(src => ({ 
              src, 
              alt: "Brand Shot", 
              title: "Featured Brand Work"
            }))}
            showNavigation
            showCaption
          />
        ) : (
          <p className="text-red/50 text-center py-20">No brand shots found in public folder.</p>
        )}
      </section>

      <section className="bg-void px-5 py-28 md:px-10 flex flex-col items-center justify-center text-center" id="contact">
        <h2 className="reveal font-display text-4xl sm:text-5xl md:text-7xl">
          Have a Dream? Let's Build It.
        </h2>
        <p className="reveal mt-4 max-w-lg text-muted mx-auto">A coffee chat is enough to start.</p>
        <div className="reveal mt-8 mb-16 flex justify-center w-full">
          <Button href="/contact/">Book a call</Button>
        </div>
        
        <div className="reveal flex flex-wrap justify-center items-center gap-8">
          <a href="https://instagram.com/dreamerscreativestudios" target="_blank" rel="noopener noreferrer" className="text-paper/60 hover:text-white transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span>Instagram</span>
          </a>
          <a href="https://www.linkedin.com/company/dreamers-creative-studios" target="_blank" rel="noopener noreferrer" className="text-paper/60 hover:text-white transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
