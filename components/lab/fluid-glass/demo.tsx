"use client";

import FluidGlass from "./FluidGlass";

export default function FluidGlassDemo() {
  return (
    <div className="relative h-[260px] w-full overflow-hidden rounded-2xl bg-[#0b0b10]">
      <FluidGlass
        text="Look closer."
        textColor="#ffffff"
        fontSize={40}
        background="#0b0b10"
        shape="pill"
        size={150}
        interaction="follow"
        morphOnClick={false}
      />
    </div>
  );
}
