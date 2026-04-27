import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/.netlify/"] }],
    sitemap: "https://stemp.sk/sitemap.xml",
    host: "https://stemp.sk",
  };
}
