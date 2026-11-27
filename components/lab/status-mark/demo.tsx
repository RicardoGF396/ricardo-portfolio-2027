"use client";

import StatusMark, { type StatusMarkStatus } from "./StatusMark";

const STEPS: { label: string; status: StatusMarkStatus; note: string }[] = [
  { label: "Install", status: "done", note: "4.1s" },
  { label: "Lint", status: "done", note: "2.3s" },
  { label: "Build", status: "running", note: "now" },
  { label: "Preview", status: "pending", note: "" },
  { label: "E2E", status: "failed", note: "retry" },
  { label: "Notify", status: "cancelled", note: "" },
];

export default function StatusMarkDemo() {
  return (
    <div className="flex flex-col gap-3 p-5">
      <div>
        <div className="text-[13px] font-medium text-fg">Deploy #482</div>
        <div className="text-[12px] text-muted">Five states, one glyph.</div>
      </div>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {STEPS.map((s) => (
          <li key={s.label} className="flex items-center gap-3 text-fg">
            <StatusMark status={s.status} size={18} />
            <span className="flex-1 text-[13px]">{s.label}</span>
            <span className="text-[12px] text-muted">{s.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
