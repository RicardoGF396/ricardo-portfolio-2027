import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { Section } from "@/components/site/PageShell";
import ProfileCard from "@/components/site/ProfileCard";
import { EXPERIENCE, SKILLS, EDUCATION } from "@/lib/cv";

export const metadata: Metadata = {
  /* Bare title: the root layout's template appends the name. */
  title: "About",
  description:
    "An engineer who speaks fluent design and a designer who ships production code — web, mobile and ecommerce, with five years on both sides of the handoff.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell title="About">
      <ProfileCard />

      <div className="mt-4 flex flex-col gap-5 text-base leading-relaxed text-[#42413F]">
        <p>
          It&apos;s rare to find an engineer who speaks fluent design — and
          rarer still to find a designer who ships production code. Doing both
          has been my biggest edge on every team I&apos;ve joined: nothing gets
          lost in the handoff, because there isn&apos;t one.
        </p>
        <p>
          I build for web and for mobile. React, Next.js and Angular on one
          side; Flutter, React Native and native iOS in Swift on the other —
          that last one shipped as a radio app on the App Store and Google Play,
          where background streaming forced us off React Native and onto native.
          In between: government platforms, industrial dashboards, design
          systems. Ecommerce is a thread of its own by now: storefronts I take
          from the Figma file all the way through the checkout code.
        </p>
        <p>
          I lead, too. Through 2026 I ran the design team at Cloudgenia across
          12 projects in a single year for the Government of Guanajuato, and we
          built a component library in Angular that every project after it was
          made of. Before that, two years at a US product company running A/B
          experiments — which is where I learned to argue for a design with
          numbers instead of taste.
        </p>
        {/* The range is the first thing a reader doubts: five years is not
          * long to cover design, web, mobile and ecommerce. Saying how it is
          * done, in detail, beats letting them assume the list is padded. */}
        <p>
          A word about the range, because five years is not long to cover this
          much ground and I would rather say plainly how I do it: AI is part of
          my process, at every stage. Prompting is the smallest part of that. I
          scaffold whole projects with it, then design the system and the
          process around what comes back — the architecture, the conventions,
          the review. What ships is mine, and so is its quality.
        </p>
        <p>
          Which is the part the model cannot do for you. It writes faster than
          I do, and it still can&apos;t tell you which of three layouts a
          person will actually understand; it will hand you something that runs
          and is wrong, confidently. Catching that is the job, and it is why
          well-crafted design matters more now than it did before, not less.
        </p>
      </div>

      <div className="mt-12">
        <Section label="Based in">
          <p className="text-base text-[#42413F]">
            León, Guanajuato, México. I&apos;ve worked remote for a US company
            for two years, so the timezone is a solved problem.
          </p>
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

        <Section label="Experience">
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
            href="/resume"
            className="mt-5 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            See the full resume →
          </Link>
        </Section>

        <Section label="Education">
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
