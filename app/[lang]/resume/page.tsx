import type { Metadata } from "next";
import { IconDownload } from "@tabler/icons-react";
import PageShell, { Section } from "@/components/site/PageShell";
import { CV } from "@/lib/site";
import { getCV } from "@/lib/cv";
import { LOCALES, alternatesFor, hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { langFrom } from "@/lib/locale";

export async function generateMetadata(
  props: PageProps<"/[lang]/resume">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).resume;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(lang, "/resume"),
  };
}

export default async function ResumePage(props: PageProps<"/[lang]/resume">) {
  const lang = await langFrom(props.params);
  const t = getDictionary(lang).resume;
  const { PROFILE, EXPERIENCE, SKILLS, EDUCATION } = getCV(lang);
  /* The PDF in the page's language is the primary button; the other language
   * sits next to it as the secondary one. */
  const other = LOCALES.find((l) => l !== lang)!;

  return (
    <PageShell lang={lang} title={t.title}>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tighter text-black">
            {PROFILE.name}
          </h1>
          <p className="mt-1 text-lg text-[#42413F]">{PROFILE.title}</p>
          <p className="text-base text-muted">{PROFILE.tagline}</p>
        </div>
        {/* Both languages, because half the roles this page is sent to are in
         * México and half are in the US. `download` makes it save rather than
         * open in the browser's PDF viewer, which is what someone collecting
         * CVs actually wants. */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={CV[lang].href}
            download
            className="flex items-center gap-2 rounded-lg bg-[#026edb] px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#0263c5]"
          >
            <IconDownload size={16} />
            PDF · {CV[lang].label}
          </a>
          <a
            href={CV[other].href}
            download
            /* The label is in the other language, so say so to a screen
             * reader — same reason as the sidebar's language row. */
            lang={other}
            className="flex items-center gap-2 rounded-lg bg-control px-4 py-2 text-sm font-medium text-[#42413F] transition-colors hover:bg-blue-50 hover:text-blue-600"
          >
            <IconDownload size={16} />
            {CV[other].label}
          </a>
        </div>
      </header>

      {/* Contact row. The phone number is deliberately not here — it is on the
       * PDF, which someone has to ask for. */}
      <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted">
        <span>{PROFILE.location}</span>
        <span aria-hidden>·</span>
        <a className="hover:text-blue-600" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        <span aria-hidden>·</span>
        <a className="hover:text-blue-600" href={PROFILE.linkedin}>
          LinkedIn
        </a>
        <span aria-hidden>·</span>
        <a className="hover:text-blue-600" href={PROFILE.github}>
          GitHub
        </a>
      </p>

      <div className="mt-10">
        <Section label={t.summary}>
          <p className="text-base leading-relaxed text-[#42413F]">
            {PROFILE.summary}
          </p>
        </Section>

        <Section label={t.experience}>
          <div className="flex flex-col gap-8">
            {EXPERIENCE.map(({ company, title, meta, period, bullets }) => (
              <article key={company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-base font-medium text-black">
                    {company}
                  </h3>
                  <span className="text-sm text-muted">{period}</span>
                </div>
                <p className="text-base text-[#42413F]">{title}</p>
                <p className="text-sm text-muted">{meta}</p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="relative pl-4 text-base leading-relaxed text-[#42413F] before:absolute before:left-0 before:text-muted before:content-['—']"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section label={t.skills}>
          <dl className="flex flex-col gap-4">
            {SKILLS.map(({ label, items }) => (
              <div key={label}>
                <dt className="text-sm font-medium text-black">{label}</dt>
                <dd className="mt-1 text-base text-[#42413F]">
                  {items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section label={t.education}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-base font-medium text-black">
              {EDUCATION.school}
            </h3>
            <span className="text-sm text-muted">{EDUCATION.location}</span>
          </div>
          <p className="text-base text-[#42413F]">{EDUCATION.degree}</p>
          <p className="mt-1 text-base text-[#42413F]">{EDUCATION.note}</p>
        </Section>
      </div>
    </PageShell>
  );
}
