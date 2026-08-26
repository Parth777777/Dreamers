"use client";

import { brandLogos } from "@/content/brands";
import { clientTrust } from "@/content/site";
import "./LogoMarquee.css";

function Laurel() {
  return (
    <svg className="logo-marquee__laurel" viewBox="0 0 48 64" aria-hidden>
      <path
        d="M24 4C14 14 8 26 8 38c0 8 4 14 10 18M24 4c10 10 16 22 16 34 0 8-4 14-10 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M20 18c-4 6-6 12-6 18 0 4 2 8 5 10M28 18c4 6 6 12 6 18 0 4-2 8-5 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
    </svg>
  );
}

export function LogoMarquee() {
  const loop = [...brandLogos, ...brandLogos];

  return (
    <section id="brands" className="logo-marquee" aria-label="Client logos">
      <div className="logo-marquee__head">
        <Laurel />
        <p>{clientTrust.label}</p>
        <Laurel />
      </div>
      <div className="logo-marquee__track">
        {loop.map((logo, index) => (
          <div className="logo-marquee__item" key={`${logo.id}-${index}`}>
            <img src={logo.image} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}
