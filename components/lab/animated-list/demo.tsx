"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "./AnimatedList";

/* The docs demo's notification stack, re-written as a client's project feed.
 * Shorter than the original (h-[340px] instead of h-[500px]) so it sits inside
 * a tile, and the bottom fade is keyed to the tile colour rather than white. */

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let activity: Item[] = [
  {
    name: "Prototype approved",
    description: "Solaris board",
    time: "12m ago",
    icon: "✦",
    color: "#026edb",
  },
  {
    name: "Comment resolved",
    description: "Checkout flow",
    time: "28m ago",
    icon: "✓",
    color: "#00c9a7",
  },
  {
    name: "Tokens published",
    description: "Design system",
    time: "1h ago",
    icon: "◍",
    color: "#ffb800",
  },
  {
    name: "Handoff ready",
    description: "Analytics rhythm",
    time: "3h ago",
    icon: "→",
    color: "#ff3d71",
  },
];

activity = Array.from({ length: 5 }, () => activity).flat();

function Notification({ name, description, icon, color, time }: Item) {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-3",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-xl text-base text-white"
          style={{ backgroundColor: color }}
        >
          <span>{icon}</span>
        </div>
        <div className="flex min-w-0 flex-col">
          <figcaption className="flex flex-row items-center text-sm font-medium whitespace-pre text-[#1d1d1f]">
            <span className="truncate">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="truncate text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </figure>
  );
}

export default function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[340px] w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList>
        {activity.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-tile" />
    </div>
  );
}
