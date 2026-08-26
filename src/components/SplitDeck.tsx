"use client";

import { journeys } from "@/content/site";
import { Mark } from "@/components/Mark";

export function SplitDeck() {
  return (
    <section id="journey" className="w-full bg-void px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl leading-[1.1] md:text-6xl text-paper">
            Where are you on the map?
          </h2>
          <p className="mt-4 text-sm uppercase tracking-widest text-paper/60 font-mono">
            Choose your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {journeys.map((item, i) => (
            <div
              key={item.id}
              className="relative flex flex-col p-8 md:p-10 rounded-3xl bg-paper/5 border border-paper/10 hover:bg-paper/10 transition-colors duration-300 group overflow-hidden"
            >
              <div className="absolute -top-4 -right-2 p-8 opacity-5 text-paper font-display text-[120px] leading-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10">
                {i + 1}
              </div>
              <span className="text-red font-mono text-xs uppercase tracking-widest mb-4 block">
                {item.kicker}
              </span>
              <h3 className="text-3xl md:text-4xl font-display text-paper mb-6">
                {item.title}
              </h3>
              <p className="text-paper/70 leading-relaxed text-sm md:text-base mt-auto">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
