"use client";

import PixelCard from "./PixelCard";

export default function PixelCardDemo() {
  return (
    <PixelCard
      variant="blue"
      theme="light"
      className="!h-[220px] !w-full max-w-[300px]"
    >
      <div className="px-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">Now booking</p>
        <p className="mt-2 text-xl font-semibold text-neutral-900">Design systems for product teams</p>
      </div>
    </PixelCard>
  );
}
