"use client";

import Strands from "./Strands";

export default function StrandsDemo() {
  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-[#05050a]">
      <Strands count={3} scale={0.8} glass={false} intensity={0.9} />
      <p className="pointer-events-none absolute left-4 top-4 text-xs font-medium text-white/70">
        Motion, in threads
      </p>
    </div>
  );
}
