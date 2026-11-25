import { SITE, SITE_URL } from "@/lib/site";
import { EXPERIENCE } from "@/lib/cv";

/* Structured data describing who this site is about.
 *
 * This is the part of SEO that actually matters for a portfolio. A hiring
 * manager searching a name gets a knowledge panel instead of ten blue links,
 * and `sameAs` is what ties the LinkedIn and GitHub profiles to this page as
 * one identity rather than three strangers.
 *
 * Rendered as a plain <script> rather than next/script: it has to be in the
 * server-rendered HTML, because crawlers read the first response and most do
 * not wait for client-side injection. */
export default function PersonSchema() {
  const current = EXPERIENCE[0];

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE.name,
    givenName: "Ricardo",
    familyName: "González Flores",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    jobTitle: SITE.jobTitle,
    description: SITE.description,
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
    "@id": `${SITE_URL}/#page`,
    url: SITE_URL,
    name: `${SITE.name} — ${SITE.jobTitle}`,
    description: SITE.description,
    inLanguage: "en",
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
