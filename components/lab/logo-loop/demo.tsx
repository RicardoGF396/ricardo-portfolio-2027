"use client";

import LogoLoop, { type LogoItem } from "./LogoLoop";

const word = (name: string, weight = 600) => (
  <span
    className="text-[18px] tracking-tight text-fg"
    style={{ fontWeight: weight }}
  >
    {name}
  </span>
);

const LOGOS: LogoItem[] = [
  { node: word("Figma"), ariaLabel: "Figma" },
  { src: "/logos/google.svg", alt: "Google", height: 24, width: 24 },
  { node: word("Framer", 700), ariaLabel: "Framer" },
  { src: "/logos/meta.svg", alt: "Meta", height: 24, width: 24 },
  { node: word("Next.js", 500), ariaLabel: "Next.js" },
  { src: "/logos/microsoft.svg", alt: "Microsoft", height: 24, width: 24 },
  { node: word("Tailwind", 500), ariaLabel: "Tailwind CSS" },
  { src: "/icons/github.svg", alt: "GitHub", height: 24, width: 24 },
];

export default function LogoLoopDemo() {
  return (
    <div className="w-[320px] max-w-full rounded-3xl bg-card py-6">
      <p className="mb-4 px-5 text-[13px] text-muted">
        Tools and teams I have shipped with
      </p>
      <LogoLoop
        logos={LOGOS}
        speed={50}
        gap={36}
        logoHeight={24}
        fadeOutColor="#ffffff"
        ariaLabel="Tools and teams"
      />
    </div>
  );
}
