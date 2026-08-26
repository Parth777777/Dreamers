"use client";

import { useMemo, useState } from "react";
import Stack from "@/components/Stack";
import { Mark } from "@/components/Mark";
import { reels, type Reel, type ReelLane } from "@/content/reels";
import {
  detectKind,
  instagramEmbed,
  instagramShortcode,
  youtubeEmbed,
  youtubeIdFromUrl,
  youtubePoster,
  type MediaKind,
} from "@/lib/media";

const lanes: { id: ReelLane; label: string }[] = [
  { id: "reel", label: "Reels" },
  { id: "shoot", label: "Shoots" },
  { id: "film", label: "Films" },
];

type Resolved = Reel & {
  kind: MediaKind;
  youtubeId: string | null;
  igCode: string | null;
  ready: boolean;
};

function resolve(reel: Reel): Resolved {
  const kind = reel.kind ?? detectKind(reel.src) ?? "mp4";
  const youtubeId = kind === "youtube" ? youtubeIdFromUrl(reel.src) : null;
  const igCode = kind === "instagram" ? instagramShortcode(reel.src) : null;
  const ready =
    (kind === "mp4" && Boolean(reel.src)) ||
    (kind === "youtube" && Boolean(youtubeId)) ||
    (kind === "instagram" && Boolean(igCode));
  return { ...reel, kind, youtubeId, igCode, ready };
}

export function FilmGate() {
  const all = useMemo(() => reels.map(resolve), []);
  const [lane, setLane] = useState<ReelLane>("reel");
  const [open, setOpen] = useState<Resolved | null>(null);
  const cards = all
    .filter((item) => item.lane === lane)
    .map((item) => {
      const thumb = item.poster || (item.youtubeId ? youtubePoster(item.youtubeId) : "");
      return {
        id: item.id,
        img: thumb,
        alt: item.title,
        reel: item,
        content:
          !thumb && item.igCode ? (
            <div className="flex h-full flex-col justify-end bg-gradient-to-b from-void to-gate p-6 text-left">
              <p className="font-mono text-[10px] tracking-[0.18em] text-red uppercase">{item.client}</p>
              <p className="mt-3 font-display text-2xl leading-tight text-paper">{item.title}</p>
              <p className="mt-2 text-xs text-white/50">Instagram reel</p>
            </div>
          ) : undefined,
      };
    });
  const vertical = lane === "reel";

  return (
    <section id="videos" className="bg-gate py-24">
      <div className="px-5 md:px-10">
        <h2 className="max-w-[12ch] font-display text-5xl leading-[0.94] md:text-7xl">
          Reels, shoots, films
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
          Tap a card to play. Ads, shoots, and long-form films from recent client work.
        </p>
        <div className="mt-8 flex gap-6 text-sm">
          {lanes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={lane === item.id ? "text-red" : "text-white/45"}
              onClick={() => setLane(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 px-5 md:px-10">
        <Stack
          key={lane}
          cards={cards}
          randomRotation
          sendToBackOnClick={false}
          sensitivity={120}
          cardDimensions={vertical ? { width: 280, height: 460 } : { width: 420, height: 236 }}
          onSelect={(card) => setOpen((card as { reel: Resolved }).reel)}
        />
      </div>

      {open ? <Projection reel={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}

function Projection({ reel, onClose }: { reel: Resolved; onClose: () => void }) {
  const isReel = reel.src.includes("/reel") || reel.lane === "reel";
  const poster = reel.poster || (reel.youtubeId ? youtubePoster(reel.youtubeId) : "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`relative w-full overflow-hidden rounded-[var(--radius)] bg-void ${reel.aspect === "vertical" ? "max-w-[420px]" : "max-w-5xl"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 text-sm text-white/60">
          <p>
            {reel.client} / {reel.title}
          </p>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        {reel.kind === "youtube" && reel.youtubeId ? (
          <div className="aspect-video w-full">
            <iframe
              title={reel.title}
              src={youtubeEmbed(reel.youtubeId)}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
        {reel.kind === "mp4" && reel.src ? (
          <video className="w-full" muted loop autoPlay playsInline poster={poster}>
            <source src={reel.src} type="video/mp4" />
          </video>
        ) : null}
        {reel.kind === "instagram" && reel.igCode ? (
          <iframe title={reel.title} src={instagramEmbed(reel.igCode, isReel)} className="min-h-[560px] w-full" />
        ) : null}
        {!reel.ready ? (
          <img src={poster} alt="" className="w-full object-contain" />
        ) : null}
      </div>
    </div>
  );
}
