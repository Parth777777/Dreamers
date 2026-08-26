export type MediaKind = "mp4" | "youtube" | "instagram";

export function youtubeIdFromUrl(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  if (/^[\w-]{11}$/.test(value)) return value;

  try {
    const url = value.startsWith("http")
      ? new URL(value)
      : new URL(`https://${value}`);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id?.slice(0, 11) ?? null;
    }
    if (url.searchParams.get("v")) return url.searchParams.get("v");
    const parts = url.pathname.split("/").filter(Boolean);
    const markers = ["embed", "shorts", "live"];
    const marker = parts.findIndex((part) => markers.includes(part));
    if (marker >= 0 && parts[marker + 1]) return parts[marker + 1].slice(0, 11);
  } catch {
    return null;
  }
  return null;
}

export function instagramShortcode(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  try {
    const url = value.startsWith("http")
      ? new URL(value)
      : new URL(`https://${value}`);
    if (!url.hostname.includes("instagram.com")) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const markers = ["p", "reel", "reels", "tv"];
    const marker = parts.findIndex((part) => markers.includes(part));
    if (marker >= 0 && parts[marker + 1]) {
      return parts[marker + 1].replace(/\/$/, "");
    }
  } catch {
    return null;
  }
  return null;
}

export function detectKind(src: string): MediaKind | null {
  const value = src.trim().toLowerCase();
  if (!value) return null;
  if (value.endsWith(".mp4") || value.endsWith(".webm") || value.startsWith("/reels/")) {
    return "mp4";
  }
  if (value.includes("youtu")) return "youtube";
  if (value.includes("instagram.com")) return "instagram";
  return null;
}

export function youtubePoster(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeEmbed(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function instagramEmbed(shortcode: string, isReel: boolean): string {
  const type = isReel ? "reel" : "p";
  return `https://www.instagram.com/${type}/${shortcode}/embed`;
}

export function instagramPermalink(src: string): string {
  return src.split("?")[0];
}

export function reelPoster(input: {
  poster?: string;
  src: string;
  youtubeId?: string | null;
}): string {
  if (input.poster) return input.poster;
  if (input.youtubeId) return youtubePoster(input.youtubeId);
  return "/reels/take-02.svg";
}
