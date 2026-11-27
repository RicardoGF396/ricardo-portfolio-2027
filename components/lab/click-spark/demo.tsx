"use client";

import ClickSpark from "./ClickSpark";

export default function ClickSparkDemo() {
  return (
    <ClickSpark sparkColor="#026edb" sparkCount={10} sparkRadius={36} sparkSize={12} className="w-full">
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-white p-6 text-center">
        <p className="text-sm text-neutral-500">Liked the case study?</p>
        <span className="rounded-full bg-[#026edb] px-6 py-3 text-sm font-medium text-white">
          Say thanks
        </span>
      </div>
    </ClickSpark>
  );
}
