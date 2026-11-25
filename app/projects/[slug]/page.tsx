import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import ProjectDetail from "@/components/site/ProjectDetail";
import { PROJECTS, getProject } from "@/lib/projects";
import { PROJECT_IMAGES } from "@/lib/projectImages";
import { SITE_URL } from "@/lib/site";

/* The full page behind the modal: what a pasted link or a refresh renders.
 * Reached from inside the app, app/@modal/(.)projects/[slug] intercepts this
 * and shows the same body in a dialog instead. */
export function generateStaticParams() {
  return PROJECTS.filter((p) => p.slug).map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
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

  return {
    /* Just the name: the root template appends "— Ricardo González Flores",
     * and the kind would make a third clause nobody reads in a result. */
    title: project.name,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} — ${project.kind}`,
      description,
      url: `/projects/${slug}`,
      /* The project's own lead shot beats the generic card here: a link to a
       * case study should preview that case study. */
      images: lead
        ? [{ url: lead.src, width: lead.width, height: lead.height }]
        : undefined,
    },
  };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const shots = PROJECT_IMAGES[slug] ?? [];

  /* Two schemas. The breadcrumb is what makes Google print
   * "ricardogf.com › Projects › Tombstone" under the result instead of a raw
   * URL. The CreativeWork ties the piece back to the Person in the root
   * layout, so the work is attributed rather than floating. */
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${SITE_URL}/projects`,
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
      url: `${SITE_URL}/projects/${slug}`,
      dateCreated: project.year,
      creator: { "@id": `${SITE_URL}/#person` },
      keywords: project.stack?.join(", "),
      image: shots[0] ? `${SITE_URL}${shots[0].src}` : undefined,
    },
  ];

  return (
    <PageShell
      title={project.name}
      backHref="/projects"
      backLabel="Back to projects"
      wide
    >
      <script
        type="application/ld+json"
        // Built from our own content file, never user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProjectDetail project={project} shots={shots} />
    </PageShell>
  );
}
