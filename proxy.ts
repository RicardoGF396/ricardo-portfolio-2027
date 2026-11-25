import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, hasLocale, type Locale } from "@/lib/i18n";

/* Sends every URL without a language to the same URL with one.
 *
 * Nothing on this site is served at an unprefixed path — every page lives
 * under /en or /es. So "/" and "/about" land here, and leave as "/es" or
 * "/en/about" depending on what the browser says it prefers.
 *
 * The redirect is a 307, not a 308, and that is deliberate: where it goes
 * depends on the visitor's Accept-Language, so it is not a fact about the URL
 * that a browser or a search engine should remember for the next person.
 *
 * The old site's own URLs (/es/software/<slug> and so on) never get here.
 * They are handled by `redirects` in next.config.ts, which runs first. */

/* "es-MX,es;q=0.9,en;q=0.8" → "es". Reads the header in the order of the
 * q-values the browser sent and returns the first language this site has.
 * Two locales do not justify a negotiation library; this is the whole job. */
function pickLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        /* Region dropped: es-MX, es-ES and es-419 are all "es" here. */
        lang: tag.trim().toLowerCase().split("-")[0],
        q: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .filter((entry) => !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { lang } of ranked) {
    if (hasLocale(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const alreadyLocalized = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (alreadyLocalized) return;

  const url = request.nextUrl.clone();
  const locale = pickLocale(request.headers.get("accept-language"));
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  /* Everything except Next's own files and anything with a dot in it. The
   * dot rule is what keeps this away from the files that must stay at the
   * root: /sitemap.xml, /robots.txt, /manifest.webmanifest, the icons, the
   * CV PDFs and every image in public/. Without it, /sitemap.xml would be
   * redirected to /en/sitemap.xml and 404. */
  matcher: ["/((?!_next|.*\\..*).*)"],
};
