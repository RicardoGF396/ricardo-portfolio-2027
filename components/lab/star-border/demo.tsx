"use client";

import StarBorder from "./StarBorder";

export default function StarBorderDemo() {
  return (
    <div className="flex w-[320px] max-w-full flex-col items-center gap-4 rounded-3xl bg-card px-6 py-8 text-center">
      <p className="text-[15px] leading-snug text-muted">
        Product designer who ships the interface too.
      </p>
      <StarBorder
        theme="light"
        color="#026edb"
        radius={999}
        duration={3.5}
        sparkle
        className="text-[15px]"
      >
        Start a project
      </StarBorder>
    </div>
  );
}
