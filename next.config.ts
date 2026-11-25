import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 defaults this to [75] and coerces anything else down to it, so
     * 90 has to be declared — the design shots are text-heavy screenshots and
     * 75 smears their small type. */
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.untitledui.com",
        pathname: "/images/**",
      },
    ],
  },
  /* ------------------------------------------------------------------ *
   * Redirects from the previous ricardogf.com.
   *
   * That site was bilingual and lived under /es and /en, with case studies at
   * /<lang>/software/<slug>. Those URLs are what Google has indexed and what
   * is pasted in applications and messages; without these every one of them
   * becomes a 404 the moment this deploy goes live, and the ranking they had
   * goes with it.
   *
   * `permanent: true` is a 308, which is what tells a search engine to move
   * the credit to the new URL rather than treat it as a temporary detour.
   * ------------------------------------------------------------------ */
  async redirects() {
    const langs = ["es", "en"];

    /* Same slugs on both sites, with one exception: the old project page was
     * published with "managment" misspelled. */
    const projects = [
      "naveo",
      "pura-banda",
      "adgen",
      "don-cheto-app",
      "cvlens",
      "crieg",
      "kiosko-movil-gto",
      "midbar",
    ];

    return langs.flatMap((lang) => [
      { source: `/${lang}`, destination: "/", permanent: true },
      { source: `/${lang}/about`, destination: "/about", permanent: true },
      /* No equivalent pages yet — send them somewhere useful rather than
         nowhere. Revisit if /design or /photos ever get built. */
      { source: `/${lang}/design`, destination: "/projects", permanent: true },
      { source: `/${lang}/photos`, destination: "/about", permanent: true },
      {
        source: `/${lang}/software/shopfloor-managment`,
        destination: "/projects/shopfloor-management",
        permanent: true,
      },
      ...projects.map((slug) => ({
        source: `/${lang}/software/${slug}`,
        destination: `/projects/${slug}`,
        permanent: true,
      })),
      /* Anything else under the old language prefix at least lands on a real
         page instead of a 404. Keep this last: the specific rules above win. */
      {
        source: `/${lang}/:path*`,
        destination: "/",
        permanent: true,
      },
    ]);
  },

  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
