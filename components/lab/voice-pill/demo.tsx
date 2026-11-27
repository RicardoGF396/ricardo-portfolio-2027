"use client";

import VoicePill from "./VoicePill";

export default function VoicePillDemo() {
  return (
    <div className="flex flex-col gap-4 p-5">
      <div>
        <div className="text-[13px] font-medium text-fg">Voice note</div>
        <div className="text-[12px] text-muted">
          Tap to record, tap again to stop. Hold and slide left to cancel.
        </div>
      </div>
      <div className="flex items-center gap-4">
        <VoicePill accentColor="#026edb" ariaLabel="Record a voice note" />
        <span className="text-[12px] text-muted">Tap me</span>
      </div>
      <div className="flex items-center gap-4 border-t border-line pt-3">
        <VoicePill shape="rounded" accentColor="#e5484d" ariaLabel="Record a reply" />
        <span className="text-[12px] text-muted">Rounded, red accent</span>
      </div>
    </div>
  );
}
