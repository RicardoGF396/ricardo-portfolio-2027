import type { Role } from "./cv";

/* The CV in Spanish.
 *
 * Same rule as cv.ts: THE PDF IN public/ IS AUTHORITATIVE — here that is
 * Ricardo-Gonzalez-Flores-CV-ES.pdf. This is its text, not a translation of
 * the English file, which is why the two do not match bullet for bullet: the
 * Spanish document merges some lines and orders Wicode before Zeeto. When the
 * Google Doc changes, re-export the PDF and bring the change here in the same
 * pass.
 *
 * The only things not taken from the PDF are `tagline` and the
 * "Tiempo completo" in `meta`, which the PDF does not print and the page
 * layout has a slot for; they mirror the English site. */

export const PROFILE_ES = {
  name: "Ricardo González Flores",
  title: "Desarrollador UX/UI",
  tagline:
    "Más de 5 años diseñando y llevando a producción productos digitales, web y mobile",
  location: "León, Guanajuato, México",
  email: "ricardogf396@gmail.com",
  phone: "+52 477 412 2683",
  linkedin: "https://www.linkedin.com/in/ricardogf396/",
  github: "https://github.com/RicardoGF396",
  website: "https://www.ricardogf.com",
  summary:
    "Desarrollador UX/UI con más de 5 años trabajando en ambos lados del handoff: diseño la interfaz en Figma y la llevo a producción, en web (React, Next.js, Angular) y mobile (Flutter, React Native, Swift). Generé incrementos de ingresos con A/B testing diario en una empresa de EE. UU., publiqué una app nativa de iOS en la App Store y en 2026 lideré el equipo de diseño detrás de 12 plataformas para el Gobierno de Guanajuato, construidas sobre una librería de componentes compartida.",
};

export const EXPERIENCE_ES: Role[] = [
  {
    company: "Cloudgenia",
    title: "Líder de Diseño UX/UI → Líder Fullstack y UX/UI",
    meta: "León, Gto. · Presencial · Tiempo completo",
    period: "Ene 2026 — Nov 2026",
    bullets: [
      "Diseñé y entregué 12 proyectos en un año para el Gobierno del Estado de Guanajuato; comencé como Líder de Diseño y el rol se amplió para incluir el desarrollo fullstack.",
      "Lideré al equipo de diseño y construí un Design System interno en Angular 20, integrado con Figma y documentado en Storybook, empaquetado como librería y adoptado por todos los equipos de desarrollo.",
      "Gestioné el ciclo completo de cada proyecto: levantamiento de requerimientos con equipos de gobierno e internos, investigación, análisis, prototipado, handoff e implementación.",
      "Convertí el alcance en objetivos por sprint mediante reportes y sesiones de planeación mensuales.",
    ],
  },
  {
    company: "Wicode",
    title: "Desarrollador Frontend y Líder de Diseño UI/UX",
    meta: "León, Gto. · Híbrido · Contrato",
    period: "Nov 2024 — Actual",
    bullets: [
      "Líder de UI/UX en más de 60 productos digitales de logística, finanzas, manufactura, gobierno y comercio electrónico.",
      "Diseño propuestas visuales y Design Systems completos, desde el levantamiento de requerimientos hasta el handoff a desarrollo.",
      "Diseño y desarrollo tiendas en línea de principio a fin, checkout incluido; construyo sitios en Framer.",
      "Participé como desarrollador en una app nativa de iOS (Swift) para una farmacia (ISSEG) en León.",
    ],
  },
  {
    company: "Zeeto",
    title: "Desarrollador Front-end y Diseñador UI/UX",
    meta: "San Diego, CA, EE. UU. · Remoto · Tiempo completo",
    period: "Dic 2024 — Dic 2025",
    bullets: [
      "Ejecuté experimentos de A/B testing diarios, logrando incrementos consistentes del 4–5% en RPV en más de 30 funnels de monetización.",
      "Lideré el desarrollo de una plataforma interna de generación de anuncios (Next.js, React, Tailwind, Zustand, ShadCN, Konva.js) en Vercel, con exportación masiva de anuncios HTML que redujo los tiempos de iteración creativa.",
      "Desarrollé pipelines de compresión de imágenes que redujeron archivos de 600KB–1MB a ~90KB sin pérdida visible de calidad.",
      "Construí sistemas de animación reutilizables con GSAP y apoyé flujos de motion en After Effects.",
    ],
  },
  {
    company: "Penteon",
    title: "Líder Front-end",
    meta: "Ciudad de México · Híbrido · Tiempo completo",
    period: "2024",
    bullets: [
      "Lideré el desarrollo front-end de la plataforma web de una empresa de IoT; refactoricé e integré el sistema existente para hacerlo mantenible y escalable.",
    ],
  },
  {
    company: "CBQA Solutions",
    title: "Desarrollador Front-end y Líder de Diseño UI/UX",
    meta: "León, Gto. · Híbrido · Tiempo completo",
    period: "Ago 2023 — Sep 2024",
    bullets: [
      "Desarrollé soluciones front-end para clientes empresariales como Heineken, Toyota y Orkos con React, Next.js, Redux Toolkit y TypeScript.",
      "Construí apps móviles en Flutter con funcionalidad offline-first, aumentando el engagement de usuarios en ~50%.",
      "Lideré sistemas de UI y flujos de diseño en Figma; integré servicios de AWS y CI/CD, reduciendo incidencias en producción en ~60%.",
    ],
  },
  {
    company: "Setenal",
    title: "Desarrollador Front-end y Diseñador",
    meta: "Zapopan, Jalisco · Remoto · Tiempo completo",
    period: "2022 — 2023",
    bullets: [
      "Responsable del UI/UX de un sistema de mantenimiento de llantas para la industria automotriz; lideré su rediseño en Figma y lo desarrollé en React y Redux Toolkit.",
    ],
  },
  {
    company: "YoContigo",
    title: "Desarrollador Front-end y Diseñador UX/UI (Practicante)",
    meta: "León, Gto. · Híbrido · Medio tiempo",
    period: "2021 — 2022",
    bullets: [
      "Diseñé en Figma y Photoshop y desarrollé sitios para clientes en HTML, CSS, JavaScript, PHP, WordPress y WooCommerce.",
    ],
  },
];

export const EDUCATION_ES = {
  school: "Universidad La Salle Bajío",
  degree: "Ingeniería en Desarrollo de Software y Sistemas Computacionales",
  location: "León, Guanajuato, México",
  note: "Promedio 9.6 / 10 (aprox. 3.84 / 4.0) — Graduado con Excelencia Académica.",
};

/* Grouped the way the Spanish PDF groups them: it folds backend and cloud
 * into one line where the English one keeps two. */
export const SKILLS_ES: { label: string; items: string[] }[] = [
  {
    label: "Diseño",
    items: [
      "Figma",
      "Design Systems",
      "Prototipado",
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
    label: "Estado y UI",
    items: [
      "Zustand",
      "Redux Toolkit",
      "ShadCN",
      "Radix UI",
      "Ant Design",
      "Konva.js",
      "GSAP",
      "Lottie",
    ],
  },
  {
    label: "Backend y Cloud",
    items: [
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "SQL Server",
      "Firebase",
      "AWS (Practitioner)",
      "Vercel",
      "Git",
      "CI/CD",
    ],
  },
  {
    label: "Growth",
    items: [
      "A/B testing",
      "Optimización de funnels",
      "Google Analytics",
      "Looker",
      "Microsoft Clarity",
      "Meta Ads",
    ],
  },
  {
    label: "Idiomas",
    items: ["Español (nativo)", "Inglés (B2)"],
  },
];
