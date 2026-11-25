import type { Metadata } from "next";
import { IconDownload } from "@tabler/icons-react";
import PageShell, { Section } from "@/components/site/PageShell";
import { RESUME_PDF } from "@/components/site/Sidebar";
import { PROFILE, EXPERIENCE, SKILLS, EDUCATION } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Five years of UX/UI development: design lead at Cloudgenia, A/B testing at Zeeto in the US, enterprise front-end at CBQA. Full experience, skills and education.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <PageShell title="Resume">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tighter text-black">
            {PROFILE.name}
          </h1>
          <p className="mt-1 text-lg text-[#42413F]">{PROFILE.title}</p>
          <p className="text-base text-muted">{PROFILE.tagline}</p>
        </div>
        <a
          href={RESUME_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-[#026edb] px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#0263c5]"
        >
          <IconDownload size={16} />
          Download PDF
        </a>
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
        <Section label="Summary">
          <p className="text-base leading-relaxed text-[#42413F]">
            {PROFILE.summary}
          </p>
        </Section>

        <Section label="Experience">
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

        <Section label="Skills">
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

        <Section label="Education">
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
