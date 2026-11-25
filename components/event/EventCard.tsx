"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Person = { initials: string; name: string; bg: string; fg: string };

const PEOPLE: Person[] = [
  { initials: "MC", name: "Maya Chen", bg: "#D8E8F3", fg: "#222A54" },
  { initials: "LP", name: "Leo Park", bg: "#E7F9F3", fg: "#216E55" },
  { initials: "AR", name: "Ava Ruiz", bg: "#EBE6EF", fg: "#AB133E" },
  { initials: "NK", name: "Noah Kim", bg: "#F2FFD1", fg: "#526E0C" },
  { initials: "IH", name: "Iris Hale", bg: "#FDEFE2", fg: "#C56511" },
];

export default function EventCard() {
  const [open, setOpen] = useState(false);
  const [declined, setDeclined] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const declineLabelRef = useRef<HTMLSpanElement>(null);
  const joinLabelRef = useRef<HTMLSpanElement>(null);
  const morphTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busy = useRef(false);

  const ms = useCallback((name: string, fb = 0) => {
    const el = rootRef.current ?? document.documentElement;
    const v = parseFloat(getComputedStyle(el).getPropertyValue(name));
    return Number.isFinite(v) ? v : fb;
  }, []);

  const ease = useCallback((name: string, fb: string) => {
    const el = rootRef.current ?? document.documentElement;
    return getComputedStyle(el).getPropertyValue(name).trim() || fb;
  }, []);

  /* Avatar group hover: the hovered avatar lifts and scales, its neighbours
   * lift less the further they are (falloff ^ distance). */
  const setShifts = useCallback(
    (activeIdx: number | null, phase: "in" | "out") => {
      const group = groupRef.current;
      if (!group) return;
      const avatars = Array.from(group.querySelectorAll<HTMLElement>(".t-avatar"));
      const lift = ms("--avatar-lift", -4);
      const falloff = ms("--avatar-falloff", 0.45);
      const scale = ms("--avatar-scale", 1.05);
      const tf =
        phase === "out"
          ? ease("--avatar-ease-out", "cubic-bezier(0.34, 3.85, 0.64, 1)")
          : ease("--avatar-ease-in", "cubic-bezier(0.22, 1, 0.36, 1)");
      avatars.forEach((el, i) => {
        el.style.transitionTimingFunction = tf;
        if (activeIdx == null) {
          el.style.setProperty("--shift", "0px");
          el.style.setProperty("--scale-active", "1");
          return;
        }
        const d = Math.abs(i - activeIdx);
        el.style.setProperty("--shift", `${(lift * Math.pow(falloff, d)).toFixed(3)}px`);
        el.style.setProperty("--scale-active", i === activeIdx ? String(scale) : "1");
      });
    },
    [ms, ease],
  );

  /* Text morph: only the letters that differ fade/blur out and in, and the
   * swap box animates its width between the two. */
  const morphText = useCallback(
    (el: HTMLElement | null, next: string) => {
      if (!el) return;
      const prev = el.dataset.text ?? el.textContent ?? "";
      if (prev === next) return;
      el.dataset.text = next;
      if (morphTimer.current) clearTimeout(morphTimer.current);

      let a = 0;
      while (a < prev.length && a < next.length && prev[a] === next[a]) a++;
      let b = 0;
      while (
        b < prev.length - a &&
        b < next.length - a &&
        prev[prev.length - 1 - b] === next[next.length - 1 - b]
      )
        b++;

      const swap = document.createElement("span");
      swap.className = "t-morph-swap";
      const out = document.createElement("span");
      out.className = "t-morph-old";
      out.setAttribute("aria-hidden", "true");
      out.textContent = prev.slice(a, prev.length - b);
      const inn = document.createElement("span");
      inn.className = "t-morph-new";
      inn.textContent = next.slice(a, next.length - b);
      swap.append(out, inn);
      el.textContent = "";
      el.append(next.slice(0, a), swap, next.slice(next.length - b));
      swap.style.width = `${out.getBoundingClientRect().width}px`;
      void swap.offsetWidth;
      swap.classList.add("is-morphing");
      swap.style.width = `${inn.getBoundingClientRect().width}px`;

      morphTimer.current = setTimeout(
        () => {
          el.textContent = next;
        },
        Math.max(ms("--text-morph-dur", 180), ms("--text-morph-resize-dur", 240)) + 40,
      );
    },
    [ms],
  );

  // Text states swap (Join call → Connecting… → Join call)
  const swapText = useCallback(
    (el: HTMLElement | null, next: string) => {
      if (!el) return;
      const dur = ms("--text-swap-dur", 150);
      el.classList.add("is-exit");
      setTimeout(() => {
        el.textContent = next;
        el.classList.remove("is-exit");
        el.classList.add("is-enter-start");
        void el.offsetHeight;
        el.classList.remove("is-enter-start");
      }, dur);
    },
    [ms],
  );

  const onJoin = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    swapText(joinLabelRef.current, "Connecting…");
    setTimeout(() => {
      swapText(joinLabelRef.current, "Join call");
      setTimeout(() => {
        busy.current = false;
      }, ms("--text-swap-dur", 150));
    }, 1800);
  }, [swapText, ms]);

  const onDecline = useCallback(() => {
    setDeclined((prev) => {
      const next = !prev;
      morphText(declineLabelRef.current, next ? "Declined" : "Decline");
      return next;
    });
  }, [morphText]);

  useEffect(
    () => () => {
      if (morphTimer.current) clearTimeout(morphTimer.current);
    },
    [],
  );

  // Touch press: a tap holds .is-pressed for at least --press-dur, scoped to
  // this card so the press shows in full.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const SEL = "button,[role='button'],summary,.t-pressable";
    const min = ms("--press-dur", 150);
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(SEL);
      if (!el || (el as HTMLButtonElement).disabled) return;
      const t0 = performance.now();
      el.classList.add("is-pressed");
      const up = () => {
        document.removeEventListener("pointerup", up, true);
        document.removeEventListener("pointercancel", up, true);
        setTimeout(
          () => el.classList.remove("is-pressed"),
          Math.max(0, min - (performance.now() - t0)),
        );
      };
      document.addEventListener("pointerup", up, true);
      document.addEventListener("pointercancel", up, true);
    };
    root.addEventListener("pointerdown", onDown, { passive: true });
    return () => root.removeEventListener("pointerdown", onDown);
  }, [ms]);

  return (
    <article
      className="ev w-[300px] overflow-hidden rounded-3xl bg-card text-fg shadow-[var(--card-shadow)]"
      ref={rootRef}
      aria-labelledby="ev-title"
    >
      <style dangerouslySetInnerHTML={{ __html: EVENT_CSS }} />

      <div className="relative h-[104px] overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 300 104"
          preserveAspectRatio="xMidYMid slice"
          className="block size-full opacity-50"
        >
          <rect width="300" height="104" fill="#e7e5de" />
          <path d="M0 0H96V46Q62 62 0 56Z" fill="#cde0c0" />
          <path d="M206 104Q224 72 300 64V104Z" fill="#b8d2e6" />
          <path d="M246 0H300V30Q272 36 246 22Z" fill="#cde0c0" />
          <g stroke="#ffffff" fill="none" strokeLinecap="round">
            <path d="M-10 20H310" strokeWidth="4" />
            <path d="M120 -10V114" strokeWidth="4" />
            <path d="M228 -10V114" strokeWidth="3" />
            <path d="M40 -10V114" strokeWidth="3" />
            <path d="M-10 64H310" strokeWidth="3" />
            <path d="M178 20V64" strokeWidth="2.5" />
            <path d="M80 64V114" strokeWidth="2.5" />
            <path d="M-10 92L310 34" strokeWidth="7" />
          </g>
          <path d="M-10 96L310 38" stroke="#f2cf78" strokeWidth="2" fill="none" />
        </svg>
        {/* The glow is a sibling painted BEFORE the pin, so it sits behind it.
            As a pseudo-element of the pin it would paint over the dot. */}
        <span className="ev-pin-glow" />
        <span className="ev-pin" />
      </div>

      <div className="relative px-6 pb-6">
        <div
          className="relative -mt-7 flex size-14 flex-col items-center justify-center rounded-xl bg-card shadow-[var(--material-shadow)]"
          aria-label="Thursday, March 14"
        >
          <span className="text-xs text-[var(--date-red)]">Thu</span>
          <span className="-mt-1 text-[28px] leading-[34px] tabular-nums">14</span>
        </div>

        <h2
          className="mt-3 text-[28px] font-medium leading-[34px] text-balance"
          id="ev-title"
        >
          Launch review
        </h2>

        <div className="mt-2 grid gap-1">
          <div className="flex items-center gap-2 text-[13px] leading-5 text-muted">
            <Icon path="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <span className="min-w-0 flex-1 truncate">
              2:00 – 3:00 PM · Google Meet
            </span>
          </div>
          <div className="flex items-center gap-2 text-[13px] leading-5 text-muted">
            <svg
              className="shrink-0"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.25"
              aria-hidden="true"
            >
              <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="min-w-0 flex-1 truncate">Studio 4, 210 Market St</span>
            <button
              className="group/learn inline-flex shrink-0 cursor-pointer items-center gap-0.5 py-0.5 text-[13px] font-medium leading-5 text-[var(--link)]"
              type="button"
            >
              Directions
              <span className="inline-flex transition-transform duration-[var(--learn-out)] ease-[var(--learn-ease)] group-hover/learn:translate-x-[var(--learn-shift)] group-hover/learn:duration-[var(--learn-in)]">
                <svg
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path
                    className="origin-[10px_8px] transition-transform duration-[var(--learn-out)] ease-[var(--learn-ease)] [transform-box:view-box] [vector-effect:non-scaling-stroke] group-hover/learn:rotate-[var(--learn-spread)] group-hover/learn:duration-[var(--learn-in)]"
                    d="M6 4L10 8"
                  />
                  <path
                    className="origin-[10px_8px] transition-transform duration-[var(--learn-out)] ease-[var(--learn-ease)] [transform-box:view-box] [vector-effect:non-scaling-stroke] group-hover/learn:rotate-[calc(var(--learn-spread)*-1)] group-hover/learn:duration-[var(--learn-in)]"
                    d="M10 8L6 12"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div
          className="mt-3 mb-1 h-px bg-[linear-gradient(90deg,transparent,var(--divider)_20%,var(--divider)_80%,transparent)]"
          aria-hidden="true"
        />

        <div className="group/acc" data-open={open}>
          <button
            className="-mx-3 flex w-[calc(100%+24px)] cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] leading-5 transition-colors duration-[var(--press-dur)] ease-[var(--ease-smooth-out)] hover:bg-[var(--gray-hover)]"
            type="button"
            aria-expanded={open}
            aria-controls="ev-people"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="min-w-0 flex-1 text-fg">Attendees</span>
            <span className="shrink-0 tabular-nums text-muted">
              {PEOPLE.length} going
            </span>
            <span className="inline-flex shrink-0 text-muted transition-transform duration-[var(--acc-chevron)] ease-[var(--acc-ease)] group-data-[open=true]/acc:-scale-y-100">
              <svg
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  className="[vector-effect:non-scaling-stroke]"
                  d="M4 6.5L8 10.5L12 6.5"
                />
              </svg>
            </span>
          </button>

          <div
            className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--acc-collapse)] ease-[var(--acc-ease)] group-data-[open=true]/acc:grid-rows-[1fr] group-data-[open=true]/acc:duration-[var(--acc-expand)]"
            id="ev-people"
          >
            <div className="overflow-hidden opacity-0 blur-[2px] transition-[opacity,filter] duration-[var(--acc-collapse)] ease-[var(--acc-ease)] group-data-[open=true]/acc:opacity-100 group-data-[open=true]/acc:blur-none group-data-[open=true]/acc:duration-[var(--acc-expand)]">
              <div className="flex items-center gap-3 pt-2 pb-1">
                <div
                  className="flex shrink-0 pl-0.5"
                  ref={groupRef}
                  onMouseLeave={() => setShifts(null, "out")}
                >
                  {PEOPLE.map((p, i) => (
                    <span
                      key={p.initials}
                      className="t-avatar relative -ml-1.5 inline-flex translate-y-[var(--shift,0px)] scale-[var(--scale-active,1)] transition-transform duration-[var(--avatar-dur)] ease-[var(--avatar-ease-in)] will-change-transform first:ml-0"
                      onMouseEnter={() => setShifts(i, "in")}
                    >
                      <span
                        className="t-av"
                        role="img"
                        aria-label={p.name}
                        style={
                          {
                            "--av-bg": p.bg,
                            "--av-fg": p.fg,
                            "--av-size": "28px",
                          } as CSSProperties
                        }
                      >
                        {p.initials}
                      </span>
                    </span>
                  ))}
                </div>
                <span className="min-w-0 flex-1 truncate text-xs text-muted">
                  Maya, Leo and 3 others
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            className="inline-flex h-9 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-[40px] bg-[var(--join)] px-3 text-[13px] font-medium leading-5 text-white shadow-[var(--cta-shadow)] transition-[transform,background-color] duration-[var(--press-dur)] ease-[var(--ease-smooth-out)] hover:bg-[var(--join-hover)] active:scale-[var(--press-scale)] active:duration-0"
            type="button"
            onClick={onJoin}
          >
            <Icon path="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            <span className="t-text-swap" ref={joinLabelRef}>
              Join call
            </span>
          </button>
          <button
            className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-[40px] bg-[var(--chip)] px-3 text-[13px] font-medium leading-5 text-fg transition-[transform,background-color,color] duration-[var(--decline-dur)] ease-[var(--ease-smooth-out)] hover:bg-[var(--chip-hover)] active:scale-[var(--press-scale)] active:duration-0 data-[declined=true]:bg-[var(--decline-bg)] data-[declined=true]:text-[var(--decline-ink)] data-[declined=true]:hover:bg-[var(--decline-bg-hover)]"
            type="button"
            aria-pressed={declined}
            data-declined={declined}
            onClick={onDecline}
          >
            <span className="t-morph" ref={declineLabelRef}>
              Decline
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

