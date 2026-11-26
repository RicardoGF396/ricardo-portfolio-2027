import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Sidebar from "@/components/site/Sidebar";
import PersonSchema from "@/components/site/PersonSchema";
import Analytics from "@/components/site/Analytics";
import { SITE, SITE_URL } from "@/lib/site";
import {
  LOCALES,
  OG_LOCALE,
  alternatesFor,
  hasLocale,
  localePath,
} from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { inter } from "../fonts";

/* The share card, declared by hand. app/opengraph-image.png used to attach
 * itself by file convention, and it still serves at this URL — but the file
 * sits in app/ while this layout sits one segment down in [lang], and a
 * segment's `openGraph` object replaces its parent's whole rather than
 * merging into it. Without this line the image tags silently vanish from
 * every page: the build stays green and link previews go blank. Keep the
 * size in step with the file. */
const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
};

/* Both languages are built ahead of time. This is the root layout — it sits
 * inside [lang] rather than above it so <html lang> can be the real language
 * of the page, which is what a screen reader picks its voice from. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  const title = `${SITE.name} — ${dict.site.jobTitle}`;

  return {
    /* Required for og:image and canonicals to resolve to absolute URLs.
     * Without it Next emits relative ones and most crawlers drop the preview. */
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      /* Child routes set a bare title ("About") and inherit the suffix, so
       * the name is in every tab and every search result without being typed
       * twice. */
      template: `%s — ${SITE.name}`,
    },
    description: dict.site.description,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE_URL }],
    creator: SITE.name,
    publisher: SITE.name,
    /* The canonical plus the hreflang pair. This one is the home page's;
     * every other page sets its own, because `alternates` set here would
     * otherwise be inherited and point every page at the home URL. */
    alternates: alternatesFor(lang),
    openGraph: {
      /* "profile" rather than "website": this site is a person, and the type
       * is what lets a platform render it as one. */
      type: "profile",
      firstName: "Ricardo",
      lastName: "González Flores",
      url: localePath(lang),
      siteName: SITE.name,
      title,
      description: dict.site.description,
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map(
        (l) => OG_LOCALE[l],
      ),
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.site.description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    /* No `keywords`: no engine has used that tag for ranking in over a
     * decade. The Person schema in PersonSchema carries the same signal in a
     * form they do read. */
  };
}

/* Separate from `metadata` on purpose: Next moved themeColor and the viewport
 * out of the metadata object, and leaving them there logs a warning and emits
 * nothing. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light",
};

/* The two-column shell lives here, not in a page, so the sidebar survives
 * navigation: React keeps the layout mounted and only `children` — the centre
 * column — is replaced. That is what makes the back button in PageShell feel
 * instant, and it is why the hero never re-animates on a route change. */
export default async function RootLayout({
  children,
  modal,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  /* proxy.ts only ever sends /en or /es here, but it skips anything with a
   * dot in it, so a stray "/foo.txt" would reach this segment as a "lang". */
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      data-theme="light"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body>
        <PersonSchema lang={lang} />
        <ThemeProvider defaultTheme="light">
          {/* ──────────────────────────────────────────────────────────────
           * SIDEBAR WIDTH — this line is the knob. Three steps: under 1280px,
           * from 1280px (xl), from 1536px (2xl). Change the px values only.
           *
           * It is a fixed track, not a fraction: at the old 2/6 the sidebar
           * grew with the monitor (667px on a 2000px screen) and starved the
           * lab grid.
           *
           * 600px leaves a 1470px MacBook only ~266px per column, and the
           * widest lab cards (Wallet, Chart) are a fixed 320px that will not
           * shrink on their own. So the grid carries `[zoom:0.75]` — see
           * app/page.tsx. Zoom is the right tool here rather than a transform:
           * it shrinks layout, so the cards actually occupy less, and fluid
           * content keeps its proportions because its column grows to match.
           *
           * Under lg (1024px) there are no two columns at all: the sidebar
           * becomes a header stacked above the content. A 240px track on a
           * 375px phone left the content 135px. `grid-rows-[auto_1fr]` keeps
           * that header at its own height instead of splitting the screen.
           * ────────────────────────────────────────────────────────────── */}
          <div className="grid min-h-screen w-full grid-cols-1 max-lg:grid-rows-[auto_1fr] lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[500px_minmax(0,1fr)]">
            <Sidebar lang={lang} />
            <main className="min-w-0">{children}</main>
          </div>
          {/* The @modal slot. Empty on every route except an intercepted
           * /projects/<slug>, where it renders a <dialog> in the browser's top
           * layer — above the grid and the sidebar both. */}
          {modal}
        </ThemeProvider>
        {/* Renders nothing; it only loads the analytics and Speed Insights
         * scripts. Last in the body so it never delays the page painting. */}
        <Analytics />
      </body>
    </html>
  );
}
