"use client";

import AccordionGallery from "@/components/AccordionGallery";
import { Mark } from "@/components/Mark";
import { useTouchLayout } from "@/hooks/useTouchLayout";
import { work } from "@/content/work";

const items = work.map((item) => ({
  image: item.visuals[0],
  label: item.client,
  link: `/work/${item.slug}/`,
  alt: item.title,
}));

export function TapeAccordion() {
  const touch = useTouchLayout();

  return (
    <section id="on-tape" className="bg-void px-5 py-20 md:px-10">
      <h2 className="max-w-3xl font-display text-4xl md:text-6xl">
        {touch ? (
          <>
            Ideas in motion
          </>
        ) : (
          <>
            Ideas in motion
          </>
        )}
      </h2>
      <div className="mt-12">
        <AccordionGallery
          items={items}
          defaultIndex={touch ? 0 : 2}
          expandRatio={touch ? 0.72 : 0.48}
          trigger={touch ? "click" : "hover"}
          orientation={touch ? "vertical" : "horizontal"}
          accentColor="#F53105"
          overlayColor="#540b05"
          textColor="#FFFCFB"
          height={touch ? 320 : 480}
          grayscale
        />
      </div>
    </section>
  );
}
