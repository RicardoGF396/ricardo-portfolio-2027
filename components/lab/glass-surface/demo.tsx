"use client";

import GlassSurface from "./GlassSurface";

/* Glass only shows over detail, so the demo brings its own backdrop. */
export default function GlassSurfaceDemo() {
  return (
    <div
      className="relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-2xl"
      style={{
        backgroundImage:
          "url(/work/naveo/naveo-1.png), linear-gradient(135deg, #026edb, #ff7ab8 60%, #ffb347)",
        backgroundSize: "cover",
        backgroundPosition: "60% 50%",
      }}
    >
      <GlassSurface width={240} height={110} borderRadius={28} blur={10} brightness={60} opacity={0.9}>
        <div className="text-center text-white">
          <p className="text-[17px] font-semibold leading-tight">Naveo</p>
          <p className="mt-1 text-[12px] opacity-80">Delivery tracking, 2025</p>
        </div>
      </GlassSurface>
    </div>
  );
}
