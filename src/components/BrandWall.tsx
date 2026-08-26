"use client";

import DriftWall from "@/components/DriftWall";
import { FieldGrain } from "@/components/FieldGrain";
import { Mark } from "@/components/Mark";
import { brandLogos } from "@/content/brands";
import "./BrandWall.css";

const items = brandLogos.map((logo) => ({
  image: logo.image,
  title: "Client mark",
}));

export function BrandWall() {
  return (
    <section id="brands" className="relative isolate bg-void px-5 py-24 md:px-10">
      <FieldGrain kind="dots" />
      <h2 className="max-w-none font-display text-4xl leading-[1.1] md:leading-[0.94] md:text-7xl animate-color-sweep whitespace-normal md:whitespace-nowrap">
        Brands we've worked with
      </h2>
      <div className="mt-12 md:hidden">
        <div className="brand-wall-grid" aria-label="Client logos">
          {brandLogos.map((logo) => (
            <div key={logo.id} className="brand-wall-grid__tile">
              <img src={logo.image} alt="" loading="lazy" decoding="async" draggable={false} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-12 hidden h-[min(78vh,720px)] overflow-hidden rounded-[var(--radius)] border border-white/10 md:block">
        <DriftWall
          items={items}
          columns={6}
          tileWidth={220}
          tileHeight={148}
          gap={16}
          radius={16}
          grayscale
          contain
          overlayColor="#540b05"
          dim={0.35}
          speed={28}
        />
      </div>
    </section>
  );
}
