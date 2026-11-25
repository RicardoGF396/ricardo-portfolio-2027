import type { ReactNode } from "react";

/* Small shared controls for the Voice cards — theme-aware via token utilities. */

export function Pill({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-control px-3 py-[7px] text-[13px] font-medium leading-none text-fg"
    >
      {children}
    </button>
  );
}

export function RoundButton({
  children,
  onClick,
  label,
  className = "size-10",
}: {
  children: ReactNode;
  onClick?: () => void;
  label?: string;
  /** Tailwind sizing (e.g. "size-10", "size-[34px]"). */
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-control text-fg ${className}`}
    >
      {children}
    </button>
  );
}
