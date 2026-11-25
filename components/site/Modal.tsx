"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IconX } from "@tabler/icons-react";

/* A real <dialog> opened with showModal(), not a styled div.
 *
 * That choice buys three behaviours for free, correctly: Escape closes it, the
 * browser traps focus inside it, and it renders in the top layer so it covers
 * the sidebar without any z-index arithmetic. The blur lives on ::backdrop,
 * which is the element the browser paints behind a modal dialog.
 *
 * It fills the viewport rather than sitting in it as a card: the whole screen
 * is the scroll surface, so the wheel works wherever the pointer happens to
 * be. That rules out a background of its own — a full-bleed white rectangle is
 * just a page — so the dialog is transparent and the contrast comes from the
 * ::backdrop: a heavy frost that washes the page behind out to near-white,
 * which the write-up's dark type reads against.
 *
 * The UA stylesheet fights all of that: a <dialog> defaults to
 * `background: canvas`, `margin: auto` and a max-width/height of roughly the
 * viewport minus its own chrome, hence the explicit bg-transparent, m-0 and
 * max-*-none.
 *
 * Closing always goes through router.back() rather than local state, because
 * the modal only exists as an intercepted route: the URL is what put it on
 * screen, so the URL is what has to take it off. That also makes the browser's
 * own back button close it. Escape, the X and Back are the three ways out:
 * click-outside went away with the card, since the sheet is now the whole
 * screen and there is no outside left to click. */
export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && !el.open) el.showModal();
  }, []);

  function close() {
    router.back();
  }

  return (
    <dialog
      ref={ref}
      /* Escape fires `cancel`. Prevent the browser's own close so the route
       * drives the unmount and the two never disagree. */
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      /* The three token overrides are the contrast half of "no background":
       * ProjectDetail is shared with the full page, so instead of restyling it
       * the modal redefines the tokens it reads. Hairlines and muted type that
       * work on a solid white card disappear on frosted glass. */
      className="m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-white/75 backdrop:backdrop-blur-2xl [--aside-w:14rem] [--color-control:rgba(0,0,0,0.08)] [--color-line:rgba(0,0,0,0.16)] [--color-muted:#5f6063]"
    >
      {/* The scroll surface is the full sheet, so the wheel answers wherever
       * the pointer is. The close button rides it rather than the content, so
       * it pins to the screen's corner. */}
      <div className="h-full overflow-y-auto overscroll-contain">
        {/* Zero-height sticky rail: the button stays put without taking a row
         * of layout from the content under it. */}
        <div className="sticky top-0 z-30 h-0">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            /* Content scrolls under this now that there is no card to sit on,
             * so it needs an edge of its own to stay legible. */
            className="absolute right-6 top-6 grid size-9 place-items-center rounded-full bg-white/80 text-[#42413F] ring-1 ring-black/10 backdrop-blur transition-colors hover:bg-blue-50 hover:text-blue-600 hover:ring-blue-200"
          >
            <IconX size={18} stroke={1.75} />
          </button>
        </div>

        <div className="mx-auto w-[min(1500px,92vw)] pb-16 pt-8">{children}</div>
      </div>
    </dialog>
  );
}
