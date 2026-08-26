import type { MediaKind } from "@/lib/media";
import { work } from "@/content/work";

export type ReelLane = "reel" | "shoot" | "film";

export type Reel = {
  id: string;
  title: string;
  client: string;
  src: string;
  poster?: string;
  aspect: "wide" | "vertical";
  kind?: MediaKind;
  lane: ReelLane;
};

export const showreelSrc = "/reels/showreel.mp4";

export const showreelStills = work.flatMap((item) => item.visuals.slice(0, 2));

export const reels: Reel[] = [
  {
    id: "reel-galaxy-surfectants",
    title: "Galaxy Surfectants Ad",
    client: "Galaxy Surfectants",
    src: "https://www.instagram.com/reel/DBtgcEXs_xI/",
    aspect: "vertical",
    lane: "reel",
  },
  {
    id: "shoot-kenstar",
    title: "Kenstar Ad",
    client: "Kenstar",
    src: "https://youtu.be/FvG_5IJfMpk",
    aspect: "wide",
    lane: "shoot",
  },
  {
    id: "film-filter-copy-01",
    title: "Travel Show — Part 1",
    client: "Filter Copy",
    src: "https://youtu.be/3DCH-yMi9cw",
    aspect: "wide",
    lane: "film",
  },
  {
    id: "film-filter-copy-02",
    title: "Travel Show — Part 2",
    client: "Filter Copy",
    src: "https://youtu.be/eaYYIIfU_1A",
    aspect: "wide",
    lane: "film",
  },
  {
    id: "film-filter-copy-03",
    title: "Travel Show — Part 3",
    client: "Filter Copy",
    src: "https://youtu.be/DfT0boYFztI",
    aspect: "wide",
    lane: "film",
  },
];
