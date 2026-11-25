"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

/* Weather Day Switcher — from the transitions.dev Community
 * (https://transitions.dev/studio.html?id=cWqA5gXWQV9).
 *
 * A large iOS-style weather card whose living sky backdrop, bold animated icon,
 * temperature and condition all transition as you switch forecast days.
 *
 * Ported to React/TS. The CSS is kept VERBATIM (it is the source of every
 * duration, easing and the prefers-reduced-motion fallback) — the only change
 * is that the @motion variables live on `.wx` instead of `:root` so they stay
 * scoped to this card. The imperative animation helpers (digit pop-in, text
 * morph, text swap, sliding pill) are ported 1:1 and run against refs; the
 * declarative bits (sky, icon state, tab aria) are driven by React state.
 *
 * Icons: Heroicons (outline), (c) Tailwind Labs, Inc. MIT License. */

type Icon = "sun" | "cloud" | "rain" | "bolt";
type Sky = "clear" | "cloudy" | "rain" | "storm";

type Day = {
  day: string;
  icon: Icon;
  sky: Sky;
  cond: string;
  t: number;
  h: number;
  l: number;
};

const DAYS: Day[] = [
  { day: "Monday", icon: "sun", sky: "clear", cond: "Sunny", t: 24, h: 26, l: 17 },
  { day: "Tuesday", icon: "cloud", sky: "cloudy", cond: "Cloudy", t: 19, h: 21, l: 14 },
  { day: "Wednesday", icon: "rain", sky: "rain", cond: "Light rain", t: 16, h: 18, l: 12 },
  { day: "Thursday", icon: "bolt", sky: "storm", cond: "Thunderstorms", t: 15, h: 17, l: 11 },
  { day: "Friday", icon: "sun", sky: "clear", cond: "Sunny", t: 22, h: 25, l: 15 },
];

const TABS: { icon: Icon; label: string }[] = [
  { icon: "sun", label: "Mon" },
  { icon: "cloud", label: "Tue" },
  { icon: "cloud", label: "Wed" },
  { icon: "bolt", label: "Thu" },
  { icon: "sun", label: "Fri" },
];

const PATHS: Record<Icon, string> = {
  sun: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
  cloud:
    "M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z",
  rain: "M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z",
  bolt: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
};

// Per-helper timers, kept off the DOM nodes.
const swapTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();
const morphTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

function Glyph({ name, size = 24, sw = 0.75 }: { name: Icon; size?: number; sw?: number }) {
  return (
    <svg
      className="hi"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={sw}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

// Deterministic rain streaks for the backdrop (1:1 with the original script).
function rainStreaks(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const x = Math.min((i * 37) % 100 + (i % 3) * 2, 112);
    const d = ((i * 0.618) % 1).toFixed(3);
    const len = 12 + ((i * 7) % 10);
    return (
      <span
        key={i}
        style={{ "--x": `${x}%`, "--d": d, "--len": `${len}px` } as CSSProperties}
      />
    );
  });
}

