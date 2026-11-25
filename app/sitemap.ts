import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

/* Served at /sitemap.xml. Project pages are generated from the same array the
 * list renders, so a new write-up is in the sitemap the moment it has a slug —
 * no second place to remember to update. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1, changeFrequency: "monthly" },
    { url: `${SITE_URL}/projects`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: "yearly" },
    { url: `${SITE_URL}/resume`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`, priority: 0.6, changeFrequency: "yearly" },
  ];

  const projects: MetadataRoute.Sitemap = PROJECTS.filter((p) => p.slug).map(
    (p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
    }),
  );

  return [...pages, ...projects].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
