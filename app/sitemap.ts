import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import { LOCALES, DEFAULT_LOCALE, localePath } from "@/lib/i18n";

/* Served at /sitemap.xml. Project pages are generated from the same array the
 * list renders, so a new write-up is in the sitemap the moment it has a slug —
 * no second place to remember to update.
 *
 * Every page is listed once per language, and each entry names its
 * translations. That pairing is what tells a search engine /en/about and
 * /es/about are one page in two languages; listed bare, they look like
 * duplicate content competing with each other. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  type Page = Pick<
    MetadataRoute.Sitemap[number],
    "priority" | "changeFrequency"
  > & { path: string };

  const pages: Page[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" },
    { path: "/resume", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    ...PROJECTS.filter((p) => p.slug).map(
      (p): Page => ({
        path: `/projects/${p.slug}`,
        priority: 0.7,
        changeFrequency: "yearly",
      }),
    ),
  ];

  const absolute = (lang: (typeof LOCALES)[number], path: string) =>
    `${SITE_URL}${localePath(lang, path)}`;

  return pages.flatMap(({ path, ...entry }) =>
    LOCALES.map((lang) => ({
      ...entry,
      url: absolute(lang, path),
      lastModified: now,
      alternates: {
        languages: {
          en: absolute("en", path),
          es: absolute("es", path),
          "x-default": absolute(DEFAULT_LOCALE, path),
        },
      },
    })),
  );
}
