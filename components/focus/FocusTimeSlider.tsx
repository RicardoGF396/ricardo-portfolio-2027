"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/* Focus Time Slider — from the transitions.dev Community
 * (https://transitions.dev/studio.html?id=cgvh8MT21xC; the share is titled
 * "Modal open/close remix" after its lineage, but the component is a
 * focus-session length slider).
 *
 * A session-length slider with one tick per minute (15–60). The native range
 * thumb drags and snaps per minute; the minutes readout pops in digit by digit,
 * and the Start button swaps its label / caption.
 *
 * Ported to React/TS. CSS kept VERBATIM (source of every duration, easing and
 * the prefers-reduced-motion fallback); the only change is `:root` → `.focus`
 * so the variables stay scoped to this card. The imperative helpers (digit
 * pop-in, text swap) are ported 1:1 and run against refs; value/running are
 * React state driving the declarative bits (lit ticks, running style). */

const MIN = 15;
const MAX = 60;
const N = MAX - MIN; // 45

// Per-element swap timer, kept off the DOM node.
const swapTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

export default function FocusTimeSlider() {
  const [value, setValue] = useState(25);
  const [running, setRunning] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);
  const capRef = useRef<HTMLSpanElement>(null);
  const startLabelRef = useRef<HTMLSpanElement>(null);

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

  // Text states swap
  const swapText = useCallback(
    (el: HTMLElement | null, next: string) => {
      if (!el) return;
      if (el.textContent === next) return;
      clearTimeout(swapTimers.get(el));
      el.classList.add("is-exit");
      swapTimers.set(
        el,
        setTimeout(() => {
          el.textContent = next;
          el.classList.remove("is-exit");
          el.classList.add("is-enter-start");
          void el.offsetHeight;
          el.classList.remove("is-enter-start");
        }, ms("--text-swap-dur", 150)),
      );
    },
    [ms],
  );

  // Digit pop-in whenever the value changes (no-op on the initial 25).
  useEffect(() => {
    setDigits(digitsRef.current, String(value));
  }, [value, setDigits]);

  const onToggle = useCallback(() => {
    setRunning((prev) => {
      const next = !prev;
      swapText(startLabelRef.current, next ? "End session" : "Start focus");
      swapText(capRef.current, next ? "Notifications paused" : "Pick a session length");
      return next;
    });
  }, [swapText]);

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

  const p = (value - MIN) / N;

  return (
    <div className="focus" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: FOCUS_CSS }} />

      <div className="head">
        <h2 className="ttl">Focus time</h2>
        <p className="cap">
          <span className="t-text-swap" ref={capRef}>
            Pick a session length
          </span>
        </p>
      </div>

      <div className="readout">
        <span className="t-digit-group is-animating" aria-live="polite" ref={digitsRef}>
          <span className="t-digit" data-same="">
            2
          </span>
          <span className="t-digit" data-same="">
            5
          </span>
        </span>
        <span className="unit">min</span>
      </div>

      <div className="slider" style={{ "--p": p } as CSSProperties}>
        <div className="ticks" aria-hidden="true">
          {Array.from({ length: N + 1 }, (_, i) => {
            const isOn = i / N <= p + 0.001;
            return (
              <span
                key={i}
                className={isOn ? "tick is-on" : "tick"}
                style={{ "--t": i / N } as CSSProperties}
              />
            );
          })}
        </div>
        <input
          type="range"
          className="range"
          min={MIN}
          max={MAX}
          step={1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Session length in minutes"
        />
      </div>

      <button
        type="button"
        className={running ? "start is-running" : "start"}
        onClick={onToggle}
      >
        <span className="t-text-swap" ref={startLabelRef}>
          Start focus
        </span>
      </button>
    </div>
  );
}

/* CSS kept verbatim from the transitions.dev source; the only changes are
 * `:root` → `.focus` and `html[data-theme="dark"]` → `html[data-theme="dark"]
 * .focus` (scopes the variables to this card), and the touch `:where(...)`
 * block scoped under `.focus`. */
