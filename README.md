# ricardo-portfolio-2027

Portfolio of **Ricardo González Flores** — UX/UI Developer. Designed in Figma,
built in Next.js, deployed to [ricardogf.com](https://www.ricardogf.com).

Stack: Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.

```bash
npm install
npm run dev
```

## How it is put together

The shell lives in `app/[lang]/layout.tsx`: a fixed sidebar holding the
identity, the pitch and the nav, beside a single content column. The sidebar
sits in the layout rather than in a page so it stays mounted across navigation
— only the centre column swaps, which is what makes moving between sections
feel instant.

```
proxy.ts                     sends URLs with no language to /en or /es
app/
  [lang]/                    every page, once per language
    layout.tsx               shell, metadata, JSON-LD
    page.tsx                 home — the animation lab grid
    about/ resume/ contact/  content pages
    projects/                the work list
      [slug]/                one write-up per project
    @modal/(.)projects/      the same write-up, intercepted as a dialog
  sitemap.ts robots.ts manifest.ts
components/
  site/                      Sidebar, PageShell, ProjectDetail, Modal, ProfileCard
  <effect>/                  the animation pieces shown on the home grid
lib/
  i18n.ts                    the locales and the URL helpers
  dictionaries/              en.ts and es.ts — all page copy
  cv.ts  cv.es.ts            experience, skills, education, one file per language
  projects.ts                the work list and every write-up (English)
  projects.es.ts             the Spanish for those write-ups, keyed by slug
  projectImages.ts           screenshots per project (generated, then curated)
  site.ts                    canonical URL and the facts the SEO layer repeats
public/work/<slug>/          project screenshots
```

### Two languages

The site is in English and Spanish, at `/en/...` and `/es/...`. Nothing is
served without a prefix: `proxy.ts` redirects `/` and any other bare path to
the visitor's language, read from `Accept-Language`, falling back to English.

Copy lives in three places, by kind:

- **Page text** — `lib/dictionaries/en.ts` and `es.ts`. `es.ts` is typed
  against `en.ts`, so a key missing from the Spanish file fails the build.
- **The CV** — `lib/cv.ts` and `lib/cv.es.ts`. Each mirrors its own PDF in
  `public/`; they are two documents, not a translation of one another.
- **Projects** — declared once in `lib/projects.ts`. `lib/projects.es.ts`
  holds only the fields that are language, keyed by slug, and anything missing
  there shows in English rather than disappearing.

The animation lab on the home page is not translated: its cards are interface
specimens, and their labels are part of the specimen.

### Project pages

A row in Selected Work opens as a modal over the list, through Next's
intercepting routes. A pasted link or a refresh renders the full page at
`/<lang>/projects/<slug>` instead. Both render the same `ProjectDetail`, so
the two can never drift apart.

To add a project: append an entry to `lib/projects.ts` with a `slug`, drop the
screenshots in `public/work/<slug>/`, and regenerate `lib/projectImages.ts`.
Add its Spanish under the same slug in `lib/projects.es.ts`. It reaches the
sitemap on its own, in both languages.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the production origin. Everything canonical — the
sitemap, `robots.txt`, `og:url`, the JSON-LD — is built from it.

```bash
NEXT_PUBLIC_SITE_URL=https://www.ricardogf.com
```
