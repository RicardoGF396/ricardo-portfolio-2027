"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import {
  useFloating,
  useHover,
  useClientPoint,
  useInteractions,
  useTransitionStyles,
  FloatingPortal,
  offset,
  shift,
} from "@floating-ui/react";
import type { Shot } from "@/lib/projectImages";

/* A clickable row in Selected Work, with a preview that follows the cursor.
 *
 * The positioning is Floating UI's job, not ours: `useClientPoint` tracks the
 * pointer, `shift` keeps the preview inside the viewport near the edges, and
 * `useHover` owns the open/close timing. `mouseOnly` turns the whole thing off
 * for touch, where there is no hover to speak of and the preview would only
 * flash on tap.
 *
 * The floating card is `pointer-events-none` so it can never sit between the
 * cursor and the row it belongs to. */
export default function ProjectRow({
  year,
  name,
  kind,
  slug,
  preview,
}: {
  year: string;
  name: string;
  kind: string;
  slug: string;
  preview?: Shot;
}) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "right-start",
    middleware: [offset(24), shift({ padding: 16 })],
  });

  const hover = useHover(context, {
    mouseOnly: true,
    delay: { open: 70, close: 0 },
  });
  const clientPoint = useClientPoint(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    clientPoint,
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: { open: 160, close: 110 },
    initial: { opacity: 0, transform: "scale(0.96)" },
  });

  return (
    <>
      <Link
        ref={refs.setReference}
        {...getReferenceProps()}
        href={`/projects/${slug}`}
        className="group -mx-3 grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 px-3 py-3 transition-colors hover:bg-blue-50"
      >
        <span className="text-sm text-muted">{year}</span>
        <span className="text-base font-medium text-black group-hover:text-blue-600">
          {name}
          <span className="ml-2 font-normal text-[#42413F] group-hover:text-blue-600">
            {kind}
          </span>
        </span>
        <IconArrowRight
          size={16}
          stroke={1.75}
          className="text-muted transition-all group-hover:translate-x-0.5 group-hover:text-blue-600"
        />
      </Link>

      {preview && isMounted && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="pointer-events-none z-50"
          >
            <div style={styles}>
              <Image
                src={preview.src}
                width={preview.width}
                height={preview.height}
                alt=""
                sizes="320px"
                quality={90}
                className="h-auto w-80 rounded-xl bg-tile shadow-2xl ring-1 ring-black/5"
              />
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
