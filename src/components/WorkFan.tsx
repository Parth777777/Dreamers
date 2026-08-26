"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { CaseFrame } from "@/components/CaseFrame";
import { RailPanel, SideRail } from "@/components/SideRail";
import { work } from "@/content/work";

export function WorkFan() {
  return (
    <SideRail id="work" cue="Scroll ←" invert>
      {work.map((item) => (
        <RailPanel key={item.slug}>
          <div className="grid h-full items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-red uppercase">
                {item.year} · {item.tags[0]}
              </p>
              <h2 className="mt-4 max-w-[16ch] font-display text-4xl leading-[0.95] md:text-6xl">
                {item.client}
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/65">{item.summary}</p>
              <div className="mt-8">
                <Button href={`/work/${item.slug}/`}>Open case</Button>
              </div>
            </div>
            <Link href={`/work/${item.slug}/`} className="relative isolate block">
              <CaseFrame src={item.posterSrc} alt={item.title} className="h-[min(58vh,520px)] w-full" />
            </Link>
          </div>
        </RailPanel>
      ))}
    </SideRail>
  );
}
