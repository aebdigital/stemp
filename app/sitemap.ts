import type { MetadataRoute } from "next";

const BASE = "https://stemp.sk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/referencie`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/ochrana-osobnych-udajov`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