const FOCUS_CSS = `
.focus {
  --slider-dur: 150ms;
  --slider-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --slider-thumb-scale: 0.95;
  --digit-dur: 500ms;
  --digit-distance: 8px;
  --digit-stagger: 70ms;
  --digit-blur: 2px;
  --digit-ease: cubic-bezier(0.34, 1.45, 0.64, 1);
  --digit-dir-x: 0;
  --digit-dir-y: 1;
  --text-swap-dur: 150ms;
  --text-swap-translate-y: 4px;
  --text-swap-blur: 2px;
  --text-swap-ease: ease-in-out;
  --press-scale: 0.99;
  --press-dur: 150ms;
  --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);
  --chip: rgba(0, 0, 0, 0.04);
  --chip-hover: rgba(0, 0, 0, 0.06);
  --cta-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  --pill-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
html[data-theme="dark"] .focus {
  --chip: rgba(255, 255, 255, 0.07);
  --chip-hover: rgba(255, 255, 255, 0.1);
  --cta-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --pill-shadow: 0 1px 3px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

:where(.focus), :where(.focus) *, :where(.focus) *::before, :where(.focus) *::after { box-sizing: border-box; margin: 0; padding: 0; }
:where(.focus) button { font: inherit; border: 0; background: none; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }

.focus {
  width: 296px;
  max-width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  --stage-fg: #ffffff;
  --stage-muted: rgba(255, 255, 255, 0.78);
  --stage-surface: rgba(255, 255, 255, 0.22);
  --stage-accent: #ffffff;
  --stage-on-accent: #2a0319;
  --chip: rgba(255, 255, 255, 0.14);
  --chip-hover: rgba(255, 255, 255, 0.2);
  background: radial-gradient(circle at 50% 38%, #2a0319 0%, #7a0a48 22%, #c3157a 52%, #6b1148 100%);
  color: var(--stage-fg);
  border-radius: 24px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 32px -4px rgba(0, 0, 0, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.04);
}
html[data-theme="dark"] .focus {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.04), inset 0 0 0 1px rgba(196, 196, 196, 0.08);
}
.focus .head { display: flex; flex-direction: column; gap: 0; }
.focus .ttl { font-size: 16px; line-height: 22px; font-weight: 500; color: var(--stage-fg); }
.focus .cap { font-size: 12px; line-height: 16px; font-weight: 400; color: var(--stage-muted); }

.focus .readout {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  font-variant-numeric: tabular-nums;
}
.focus .t-digit-group { font-size: 60px; line-height: 70px; font-weight: 500; color: var(--stage-fg); }
.focus .unit { font-size: 13px; line-height: 20px; font-weight: 400; color: var(--stage-muted); }

.focus .slider {
  --p: 0.636;
  position: relative;
  height: 40px;
}
.focus .ticks { position: absolute; left: 0; right: 0; top: 6px; height: 28px; pointer-events: none; }
.focus .tick {
  position: absolute;
  top: 0;
  top: 4px;
  left: calc(2px + (100% - 4px) * var(--t));
  width: 2px;
  height: 20px;
  margin-left: -1px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.35);
  transition: background-color var(--slider-dur) var(--slider-ease);
}

.focus .tick.is-on { background: rgba(255, 255, 255, 0.9); }
.focus .range {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: grab;
  touch-action: none;
  outline: none;
}
.focus .range::-webkit-slider-runnable-track { height: 40px; background: transparent; }
.focus .range::-moz-range-track { height: 40px; background: transparent; }
.focus .range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 4px;
  height: 36px;
  margin-top: 2px;
  border: 0;
  border-radius: 2px;
  background: var(--stage-accent);
  box-shadow: var(--cta-shadow);
  transition: transform var(--slider-dur) var(--slider-ease), box-shadow var(--slider-dur) var(--slider-ease);
}
.focus .range::-moz-range-thumb {
  width: 4px;
  height: 36px;
  border: 0;
  border-radius: 2px;
  background: var(--stage-accent);
  box-shadow: var(--cta-shadow);
  transition: transform var(--slider-dur) var(--slider-ease), box-shadow var(--slider-dur) var(--slider-ease);
}
.focus .range:is(:active,.is-pressed)::-webkit-slider-thumb { transform: scale(var(--slider-thumb-scale)); }
.focus .range:is(:active,.is-pressed)::-moz-range-thumb { transform: scale(var(--slider-thumb-scale)); }
.focus .range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2), 0 0 0 4px var(--stage-accent); }
.focus .range:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2), 0 0 0 4px var(--stage-accent); }

.focus .start {
  height: 36px;
  width: 100%;
  border-radius: 40px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  background: var(--stage-accent);
  color: var(--stage-on-accent);
  box-shadow: var(--cta-shadow);
  transition: transform var(--press-dur) var(--ease-smooth-out), background-color var(--press-dur) var(--ease-smooth-out), color var(--press-dur) var(--ease-smooth-out), box-shadow var(--press-dur) var(--ease-smooth-out);
}
.focus .start:is(:active,.is-pressed) { transform: scale(var(--press-scale)); }
.focus .start.is-running { background: var(--chip); color: var(--stage-fg); box-shadow: none; }
@media (hover: hover) and (pointer: fine) { .focus .start.is-running:hover { background: var(--chip-hover); } }
.focus .start:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--stage-surface), 0 0 0 4px var(--stage-accent); }

@keyframes t-digit-pop-in {
  0% { transform: translate(calc(var(--digit-distance) * var(--digit-dir-x)), calc(var(--digit-distance) * var(--digit-dir-y))); opacity: 0; filter: blur(var(--digit-blur)); }
  100% { transform: translate(0, 0); opacity: 1; filter: blur(0); }
}
.focus .t-digit-group { display: inline-flex; align-items: baseline; }
.focus .t-digit { display: inline-block; will-change: transform, opacity, filter; }
.focus .t-digit-group.is-animating .t-digit { animation: t-digit-pop-in var(--digit-dur) var(--digit-ease) both; }
.focus .t-digit-group.is-animating .t-digit[data-stagger="1"] { animation-delay: var(--digit-stagger); }
.focus .t-digit-group.is-animating .t-digit[data-stagger="2"] { animation-delay: calc(var(--digit-stagger) * 2); }
.focus .t-digit-group.is-animating .t-digit[data-same] { animation: none; }

.focus .t-text-swap {
  display: inline-block;
  transform: translateY(0);
  filter: blur(0);
  opacity: 1;
  transition: transform var(--text-swap-dur) var(--text-swap-ease), filter var(--text-swap-dur) var(--text-swap-ease), opacity var(--text-swap-dur) var(--text-swap-ease);
  will-change: transform, filter, opacity;
}
.focus .t-text-swap.is-exit { transform: translateY(calc(var(--text-swap-translate-y) * -1)); filter: blur(var(--text-swap-blur)); opacity: 0; }
.focus .t-text-swap.is-enter-start { transform: translateY(var(--text-swap-translate-y)); filter: blur(var(--text-swap-blur)); opacity: 0; transition: none; }

@media (prefers-reduced-motion: reduce) {
  .focus .tick, .focus .range::-webkit-slider-thumb, .focus .start, .focus .t-text-swap { transition: none !important; }
  .focus .range::-moz-range-thumb { transition: none !important; }
  .focus .t-digit-group .t-digit { animation: none !important; }
  .focus .range:is(:active,.is-pressed)::-webkit-slider-thumb, .focus .range:is(:active,.is-pressed)::-moz-range-thumb, .focus .start:is(:active,.is-pressed) { transform: none; }
}

/* Touch: controls press in full on a tap, never select their label, and hover only applies with a mouse. */
.focus :where(button,[role="button"],[role="tab"],[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"],[role="option"],[role="switch"],summary,.t-pressable){-webkit-tap-highlight-color:transparent;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
`;
