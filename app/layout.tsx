import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Sidebar from "@/components/site/Sidebar";
import PersonSchema from "@/components/site/PersonSchema";
import { SITE, SITE_URL } from "@/lib/site";
import { inter } from "./fonts";

export const metadata: Metadata = {
  /* Required for og:image and canonicals to resolve to absolute URLs. Without
   * it Next emits relative ones and most crawlers drop the preview. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.jobTitle}`,
    /* Child routes set a bare title ("About") and inherit the suffix, so the
     * name is in every tab and every search result without being typed twice. */
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    /* "profile" rather than "website": this site is a person, and the type is
     * what lets a platform render it as one. */
    type: "profile",
    firstName: "Ricardo",
    lastName: "González Flores",
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.jobTitle}`,
    description: SITE.description,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.jobTitle}`,
    description: SITE.description,
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
  /* No `keywords`: no engine has used that tag for ranking in over a decade.
   * The Person schema in PersonSchema carries the same signal in a form they
   * do read. The og:image and twitter:image come from app/opengraph-image.png
   * by file convention — declaring them here too would duplicate the tags. */
};

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
export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body>
        <PersonSchema />
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
            <Sidebar />
            <main className="min-w-0">{children}</main>
          </div>
          {/* The @modal slot. Empty on every route except an intercepted
           * /projects/<slug>, where it renders a <dialog> in the browser's top
           * layer — above the grid and the sidebar both. */}
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
