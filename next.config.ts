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
   *
   * This site is bilingual under the same /es and /en again, so the old home
   * and about URLs are simply real pages now and need no rule. What is left
   * here is only what changed shape: /software/<slug> became /projects/<slug>,
   * and /design and /photos have no page of their own. Each rule stays inside
   * its language — an old Spanish link lands on the Spanish page.
   *
   * There is deliberately NO catch-all for /<lang>/:path* any more. When the
   * site was single-language that rule sent leftovers to the home page; now
   * it would swallow every real page under /en and /es.
   *
   * URLs with no language at all (/about, /projects/naveo) are not handled
   * here either: where they go depends on the visitor's browser, so proxy.ts
   * redirects them. These run before it.
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
      /* No equivalent pages yet — send them somewhere useful rather than
         nowhere. Revisit if /design or /photos ever get built. */
      {
        source: `/${lang}/design`,
        destination: `/${lang}/projects`,
        permanent: true,
      },
      {
        source: `/${lang}/photos`,
        destination: `/${lang}/about`,
        permanent: true,
      },
      {
        source: `/${lang}/software/shopfloor-managment`,
        destination: `/${lang}/projects/shopfloor-management`,
        permanent: true,
      },
      ...projects.map((slug) => ({
        source: `/${lang}/software/${slug}`,
        destination: `/${lang}/projects/${slug}`,
        permanent: true,
      })),
      /* The old section index, and any old case study not in the list above,
         land on the project list rather than a 404. Keep this last: the
         specific rules above win. */
      {
        source: `/${lang}/software/:path*`,
        destination: `/${lang}/projects`,
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
