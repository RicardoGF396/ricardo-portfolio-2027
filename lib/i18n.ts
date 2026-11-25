/* The site's two languages, and the URL helpers everything else builds on.
 *
 * Every page lives under /en or /es — the same shape the previous
 * ricardogf.com had, which is what search engines have indexed. Nothing is
 * served at an unprefixed path: proxy.ts redirects those to the visitor's
 * language. */

export const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

/* Where a visitor lands when their browser asks for neither language, and
 * what `x-default` points at. */
export const DEFAULT_LOCALE: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/* og:locale wants a territory; <html lang> and hreflang do not. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_MX",
};

/* What each language calls itself — a language switch is labelled in the
 * language it switches TO, so someone who cannot read the current page can
 * still find their way out of it. */
export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

/* localePath("es", "/about") → "/es/about"; localePath("es") → "/es".
 * `path` is always written the unprefixed way, with a leading slash. */
export function localePath(lang: Locale, path = "/"): string {
  return `/${lang}${path === "/" ? "" : path}`;
}

/* The `alternates` block for a page's metadata: its own canonical plus the
 * hreflang pair, so each language is indexed as a translation of the other
 * rather than as duplicate content. */
export function alternatesFor(lang: Locale, path = "/") {
  return {
    canonical: localePath(lang, path),
    languages: {
      en: localePath("en", path),
      es: localePath("es", path),
      "x-default": localePath(DEFAULT_LOCALE, path),
    },
  };
}
