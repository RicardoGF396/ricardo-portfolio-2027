/* English copy for everything that is not CV or project data (those live in
 * lib/cv*.ts and lib/projects*.ts). This file is also the shape: es.ts is
 * typed against it, so a key added here and forgotten there fails the build
 * instead of rendering `undefined` on the Spanish site. */
export const en = {
  site: {
    jobTitle: "UX/UI Developer",
    /* The line under the name in the sidebar. */
    role: "UX/UI Developer · Design Systems",
    /* Under ~155 characters so Google shows it whole, and front-loaded with
     * the job title someone would actually search for. */
    description:
      "UX/UI developer who designs in Figma and ships the production code — React, Angular, Flutter and Swift. Web, mobile and ecommerce. León, México.",
  },

  nav: {
    resume: "Resume",
    about: "About",
    projects: "Projects",
    contact: "Contact",
  },

  sidebar: {
    hero: "I design it, then I build it.",
    intro:
      "I'm a UX/UI developer — I design the interface in Figma, then ship it myself. React and Angular on the web; Flutter, React Native and Swift on mobile. Five years on both sides of the handoff; most recently I led the design team behind 12 government platforms in a single year.",
    talk: "Let's talk",
    downloadResume: "Download Resume",
  },

  shell: {
    backToLab: "Back to the lab",
    backToProjects: "Back to projects",
    close: "Close",
    /* The accessible name of the EN/ES toggle. */
    language: "Language",
  },

  about: {
    title: "About",
    description:
      "An engineer who speaks fluent design and a designer who ships production code — web, mobile and ecommerce, with five years on both sides of the handoff.",
    paragraphs: [
      "It's rare to find an engineer who speaks fluent design — and rarer still to find a designer who ships production code. Doing both has been my biggest edge on every team I've joined: nothing gets lost in the handoff, because there isn't one.",
      "I build for web and for mobile. React, Next.js and Angular on one side; Flutter, React Native and native iOS in Swift on the other — that last one shipped as a radio app on the App Store and Google Play, where background streaming forced us off React Native and onto native. In between: government platforms, industrial dashboards, design systems. Ecommerce is a thread of its own by now: storefronts I take from the Figma file all the way through the checkout code.",
      "I lead, too. Through 2026 I ran the design team at Cloudgenia across 12 projects in a single year for the Government of Guanajuato, and we built a component library in Angular that every project after it was made of. Before that, a year at a US product company running daily A/B experiments — which is where I learned to argue for a design with numbers instead of taste.",
      /* The range is the first thing a reader doubts: five years is not long
       * to cover design, web, mobile and ecommerce. Saying how it is done,
       * in detail, beats letting them assume the list is padded. */
      "A word about the range, because five years is not long to cover this much ground and I would rather say plainly how I do it: AI is part of my process, at every stage. Prompting is the smallest part of that. I scaffold whole projects with it, then design the system and the process around what comes back — the architecture, the conventions, the review. What ships is mine, and so is its quality.",
      "Which is the part the model cannot do for you. It writes faster than I do, and it still can't tell you which of three layouts a person will actually understand; it will hand you something that runs and is wrong, confidently. Catching that is the job, and it is why well-crafted design matters more now than it did before, not less.",
    ],
    basedIn: "Based in",
    basedInBody:
      "León, Guanajuato, México. I've worked remote full-time for a company in San Diego, so the timezone is a solved problem.",
    skills: "Skills",
    experience: "Experience",
    seeResume: "See the full resume →",
    education: "Education",
  },

  contact: {
    title: "Contact",
    /* "A year" is the Zeeto role in lib/cv.ts, Dec 2024 to Dec 2025. Keep it
     * in step with the CV: this line is what a search result shows, and a
     * recruiter comparing it to the PDF should find the same number. */
    description:
      "Get in touch about UX/UI developer roles — remote or in León, Guanajuato. A year of working remote full-time for a US company.",
    heading: "Let's talk.",
    body: "If you need someone who can take a product from the Figma file to production — on web or on mobile — write to me. Tell me what you're building and what hurts about it right now; that's usually the fastest way to find out whether I'm the right person.",
    reach: "Reach me",
    where: "Where",
    /* Follows the location, which comes from the CV data. */
    whereBody:
      "I worked remote full-time for a company in San Diego, so US hours are nothing new.",
    languages: "Languages",
    languagesBody: "Spanish (native) · English (B2)",
  },

  resume: {
    title: "Resume",
    description:
      "Five years of UX/UI development: design lead at Cloudgenia, A/B testing at Zeeto in the US, enterprise front-end at CBQA. Full experience, skills and education.",
    summary: "Summary",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
  },

  projects: {
    title: "Projects",
    description:
      "Selected work from 2024 to today: design systems, a native iOS app, government platforms, industrial software and ecommerce — designed and built.",
    heading: "Selected work",
    lead: "Products I designed, built, or both.",
    hintHover: "Hover a linked one to peek at it.",
    hintTap: "Tap a linked one to open it.",
  },

  project: {
    home: "Home",
    year: "Year",
    status: "Status",
    role: "Role",
    view: "View",
    builtWith: "Built with",
    noShots: "No screenshots yet — drop them in",
    screenAlt: (name: string, index: number, total: number) =>
      `${name} — screen ${index} of ${total}`,
  },
};

export type Dictionary = typeof en;
