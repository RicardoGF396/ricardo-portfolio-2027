"use client";

import { useRef, useState } from "react";
import { DistortionWave } from "distortion-waves";
import {
  GradientCard,
  SuccessMark,
  waveThemes,
  type WavePalette,
  type WaveTheme,
} from "./ui";
import { inter } from "@/app/fonts";
import Image from "next/image";

/* Design 3 — a money transfer review (the libraries.dev/waves example).
 * Clicking "Confirm" sends a vertical distortion wave up from the button,
 * carrying the review into a receipt. `theme` picks the look; both palettes
 * live in ./ui.
 *
 * Borders inside a wave are off by default (see `[data-distortion-wave]` in
 * globals.css): the wave pictures the DOM by diffing computed styles against
 * UA defaults, and Tailwind's `border: 0 solid` reset would otherwise paint
 * phantom borders in that picture and shift it against the live DOM. Real
 * borders opt back in with `border border-solid`, row separators with
 * `wave-divide-y`. `whitespace-nowrap` keeps lines intact in the picture,
 * where every box has its measured width pinned. */
export default function TransferCard({
  theme = "light",
}: {
  theme?: WaveTheme;
}) {
  const [done, setDone] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const t = waveThemes[theme];

  return (
    <GradientCard theme={theme}>
      <DistortionWave
        revealed={done}
        source={btn}
        type="vertical"
        palette="colorful"
        live={false}
        revealedContent={<ReceiptView theme={theme} />}
        overlay={
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
            <button
              ref={btn}
              onClick={() => setDone((d) => !d)}
              className={`pointer-events-auto w-full bg-[#0071e3] cursor-pointer rounded-full py-4 text-[15px] font-semibold transition-opacity hover:opacity-90 ${t.button}`}
            >
              {done ? "Done" : "Confirm"}
            </button>
          </div>
        }
        className="relative block w-full overflow-hidden rounded-[27px]"
      >
        <ReviewView t={t} />
      </DistortionWave>
    </GradientCard>
  );
}

function ReviewView({ t }: { t: WavePalette }) {
  return (
    <div
      className={`${inter.className} flex min-h-[500px] select-none flex-col items-center px-5 pt-8 pb-[92px] ${t.surface}`}
    >
      <div className="relative size-16 overflow-hidden rounded-full">
        <Image
          src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
          alt="avatar"
          fill
        />
      </div>
      <p className={`mt-3 whitespace-nowrap text-[15px] ${t.muted}`}>
        Sending to <span className={`font-semibold ${t.strong}`}>Maya Chen</span>
      </p>
      <p className="mt-1 whitespace-nowrap text-[34px] font-bold tracking-tight">
        $1,250.00
      </p>

      <div
        className={`wave-divide-y mt-6 w-full rounded-2xl border border-solid px-4 ${t.panel}`}
      >
        <Row t={t} label="From" value="Everyday ·· 4821" />
        <Row t={t} label="Arrives" value="In seconds" />
        <Row t={t} label="Fee" value="Free" />
        <Row t={t} label="Note" value="Studio rent" />
      </div>
    </div>
  );
}

function Row({
  t,
  label,
  value,
}: {
  t: WavePalette;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <span className={`whitespace-nowrap text-[14px] ${t.muted}`}>{label}</span>
      <span className={`whitespace-nowrap text-[14px] font-medium ${t.strong}`}>
        {value}
      </span>
    </div>
  );
}

function ReceiptView({ theme }: { theme: WaveTheme }) {
  const t = waveThemes[theme];
  return (
    <div
      className={`${inter.className} flex min-h-[500px] select-none flex-col items-center justify-center px-5 pb-[92px] text-center ${t.surface}`}
    >
      <SuccessMark theme={theme} />
      <p className="mt-5 whitespace-nowrap text-[22px] font-bold">Sent</p>
      <p className={`mt-1.5 whitespace-nowrap text-[15px] ${t.muted}`}>
        $1,250.00 to{" "}
        <span className={`font-semibold ${t.strong}`}>Maya Chen</span>
      </p>
      <p className={`mt-1 whitespace-nowrap text-[13px] ${t.faint}`}>
        Studio rent · Arrives in seconds
      </p>
    </div>
  );
}
