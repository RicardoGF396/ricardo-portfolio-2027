import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { Section } from "@/components/site/PageShell";
import ProfileCard from "@/components/site/ProfileCard";
import { getCV } from "@/lib/cv";
import { alternatesFor, hasLocale, localePath } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { langFrom } from "@/lib/locale";

export async function generateMetadata(
  props: PageProps<"/[lang]/about">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).about;
  return {
    /* Bare title: the root layout's template appends the name. */
    title: t.title,
    description: t.description,
    alternates: alternatesFor(lang, "/about"),
  };
}

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const lang = await langFrom(props.params);
  const t = getDictionary(lang).about;
  const { EXPERIENCE, SKILLS, EDUCATION } = getCV(lang);

  return (
    <PageShell lang={lang} title={t.title}>
      <ProfileCard lang={lang} />

      {/* The paragraphs live in the dictionaries, one string each, in the
       * order they read. Their reasoning is commented there. */}
      <div className="mt-4 flex flex-col gap-5 text-base leading-relaxed text-[#42413F]">
        {t.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12">
        <Section label={t.basedIn}>
          <p className="text-base text-[#42413F]">{t.basedInBody}</p>
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

        <Section label={t.experience}>
          <ul className="flex flex-col gap-4">
            {EXPERIENCE.map(({ company, title, period }) => (
              <li key={company} className="flex flex-col">
                <span className="text-base font-medium text-black">
                  {company}
                </span>
                <span className="text-base text-[#42413F]">{title}</span>
                <span className="text-sm text-muted">{period}</span>
              </li>
            ))}
          </ul>
          <Link
            href={localePath(lang, "/resume")}
            className="mt-5 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            {t.seeResume}
          </Link>
        </Section>

        <Section label={t.education}>
          <p className="text-base font-medium text-black">
            {EDUCATION.school}
          </p>
          <p className="text-base text-[#42413F]">{EDUCATION.degree}</p>
          <p className="mt-1 text-sm text-muted">{EDUCATION.note}</p>
        </Section>
      </div>
    </PageShell>
  );
}
