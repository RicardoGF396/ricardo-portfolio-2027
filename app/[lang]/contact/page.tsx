import type { Metadata } from "next";
import { IconMail, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import PageShell, { Section } from "@/components/site/PageShell";
import { getCV } from "@/lib/cv";
import { alternatesFor, hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { langFrom } from "@/lib/locale";

export async function generateMetadata(
  props: PageProps<"/[lang]/contact">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).contact;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(lang, "/contact"),
  };
}

export default async function ContactPage(
  props: PageProps<"/[lang]/contact">,
) {
  const lang = await langFrom(props.params);
  const t = getDictionary(lang).contact;
  const { PROFILE } = getCV(lang);

  const links = [
    { label: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: IconMail },
    { label: "linkedin.com/in/ricardogf396", href: PROFILE.linkedin, icon: IconBrandLinkedin },
    { label: "github.com/RicardoGF396", href: PROFILE.github, icon: IconBrandGithub },
  ];

  return (
    <PageShell lang={lang} title={t.title}>
      <h1 className="font-display text-4xl font-semibold tracking-tighter text-black">
        {t.heading}
      </h1>
      <p className="mt-3 max-w-prose text-base leading-relaxed text-[#42413F]">
        {t.body}
      </p>

      <div className="mt-10">
        <Section label={t.reach}>
          <ul className="flex flex-col gap-3">
            {links.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-base text-[#42413F] transition-colors hover:text-blue-600"
                >
                  <Icon
                    size={18}
                    stroke={1.75}
                    className="text-gray-600 transition-colors group-hover:text-blue-600"
                  />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section label={t.where}>
          <p className="text-base text-[#42413F]">
            {PROFILE.location}. {t.whereBody}
          </p>
        </Section>

        <Section label={t.languages}>
          <p className="text-base text-[#42413F]">{t.languagesBody}</p>
        </Section>
      </div>
    </PageShell>
  );
}
