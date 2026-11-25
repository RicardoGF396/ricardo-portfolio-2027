/* Single source of truth for the CV.
 *
 * /resume renders all of it; /about renders a subset. Keeping one array means
 * the two pages can never drift — edit a bullet here and both update.
 *
 * Merged from two sources that did not agree: the portfolio and an older PDF
 * résumé. The PDF supplied the metrics, but the PORTFOLIO IS AUTHORITATIVE for
 * dates, titles and locations — the PDF's were out of date. See RESUME.md at
 * the repo root for the editable copy. */

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
    "UX/UI developer with five years on both sides of the handoff: I design the interface in Figma and then ship it in production code, on web and on mobile. I have moved revenue with A/B testing at a US media company, shipped a native iOS app to the App Store, and spent 2026 leading a design team through twelve platforms for the Government of Guanajuato.",
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
    title: "Fullstack & UX/UI Design Lead",
    meta: "León, Gto. · On-site · Full-time",
    period: "2026",
    bullets: [
      "Responsible for the design and development of 12 projects in one year for the Government of the State of Guanajuato.",
      "Led the design team, and built a complete component library in Angular together with them — every project after it was made of that library.",
      "Ran the full lifecycle of each project: research, design, analysis, prototyping, handoff and implementation.",
      "Coordinated requirements gathering with both the Guanajuato and Cloudgenia teams, led solution analysis, and oversaw component creation in Figma and Angular.",
      "Produced monthly reports and planning sessions that turned scope into concrete sprint-level goals.",
    ],
  },
  {
    company: "Zeeto",
    title: "Front-end Developer & UI/UX Designer",
    meta: "United States · Remote · Full-time",
    period: "2024 — 2026",
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
    period: "2024 — Present",
    bullets: [
      "UI/UX lead for 50+ digital products across logistics, finance, manufacturing and government.",
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
    period: "2023 — 2024",
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
