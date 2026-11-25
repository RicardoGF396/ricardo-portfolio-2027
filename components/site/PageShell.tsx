import type { ReactNode } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

/* Wrapper for every page that is not the grid.
 *
 * The centre column is the only thing that swaps between routes (the sidebar
 * lives in the root layout), so the way back to the mini-project grid has to
 * live here. It is `sticky top-0` and sits above the content on z-20, with a
 * blurred background — without one, text scrolls visibly underneath it.
 *
 * `title` is the small label next to the button, not an <h1>; each page writes
 * its own heading so the document outline stays correct. */
export default function PageShell({
  title,
  backHref = "/",
  backLabel = "Back to the lab",
  wide = false,
  children,
}: {
  title: string;
  /* Where the sticky button goes. A project detail points back at the list it
   * was opened from, not at the grid — one step back, not all the way out. */
  backHref?: string;
  backLabel?: string;
  /* Reading pages want a narrow measure; a project detail needs the width for
   * its two columns. */
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    /* `page-shell` carries no styles of its own. It is the marker the sidebar
     * looks for with `:has()` to know an inner page is on screen and fold its
     * hero away on small screens — rename it and that stops working. */
    <div className="page-shell min-h-screen">
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-bg/80 px-6 py-3 backdrop-blur-md">
        <Link
          href={backHref}
          className="group flex items-center gap-2 rounded-lg bg-control px-3 py-1.5 text-sm font-medium text-[#42413F] transition-colors hover:bg-blue-50 hover:text-blue-600"
        >
          <IconArrowLeft
            size={16}
            stroke={1.75}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          {backLabel}
        </Link>
        <span className="text-sm text-muted">{title}</span>
      </div>

      <div
        className={`mx-auto px-6 py-12 ${wide ? "max-w-5xl" : "max-w-2xl"}`}
      >
        {children}
      </div>
    </div>
  );
}

/* A labelled block: the section name sits in a narrow left gutter and the
 * content fills the rest, so a page scans as a list of topics. Collapses to a
 * single column under `md` because the gutter stops being readable. */
export function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2 border-t border-line py-8 md:flex-row md:gap-6">
      <h2 className="w-28 shrink-0 text-sm font-medium text-muted">{label}</h2>
      <div className="flex-1">{children}</div>
    </section>
  );
}
