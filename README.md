# ricardo-portfolio-2027

Portfolio of **Ricardo González Flores** — UX/UI Developer. Designed in Figma,
built in Next.js, deployed to [ricardogf.com](https://www.ricardogf.com).

Stack: Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.

```bash
npm install
npm run dev
```

## How it is put together

The shell lives in `app/layout.tsx`: a fixed sidebar holding the identity, the
pitch and the nav, beside a single content column. The sidebar sits in the
layout rather than in a page so it stays mounted across navigation — only the
centre column swaps, which is what makes moving between sections feel instant.

```
app/
  layout.tsx               shell, metadata, JSON-LD
  page.tsx                 home — the animation lab grid
  about/ resume/ contact/  content pages
  projects/                the work list
    [slug]/                one write-up per project
  @modal/(.)projects/      the same write-up, intercepted as a dialog
  sitemap.ts robots.ts manifest.ts
components/
  site/                    Sidebar, PageShell, ProjectDetail, Modal, ProfileCard
  <effect>/                the animation pieces shown on the home grid
lib/
  cv.ts                    experience, skills, education — one source of truth
  projects.ts              the work list and every write-up
  projectImages.ts         screenshots per project (generated, then curated)
  site.ts                  canonical URL and the facts the SEO layer repeats
public/work/<slug>/        project screenshots
```

### Project pages

A row in Selected Work opens as a modal over the list, through Next's
intercepting routes. A pasted link or a refresh renders the full page at
`/projects/<slug>` instead. Both render the same `ProjectDetail`, so the two
can never drift apart.

To add a project: append an entry to `lib/projects.ts` with a `slug`, drop the
screenshots in `public/work/<slug>/`, and regenerate `lib/projectImages.ts`.
It reaches the sitemap on its own.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the production origin. Everything canonical — the
sitemap, `robots.txt`, `og:url`, the JSON-LD — is built from it.

```bash
NEXT_PUBLIC_SITE_URL=https://www.ricardogf.com
```
