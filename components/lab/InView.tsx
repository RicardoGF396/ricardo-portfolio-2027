"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Mounts its children only while they are near the viewport.
 *
 * The lab grid now holds a dozen demos that each run their own rAF loop — a
 * WebGL canvas, a particle field, a looping marquee. Mounted all at once they
 * are a fan on a laptop and a dead battery on a phone, and all but the two or
 * three on screen are animating where nobody can see them. This renders a
 * placeholder of the same height instead and swaps the real thing in when the
 * tile comes close, then drops it again once it is well past.
 *
 * It also keeps those demos out of the server render: on the server the state
 * is always false, so a canvas component never runs through SSR, where there
 * is no WebGL context and no `window` to measure.
 *
 * Unmounting means an animation restarts when you scroll back. For looping
 * ambience that is invisible; for a demo that holds state worth keeping, pass
 * `once` and it stays mounted after the first sighting. */
export default function InView({
  children,
  minHeight,
  className = "",
  once = false,
  /* How far outside the viewport counts as "near". Generous on purpose: the
   * tile should be live by the time it scrolls into sight, not start up in
   * front of the reader. */
  margin = "400px",
}: {
  children: ReactNode;
  /* The placeholder's height, in CSS pixels. Give it the demo's real height
   * so the masonry column does not jump as tiles mount. */
  minHeight: number;
  className?: string;
  once?: boolean;
  margin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* No IntersectionObserver (or a browser that lies about it): mount and
     * let it run, rather than showing an empty box forever. On a timeout and
     * not inline, so this is never a setState during the effect itself. */
    if (typeof IntersectionObserver === "undefined") {
      const id = setTimeout(() => setLive(true), 0);
      return () => clearTimeout(id);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          if (once) io.disconnect();
        } else if (!once) {
          setLive(false);
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight: live ? undefined : minHeight }}
    >
      {live ? children : null}
    </div>
  );
}
