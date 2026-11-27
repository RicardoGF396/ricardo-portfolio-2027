import { Marquee } from "./Marquee";

/* Two rows of tool cards running opposite ways, following the docs demo's
 * split-the-list-in-half shape. The mask fades both ends so the loop never
 * shows a seam at the tile edge. */

const design = [
  { name: "Figma", note: "Variables + variants" },
  { name: "Framer", note: "Marketing sites" },
  { name: "Rive", note: "Interactive motion" },
  { name: "After Effects", note: "Hand-off reference" },
];

const build = [
  { name: "React", note: "Server components" },
  { name: "Tailwind", note: "Token-first CSS" },
  { name: "Motion", note: "Springs, not easings" },
  { name: "Storybook", note: "Component docs" },
];

function ToolCard({ name, note }: { name: string; note: string }) {
  return (
    <figure className="w-40 shrink-0 rounded-xl border border-line bg-card px-3 py-2.5">
      <figcaption className="truncate text-sm font-medium">{name}</figcaption>
      <p className="truncate text-xs text-muted-foreground">{note}</p>
    </figure>
  );
}

export default function MarqueeDemo() {
  return (
    <div className="w-full">
      <p className="px-5 pb-3 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
        Tools I reach for
      </p>

      <div className="flex flex-col gap-1 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <Marquee pauseOnHover className="[--duration:24s] [--gap:0.5rem]">
          {design.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:24s] [--gap:0.5rem]">
          {build.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
