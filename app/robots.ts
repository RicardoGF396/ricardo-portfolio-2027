import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Served at /robots.txt. Everything is public and indexable — this is a
 * portfolio, the whole point is to be found — so the only real job here is
 * pointing crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
