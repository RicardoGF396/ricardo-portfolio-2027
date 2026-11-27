import type { Project } from "./projects";

/* Spanish for the project write-ups, keyed by slug.
 *
 * Only the fields that are language live here — kind, tags, summary, role and
 * status. Name, year, stack and url are the same in both, so they stay in
 * projects.ts and are never repeated: a project is added once there, and gets
 * its Spanish by adding a block here. A slug missing from this file falls
 * back to English field by field, so a new write-up shows up on /es at once
 * instead of disappearing until it is translated. */
type ProjectCopy = Pick<Project, "kind" | "tags" | "summary" | "role" | "status">;

export const PROJECTS_ES: Record<string, Partial<ProjectCopy>> = {
  "sf-ui": {
    kind: "Librería de componentes en Angular",
    tags: ["Design system", "Angular", "Líder de equipo"],
    summary:
      "La librería de componentes de Cloudgenia para el Gobierno de Guanajuato: 34 componentes de Angular listos para producción, para que doce proyectos dejen de reimplementar el mismo formulario, tabla y navegación. Standalone, con Tailwind CSS 4, design tokens y accesibilidad de fábrica. Lideré al equipo de diseño que la construyó.",
    role: "Líder de diseño · arquitectura de componentes",
    status: "En producción — privado",
  },
  tombstone: {
    kind: "MES · industrial",
    tags: ["Web", "Industrial", "Por roles"],
    summary:
      "Un sistema de ejecución de manufactura (MES) para la planta principal de Tombstone Hats en San Francisco del Rincón: dashboard ejecutivo, tablero Andon, programación de lotes, una terminal de piso con escaneo de QR, almacenes de buffer, un roster de operadores y cinco puntos de control de calidad, del corte a la inspección final. Tres roles reciben tres sistemas distintos (ingeniería, supervisor de planta e inspector de calidad) bajo RBAC, y se sincroniza con CONTPAQi.",
    role: "Diseño y front-end",
    status: "En desarrollo",
  },
  hidroaliado: {
    kind: "Sitio web y SEO",
    tags: ["Web", "SEO", "En solitario"],
    summary:
      "Una proveedora de materiales hidráulicos que fundé con mi familia en León: válvulas, conexiones y tubería multicapa PE-AL-PE para redes de agua. Hice todo: la marca, la fotografía y el video, las campañas de anuncios, el sitio de 45 productos y el SEO que lo sostiene, con títulos por producto y por categoría, un sitemap completo, texto alternativo descriptivo y artículos enfocados en lo que los instaladores realmente buscan. Hoy los pedidos llegan por Mercado Libre y WhatsApp; un checkout de verdad es el siguiente paso.",
    role: "Fundador · marca, sitio, medios, campañas",
    status: "En línea",
  },
  "hidroaliado-app": {
    kind: "CRM y analítica",
    tags: ["Web", "CRM", "Analítica"],
    summary:
      "El back office detrás del sitio de Hidroaliado, construido porque cuatro dashboards de analítica y una hoja de cálculo no son forma de llevar un negocio. Inventario, proveedores, clientes, cotizaciones, pedidos, facturación y gastos en un solo lugar, más una vista de métricas que une Meta Ads, Google Analytics, Microsoft Clarity y Mercado Libre a través de sus APIs y servidores MCP, y las reporta como lecturas en lenguaje claro en lugar de gráficas por interpretar. También calcula cuánto deja realmente una venta de Mercado Libre una vez que salen la comisión, el envío y la retención de impuestos.",
    role: "Diseño y desarrollo",
    status: "En línea — privado",
  },
  "wicode-website": {
    kind: "Sitio de empresa",
    tags: ["Web", "Marketing", "Interactivo"],
    summary:
      "El sitio de Wicode, un estudio de software en Le\u00f3n que construye sistemas a la medida para negocios que se le salieron de las manos a Excel y WhatsApp. Dise\u00f1ado y programado a partir de sus requerimientos. La promesa es \u201cdel caos al sistema\u201d, y la p\u00e1gina la argumenta en lugar de afirmarla: una calculadora convierte tres controles \u2014 tama\u00f1o del equipo, horas perdidas por semana y costo por hora \u2014 en lo que cuesta el desorden a una semana, un mes, un a\u00f1o y tres a\u00f1os, se calcula en el navegador sin enviar nada y dice de frente que no promete ahorros. Luego cuatro escenas montan los problemas que nombra, cada una una maqueta funcional de la cosa real: el stock que no coincide con el anaquel, tres cotizaciones por WhatsApp con tres precios, el estatus de entrega que vive en el celular de un chofer y tres versiones del mismo Excel de ventas. Debajo, cuatro servicios, un proceso de cinco pasos anclado al scroll que termina en un alcance firmado, casos en video, el blog del Lab y el flujo para agendar.",
    role: "Dise\u00f1o y desarrollo \u2014 a partir de sus requerimientos",
    status: "En beta \u2014 antes del lanzamiento",
  },
  "wicode-base": {
    kind: "Design system y UI kit de administración",
    tags: ["Design system", "Dashboard", "Interno"],
    summary:
      "La base sobre la que Wicode construye sus próximos productos, entregada como un back office funcional y no como una página de muestras: dashboard de ventas, pedidos, calendario, clientes, inventario, formularios, cuentas por pagar y por cobrar, y canales de venta, además de una paleta de comandos, un centro de notificaciones y su propia documentación. También incluye una guía de MCP, para que el sistema sea legible para agentes de IA y no solo para personas.",
    role: "Diseño y desarrollo",
    status: "En uso para próximos proyectos",
  },
  aldama: {
    kind: "Sitio de agencia",
    tags: ["Web", "Marketing", "Ecommerce"],
    summary:
      "El sitio de una agencia de ecommerce que vende tiendas en Shopify e igualas mensuales de CRO. El trabajo era hacer legible la oferta: posicionamiento al frente y luego la parte que casi todas las agencias esquivan, una página de precios de tres niveles con la matriz completa de funciones, para que un prospecto pueda autocalificarse antes de la primera llamada. Pensado primero en español, para marcas mexicanas. El proyecto en sí está en pausa.",
    role: "Diseño y desarrollo",
    status: "En pausa",
  },
  sassp: {
    kind: "Software de gobierno",
    tags: ["Gobierno", "Privado"],
    summary:
      "Una plataforma para el Gobierno del Estado de Guanajuato, que diseñé y desarrollé mientras estuve en Cloudgenia. El trabajo pertenece al cliente, así que no hay nada que pueda mostrar aquí: ni pantallas ni código. Con gusto platico la investigación, las decisiones y los trade-offs en una conversación.",
    role: "Diseño y desarrollo",
    status: "Privado — propiedad del cliente",
  },
  "9pm": {
    kind: "Ecommerce",
    tags: ["Ecommerce", "Shopify", "Moda"],
    summary:
      "Una tienda en Shopify para 9PM, una marca italiana de ropa para mujer fundada en 2009 y nombrada por la hora en que el día pasa de lo formal a lo informal. El diseño tira a lo editorial: imágenes de campaña a sangre entre los carruseles de colección, una estructura por cápsulas (New In, Main SS26, Travel, Archive) y wishlist y multimoneda integrados. Sigue siendo un demo: el catálogo es de relleno y no se procesan pedidos reales.",
    role: "Diseño y desarrollo",
    status: "Demo — privado",
  },
  naveo: {
    kind: "App web y móvil",
    tags: ["Web", "Mobile", "Fundador"],
    summary:
      "Orquestación de pedidos para tiendas de retail: asignar, rastrear y controlar entregas sin perder el hilo. Lo lidero como CEO y cofundador, y construí el producto de punta a punta: base de datos y políticas de seguridad, auth, notificaciones push, actualizaciones en tiempo real, la app web, la app en Flutter y la landing. Cuatro semanas de cero a un primer hito funcional de asignación manual.",
    role: "CEO y cofundador · diseño y desarrollo",
    status: "Beta cerrada",
  },
  "pura-banda": {
    kind: "App de radio y votación masiva",
    tags: ["Mobile", "Web", "Líder de UI/UX"],
    summary:
      "La app de una estación de radio: streaming en vivo, una plataforma de promoción para sus bandas destacadas y, detrás, una app web y un panel de administración que controlan lo que muestra la app. La mecánica de votar por tu banda favorita juntó alrededor de 117,000 votos. Lideré UI/UX y trabajé en la app web, la app móvil y el producto en general con mi equipo en Uanify.",
    role: "Líder de UI/UX · front-end",
    status: "Publicada en Google Play",
  },
  adgen: {
    kind: "Creador de anuncios",
    tags: ["Web", "Herramienta interna", "En solitario"],
    summary:
      "Una plataforma interna en Zeeto para producir creativos de anuncios a escala: lotes grandes de variantes controladas por parámetros UTM, dibujadas en un canvas de Konva.js y exportadas como HTML5 o PNG. Las exportaciones salían hasta 70% más ligeras. La construí completa yo solo, a partir de un hueco real que tenía el equipo de diseño.",
    role: "Único desarrollador",
    status: "Alpha interna",
  },
  "don-cheto-app": {
    kind: "App de radio nativa para iOS y Android",
    tags: ["iOS", "Android", "Swift"],
    summary:
      "Una app de streaming para Don Cheto, una personalidad de la radio de Los Ángeles, que lleva su estación a México detrás de una restricción geográfica basada en VPN y se monetiza con un anuncio de AdMob al reproducir. Empezamos en React Native y nos pasamos a iOS y Android completamente nativos, porque de otra forma el audio en segundo plano no aguantaba. Fui responsable del UI/UX y escribí la app de iOS en Swift.",
    role: "UI/UX · desarrollador iOS",
    status: "Publicada — App Store y Google Play",
  },
  cvlens: {
    kind: "Revisor de CVs con IA",
    tags: ["Web", "IA", "Experimento"],
    summary:
      "Una app que lee y compara currículums a escala, hecha para reclutadores que se estaban ahogando en ellos. La primera versión salió en un par de días, después de probar varios modelos en OpenRouter y quedarme con Gemini Flash. La compartí en LinkedIn, tuvo muy buena respuesta de la comunidad de RR. HH. y decidí no mantenerla a largo plazo.",
    role: "Proyecto en solitario",
    status: "Archivado",
  },
  crieg: {
    kind: "Ecommerce y landing",
    tags: ["Web", "Ecommerce", "Pagos"],
    summary:
      "Una tienda para una asociación de radiología que vende y personaliza certificaciones, y que reemplazó un proceso que llevaban a mano. La facturación corre por la API de Alegra para las compras de usuarios finales, con el back office en HubSpot para coincidir con el stack que el cliente ya tenía. Lo empecé con un colega y lo lideré durante varios meses.",
    role: "Líder de proyecto · front-end",
    status: "En línea",
  },
  "shopfloor-management": {
    kind: "Industrial / manufactura",
    tags: ["Web", "Ganador de hackathon"],
    summary:
      "Una app web para la planta de Volkswagen en Silao: sacar a la luz los problemas de producción, reportarlos por línea y por motor, y tomar la decisión diaria en el piso de la fábrica con datos en lugar de memoria. Hecha para un hackathon patrocinado por Volkswagen en Guanajuato, que ganamos. Mi primer producto a gran escala, y el que me obligó a aprender discovery, requerimientos y pitch.",
    role: "Diseño de producto · front-end",
    status: "Ganador de hackathon — no comercializado",
  },
  "kiosko-movil-gto": {
    kind: "Plataforma con IA",
    tags: ["Mobile", "IA", "Gobierno"],
    summary:
      "Trámites administrativos completados desde un teléfono en lugar de una ventanilla, con la API de OpenAI acelerando los pasos más lentos. Dirigido a dependencias de gobierno y organizaciones privadas que buscan modernizar el papeleo. Un equipo de tres personas, donde lidero UI/UX mientras me enfoco en el front-end. Nuestro primer proyecto premiado a nivel estatal.",
    role: "Líder de UI/UX · front-end",
    status: "En desarrollo",
  },
  midbar: {
    kind: "App de gimnasio y fitness",
    tags: ["Mobile", "Flutter", "En solitario"],
    summary:
      "Una app de entrenamiento para armar programas personalizados y registrar actividad, hecha para un cliente que también es desarrollador. Mi primer proyecto mediano para un cliente en solitario: me hice cargo del diseño de producto y construí todo el front-end.",
    role: "Diseño de producto · front-end",
    status: "Entregado",
  },
};
