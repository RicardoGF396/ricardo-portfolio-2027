"use client";

import { useRef } from "react";

/**
 * A synthetic, speech-like 0–1 level getter for driving <VoiceBeam level={…}>
 * without a microphone. Layered sines + jitter under a slow energy swell make
 * the beam breathe and dance like a real voice. `seed` offsets the phase so
 * several beams on the page move independently.
 *
 * The getter is stable (created once) and sampled per frame by VoiceBeam, so
 * it never triggers a re-render.
 */
export function useDemoLevel(seed = 0): () => number {
  const ref = useRef<(() => number) | null>(null);
  if (!ref.current) {
    ref.current = () => {
      const t = performance.now() / 1000 + seed * 3.7;
      const swell = 0.5 + 0.5 * Math.sin(t * 0.55); // slow overall energy
      const voice =
        0.42 +
        0.3 * Math.sin(t * 2.3) +
        0.18 * Math.sin(t * 5.1 + 1.3) +
        0.12 * Math.sin(t * 9.4 + 0.7);
      const jitter = (Math.sin(t * 31.7 + seed) * 0.5 + 0.5) * 0.12;
      const v = (voice * 0.7 + jitter) * (0.45 + 0.65 * swell);
      return Math.max(0, Math.min(1, v));
    };
  }
  return ref.current;
}
