/* Selected work, and the detail behind each piece.
 *
 * A row is clickable only when it has a `slug` — that is what gives it a
 * /projects/<slug> page. The 2026 entries have no write-up yet, so they render
 * as plain rows: no arrow, no hover, nothing that looks clickable and isn't.
 * Add a slug (and a block in PROJECT_IMAGES) as each write-up goes up.
 *
 * `url` is the "Ver" button. Leave it null and the button does not render. */

import type { Locale } from "./i18n";
import { PROJECTS_ES } from "./projects.es";

export interface Project {
  year: string;
  name: string;
  kind: string;
  slug?: string;
  tags?: string[];
  summary?: string;
  role?: string;
  status?: string;
  stack?: string[];
  url?: string | null;
}

export const PROJECTS: Project[] = [
  {
    year: "2026",
    name: "SF-UI Library",
    kind: "Angular component library",
    slug: "sf-ui",
    tags: ["Design system", "Angular", "Team lead"],
    summary:
      "Cloudgenia's component library for the Government of Guanajuato: 34 production-ready Angular components so twelve projects stop reimplementing the same form, table and navigation. Standalone, with Tailwind CSS 4, design tokens and accessibility built in. I led the design team that built it.",
    role: "Design lead · component architecture",
    status: "In production — private",
    stack: [
      "Angular",
      "TypeScript",
      "Tailwind CSS 4",
      "Design tokens",
      "Figma",
      "Storybook",
    ],
    // Documentation site is internal to Cloudgenia — intentionally not linked.
    url: null,
  },
  {
    year: "2026",
    name: "Tombstone",
    kind: "MES · industrial",
    slug: "tombstone",
    tags: ["Web", "Industrial", "Role-based"],
    summary:
      "A manufacturing execution system for Tombstone Hats' main plant in San Francisco del Rincón: executive dashboard, Andon board, batch scheduling, a shop-floor terminal with QR scanning, buffer warehouses, an operator roster and five quality gates from cutting to final inspection. Three roles get three different systems — engineering, plant supervisor, quality inspector — under RBAC, and it syncs with CONTPAQi.",
    role: "Design & front-end",
    status: "In development",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Figma"],
    url: null,
  },
  {
    year: "2026",
    name: "Hidroaliado",
    kind: "Website & SEO",
    slug: "hidroaliado",
    tags: ["Web", "SEO", "Solo build"],
    summary:
      "A hydraulic-materials supplier I started with my family in León: valves, fittings and PE-AL-PE multilayer pipe for water networks. I built all of it — the brand, the photography and video, the ad campaigns, the 45-product site, and the SEO underneath it: titles per product and per category, a full sitemap, descriptive alt text, and articles aimed at what installers actually search for. Orders come in through Mercado Libre and WhatsApp today; a real checkout is the next step.",
    role: "Founder · brand, site, media, campaigns",
    status: "Live",
    stack: ["Next.js", "React", "Tailwind", "Vercel", "SEO", "Figma"],
    url: "https://www.hidroaliado.com",
  },
  {
    year: "2026",
    name: "Hidroaliado Platform",
    kind: "CRM & analytics",
    slug: "hidroaliado-app",
    tags: ["Web", "CRM", "Analytics"],
    summary:
      "The back office behind the Hidroaliado site, built because four analytics dashboards and a spreadsheet are not a way to run a business. Inventory, suppliers, customers, quotes, orders, invoicing and expenses in one place — plus a metrics view that joins Meta Ads, Google Analytics, Microsoft Clarity and Mercado Libre through their APIs and MCP servers, and reports them as plain-language readings rather than charts to interpret. It also works out what a Mercado Libre sale actually earns once commission, shipping and tax withholding come out.",
    role: "Design & build",
    status: "Live — private",
    stack: [
      "Next.js",
      "React",
      "MCP",
      "Meta Ads API",
      "Google Analytics",
      "Microsoft Clarity",
      "Mercado Libre API",
    ],
    url: null,
  },
  {
    year: "2026",
    name: "Wicode Website",
    kind: "Company site",
    slug: "wicode-website",
    tags: ["Web", "Marketing", "Interactive"],
    summary:
      "The site for Wicode, a software studio in Le\u00f3n that builds custom systems for businesses which outgrew Excel and WhatsApp. Designed and built to their requirements. The pitch is \u201cfrom chaos to system\u201d, and the page argues it instead of asserting it: a calculator turns three sliders \u2014 team size, hours lost a week, cost per hour \u2014 into what the disorder costs over a week, a month, a year and three years, worked out in the browser with nothing sent anywhere, and says plainly that it promises no savings. Four scenes then stage the problems it names, each a working mock of the real thing: stock that disagrees with the shelf, three WhatsApp quotes at three prices, a delivery status that lives on one driver\u2019s phone, three versions of the same sales spreadsheet. Below that, four services, a five-step process pinned to the scroll that ends in a signed scope, video case studies, the Lab blog and a booking flow.",
    role: "Design & build \u2014 from their requirements",
    status: "In beta \u2014 pre-launch",
    stack: [
      "Next.js 16",
      "React",
      "TypeScript",
      "Tailwind",
      "Motion",
      "Vercel",
      "Figma",
    ],
    url: "https://wicode-website-beta.vercel.app",
  },
  {
    year: "2026",
    name: "Wicode Base",
    kind: "Design system & admin UI kit",
    slug: "wicode-base",
    tags: ["Design system", "Dashboard", "Internal"],
    summary:
      "The base Wicode builds its next products on, shipped as a working back office rather than a page of swatches: sales dashboard, orders, calendar, customers, inventory, forms, accounts payable and receivable, and sales channels — plus a command palette, a notification centre and its own documentation. It also ships an MCP guide, so the system is legible to AI agents and not only to people.",
    role: "Design & build",
    status: "In use for upcoming projects",
    stack: ["React", "TypeScript", "Tailwind", "Vercel", "Figma"],
    url: "https://wicode-design.vercel.app",
  },
  {
    year: "2026",
    name: "Aldama",
    kind: "Agency site",
    slug: "aldama",
    tags: ["Web", "Marketing", "Ecommerce"],
    summary:
      "The site for an ecommerce agency selling Shopify builds and monthly CRO retainers. The job was to make the offer legible: positioning up front, then the part most agency sites dodge — a three-tier pricing page with the full feature matrix, so a prospect can self-qualify before the first call. Spanish-first, aimed at Mexican brands. The venture itself is on pause.",
    role: "Design & build",
    status: "Paused",
    stack: ["Next.js", "React", "Tailwind", "Vercel", "Figma"],
    url: "https://www.aldama.agency",
  },

  {
    year: "2026",
    name: "SASSP",
    kind: "Government software",
    slug: "sassp",
    tags: ["Government", "Private"],
    summary:
      "A platform for the Government of the State of Guanajuato, which I designed and developed while at Cloudgenia. The work belongs to the client, so there is nothing of it I can show here — no screens, no code. I'm glad to walk through the research, the decisions and the trade-offs in a conversation.",
    role: "Design & development",
    status: "Private — client-owned",
    url: null,
  },
  {
    year: "2026",
    name: "9PM",
    kind: "Ecommerce",
    slug: "9pm",
    tags: ["Ecommerce", "Shopify", "Fashion"],
    summary:
      "A Shopify storefront for 9PM, an Italian womenswear label founded in 2009 and named for the hour the day turns from formal to informal. The build leans editorial: full-bleed campaign imagery between the collection rails, a capsule structure — New In, Main SS26, Travel, Archive — and wishlist and multi-currency wired in. Still a demo: the catalogue is placeholder and no real orders are processed.",
    role: "Design & build",
    status: "Demo build — private",
    stack: ["Shopify", "Liquid", "Theme customisation"],
    // Storefront sits behind Shopify's password gate, so there is no link
    // a visitor could actually open.
    url: null,
  },

  {
    year: "2026",
    name: "Naveo",
    kind: "Web & mobile app",
    slug: "naveo",
    tags: ["Web", "Mobile", "Founder"],
    summary:
      "Order orchestration for retail stores: assign, track and control deliveries without losing the thread. I lead it as CEO and co-founder, and built the product end to end — database and security policies, auth, push notifications, realtime updates, the web app, the Flutter app and the landing. Four weeks from nothing to a working manual-assignment milestone.",
    role: "CEO & co-founder · design and build",
    status: "Closed beta",
    stack: [
      "Next.js",
      "React",
      "Flutter",
      "Supabase",
      "PostgreSQL",
      "Firebase",
      "Mapbox",
      "Tailwind",
      "Figma",
    ],
    url: "https://www.naveo.mx",
  },
  {
    year: "2025",
    name: "Pura Banda",
    kind: "Radio & massive survey app",
    slug: "pura-banda",
    tags: ["Mobile", "Web", "UI/UX lead"],
    summary:
      "A radio station's app: live streaming, a promo platform for its featured bands, and a web app and admin panel behind it that control what the app shows. The vote-for-your-favourite-band mechanic pulled roughly 117,000 votes. I led UI/UX and worked on the web app, the mobile app and the overall product with my team at Uanify.",
    role: "UI/UX lead · front-end",
    status: "Live on Google Play",
    stack: ["Flutter", "Dart", "Next.js", "React", "Node.js", "Tailwind", "Figma"],
    url: "https://play.google.com/store/apps/details?id=com.uanify.pura_banda_app",
  },
  {
    year: "2025",
    name: "Adgen",
    kind: "Ads creator",
    slug: "adgen",
    tags: ["Web", "Internal tool", "Solo build"],
    summary:
      "An internal platform at Zeeto for producing ad creatives at scale: large batches of variants driven by UTM parameters, drawn on a Konva.js canvas and exported as HTML5 or PNG. Exports came out up to 70% lighter. I built the whole thing alone, from a real gap the design team had.",
    role: "Sole developer",
    status: "Internal alpha",
    stack: ["Next.js", "React", "Konva.js", "Zustand", "GSAP", "Tailwind", "Figma"],
    url: null,
  },
  {
    year: "2025",
    name: "Don Cheto App",
    kind: "Native iOS & Android radio app",
    slug: "don-cheto-app",
    tags: ["iOS", "Android", "Swift"],
    summary:
      "A streaming app for Don Cheto, a Los Angeles radio personality, carrying his station into Mexico behind a VPN-based geo restriction and monetised with an AdMob spot on playback. We started in React Native and moved to fully native iOS and Android, because background audio would not hold up otherwise. I owned UI/UX and wrote the iOS app in Swift.",
    role: "UI/UX · iOS developer",
    status: "Shipped — App Store & Google Play",
    stack: ["Swift", "SwiftUI", "iOS", "Figma", "CI/CD"],
    // App Store / Play Store listing — paste the link here.
    url: null,
  },
  {
    year: "2025",
    name: "CV Lens",
    kind: "AI CV checker",
    slug: "cvlens",
    tags: ["Web", "AI", "Experiment"],
    summary:
      "An app that reads and compares résumés at scale, built for recruiters who were drowning in them. First version shipped in a couple of days after testing several models on OpenRouter and settling on Gemini Flash. Shared it on LinkedIn, got a very good response from the HR community, and chose not to maintain it long-term.",
    role: "Solo build",
    status: "Archived",
    stack: ["Next.js", "React", "OpenRouter", "Zod", "PDF Lib", "Tailwind"],
    url: null,
  },
  {
    year: "2025",
    name: "CRIEG",
    kind: "Ecommerce & landing",
    slug: "crieg",
    tags: ["Web", "Ecommerce", "Payments"],
    summary:
      "A storefront for a radiology association that sells and personalises certifications, replacing a process they were running by hand. Billing runs through the Alegra API for end-user purchases, with the back office on HubSpot to match the stack the client already had. I started it with a colleague and led it for several months.",
    role: "Project lead · front-end",
    status: "Live",
    stack: ["Next.js", "React", "Stripe", "Alegra API", "HubSpot", "Resend", "Tailwind"],
    url: "https://crieg.com.mx",
  },
  {
    year: "2024",
    name: "Shopfloor Management",
    kind: "Industrial / manufacturing",
    slug: "shopfloor-management",
    tags: ["Web", "Hackathon winner"],
    summary:
      "A web app for the Volkswagen plant in Silao: surface production problems, report them by line and by engine, and make the daily call on the factory floor with data instead of memory. Built for a Volkswagen-sponsored hackathon in Guanajuato, which we won. My first large-scale product, and the one that forced me to learn discovery, requirements and pitching.",
    role: "Product design · front-end",
    status: "Hackathon winner — not commercialised",
    stack: ["React", "Node.js", "Nivo", "AWS", "Tailwind", "Figma"],
    url: null,
  },
  {
    year: "2024",
    name: "Kiosko Móvil GTO",
    kind: "AI platform",
    slug: "kiosko-movil-gto",
    tags: ["Mobile", "AI", "Government"],
    summary:
      "Administrative procedures completed from a phone instead of a counter, with the OpenAI API speeding up the slowest steps. Aimed at government bodies and private organisations trying to modernise paperwork. A three-person team, where I lead UI/UX while focusing on the front-end. Our first state-level award-winning project.",
    role: "UI/UX lead · front-end",
    status: "In development",
    stack: ["React Native", "React", "Node.js", "OpenAI API", "AWS", "Tailwind"],
    url: null,
  },
  {
    year: "2024",
    name: "Midbar",
    kind: "Gym & fitness app",
    slug: "midbar",
    tags: ["Mobile", "Flutter", "Solo build"],
    summary:
      "A training app for building custom programs and logging activity, made for a client who is a developer himself. My first solo mid-size client project: I took ownership of the product design and built the whole front end.",
    role: "Product design · front-end",
    status: "Delivered",
    stack: ["Flutter", "Dart", "Firebase", "Riverpod", "Figma"],
    url: null,
  },
];

/* The list in one language. PROJECTS above is the English source and the only
 * place a project is declared; Spanish is laid over it from projects.es.ts,
 * field by field, so anything not yet translated shows in English rather than
 * vanishing. Order, slugs, stack and urls are identical in both. */
export function getProjects(lang: Locale): Project[] {
  if (lang === "en") return PROJECTS;
  return PROJECTS.map((project) =>
    project.slug ? { ...project, ...PROJECTS_ES[project.slug] } : project,
  );
}

export function getProject(slug: string, lang: Locale): Project | undefined {
  return getProjects(lang).find((p) => p.slug === slug);
}
