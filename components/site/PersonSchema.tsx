import { SITE, SITE_URL } from "@/lib/site";
import { getCV } from "@/lib/cv";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

/* Structured data describing who this site is about.
 *
 * This is the part of SEO that actually matters for a portfolio. A hiring
 * manager searching a name gets a knowledge panel instead of ten blue links,
 * and `sameAs` is what ties the LinkedIn and GitHub profiles to this page as
 * one identity rather than three strangers.
 *
 * Rendered as a plain <script> rather than next/script: it has to be in the
 * server-rendered HTML, because crawlers read the first response and most do
 * not wait for client-side injection.
 *
 * The Person keeps one `@id` across both languages — it is the same person —
 * while the ProfilePage gets one per language, each declaring `inLanguage`.
 * That is what lets an engine treat /en and /es as two views of one entity
 * rather than two people with the same name. */
export default function PersonSchema({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const current = getCV(lang).EXPERIENCE[0];
  const pageUrl = `${SITE_URL}${localePath(lang)}`;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE.name,
    givenName: "Ricardo",
    familyName: "González Flores",
    url: pageUrl,
    image: `${SITE_URL}/opengraph-image.png`,
    jobTitle: dict.site.jobTitle,
    description: dict.site.description,
    email: `mailto:${SITE.email}`,
    sameAs: SITE.sameAs,
    knowsAbout: SITE.knowsAbout,
    knowsLanguage: ["es-MX", "en"],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.city,
      addressRegion: SITE.location.region,
      addressCountry: SITE.location.country,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: SITE.alumniOf,
    },
    worksFor: {
      "@type": "Organization",
      name: current.company,
    },
  };

  const page = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: `${SITE.name} — ${dict.site.jobTitle}`,
    description: dict.site.description,
    inLanguage: lang,
    mainEntity: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from our own constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify([person, page]) }}
    />
  );
}
