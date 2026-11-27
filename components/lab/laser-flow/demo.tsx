"use client";

import LaserFlow from "./LaserFlow";

export default function LaserFlowDemo() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-[#07060f]">
      <LaserFlow
        color="#7c6cff"
        intensity={1.2}
        beamWidth={1}
        flare={1}
        spread={1}
        dust={1}
        streaks={1}
        beamPosition={0.5}
        surfaceLevel={0.7}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <p className="text-sm font-semibold text-white">Design systems</p>
        <p className="text-xs text-white/60">One beam of light through the stack.</p>
      </div>
    </div>
  );
}
