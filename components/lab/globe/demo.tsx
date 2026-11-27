"use client";

import type { COBEOptions } from "cobe";

import { Globe } from "./Globe";

/* The docs demo without its 8xl wordmark, which has no room at 320px: a fixed
 * square box (Globe is absolutely positioned and sizes itself from its
 * container) plus a caption. Light-theme config — white land on a white sphere,
 * markers in the site blue — over the tile grey. */

const CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  /* cobe's own light-globe numbers rather than magicui's 0.4/1.2, which on a
   * #f5f5f7 tile left a white disc with no visible land. */
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [1, 1, 1],
  markerColor: [2 / 255, 110 / 255, 219 / 255],
  glowColor: [0.92, 0.92, 0.94],
  markers: [
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.4168, -3.7038], size: 0.08 },
    { location: [52.52, 13.405], size: 0.07 },
    { location: [40.7128, -74.006], size: 0.09 },
    { location: [51.5072, -0.1276], size: 0.07 },
    { location: [-23.5505, -46.6333], size: 0.06 },
    { location: [35.6762, 139.6503], size: 0.05 },
  ],
};

export default function GlobeDemo() {
  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-square w-[272px]">
        <Globe config={CONFIG} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.18),rgba(255,255,255,0))]" />
      </div>

      <p className="pt-2 text-center text-xs text-muted-foreground">
        Seven cities, one Figma file. Drag it.
      </p>
    </div>
  );
}
