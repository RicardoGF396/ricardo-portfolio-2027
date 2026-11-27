"use client";

import { FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedList } from "../animated-list/AnimatedList";
import { Marquee } from "../marquee/Marquee";
import { BentoCard, BentoGrid } from "./BentoGrid";

/* The docs demo, narrowed to one column: its first two cards — the marquee of
 * files and the stack of notifications — keep their icons, masks, shadows and
 * hover CTA. The docs' other two need magicui's animated-beam and shadcn's
 * calendar, neither of which this project has.
 *
 * What a 320px tile forces: one column, 11.5rem rows instead of 22rem, and
 * backgrounds scaled to the band above the title — the icon is handed down to
 * size-8 and each mask fades earlier, or the background would sit on top of
 * the copy rather than behind it. */

const files = [
  { name: "solaris-board.fig", body: "Board, filters, empty state" },
  { name: "tokens.json", body: "Straight into Tailwind" },
  { name: "checkout.pdf", body: "Eleven screens, annotated" },
  { name: "motion.riv", body: "Springs you can scrub" },
];

const updates = [
  { name: "Case study published", meta: "Solaris board", color: "#026edb" },
  { name: "Design review booked", meta: "Thursday, 10:00", color: "#00c9a7" },
  { name: "Tokens v2 shipped", meta: "42 components", color: "#ffb800" },
];

/* The card hardcodes h-12 w-12 on its icon; cn keeps its transition classes
 * and only the size loses. */
function sized(Icon: React.ElementType, size: string) {
  function SizedIcon({ className }: { className?: string }) {
    return <Icon className={cn(className, size)} />;
  }
  return SizedIcon;
}

const features = [
  {
    Icon: sized(FileTextIcon, "size-8"),
    name: "Every file, versioned",
    description: "Sources travel with the work.",
    href: "#",
    cta: "See the archive",
    className: "col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-1 [mask-image:linear-gradient(to_top,transparent_45%,#000_100%)] [--duration:20s] [--gap:0.5rem]"
      >
        {files.map((f) => (
          <figure
            key={f.name}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-lg border px-2.5 py-2",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <figcaption className="truncate text-xs font-medium">
              {f.name}
            </figcaption>
            <blockquote className="truncate text-[11px] text-gray-500">
              {f.body}
            </blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: sized(BellIcon, "size-8"),
    name: "Shipping log",
    description: "Know the moment it lands.",
    href: "#",
    cta: "Subscribe",
    className: "col-span-1",
    background: (
      <AnimatedList
        delay={1800}
        className="absolute top-1 right-2 w-full origin-top scale-90 gap-1.5 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-100"
      >
        {updates.map((u) => (
          <figure
            key={u.name}
            className="mx-auto flex w-full flex-row items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]"
          >
            <div
              className="size-6 shrink-0 rounded-lg"
              style={{ backgroundColor: u.color }}
            />
            <div className="flex min-w-0 flex-col">
              <figcaption className="truncate text-xs font-medium text-[#1d1d1f]">
                {u.name}
              </figcaption>
              <p className="truncate text-[11px] text-gray-500">{u.meta}</p>
            </div>
          </figure>
        ))}
      </AnimatedList>
    ),
  },
];

export default function BentoGridDemo() {
  return (
    <BentoGrid className="grid-cols-1 auto-rows-[11.5rem] gap-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
