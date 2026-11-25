/* One place for the facts the SEO layer repeats: metadata, JSON-LD, the
 * sitemap and robots all read from here, so the site can never describe
 * itself two different ways. */

/* Set NEXT_PUBLIC_SITE_URL on the deploy to whatever host this lands on.
 * Everything canonical — og:url, the sitemap, robots — is built from it, and
 * getting it wrong is the one SEO mistake that is expensive to undo, because
 * search engines will have indexed the wrong host by the time you notice. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ricardogf.com"
).replace(/\/$/, "");

export const SITE = {
  name: "Ricardo González Flores",
  shortName: "Ricardo GF",
  jobTitle: "UX/UI Developer",
  /* Under ~155 characters so Google shows it whole, and front-loaded with the
   * job title someone would actually search for. */
  description:
    "UX/UI developer who designs in Figma and ships the production code — React, Angular, Flutter and Swift. Web, mobile and ecommerce. León, México.",
  locale: "en_US",
  email: "ricardogf396@gmail.com",
  location: {
    city: "León",
    region: "Guanajuato",
    country: "MX",
  },
  /* sameAs tells search engines these profiles are the same person, which is
   * what lets a name query pull up the knowledge panel rather than guessing. */
  sameAs: [
    "https://www.linkedin.com/in/ricardogf396/",
    "https://github.com/RicardoGF396",
  ],
  /* Not meta keywords — those are dead. These feed the Person JSON-LD's
   * knowsAbout, which engines do read. */
  knowsAbout: [
    "UX/UI design",
    "Design systems",
    "Front-end development",
    "React",
    "Next.js",
    "Angular",
    "Flutter",
    "React Native",
    "Swift",
    "TypeScript",
    "Figma",
    "Accessibility",
    "A/B testing",
    "Ecommerce",
  ],
  alumniOf: "La Salle Bajío University",
};

/* The CV, served from public/ rather than a bucket: it ships and versions with
 * the site, so the file a visitor downloads is always the one this deploy was
 * built from. The filename is what lands in their Downloads folder, so it
 * carries the full name rather than "resume.pdf".
 *
 * Each is exported from its own Google Doc — replacing the file here is the
 * whole update. */
export const CV = {
  en: { href: "/Ricardo-Gonzalez-Flores-CV-EN.pdf", label: "English" },
  es: { href: "/Ricardo-Gonzalez-Flores-CV-ES.pdf", label: "Español" },
};
