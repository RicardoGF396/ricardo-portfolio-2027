import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { Project } from "@/lib/projects";
import type { Shot } from "@/lib/projectImages";

/* The body of a project write-up, shared by two hosts: the full page at
 * /projects/<slug> and the modal that intercepts it from the list. Keeping one
 * component means the modal can never drift from the page it mirrors.
 *
 * Two props carry the hosts' disagreements. `stickyTop`: the page has to clear
 * PageShell's sticky header, the modal scrolls inside itself and starts at
 * zero. `shotClass`: the modal spans the whole screen, so without a cap the
 * shots would scale well past their source and go soft — it hands this column
 * a max width and centres it. Both default to the page's behaviour. */
export default function ProjectDetail({
  project,
  shots,
  stickyTop = "md:top-24",
  shotClass = "",
}: {
  project: Project;
  shots: Shot[];
  stickyTop?: string;
  shotClass?: string;
}) {
  const [lead, ...rest] = shots;

  return (
    /* The aside track is a variable so a host can tighten it without a prop:
       the modal sets --aside-w, the page takes the 18rem default. */
    <div className="grid items-start gap-10 md:grid-cols-[1fr_var(--aside-w,18rem)]">
      {/* Shots. The first is centred in the viewport so the page opens on the
       * hero image rather than its top edge; the rest stack underneath.
       * `priority` only on the lead — the others are below the fold. */}
      <div className={`order-2 flex flex-col gap-5 md:order-1 ${shotClass}`}>
        {shots.length === 0 && (
          <div className="grid h-64 place-items-center rounded-2xl bg-tile text-sm text-muted">
            No screenshots yet — drop them in public/work/{project.slug}/
          </div>
        )}

        {lead && (
          <div className="flex min-h-[65vh] items-center">
            <Image
              src={lead.src}
              width={lead.width}
              height={lead.height}
              /* Describes the thing, not its position in a list: image search
               * and screen readers both get something useful out of it. */
              alt={`${project.name} — ${project.kind}`}
              priority
              sizes="(max-width: 768px) 100vw, 700px"
              /* next/image compresses at 75 by default, which turns dense UI
               * screenshots to mush — small type and 1px borders are exactly
               * what that setting throws away. These are the work itself, so
               * they get near-lossless treatment. */
              quality={90}
              className="h-auto w-full rounded-2xl bg-tile"
            />
          </div>
        )}

        {rest.map((shot, i) => (
          <Image
            key={shot.src}
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={`${project.name} — screen ${i + 2} of ${shots.length}`}
            sizes="(max-width: 768px) 100vw, 700px"
            quality={90}
            className="h-auto w-full rounded-2xl bg-tile"
          />
        ))}
      </div>

      <aside
        className={`order-1 flex flex-col gap-5 md:order-2 md:sticky ${stickyTop}`}
      >
        {project.tags && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-control px-3 py-1 text-xs font-medium text-[#42413F]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tighter text-black">
            {project.name}
          </h1>
          <p className="mt-0.5 text-sm text-muted">{project.kind}</p>
        </div>

        {project.summary && (
          <p className="text-sm leading-relaxed text-[#42413F]">
            {project.summary}
          </p>
        )}

        <dl className="grid grid-cols-2 gap-2">
          <Tile label="Year" value={project.year} />
          {project.status && <Tile label="Status" value={project.status} />}
          {project.role && (
            <div className="col-span-2">
              <Tile label="Role" value={project.role} />
            </div>
          )}
        </dl>

        {/* "Ver" only renders when there is somewhere to go. A dead primary
         * button is worse than no button. */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#026edb] px-4 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#0263c5]"
          >
            Ver
            <IconArrowUpRight size={16} stroke={2} />
          </a>
        )}

        {project.stack && (
          <div>
            <p className="text-xs font-medium text-muted">Built with</p>
            <p className="mt-1 text-sm text-[#42413F]">
              {project.stack.join(" · ")}
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line px-3 py-2">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-sm font-medium text-black">{value}</dd>
    </div>
  );
}
