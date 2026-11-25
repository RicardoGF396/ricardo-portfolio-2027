"use client";

import { useRef, useState } from "react";
import { DistortionWave } from "distortion-waves";
import { IconCheck, IconCoins } from "@tabler/icons-react";
import {
  GradientCard,
  SuccessMark,
  waveThemes,
  type WavePalette,
  type WaveTheme,
} from "./ui";
import { inter } from "@/app/fonts";

/* Design 4 — add credits. Clicking "Buy $20 tokens" sends a vertical
 * distortion wave up from the button, carrying the offer into a confirmation.
 * `theme` picks the look; both palettes live in ./ui.
 *
 * `border border-solid`, `wave-divide-y` and `whitespace-nowrap`: the why is
 * in TransferCard and globals.css (how the wave pictures the DOM). */
export default function AddCreditsCard({
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
        revealedContent={<ConfirmedView theme={theme} />}
        overlay={
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
            <button
              ref={btn}
              onClick={() => setDone((d) => !d)}
              className={`pointer-events-auto bg-[#0071e3] w-full cursor-pointer rounded-full py-4 text-[15px] font-semibold transition-opacity hover:opacity-90 ${t.button}`}
            >
              {done ? "Done" : "Buy $20 tokens"}
            </button>
          </div>
        }
        className="relative block w-full overflow-hidden rounded-[27px]"
      >
        <OfferView t={t} />
      </DistortionWave>
    </GradientCard>
  );
}

function OfferView({ t }: { t: WavePalette }) {
  return (
    <div
      className={`${inter.className} flex min-h-[440px] select-none flex-col items-center px-5 pt-8 pb-[92px] ${t.surface}`}
    >
      <div
        className={`flex size-12 items-center justify-center rounded-full ${t.chip} ${t.chipIcon}`}
      >
        <IconCoins size={22} stroke={1.8} />
      </div>
      <p className="mt-3 whitespace-nowrap text-[26px] font-bold tracking-tight">
        Add credits
      </p>
      <p className={`mt-0.5 whitespace-nowrap text-[14px] ${t.muted}`}>
        Current balance: $65.73
      </p>

      <div
        className={`wave-divide-y mt-6 w-full rounded-2xl border border-solid px-4 ${t.panel}`}
      >
        <CheckRow text="Balance goes to $85.73" />
        <CheckRow text="Use credits for document" />
        <CheckRow text="Credits never expire" />
      </div>
    </div>
  );
}

function CheckRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <IconCheck size={18} stroke={2.4} className="shrink-0" />
      <span className="whitespace-nowrap text-[14px]">{text}</span>
    </div>
  );
}

function ConfirmedView({ theme }: { theme: WaveTheme }) {
  const t = waveThemes[theme];
  return (
    <div
      className={`${inter.className} flex min-h-[440px] select-none flex-col items-center justify-center px-5 pb-[92px] text-center ${t.surface}`}
    >
      <SuccessMark theme={theme} />
      <p className="mt-5 whitespace-nowrap text-[22px] font-bold">Credits added</p>
      <p className={`mt-1.5 whitespace-nowrap text-[15px] ${t.muted}`}>
        New balance: <span className={`font-semibold ${t.strong}`}>$85.73</span>
      </p>
      <p className={`mt-1 whitespace-nowrap text-[13px] ${t.faint}`}>
        Credits never expire
      </p>
    </div>
  );
}
