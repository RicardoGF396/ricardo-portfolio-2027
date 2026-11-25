import type { Dictionary } from "./en";

/* Spanish copy, typed against en.ts so the two can never drift in shape.
 *
 * Written the way the Spanish CV is: Mexican Spanish, first person, and with
 * the working vocabulary left in English where that is how it is actually
 * said on a team — handoff, front-end, checkout, design system, A/B testing.
 * Translating those would read as a translation. */
export const es: Dictionary = {
  site: {
    jobTitle: "Desarrollador UX/UI",
    role: "Desarrollador UX/UI · Design Systems",
    description:
      "Desarrollador UX/UI que diseña en Figma y lleva el código a producción: React, Angular, Flutter y Swift. Web, mobile y ecommerce. León, México.",
  },

  nav: {
    resume: "CV",
    about: "Sobre mí",
    projects: "Proyectos",
    contact: "Contacto",
  },

  sidebar: {
    hero: "Lo diseño, luego lo construyo.",
    intro:
      "Soy desarrollador UX/UI: diseño la interfaz en Figma y la llevo a producción yo mismo. React y Angular en web; Flutter, React Native y Swift en mobile. Cinco años en ambos lados del handoff; lo más reciente, lideré el equipo de diseño detrás de 12 plataformas de gobierno en un solo año.",
    talk: "Hablemos",
    downloadResume: "Descargar CV",
  },

  shell: {
    backToLab: "Volver al lab",
    backToProjects: "Volver a proyectos",
    close: "Cerrar",
    language: "Idioma",
  },

  about: {
    title: "Sobre mí",
    description:
      "Un ingeniero que habla diseño con fluidez y un diseñador que lleva código a producción: web, mobile y ecommerce, con cinco años en ambos lados del handoff.",
    paragraphs: [
      "Es raro encontrar a un ingeniero que hable diseño con fluidez, y más raro todavía a un diseñador que lleve código a producción. Hacer las dos cosas ha sido mi mayor ventaja en cada equipo al que he llegado: nada se pierde en el handoff, porque no hay handoff.",
      "Construyo para web y para mobile. React, Next.js y Angular de un lado; Flutter, React Native e iOS nativo en Swift del otro. Ese último salió como una app de radio en la App Store y Google Play, donde el streaming en segundo plano nos obligó a dejar React Native y pasarnos a nativo. En medio: plataformas de gobierno, dashboards industriales, design systems. El ecommerce ya es un hilo aparte: tiendas que llevo desde el archivo de Figma hasta el código del checkout.",
      "También lidero. Durante 2026 dirigí al equipo de diseño de Cloudgenia en 12 proyectos en un solo año para el Gobierno de Guanajuato, y construimos una librería de componentes en Angular con la que se hizo cada proyecto posterior. Antes de eso, un año en una empresa de producto de EE. UU. corriendo experimentos A/B a diario, que es donde aprendí a defender un diseño con números en lugar de con gusto.",
      "Una nota sobre el rango, porque cinco años no son muchos para cubrir tanto terreno y prefiero decir claramente cómo lo hago: la IA es parte de mi proceso, en cada etapa. Escribir prompts es la parte más pequeña. Con ella levanto proyectos completos, y luego diseño el sistema y el proceso alrededor de lo que regresa: la arquitectura, las convenciones, la revisión. Lo que sale a producción es mío, y su calidad también.",
      "Que es justo la parte que el modelo no puede hacer por ti. Escribe más rápido que yo, y aun así no puede decirte cuál de tres layouts va a entender de verdad una persona; te entrega algo que corre y está mal, con toda seguridad. Detectar eso es el trabajo, y es la razón por la que el diseño bien hecho importa más ahora que antes, no menos.",
    ],
    basedIn: "Ubicación",
    basedInBody:
      "León, Guanajuato, México. Trabajé remoto de tiempo completo para una empresa en San Diego, así que la zona horaria es un problema resuelto.",
    skills: "Habilidades",
    experience: "Experiencia",
    seeResume: "Ver el CV completo →",
    education: "Educación",
  },

  contact: {
    title: "Contacto",
    description:
      "Contacto para vacantes de desarrollador UX/UI, en remoto o en León, Guanajuato. Un año en remoto de tiempo completo para una empresa de EE. UU.",
    heading: "Hablemos.",
    body: "Si necesitas a alguien que lleve un producto del archivo de Figma a producción, en web o en mobile, escríbeme. Cuéntame qué estás construyendo y qué es lo que duele hoy; suele ser la forma más rápida de saber si soy la persona indicada.",
    reach: "Escríbeme",
    where: "Dónde",
    whereBody:
      "Trabajé remoto de tiempo completo para una empresa en San Diego, así que el horario de EE. UU. no es nada nuevo.",
    languages: "Idiomas",
    languagesBody: "Español (nativo) · Inglés (B2)",
  },

  resume: {
    title: "CV",
    description:
      "Cinco años de desarrollo UX/UI: líder de diseño en Cloudgenia, A/B testing en Zeeto en EE. UU., front-end empresarial en CBQA. Experiencia, habilidades y educación completas.",
    summary: "Perfil",
    experience: "Experiencia",
    skills: "Habilidades",
    education: "Educación",
  },

  projects: {
    title: "Proyectos",
    description:
      "Trabajo seleccionado de 2024 a hoy: design systems, una app nativa de iOS, plataformas de gobierno, software industrial y ecommerce, diseñados y construidos.",
    heading: "Trabajo seleccionado",
    lead: "Productos que diseñé, construí, o ambas cosas.",
    hintHover: "Pasa el cursor sobre uno con enlace para echarle un vistazo.",
    hintTap: "Toca uno con enlace para abrirlo.",
  },

  project: {
    home: "Inicio",
    year: "Año",
    status: "Estado",
    role: "Rol",
    view: "Ver",
    builtWith: "Hecho con",
    noShots: "Aún no hay capturas — ponlas en",
    screenAlt: (name, index, total) =>
      `${name} — pantalla ${index} de ${total}`,
  },
};