export default function WeatherDaySwitcher() {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dayRef = useRef<HTMLSpanElement>(null);
  const condRef = useRef<HTMLSpanElement>(null);
  const tempRef = useRef<HTMLSpanElement>(null);
  const hiRef = useRef<HTMLSpanElement>(null);
  const loRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

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
      const span = document.createElement("span");
      span.className = "t-digit";
      span.textContent = ch;
      if (i < same) span.dataset.same = "";
      if (i === chars.length - 2) span.dataset.stagger = "1";
      else if (i === chars.length - 1) span.dataset.stagger = "2";
      group.appendChild(span);
    });
    void group.offsetHeight;
    group.classList.add("is-animating");
  }, []);

  // Text states swap
  const swapText = useCallback(
    (el: HTMLElement | null, next: string) => {
      if (!el) return;
      const target = el.dataset.next || el.textContent || "";
      if (target === next) return;
      el.dataset.next = next;
      clearTimeout(swapTimers.get(el));
      el.classList.remove("is-enter-start");
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

  // Text morph
  const morphText = useCallback(
    (el: HTMLElement | null, next: string) => {
      if (!el) return;
      const prev = el.dataset.text != null ? el.dataset.text : el.textContent || "";
      if (prev === next) return;
      el.dataset.text = next;
      clearTimeout(morphTimers.get(el));
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
      swap.style.width = out.getBoundingClientRect().width + "px";
      void swap.offsetWidth;
      swap.classList.add("is-morphing");
      swap.style.width = inn.getBoundingClientRect().width + "px";
      morphTimers.set(
        el,
        setTimeout(
          () => {
            el.textContent = next;
          },
          Math.max(ms("--text-morph-dur"), ms("--text-morph-resize-dur")) + 40,
        ),
      );
    },
    [ms],
  );

  // Tabs sliding pill
  const moveTo = useCallback((tab: HTMLButtonElement | null, animate: boolean) => {
    const pill = pillRef.current;
    if (!pill || !tab) return;
    if (!animate) {
      const prev = pill.style.transition;
      pill.style.transition = "none";
      pill.style.transform = "translateX(" + tab.offsetLeft + "px)";
      pill.style.width = tab.offsetWidth + "px";
      void pill.offsetWidth;
      pill.style.transition = prev;
    } else {
      pill.style.transform = "translateX(" + tab.offsetLeft + "px)";
      pill.style.width = tab.offsetWidth + "px";
    }
  }, []);

  const select = useCallback(
    (i: number, focus = false) => {
      if (i === currentRef.current) return;
      currentRef.current = i;
      setCurrent(i);
      const d = DAYS[i];
      if (focus) tabRefs.current[i]?.focus();
      moveTo(tabRefs.current[i], true);
      morphText(dayRef.current, d.day);
      swapText(condRef.current, d.cond);
      setDigits(tempRef.current, String(d.t));
      setDigits(hiRef.current, String(d.h));
      setDigits(loRef.current, String(d.l));
    },
    [moveTo, morphText, swapText, setDigits],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const n = TABS.length;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        select((currentRef.current + 1) % n, true);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        select((currentRef.current - 1 + n) % n, true);
      }
    },
    [select],
  );

  // Initial pill placement + keep it aligned on resize.
  useEffect(() => {
    const place = () => moveTo(tabRefs.current[currentRef.current], false);
    const raf = requestAnimationFrame(place);
    const t = setTimeout(place, 120);
    window.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("resize", place);
    };
  }, [moveTo]);

  // Touch press: a tap holds .is-pressed for at least --press-dur, scoped to
  // this card's tabs so the press shows in full.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const min = ms("--press-dur", 150);
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(".t-tab");
      if (!el) return;
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

  const day = DAYS[current];

  return (
    <div className="wx" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: WX_CSS }} />

      <div className="wx-bg" data-wx={day.sky} aria-hidden="true">
        <div className="wx-sky" data-key="clear">
          <span className="wx-blob wx-blob--cool" />
          <span className="wx-blob wx-blob--glow" />
        </div>
        <div className="wx-sky" data-key="cloudy">
          <span className="wx-blob wx-blob--cloud1" />
          <span className="wx-blob wx-blob--cloud2" />
        </div>
        <div className="wx-sky" data-key="rain">
          <span className="wx-blob wx-blob--mist" />
          <span className="wx-rain">{rainStreaks(14)}</span>
        </div>
        <div className="wx-sky" data-key="storm">
          <span className="wx-blob wx-blob--storm" />
          <span className="wx-rain">{rainStreaks(20)}</span>
          <span className="wx-flash" />
        </div>
      </div>

      <div className="wx-body" role="tabpanel" id="wx-panel" aria-labelledby={`wx-tab-${current}`}>
        <div className="wx-place">San Francisco</div>
        <div className="wx-day">
          <span className="t-morph" id="wx-day" ref={dayRef}>
            Monday
          </span>
        </div>
        <div className="wx-hero">
          <div className="wx-temp">
            <span className="t-digit-group" id="wx-temp" ref={tempRef}>
              24
            </span>
            <span className="wx-deg">°</span>
          </div>
          <div className="wx-big t-icon-swap" data-state={day.icon} aria-hidden="true">
            <span className="t-icon" data-key="sun">
              <span className="wx-idle wx-idle--spin">
                <Glyph name="sun" size={48} />
              </span>
            </span>
            <span className="t-icon" data-key="cloud">
              <span className="wx-idle wx-idle--float">
                <Glyph name="cloud" size={48} />
              </span>
            </span>
            <span className="t-icon" data-key="rain">
              <span className="wx-idle wx-idle--float">
                <Glyph name="cloud" size={48} />
              </span>
              <span className="wx-drops">
                <span />
                <span />
                <span />
              </span>
            </span>
            <span className="t-icon" data-key="bolt">
              <span className="wx-idle wx-idle--flicker">
                <Glyph name="bolt" size={48} />
              </span>
            </span>
          </div>
        </div>
        <div className="wx-cond">
          <span className="t-text-swap" id="wx-cond" ref={condRef}>
            Sunny
          </span>
        </div>
        <div className="wx-hl">
          H:
          <span className="t-digit-group" id="wx-hi" ref={hiRef}>
            26
          </span>
          ° L:
          <span className="t-digit-group" id="wx-lo" ref={loRef}>
            17
          </span>
          °
        </div>
      </div>

      <div
        className="wx-tabs t-tabs"
        role="tablist"
        aria-label="Forecast days"
        ref={barRef}
        onKeyDown={onKeyDown}
      >
        <span className="t-tabs-pill" aria-hidden="true" ref={pillRef} />
        {TABS.map((tab, i) => (
          <button
            key={i}
            className="t-tab"
            role="tab"
            id={`wx-tab-${i}`}
            aria-controls="wx-panel"
            aria-selected={i === current}
            tabIndex={i === current ? 0 : -1}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            onClick={() => select(i, false)}
          >
            <Glyph name={tab.icon} size={16} sw={2.25} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* CSS kept verbatim from the transitions.dev source; only `:root` → `.wx`
 * (scopes the @motion variables to this card) and the touch `:where(...)`
 * block scoped under `.wx`. */
const WX_CSS = `
.wx {
  --tabs-dur: 250ms;
  --tabs-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --tabs-text-muted: rgba(255, 255, 255, 0.78);
  --tabs-text-active: #ffffff;
  --tabs-bar-bg: rgba(0, 0, 0, 0.16);
  --tabs-pill-bg: rgba(255, 255, 255, 0.2);

  --icon-swap-dur: 250ms;
  --icon-swap-blur: 2px;
  --icon-swap-start-scale: 0.25;
  --icon-swap-ease: ease-in-out;

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

  --text-morph-dur: 180ms;
  --text-morph-resize-dur: 240ms;
  --text-morph-blur: 2px;
  --text-morph-ease: cubic-bezier(0.22, 1, 0.36, 1);

  --wx-sky-fade: 700ms;
  --wx-sky-ease: ease-in-out;
  --wx-drift-dur: 16s;
  --wx-drift-distance: 18px;
  --wx-rain-dur: 800ms;
  --wx-flash-dur: 7s;

  --wx-spin-dur: 30s;
  --wx-float-dur: 4s;
  --wx-float-distance: 3px;
  --wx-drop-dur: 1100ms;

  --press-scale: 0.99;
  --press-dur: 150ms;
  --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);

  --wx-muted: rgba(255, 255, 255, 0.8);
  --wx-sun: #ffd75e;
}

.wx {
  position: relative;
  width: 300px;
  max-width: 100%;
  border-radius: 27px;
  overflow: hidden;
  isolation: isolate;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 32px -4px rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.06);
}
html[data-theme="dark"] .wx {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 32px -4px rgba(0, 0, 0, 0.5);
}
:where(.wx) button { font: inherit; padding: 0; border: 0; background: none; color: inherit; }

/* Sky backdrop */
.wx-bg { position: absolute; inset: 0; z-index: -1; }
.wx-sky {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity var(--wx-sky-fade) var(--wx-sky-ease);
}
.wx-bg[data-wx="clear"] .wx-sky[data-key="clear"],
.wx-bg[data-wx="cloudy"] .wx-sky[data-key="cloudy"],
.wx-bg[data-wx="rain"] .wx-sky[data-key="rain"],
.wx-bg[data-wx="storm"] .wx-sky[data-key="storm"] { opacity: 1; }

.wx-sky[data-key="clear"] { background: linear-gradient(180deg, #1f6fd1 0%, #2f7fdb 55%, #3b8ae0 100%); }
.wx-sky[data-key="cloudy"] { background: linear-gradient(180deg, #4e6a85 0%, #7a91a8 100%); }
.wx-sky[data-key="rain"] { background: linear-gradient(180deg, #3f5266 0%, #5f7388 100%); }
.wx-sky[data-key="storm"] { background: linear-gradient(180deg, #323b47 0%, #56616e 100%); }

.wx-blob {
  position: absolute;
  border-radius: 50%;
  animation: wx-drift var(--wx-drift-dur) ease-in-out infinite alternate;
}
.wx-blob--glow {
  width: 240px; height: 240px; right: -110px; bottom: -110px;
  background: radial-gradient(circle, rgba(255, 200, 120, 0.34), rgba(255, 200, 120, 0) 65%);
}
.wx-blob--cool {
  width: 280px; height: 280px; left: -130px; top: 70px;
  background: radial-gradient(circle, rgba(110, 190, 255, 0.32), rgba(110, 190, 255, 0) 68%);
  animation-duration: calc(var(--wx-drift-dur) * 1.3);
  animation-direction: alternate-reverse;
}
.wx-blob--cloud1 {
  width: 300px; height: 170px; left: -90px; top: 110px;
  background: radial-gradient(ellipse, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 68%);
}
.wx-blob--cloud2 {
  width: 240px; height: 150px; right: -90px; bottom: 30px;
  background: radial-gradient(ellipse, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 68%);
  animation-duration: calc(var(--wx-drift-dur) * 1.25);
  animation-direction: alternate-reverse;
}
.wx-blob--mist {
  width: 320px; height: 200px; left: -60px; bottom: -40px;
  background: radial-gradient(ellipse, rgba(170, 200, 230, 0.22), rgba(170, 200, 230, 0) 68%);
}
.wx-blob--storm {
  width: 300px; height: 200px; right: -100px; top: 40px;
  background: radial-gradient(ellipse, rgba(140, 160, 190, 0.2), rgba(140, 160, 190, 0) 68%);
}
@keyframes wx-drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(var(--wx-drift-distance), calc(var(--wx-drift-distance) * -0.6)) scale(1.08); }
}

.wx-rain { position: absolute; inset: 0; }
.wx-rain > span {
  position: absolute;
  top: -24px;
  left: var(--x);
  width: 1.5px;
  height: var(--len, 16px);
  border-radius: 1px;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.42));
  animation: wx-fall var(--wx-rain-dur) linear infinite;
  animation-delay: calc(var(--wx-rain-dur) * var(--d) * -1);
}
@keyframes wx-fall {
  from { transform: translate(0, 0) rotate(8deg); }
  to { transform: translate(-50px, 380px) rotate(8deg); }
}
.wx-flash {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: radial-gradient(ellipse at 70% 0%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 70%);
  animation: wx-flash var(--wx-flash-dur) ease-out infinite;
}
@keyframes wx-flash {
  0%, 86%, 100% { opacity: 0; }
  88% { opacity: 0.4; }
  89% { opacity: 0.08; }
  91% { opacity: 0.3; }
}

/* Content */
.wx-body { padding: 24px 24px 0; }
.wx-place {
  font-size: 16px; line-height: 22px; font-weight: 500;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.wx-day { font-size: 12px; line-height: 16px; color: var(--wx-muted); }
.wx-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}
.wx-temp {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  font-size: 60px;
  line-height: 70px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.wx-cond { font-size: 13px; line-height: 20px; margin-top: 4px; }
.wx-hl {
  font-size: 12px; line-height: 16px; color: var(--wx-muted);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}

/* Large icon: icon swap */
.t-icon-swap { position: relative; display: inline-grid; }
.wx-big { flex: none; width: 64px; height: 64px; display: grid; place-items: center; }
.t-icon-swap .t-icon {
  grid-area: 1 / 1;
  position: relative;
  display: grid;
  place-items: center;
  opacity: 0;
  filter: blur(var(--icon-swap-blur));
  transform: scale(var(--icon-swap-start-scale));
  transition:
    opacity   var(--icon-swap-dur) var(--icon-swap-ease),
    filter    var(--icon-swap-dur) var(--icon-swap-ease),
    transform var(--icon-swap-dur) var(--icon-swap-ease);
}
.t-icon-swap[data-state="sun"] .t-icon[data-key="sun"],
.t-icon-swap[data-state="cloud"] .t-icon[data-key="cloud"],
.t-icon-swap[data-state="rain"] .t-icon[data-key="rain"],
.t-icon-swap[data-state="bolt"] .t-icon[data-key="bolt"] {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}
.wx-big .t-icon[data-key="sun"], .wx-big .t-icon[data-key="bolt"] { color: var(--wx-sun); }
.wx-big .t-icon[data-key="cloud"], .wx-big .t-icon[data-key="rain"] { color: #fff; }
.wx-big .hi, .wx-big .hi path, .wx-big .hi circle { stroke-width: 2.1; }
.wx-idle { display: grid; place-items: center; }
.wx-idle--spin { animation: wx-spin var(--wx-spin-dur) linear infinite; }
.wx-idle--float { animation: wx-float var(--wx-float-dur) ease-in-out infinite alternate; }
.wx-idle--flicker { animation: wx-flicker calc(var(--wx-float-dur) * 1.5) ease-in-out infinite; }
@keyframes wx-spin { to { transform: rotate(360deg); } }
@keyframes wx-float {
  from { transform: translateY(calc(var(--wx-float-distance) * -1)); }
  to { transform: translateY(var(--wx-float-distance)); }
}
@keyframes wx-flicker {
  0%, 70%, 100% { opacity: 1; transform: scale(1); }
  74% { opacity: 0.55; transform: scale(0.97); }
  78% { opacity: 1; transform: scale(1.02); }
}
.wx-drops {
  position: absolute;
  left: 50%;
  top: 46px;
  width: 24px;
  margin-left: -12px;
  display: flex;
  justify-content: space-between;
}
.wx-drops > span {
  width: 2.5px;
  height: 7px;
  border-radius: 2px;
  background: #fff;
  opacity: 0;
  animation: wx-drop var(--wx-drop-dur) ease-in infinite;
}
.wx-drops > span:nth-child(2) { animation-delay: calc(var(--wx-drop-dur) * 0.35); }
.wx-drops > span:nth-child(3) { animation-delay: calc(var(--wx-drop-dur) * 0.7); }
@keyframes wx-drop {
  0% { transform: translateY(-2px); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(10px); opacity: 0; }
}

/* Number pop-in */
@keyframes t-digit-pop-in {
  0% {
    transform: translate(
      calc(var(--digit-distance) * var(--digit-dir-x)),
      calc(var(--digit-distance) * var(--digit-dir-y))
    );
    opacity: 0;
    filter: blur(var(--digit-blur));
  }
  100% { transform: translate(0, 0); opacity: 1; filter: blur(0); }
}
.t-digit-group { display: inline-flex; align-items: baseline; }
.t-digit { display: inline-block; }
.t-digit-group.is-animating .t-digit { animation: t-digit-pop-in var(--digit-dur) var(--digit-ease) both; }
.t-digit-group.is-animating .t-digit[data-stagger="1"] { animation-delay: var(--digit-stagger); }
.t-digit-group.is-animating .t-digit[data-stagger="2"] { animation-delay: calc(var(--digit-stagger) * 2); }
.t-digit-group.is-animating .t-digit[data-same] { animation: none; }

/* Text states swap */
.t-text-swap {
  display: inline-block;
  transform: translateY(0);
  filter: blur(0);
  opacity: 1;
  transition:
    transform var(--text-swap-dur) var(--text-swap-ease),
    filter    var(--text-swap-dur) var(--text-swap-ease),
    opacity   var(--text-swap-dur) var(--text-swap-ease);
}
.t-text-swap.is-exit {
  transform: translateY(calc(var(--text-swap-translate-y) * -1));
  filter: blur(var(--text-swap-blur));
  opacity: 0;
}
.t-text-swap.is-enter-start {
  transform: translateY(var(--text-swap-translate-y));
  filter: blur(var(--text-swap-blur));
  opacity: 0;
  transition: none;
}

/* Text morph */
.t-morph { white-space: nowrap; }
.t-morph-swap {
  display: inline-grid;
  vertical-align: bottom;
  justify-items: start;
  transition: width var(--text-morph-resize-dur) var(--text-morph-ease);
}
.t-morph-swap > span {
  grid-area: 1 / 1;
  white-space: pre;
  transition:
    opacity var(--text-morph-dur) var(--text-morph-ease),
    filter  var(--text-morph-dur) var(--text-morph-ease);
}
.t-morph-new { opacity: 0; filter: blur(var(--text-morph-blur)); }
.t-morph-swap.is-morphing .t-morph-old { opacity: 0; filter: blur(var(--text-morph-blur)); }
.t-morph-swap.is-morphing .t-morph-new { opacity: 1; filter: blur(0); }

/* Tabs sliding */
.t-tabs {
  position: relative;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px;
  margin: 16px 12px 12px;
  border-radius: 15px;
  background: var(--tabs-bar-bg);
}
.t-tab {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--tabs-text-muted);
  cursor: pointer;
  border-radius: 12px;
  z-index: 1;
  transition:
    color var(--tabs-dur) var(--tabs-ease),
    transform var(--press-dur) var(--ease-smooth-out);
}
.t-tab:is(:active,.is-pressed) {
  transform: scale(var(--press-scale));
  transition: color var(--tabs-dur) var(--tabs-ease), transform 0ms;
}
.t-tab[aria-selected="true"] { color: var(--tabs-text-active); }
@media (hover: hover) and (pointer: fine) { .t-tab:not([aria-selected="true"]):hover { color: var(--tabs-text-active); } }
.t-tab:focus-visible { outline: 2px solid #fff; outline-offset: -2px; }
.t-tabs-pill {
  position: absolute;
  top: 3px;
  left: 0;
  height: 48px;
  width: 0;
  background: var(--tabs-pill-bg);
  border-radius: 12px;
  transform: translateX(0);
  transition:
    transform var(--tabs-dur) var(--tabs-ease),
    width     var(--tabs-dur) var(--tabs-ease);
  will-change: transform, width;
  z-index: 0;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .wx-blob, .wx-rain > span, .wx-flash, .wx-idle, .wx-drops > span { animation: none !important; }
  .wx-rain, .wx-flash { display: none; }
  .wx-drops > span { opacity: 1; }
  .t-icon-swap .t-icon { transition: opacity var(--icon-swap-dur) linear !important; filter: none !important; transform: none !important; }
  .t-digit-group .t-digit { animation: none !important; }
  .t-text-swap { transition: none !important; }
  .t-morph-swap, .t-morph-swap > span { transition: none !important; }
  .t-tabs-pill, .t-tab { transition: none !important; }
  .t-tab:is(:active,.is-pressed) { transform: none; }
}

/* Touch: controls press in full on a tap, never select their label, and hover only applies with a mouse. */
.wx :where(button,[role="button"],[role="tab"],[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"],[role="option"],[role="switch"],summary,.t-pressable){-webkit-tap-highlight-color:transparent;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
`;
