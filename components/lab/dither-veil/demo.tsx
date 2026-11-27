"use client";

import DitherVeil from "./DitherVeil";

export default function DitherVeilDemo() {
  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-black">
      <DitherVeil
        src="/designs/analytics.png"
        fit="cover"
        pattern="bayer"
        pixelSize={3}
        inkColor="#0a0a0a"
        paperColor="#e9e5dc"
        /* The reveal was there but invisible: a 90px circle on a 305px tile,
         * showing a pale dashboard through a cream dither — almost no contrast
         * at either edge. A wider circle and a blue rim make the bubble read
         * as a bubble. */
        revealRadius={130}
        rim={0.7}
        rimColor="#026edb"
        wander
      />
      <p className="pointer-events-none absolute bottom-3 left-4 text-[11px] font-medium tracking-wide text-white/70">
        Move over it to reveal the screen
      </p>
    </div>
  );
}
