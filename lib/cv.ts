/* Single source of truth for the CV.
 *
 * /resume renders all of it; /about renders a subset. Keeping one array means
 * the two pages can never drift — edit a bullet here and both update.
 *
 * THE PDF IN public/ IS AUTHORITATIVE. It is the document that gets emailed,
 * screened and checked against LinkedIn, so this file matches it rather than
 * the other way round. When the Google Doc changes, re-export the PDF and
 * bring the change here in the same pass — a recruiter holding both and
 * finding different dates stops trusting either one. */

export const PROFILE = {
  name: "Ricardo González Flores",
  title: "UX/UI Developer",
  tagline: "5+ years designing and shipping digital products, web and mobile",
  location: "León, Guanajuato, México",
  email: "ricardogf396@gmail.com",
  phone: "+52 477 412 2683",
  linkedin: "https://www.linkedin.com/in/ricardogf396/",
  github: "https://github.com/RicardoGF396",
  website: "https://www.ricardogf.com",
  summary:
    "UX/UI developer with 5+ years on both sides of the handoff: I design the interface in Figma and ship it in production code, on web (React, Next.js, Angular) and mobile (Flutter, React Native, Swift). Moved revenue with daily A/B testing at a US company, shipped a native iOS app to the App Store, and in 2026 led the design team behind 12 platforms for the Government of Guanajuato, built on a shared component library.",
};

export interface Role {
  company: string;
  title: string;
  meta: string;
  period: string;
  bullets: string[];
}

export const EXPERIENCE: Role[] = [
  {
    company: "Cloudgenia",
    /* The arrow is the point: it reads as a promotion rather than a job
     * title. Straight from the CV. */
    title: "UX/UI Design Lead → Fullstack & UX/UI Lead",
    meta: "León, Gto. · On-site · Full-time",
    period: "Jan 2026 — Nov 2026",
    bullets: [
      "Designed and delivered 12 projects in one year for the Government of the State of Guanajuato; started as Design Lead and expanded the role to also own full-stack development.",
      "Led the design team and built an in-house design system in Angular 20, integrated with Figma and documented in Storybook, packaged as a library adopted by all development teams.",
      "Ran the full lifecycle of each project: research, design, analysis, prototyping, handoff and implementation.",
      "Coordinated requirements gathering with both the Guanajuato and Cloudgenia teams, led solution analysis, and oversaw component creation in Figma and Angular.",
      "Produced monthly reports and planning sessions that turned scope into concrete sprint-level goals.",
    ],
  },
  {
    company: "Zeeto",
    title: "Front-end Developer & UI/UX Designer",
    meta: "San Diego, CA, USA · Remote · Full-time",
    period: "Dec 2024 — Dec 2025",
    bullets: [
      "Ran daily A/B testing experiments, achieving consistent 4–5% RPV improvements across 30+ monetization funnels.",
      "Led development of an internal Ad Generation Platform in Next.js, React, Tailwind, Zustand, ShadCN and Konva.js, deployed on Vercel.",
      "Enabled rapid generation and export of HTML-based ads, cutting creative production and iteration time significantly.",
      "Built image compression pipelines that took assets from 600KB–1MB down to ~90KB with no visible quality loss.",
      "Built reusable animation systems with GSAP and supported motion workflows with After Effects.",
      "Maintained full ownership of the codebase, deployments and version control.",
    ],
  },
  {
    company: "Wicode",
    title: "Frontend Developer & UI/UX Designer Lead",
    meta: "León, Gto. · Hybrid · Contract",
    period: "Nov 2024 — Present",
    bullets: [
      "UI/UX lead for 60+ digital products across logistics, finance, manufacturing, government and ecommerce.",
      "Design visual proposals and complete design systems, from requirements gathering through developer handoff.",
      "A good share of that work is ecommerce: I design the storefront and then build it, checkout included.",
      "Build websites in Framer, and contributed as a developer on an iOS (Swift) project for a pharmacy (ISSEG) in León.",
    ],
  },
  {
    company: "Penteon",
    title: "Front-end Lead",
    meta: "Mexico City, México · Hybrid · Full-time",
    period: "2024",
    bullets: [
      "Led front-end development on a web project for an IoT company.",
      "Refactored and integrated an existing system, applying best practices to make it maintainable, scalable and consistent.",
      "Short tenure, due to a city relocation and a growth opportunity.",
    ],
  },
  {
    company: "CBQA Solutions",
    title: "Front-end Developer & UI/UX Design Lead",
    meta: "León, Gto. · Hybrid · Full-time",
    period: "Aug 2023 — Sep 2024",
    bullets: [
      "Delivered front-end solutions for enterprise clients including Heineken, Toyota and Orkos.",
      "Developed scalable web applications with React, Next.js, Redux Toolkit and TypeScript.",
      "Built Flutter mobile applications with offline-first functionality, increasing user engagement by ~50%.",
      "Led UI systems and design workflows in Figma, ensuring scalability and consistency.",
      "Integrated AWS services and CI/CD workflows, reducing production issues by ~60%.",
    ],
  },
  {
    company: "Setenal",
    title: "Front-end Developer & Designer",
    meta: "Zapopan, Jalisco · Remote · Full-time",
    period: "2022 — 2023",
    bullets: [
      "Owned the UI/UX of a tire maintenance system for the automotive industry, and led its redesign in Figma.",
      "Developed and maintained the web app in React, Redux Toolkit and JavaScript, against a codebase in production.",
    ],
  },
  {
    company: "YoContigo",
    title: "Front-end Developer & UX/UI Designer",
    meta: "León, Gto. · Hybrid · Part-time",
    period: "2021 — 2022",
    bullets: [
      "My first job, as an intern. I designed in Figma and Photoshop and built what I designed in HTML, CSS, JavaScript and some PHP.",
      "Mostly WordPress and WooCommerce sites for clients. This is where designing and building stopped being two jobs to me.",
    ],
  },
];

export const EDUCATION = {
  school: "La Salle Bajío University",
  degree: "BSc in Software Development and Computer Systems Engineering",
  location: "León, Guanajuato, México",
  note: "GPA 9.6 / 10 (approx. 3.84 / 4.0) — graduated with Academic Excellence.",
};

export const SKILLS: { label: string; items: string[] }[] = [
  {
    label: "Design",
    items: [
      "Figma",
      "Design systems",
      "Prototyping",
      "Storybook",
      "Photoshop",
      "Illustrator",
      "Motion graphics",
    ],
  },
  {
    label: "Front-end",
    items: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind",
    ],
  },
  {
    label: "Mobile",
    items: ["Flutter", "React Native", "Swift", "SwiftUI"],
  },
  {
    label: "State & UI",
    items: [
      "Zustand",
      "Redux Toolkit",
      "ShadCN",
      "Ant Design",
      "Radix UI",
      "Konva.js",
      "GSAP",
      "Lottie",
    ],
  },
  {
    label: "Backend & data",
    items: ["Node.js", "Supabase", "PostgreSQL", "SQL Server", "Firebase"],
  },
  {
    label: "Cloud & tooling",
    items: ["AWS (Practitioner)", "Vercel", "Git", "GitHub", "CI/CD"],
  },
  {
    label: "Growth",
    items: [
      "A/B testing",
      "Funnel optimization",
      "Looker",
      "Google Analytics",
      "Microsoft Clarity",
      "Meta Ads",
    ],
  },
  {
    label: "Languages",
    items: ["Spanish (native)", "English (B2)"],
  },
];
