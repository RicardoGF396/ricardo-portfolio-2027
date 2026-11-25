import { notFound } from "next/navigation";
import Modal from "@/components/site/Modal";
import ProjectDetail from "@/components/site/ProjectDetail";
import { getProject } from "@/lib/projects";
import { PROJECT_IMAGES } from "@/lib/projectImages";
import { getDictionary } from "@/lib/dictionaries";
import { langFrom } from "@/lib/locale";

/* Intercepts /<lang>/projects/<slug> when it is reached from inside the app,
 * so the write-up opens over the list instead of replacing it. A hard load of
 * the same URL — a pasted link, a refresh — skips this and renders the full
 * page at app/[lang]/projects/[slug] instead. Same component either way. */
export default async function ProjectModal(
  props: PageProps<"/[lang]/projects/[slug]">,
) {
  const lang = await langFrom(props.params);
  const { slug } = await props.params;
  const project = getProject(slug, lang);
  if (!project) notFound();

  return (
    <Modal closeLabel={getDictionary(lang).shell.close}>
      <ProjectDetail
        lang={lang}
        project={project}
        shots={PROJECT_IMAGES[slug] ?? []}
        stickyTop="md:top-4"
        /* The sheet is as wide as the screen; the shots are not. Capped and
         * centred in their track, so they never scale past their source. */
        shotClass="mx-auto w-full max-w-[680px]"
      />
    </Modal>
  );
}
