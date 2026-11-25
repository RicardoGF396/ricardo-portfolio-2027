import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import ProjectRow from "@/components/site/ProjectRow";
import { getProjects } from "@/lib/projects";
import { PROJECT_IMAGES } from "@/lib/projectImages";
import { alternatesFor, hasLocale, localePath } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { langFrom } from "@/lib/locale";

export async function generateMetadata(
  props: PageProps<"/[lang]/projects">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).projects;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(lang, "/projects"),
  };
}

export default async function ProjectsPage(
  props: PageProps<"/[lang]/projects">,
) {
  const lang = await langFrom(props.params);
  const t = getDictionary(lang).projects;

  return (
    <PageShell lang={lang} title={t.title}>
      <h1 className="font-display text-4xl font-semibold tracking-tighter text-black">
        {t.heading}
      </h1>
      {/* The second sentence follows the input, not the screen size: the
       * preview in ProjectRow is `mouseOnly`, so a touch device of any width
       * never gets it and "hover" would be an instruction nobody can follow.
       * The hover line is the default; `(hover: none)` swaps in the tap one. */}
      <p className="mt-2 text-base text-[#42413F]">
        {t.lead}{" "}
        <span className="[@media(hover:none)]:hidden">{t.hintHover}</span>
        <span className="hidden [@media(hover:none)]:inline">{t.hintTap}</span>
      </p>

      <ul className="mt-8">
        {getProjects(lang).map(({ year, name, kind, slug }) => (
          <li key={`${year}-${name}`} className="border-b border-line">
            {slug ? (
              <ProjectRow
                year={year}
                name={name}
                kind={kind}
                href={localePath(lang, `/projects/${slug}`)}
                preview={PROJECT_IMAGES[slug]?.[0]}
              />
            ) : (
              /* No write-up yet, so the row is inert on purpose — no arrow and
               * no hover, nothing that looks clickable and isn't. */
              <div className="grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-3">
                <span className="text-sm text-muted">{year}</span>
                <span className="text-base font-medium text-black">
                  {name}
                  <span className="ml-2 font-normal text-[#42413F]">
                    {kind}
                  </span>
                </span>
                <span />
              </div>
            )}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
