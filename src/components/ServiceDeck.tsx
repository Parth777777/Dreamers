"use client";

import BorderGlow from "@/components/ui/BorderGlow";
import { FieldGrain } from "@/components/FieldGrain";
import { services } from "@/content/site";

export function ServiceDeck() {
  return (
    <section id="services" className="relative isolate bg-void px-5 py-28 md:px-10">
      <FieldGrain kind="dots" />
      <h2 className="max-w-3xl font-display text-4xl md:text-6xl text-white">
        Big ideas need good company.
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">
        Each one is a lane we own end to end.
      </p>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
        {services.map((service) => (
          <BorderGlow
            key={service.id}
            edgeSensitivity={30}
            glowColor="0 100 50"
            backgroundColor="#b61d22"
            borderRadius={24}
            glowRadius={40}
            glowIntensity={1.0}
            coneSpread={25}
            animated={true}
            colors={['#FFF8F2', '#b61d22', '#FFF8F2']}
            className="w-full h-full"
          >
            <div className="p-8 md:p-10 h-full flex flex-col items-start bg-transparent text-void">
              <p className="font-mono text-[10px] text-void/70">({service.id})</p>
              <h3 className="mt-4 font-display text-2xl md:text-3xl text-void">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-void/90">{service.body}</p>
            </div>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}
