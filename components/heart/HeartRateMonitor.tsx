"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/* Heart Rate Monitor — from the transitions.dev Community
 * (https://transitions.dev/studio.html?id=cVTc0tzBZFA).
 *
 * A heart-rate card: the bpm readout re-rolls every few seconds and pops in
 * digit by digit, an ECG trace sweeps across the chart on a loop, and the ⋯
 * button opens a small dropdown that switches between Resting and Active
 * (which also speeds the sweep up).
 *
 * Ported to React/TS. The CSS is kept VERBATIM (source of every duration,
 * easing and the prefers-reduced-motion fallback); the only changes are that
 * every selector is scoped under `.hr`, `:root` → `.hr` with the `--stage-*`
 * tokens mapped to this project's `--color-*`, `html[data-theme="dark"]` →
 * `html[data-theme="dark"] .hr`, and the touch `:where(...)` block scoped
 * under `.hr`. The digit pop-in helper is ported 1:1 and runs against a ref;
 * bpm, mode and the menu are React state driving the declarative bits. */

const RANGES = {
  Resting: [64, 82],
  Active: [105, 128],
} as const;

type Mode = keyof typeof RANGES;

const ECG_DUR: Record<Mode, string> = { Resting: "2.4s", Active: "1.4s" };

const TICK_MS = 3200;

/* Chart grid: 9 vertical lines every 26 units, 3 horizontal every 20. */
const V_LINES = Array.from({ length: 9 }, (_, i) => (i + 1) * 26);
const H_LINES = Array.from({ length: 3 }, (_, i) => (i + 1) * 20);

export default function HeartRateMonitor() {
  const [mode, setMode] = useState<Mode>("Resting");
  const [bpm, setBpm] = useState(72);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ms = useCallback((name: string, fb = 0) => {
    const el = rootRef.current ?? document.documentElement;
    const v = parseFloat(getComputedStyle(el).getPropertyValue(name));
    return Number.isFinite(v) ? v : fb;
  }, []);

  // Number pop-in
  const setDigits = useCallback((group: HTMLElement | null, str: string) => {
    if (!group) return;
    const prev = (group.textContent || "").replace(/\s+/g, "");
    if (prev === str) return;
    let same = 0;
    while (same < prev.length && same < str.length && prev[same] === str[same]) same++;
    group.classList.remove("is-animating");
    group.replaceChildren();
    const chars = str.split("");
    chars.forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "t-digit";
      s.textContent = ch;
      if (i < same) s.dataset.same = "";
      if (i === chars.length - 2) s.dataset.stagger = "1";
      else if (i === chars.length - 1) s.dataset.stagger = "2";
      group.appendChild(s);
    });
    void group.offsetHeight;
    group.classList.add("is-animating");
  }, []);

  // A fresh reading inside the current mode's range, never the same twice.
  const tick = useCallback(() => {
    setBpm((prev) => {
      const [lo, hi] = RANGES[mode];
      const n = lo + Math.floor(Math.random() * (hi - lo));
      return n === prev ? n + 1 : n;
    });
  }, [mode]);

  useEffect(() => {
    const id = setInterval(tick, TICK_MS);
    return () => clearInterval(id);
  }, [tick]);

  // Pop the digits in on every new reading (no-op for the initial 72).
  useEffect(() => {
    setDigits(digitsRef.current, String(bpm));
  }, [bpm, setDigits]);

  const close = useCallback(() => {
    setOpen(false);
    setClosing(true);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(
      () => setClosing(false),
      ms("--dropdown-close-dur", 150),
    );
  }, [ms]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Click outside closes the menu.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target) || btnRef.current?.contains(target)) return;
      close();
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open, close]);

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

  const pick = (next: Mode) => {
    setMode(next);
    const [lo, hi] = RANGES[next];
    setBpm(lo + Math.floor(Math.random() * (hi - lo)));
    close();
  };

  return (
    <div
      className="hr"
      ref={rootRef}
      style={{ "--ecg-dur": ECG_DUR[mode] } as CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: HR_CSS }} />

      <div className="hr-top">
        <button className="hr-btn" aria-label="Back">
          <svg
            className="hi"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M4.46967 6.46967C4.76256 6.17678 5.23744 6.17678 5.53033 6.46967L8 8.93934L10.4697 6.46967C10.7626 6.17678 11.2374 6.17678 11.5303 6.46967C11.8232 6.76256 11.8232 7.23744 11.5303 7.53033L8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303L4.46967 7.53033C4.17678 7.23744 4.17678 6.76256 4.46967 6.46967Z"
              transform="rotate(90 8 8)"
            />
          </svg>
        </button>

        <span className="hr-title">Heart rate</span>

        <div className="hr-menu-wrap">
          <button
            className="hr-btn"
            ref={btnRef}
            aria-label="Menu"
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation();
              if (open) close();
              else {
                setClosing(false);
                setOpen(true);
              }
            }}
          >
            <svg
              className="hi"
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
              <path d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>

          <div
            className={`t-dropdown hr-menu${open ? " is-open" : ""}${closing ? " is-closing" : ""}`}
            ref={menuRef}
            data-origin="top-right"
          >
            {(Object.keys(RANGES) as Mode[]).map((m) => (
              <button key={m} onClick={() => pick(m)}>
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hr-num">
        <span className="t-digit-group is-animating" aria-live="polite" ref={digitsRef}>
          <span className="t-digit">7</span>
          <span className="t-digit" data-stagger="1">
            2
          </span>
        </span>
        <span className="hr-unit">bpm</span>
      </div>

      <div className="hr-chart">
        <svg viewBox="0 0 260 80" preserveAspectRatio="none" width="100%" height="80">
          <g className="grid">
            {V_LINES.map((x) => (
              <line key={`v${x}`} x1={x} x2={x} y1={0} y2={80} />
            ))}
            {H_LINES.map((y) => (
              <line key={`h${y}`} y1={y} y2={y} x1={0} x2={260} />
            ))}
          </g>
          <path
            className="trail"
            d="M0 40 H40 L46 40 L52 12 L58 62 L64 40 L70 44 L76 40 H120 L126 40 L132 12 L138 62 L144 40 L150 44 L156 40 H200 L206 40 L212 12 L218 62 L224 40 L230 44 L236 40 H260"
            pathLength={100}
          />
        </svg>
      </div>

      <div className="hr-sec">
        <span className="hr-h">Core strength</span>
        <div className="hr-stats">
          <Stat cap="Current" value="1.6" unit="sec/sqt" />
          <Stat cap="Average" value="2.2" unit="sec/sqt" />
          <Stat cap="Max" value="4.2" unit="sec/sqt" />
        </div>
      </div>
    </div>
  );
}

function Stat({ cap, value, unit }: { cap: string; value: string; unit: string }) {
  return (
    <div>
      <span className="cap">{cap}</span>
      <span className="val">
        {value} <i>{unit}</i>
      </span>
    </div>
  );
}

/* CSS kept verbatim from the transitions.dev source; the only changes are
 * `:root` → `.hr` with the `--stage-*` tokens mapped to this project's
 * `--color-*`, `html[data-theme="dark"]` → `html[data-theme="dark"] .hr`,
 * and the touch `:where(...)` block scoped under `.hr`. */
const HR_CSS = `
.hr{
  --stage-fg: var(--color-fg);
  --stage-muted: var(--color-muted);
  --stage-border: var(--color-line);
  --stage-surface: var(--color-card);
  --stage-accent: var(--color-fg);

  --dropdown-open-dur:250ms;--dropdown-close-dur:150ms;--dropdown-pre-scale:.97;--dropdown-closing-scale:.99;--dropdown-ease:cubic-bezier(.22,1,.36,1);--digit-dur:500ms;--digit-distance:8px;--digit-stagger:70ms;--digit-blur:2px;--digit-ease:cubic-bezier(.34,1.45,.64,1);--digit-dir-x:0;--digit-dir-y:1;--ecg-dur:2.4s;--ease-linear:linear;--ease-smooth-out:cubic-bezier(.22,1,.36,1);--press-scale:.95;--press-dur:150ms;--pulse:#EC4A4A}
:where(.hr) button{font:inherit;border:0;padding:0;background:none;color:inherit;cursor:pointer}
.hr{width:300px;padding:16px 16px 24px;border-radius:24px;background:var(--stage-surface);color:var(--stage-fg);box-shadow:0 0 0 1px rgba(0,0,0,.04),0 8px 32px -4px rgba(0,0,0,.06),0 1px 3px 0 rgba(0,0,0,.04);font-size:13px;line-height:20px}
.hr .hr-top{display:flex;align-items:center;justify-content:space-between}
.hr .hr-title{color:var(--stage-muted)}
.hr .hr-btn{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:var(--stage-surface);box-shadow:0 1px 3px 0 rgba(0,0,0,.04),inset 0 0 0 1px rgba(0,0,0,.08),inset 0 -1px 0 0 rgba(0,0,0,.08);transition:transform var(--press-dur) var(--ease-smooth-out)}
.hr .hr-btn:is(:active,.is-pressed){transform:scale(var(--press-scale))}
.hr .hr-btn:focus-visible,.hr .hr-menu button:focus-visible{outline:0;box-shadow:0 0 0 2px var(--stage-surface),0 0 0 4px var(--stage-accent)}
.hr .hr-menu-wrap{position:relative}
.hr .hr-menu{position:absolute;right:0;top:38px;width:120px;padding:6px;border-radius:12px;background:var(--stage-surface);box-shadow:0 4px 42px rgba(0,0,0,.06),0 2px 6px rgba(0,0,0,.05),0 0 0 1px rgba(0,0,0,.06);z-index:5}
.hr .hr-menu button{display:block;width:100%;height:32px;padding:0 8px;text-align:left;border-radius:8px;transition:background-color var(--press-dur) var(--ease-smooth-out)}
@media (hover: hover) and (pointer: fine) { .hr .hr-menu button:hover {background:rgba(0,0,0,.04)} }
.hr .hr-num{display:flex;align-items:baseline;justify-content:center;gap:8px;margin:16px 0 8px}
.hr .t-digit-group{font-size:60px;line-height:70px;font-weight:500;font-variant-numeric:tabular-nums}
.hr .hr-unit{color:var(--stage-muted);font-size:16px;line-height:22px}
.hr .hr-chart{border-radius:12px;background:rgba(0,0,0,.02);padding:8px 0;overflow:hidden}
.hr .hr-chart svg{display:block}
.hr .grid line{stroke:var(--stage-border);stroke-width:1;vector-effect:non-scaling-stroke}
.hr .trail{fill:none;stroke:var(--pulse);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;stroke-dasharray:30 100;stroke-dashoffset:30;animation:hr-ecg var(--ecg-dur) var(--ease-linear) infinite}
@keyframes hr-ecg{to{stroke-dashoffset:-100}}
.hr .hr-sec{margin-top:16px;padding:0 8px}
.hr .hr-h{display:block;font-size:16px;line-height:22px;font-weight:500;margin-bottom:8px}
.hr .hr-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.hr .cap{display:block;font-size:12px;line-height:16px;color:var(--stage-muted)}
.hr .val{font-variant-numeric:tabular-nums}.hr .val i{font-style:normal;font-size:12px;color:var(--stage-muted)}
.hr .t-digit-group{display:inline-flex;align-items:baseline}
.hr .t-digit{display:inline-block;will-change:transform,opacity,filter}
@keyframes hr-digit-pop-in{0%{transform:translate(calc(var(--digit-distance)*var(--digit-dir-x)),calc(var(--digit-distance)*var(--digit-dir-y)));opacity:0;filter:blur(var(--digit-blur))}100%{transform:translate(0,0);opacity:1;filter:blur(0)}}
.hr .t-digit-group.is-animating .t-digit{animation:hr-digit-pop-in var(--digit-dur) var(--digit-ease) both}
.hr .t-digit-group.is-animating .t-digit[data-stagger="1"]{animation-delay:var(--digit-stagger)}
.hr .t-digit-group.is-animating .t-digit[data-stagger="2"]{animation-delay:calc(var(--digit-stagger)*2)}
.hr .t-digit-group.is-animating .t-digit[data-same]{animation:none}
.hr .t-dropdown{transform-origin:top left;transform:scale(var(--dropdown-pre-scale));opacity:0;pointer-events:none;transition:transform var(--dropdown-open-dur) var(--dropdown-ease),opacity var(--dropdown-open-dur) var(--dropdown-ease);will-change:transform,opacity}
.hr .t-dropdown[data-origin="top-right"]{transform-origin:top right}
.hr .t-dropdown.is-open{transform:scale(1);opacity:1;pointer-events:auto}
.hr .t-dropdown.is-closing{transform:scale(var(--dropdown-closing-scale));opacity:0;pointer-events:none;transition:transform var(--dropdown-close-dur) var(--dropdown-ease),opacity var(--dropdown-close-dur) var(--dropdown-ease)}
html[data-theme="dark"] .hr .hr-chart{background:rgba(255,255,255,.03)}
@media (hover: hover) and (pointer: fine) { html[data-theme="dark"] .hr .hr-menu button:hover {background:rgba(255,255,255,.07)} }
@media (prefers-reduced-motion:reduce){.hr .t-dropdown,.hr .hr-btn,.hr .hr-menu button{transition:none!important}.hr .t-digit-group .t-digit{animation:none!important}.hr .trail{animation:none;stroke-dasharray:none}}

/* Icons: Heroicons (outline), Copyright (c) Tailwind Labs, Inc. MIT License */

/* Touch: controls press in full on a tap, never select their label, and hover only applies with a mouse. */
.hr :where(button,[role="button"],[role="tab"],[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"],[role="option"],[role="switch"],summary,.t-pressable){-webkit-tap-highlight-color:transparent;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
/* end touch */
`;
