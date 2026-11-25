import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import ProjectRow from "@/components/site/ProjectRow";
import { PROJECTS } from "@/lib/projects";
import { PROJECT_IMAGES } from "@/lib/projectImages";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work from 2024 to today: design systems, a native iOS app, government platforms, industrial software and ecommerce — designed and built.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageShell title="Projects">
      <h1 className="font-display text-4xl font-semibold tracking-tighter text-black">
        Selected work
      </h1>
      {/* The second sentence follows the input, not the screen size: the
       * preview in ProjectRow is `mouseOnly`, so a touch device of any width
       * never gets it and "hover" would be an instruction nobody can follow.
       * The hover line is the default; `(hover: none)` swaps in the tap one. */}
      <p className="mt-2 text-base text-[#42413F]">
        Products I designed, built, or both.{" "}
        <span className="[@media(hover:none)]:hidden">
          Hover a linked one to peek at it.
        </span>
        <span className="hidden [@media(hover:none)]:inline">
          Tap a linked one to open it.
        </span>
      </p>

      <ul className="mt-8">
        {PROJECTS.map(({ year, name, kind, slug }) => (
          <li key={`${year}-${name}`} className="border-b border-line">
            {slug ? (
              <ProjectRow
                year={year}
                name={name}
                kind={kind}
                slug={slug}
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
