import type { ReactNode } from "react";
import { IconCheck } from "@tabler/icons-react";

export type WaveTheme = "light" | "dark";

/* The two looks of the distortion-wave cards. Light is the one in use; dark
 * (the libraries.dev/waves look) is kept here to switch back to — pass
 * `theme="dark"` to the cards and use `waveThemes.dark.stage` on their
 * container. Full class strings, so Tailwind sees every one of them. */
export const waveThemes = {
  light: {
    /** Background of the container the card sits in (the GridItem). */
    stage: "bg-tile",
    /** Gradient stops of the 1px ring around the card. */
    ring: "from-black/[0.08] via-black/[0.05] to-black/[0.03]",
    /** The card itself: both wave views use it. */
    surface: "bg-white text-[#1d1d1f]",
    strong: "text-[#1d1d1f]",
    muted: "text-[#86868b]",
    faint: "text-[#9a9aa0]",
    /** The inset table: border, row separators and fill. */
    panel: "border-[#e8e8ed] divide-[#e8e8ed] bg-[#F9F9F9]",
    /** Round icon holder and the icon inside it. */
    chip: "bg-[#f0f0f2]",
    chipIcon: "text-[#48484a]",
    button: "bg-[#1d1d1f] text-white",
  },
  dark: {
    stage: "bg-[#0c0c0e]",
    ring: "from-white/[0.10] via-white/[0.05] to-white/[0.02]",
    surface: "bg-[#1c1c1e] text-white",
    strong: "text-white",
    muted: "text-[#8e8e93]",
    faint: "text-[#6e6e73]",
    panel: "border-[#2e2e30] divide-[#2e2e30] bg-[#232325]",
    chip: "bg-[#2a2a2c]",
    chipIcon: "text-[#c7c7cc]",
    button: "bg-white text-[#1d1d1f]",
  },
} as const satisfies Record<WaveTheme, Record<string, string>>;

export type WavePalette = (typeof waveThemes)[WaveTheme];

/* Card with a subtle top-lit border (1px ring) and no drop shadow. The inner
 * content (the DistortionWave) is the opaque surface. */
export function GradientCard({
  children,
  theme,
}: {
  children: ReactNode;
  theme: WaveTheme;
}) {
  return (
    <div
      className={`rounded-[28px] bg-gradient-to-b p-px ${waveThemes[theme].ring}`}
    >
      {children}
    </div>
  );
}

/* Centered success check used by the revealed (post-wave) views. */
export function SuccessMark({ theme }: { theme: WaveTheme }) {
  const t = waveThemes[theme];
  return (
    <div
      className={`flex size-16 items-center justify-center rounded-full ${t.chip} ${t.strong}`}
    >
      <IconCheck size={32} stroke={2.2} />
    </div>
  );
}