/* Heroicons (outline), Copyright (c) Tailwind Labs, Inc. MIT License */
function Icon({ path }: { path: string }) {
  return (
    <svg
      className="shrink-0"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.25"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

/* What is left here is only what Tailwind utilities cannot express:
 *   - the design tokens (they drive both themes, so every `var(--x)` in the
 *     JSX keeps flipping under `html[data-theme="dark"]` for free);
 *   - the map pin and its glow, which are pseudo-elements plus @keyframes;
 *   - the classes the component's own JavaScript creates or toggles
 *     (`is-pressed`, `is-exit`, `is-enter-start`, `t-morph-*`, `is-morphing`)
 *     — utilities cannot reach nodes built with document.createElement;
 *   - the `t-av` avatar primitive, whose colours come from inline CSS vars;
 *   - the reduced-motion and touch blocks, which sweep every descendant.
 * Everything else now lives in the markup above. */
const EVENT_CSS = `
.ev {
  --stage-bg: var(--color-bg);
  --stage-fg: var(--color-fg);
  --stage-muted: var(--color-muted);
  --stage-border: var(--color-line);
  --stage-surface: var(--color-card);
  --stage-accent: var(--color-fg);
  --stage-on-accent: var(--color-bg);

  --acc-expand: 250ms;
  --acc-collapse: 250ms;
  --acc-chevron: 250ms;
  --acc-ease: cubic-bezier(0.22, 1, 0.36, 1);

  --text-morph-dur: 180ms;
  --text-morph-resize-dur: 240ms;
  --text-morph-blur: 2px;
  --text-morph-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --decline-dur: 150ms;

  --avatar-lift: -4px;
  --avatar-dur: 320ms;
  --avatar-scale: 1.05;
  --avatar-falloff: 0.45;
  --avatar-ease-in: cubic-bezier(0.22, 1, 0.36, 1);
  --avatar-ease-out: cubic-bezier(0.34, 3.85, 0.64, 1);

  --text-swap-dur: 150ms;
  --text-swap-translate-y: 4px;
  --text-swap-blur: 2px;
  --text-swap-ease: ease-in-out;

  --learn-shift: 2px;
  --learn-spread: 8deg;
  --learn-in: 350ms;
  --learn-out: 350ms;
  --learn-ease: cubic-bezier(0.22, 1, 0.36, 1);

  --press-scale: 0.99;
  --press-dur: 150ms;
  --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);

  --chip: rgba(0, 0, 0, .04);
  --chip-hover: rgba(0, 0, 0, .06);
  --gray-hover: rgba(0, 0, 0, .02);
  --link: rgba(0, 83, 227, .8);
  --decline-bg: rgba(236, 74, 74, .1);
  --decline-bg-hover: rgba(236, 74, 74, .14);
  --decline-ink: #BD0F2C;
  --date-red: #EC4A4A;
  --av-inset: rgba(0, 0, 0, .02);
  /* Join call: blue, the same hue as the map pin. */
  --join: #0071E3;
  --join-hover: #0062C4;
  --pin: #0071E3;
  --pin-halo: rgba(0, 113, 227, .16);
  --pin-glow: rgba(0, 113, 227, .45);
  --pin-pulse-dur: 2600ms;
  --pin-pulse-scale: 1.5;
  --pin-pulse-opacity: .55;
  /* linear on purpose: the ease-out lives in the keyframe stops below, so the
     glow keeps fading for the whole cycle instead of flashing at the start */
  --pin-pulse-ease: linear;
  --card-shadow: 0 0 0 1px rgba(0,0,0,.04), 0 8px 32px -4px rgba(0,0,0,.06), 0 1px 3px 0 rgba(0,0,0,.04);
  --material-shadow: 0 4px 42px rgba(0,0,0,.06), 0 2px 6px rgba(0,0,0,.05), 0 0 0 1px rgba(0,0,0,.06);
  --cta-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
  --divider: color-mix(in srgb, var(--stage-border) 70%, transparent);
}
html[data-theme="dark"] .ev {
  --chip: rgba(255, 255, 255, .07);
  --chip-hover: rgba(255, 255, 255, .10);
  --gray-hover: rgba(255, 255, 255, .03);
  --link: rgba(122, 168, 255, .95);
  --decline-bg: rgba(236, 74, 74, .16);
  --decline-bg-hover: rgba(236, 74, 74, .22);
  --decline-ink: #ff9090;
  --date-red: #ff6b6b;
  --av-inset: rgba(255, 255, 255, .04);
  --join: #0A84FF;
  --join-hover: #3D9BFF;
  --pin: #4DA3FF;
  --pin-halo: rgba(77, 163, 255, .18);
  --pin-glow: rgba(77, 163, 255, .5);
  --card-shadow: 0 1px 3px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.04), inset 0 0 0 1px rgba(196,196,196,.08);
  --material-shadow: 0 1px 3px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.04), inset 0 0 0 1px rgba(196,196,196,.08);
  --cta-shadow: 0 1px 2px 0 rgba(0,0,0,.4);
}

:where(.ev) button:focus-visible {
  outline: 2px solid var(--stage-accent);
  outline-offset: 2px;
}
/* Touch press: the JS adds .is-pressed so a tap shows the press in full. */
.ev .is-pressed {
  transform: scale(var(--press-scale));
  transition-duration: 0ms;
}

/* Map pin */
.ev .ev-pin {
  position: absolute;
  left: 50%;
  top: 42%;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-radius: 50%;
  background: var(--pin);
  box-shadow:
    0 0 0 3px var(--stage-surface),
    0 2px 6px rgba(0,0,0,.2),
    0 0 12px 1px var(--pin-glow);
}
.ev .ev-pin::before {
  content: "";
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  background: var(--pin-halo);
}
/* The glow: two soft blue discs that grow out of the pin and fade, half a
 * cycle apart so there is always one on its way out. */
.ev .ev-pin-glow {
  position: absolute;
  left: 50%;
  top: 42%;
  width: 56px;
  height: 56px;
  margin: -28px 0 0 -28px;
  pointer-events: none;
}
.ev .ev-pin-glow::before,
.ev .ev-pin-glow::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--pin-glow) 0%,
    var(--pin-halo) 42%,
    transparent 70%
  );
  opacity: 0;
  will-change: transform, opacity;
  animation: ev-pin-pulse var(--pin-pulse-dur) var(--pin-pulse-ease) infinite;
}
.ev .ev-pin-glow::after {
  animation-delay: calc(var(--pin-pulse-dur) / -2);
}
@keyframes ev-pin-pulse {
  0%   { transform: scale(.28); opacity: 0; }
  10%  { opacity: var(--pin-pulse-opacity); }
  45%  { transform: scale(calc(var(--pin-pulse-scale) * .7)); }
  100% { transform: scale(var(--pin-pulse-scale)); opacity: 0; }
}

/* The ring that separates overlapping avatars from the card behind them. */
.ev .t-avatar .t-av {
  box-shadow: 0 0 0 2px var(--stage-surface), inset 0 0 0 1px var(--av-inset);
}

/* Text states swap (Join call → Connecting…): JS toggles these classes. */
.ev .t-text-swap {
  display: inline-block;
  transform: translateY(0);
  filter: blur(0);
  opacity: 1;
  transition:
    transform var(--text-swap-dur) var(--text-swap-ease),
    filter    var(--text-swap-dur) var(--text-swap-ease),
    opacity   var(--text-swap-dur) var(--text-swap-ease);
  will-change: transform, filter, opacity;
}
.ev .t-text-swap.is-exit {
  transform: translateY(calc(var(--text-swap-translate-y) * -1));
  filter: blur(var(--text-swap-blur));
  opacity: 0;
}
.ev .t-text-swap.is-enter-start {
  transform: translateY(var(--text-swap-translate-y));
  filter: blur(var(--text-swap-blur));
  opacity: 0;
  transition: none;
}

/* Text morph (Decline → Declined): the inner spans are built in JS. */
.ev .t-morph { white-space: nowrap; }
.ev .t-morph-swap {
  display: inline-grid;
  vertical-align: bottom;
  justify-items: start;
  transition: width var(--text-morph-resize-dur) var(--text-morph-ease);
}
.ev .t-morph-swap > span {
  grid-area: 1 / 1;
  white-space: pre;
  transition:
    opacity var(--text-morph-dur) var(--text-morph-ease),
    filter  var(--text-morph-dur) var(--text-morph-ease);
}
.ev .t-morph-new {
  opacity: 0;
  filter: blur(var(--text-morph-blur));
}
.ev .t-morph-swap.is-morphing .t-morph-old {
  opacity: 0;
  filter: blur(var(--text-morph-blur));
}
.ev .t-morph-swap.is-morphing .t-morph-new {
  opacity: 1;
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .ev *, .ev *::before, .ev *::after { transition: none !important; }
  .ev .t-avatar { transform: none !important; }
  .ev button:is(:active, .is-pressed) { transform: none !important; }
  .ev .ev-pin-glow::before { animation: none; transform: scale(1); opacity: .35; }
  .ev .ev-pin-glow::after { animation: none; }
}

/* Avatars: avvvatars colors (MIT, github.com/nusu/avvvatars) */
.ev .t-av{display:inline-grid;place-items:center;flex:none;box-sizing:border-box;width:var(--av-size,24px);height:var(--av-size,24px);border-radius:50%;background:color-mix(in srgb,var(--av-bg) 70%,transparent);color:var(--av-fg);font-size:max(10px,calc(var(--av-size,24px) * .4));font-weight:500;line-height:1;letter-spacing:0;user-select:none}
html[data-theme="dark"] .ev .t-av{background:color-mix(in srgb,var(--av-fg) 30%,#202020);color:var(--av-bg)}

/* Touch: controls press in full on a tap, never select their label. */
.ev :where(button,[role="button"],summary,.t-pressable){-webkit-tap-highlight-color:transparent;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
`;
