import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import ProjectDetail from "@/components/site/ProjectDetail";
import { PROJECTS, getProject } from "@/lib/projects";
import { PROJECT_IMAGES } from "@/lib/projectImages";
import { SITE_URL } from "@/lib/site";
import { LOCALES, alternatesFor, hasLocale, localePath } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { langFrom } from "@/lib/locale";

/* The full page behind the modal: what a pasted link or a refresh renders.
 * Reached from inside the app, app/[lang]/@modal/(.)projects/[slug]
 * intercepts this and shows the same body in a dialog instead.
 *
 * Every write-up is built once per language. Slugs are the same in both, so
 * the list is simply every slug under every locale. */
export function generateStaticParams() {
  const slugs = PROJECTS.filter((p) => p.slug).map((p) => p.slug!);
  return LOCALES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/projects/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) return {};
  const project = getProject(slug, lang);
  if (!project) return {};

  /* Summaries run long on purpose — they are read on the page. A snippet is
   * cut around 155 characters, so trim at a word boundary rather than letting
   * Google do it mid-word. */
  const description = project.summary
    ? project.summary.length > 155
      ? project.summary.slice(0, 152).replace(/[\s,.;:—-]+\S*$/, "") + "…"
      : project.summary
    : `${project.name} — ${project.kind}.`;

  const lead = PROJECT_IMAGES[slug]?.[0];
  const path = `/projects/${slug}`;

  return {
    /* Just the name: the root template appends "— Ricardo González Flores",
     * and the kind would make a third clause nobody reads in a result. */
    title: project.name,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: {
      type: "article",
      title: `${project.name} — ${project.kind}`,
      description,
      url: localePath(lang, path),
      /* The project's own lead shot beats the generic card here: a link to a
       * case study should preview that case study. */
      images: lead
        ? [{ url: lead.src, width: lead.width, height: lead.height }]
        : undefined,
    },
  };
}

export default async function ProjectPage(
  props: PageProps<"/[lang]/projects/[slug]">,
) {
  const lang = await langFrom(props.params);
  const { slug } = await props.params;
  const project = getProject(slug, lang);
  if (!project) notFound();

  const dict = getDictionary(lang);
  const shots = PROJECT_IMAGES[slug] ?? [];
  const base = `${SITE_URL}${localePath(lang)}`;

  /* Two schemas. The breadcrumb is what makes Google print
   * "ricardogf.com › Projects › Tombstone" under the result instead of a raw
   * URL. The CreativeWork ties the piece back to the Person in the root
   * layout, so the work is attributed rather than floating. */
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: dict.project.home, item: base },
        {
          "@type": "ListItem",
          position: 2,
          name: dict.projects.title,
          item: `${base}/projects`,
        },
        { "@type": "ListItem", position: 3, name: project.name },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      abstract: project.kind,
      description: project.summary,
      url: `${base}/projects/${slug}`,
      inLanguage: lang,
      dateCreated: project.year,
      creator: { "@id": `${SITE_URL}/#person` },
      keywords: project.stack?.join(", "),
      image: shots[0] ? `${SITE_URL}${shots[0].src}` : undefined,
    },
  ];

  return (
    <PageShell
      lang={lang}
      title={project.name}
      backHref="/projects"
      backLabel={dict.shell.backToProjects}
      wide
    >
      <script
        type="application/ld+json"
        // Built from our own content file, never user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProjectDetail lang={lang} project={project} shots={shots} />
    </PageShell>
  );
}
