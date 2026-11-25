import type { Metadata } from "next";
import { IconMail, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import PageShell, { Section } from "@/components/site/PageShell";
import { PROFILE } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about UX/UI developer roles — remote or in León, Guanajuato. Two years of working remote for a US company.",
  alternates: { canonical: "/contact" },
};

const LINKS = [
  { label: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: IconMail },
  { label: "linkedin.com/in/ricardogf396", href: PROFILE.linkedin, icon: IconBrandLinkedin },
  { label: "github.com/RicardoGF396", href: PROFILE.github, icon: IconBrandGithub },
];

export default function ContactPage() {
  return (
    <PageShell title="Contact">
      <h1 className="font-display text-4xl font-semibold tracking-tighter text-black">
        Let&apos;s talk.
      </h1>
      <p className="mt-3 max-w-prose text-base leading-relaxed text-[#42413F]">
        If you need someone who can take a product from the Figma file to
        production — on web or on mobile — write to me. Tell me what
        you&apos;re building and what hurts about it right now; that&apos;s
        usually the fastest way to find out whether I&apos;m the right person.
      </p>

      <div className="mt-10">
        <Section label="Reach me">
          <ul className="flex flex-col gap-3">
            {LINKS.map(({ label, href, icon: Icon }) => (
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

        <Section label="Where">
          <p className="text-base text-[#42413F]">
            {PROFILE.location}. I worked remote for a US company for two years,
            so US hours are nothing new.
          </p>
        </Section>

        <Section label="Languages">
          <p className="text-base text-[#42413F]">
            Spanish (native) · English (B2)
          </p>
        </Section>
      </div>
    </PageShell>
  );
}
