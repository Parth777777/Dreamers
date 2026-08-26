import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { work } from "@/content/work";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...work.map((item) => ({
      url: `${site.url}/work/${item.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
