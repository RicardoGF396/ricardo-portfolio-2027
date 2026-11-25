"use client";

import { useEffect, useRef } from "react";

/* Chart card — transitions.dev Community (id=cCzBMDEJl4z), in light mode.
 * CSS kept verbatim but scoped under `.spend`, with the original `--stage-*`
 * mapped to the app's `--color-*`. The script is ported as-is into one effect
 * that owns the bars and legend imperatively, so this component holds no React
 * state; `token()` reads from the card root instead of documentElement. */

type Period = "week" | "month" | "year";

type Slice = {
  range: string;
  v: number[];
  req: string;
  cost: string;
  peak: string;
  labels: string[];
  w: number[][];
};

interface Seg extends HTMLDivElement {
  _m: number;
  _c: number;
}

const MODELS = [
  { name: "Atlas Large", color: "#1C5FFB" },
  { name: "Atlas Mini", color: "#B01CFB" },
  { name: "Embeddings", color: "#EF8121" },
  { name: "Vision", color: "#1EBB26" },
];

const DATA: Record<Period, Slice> = {
  week: {
    range: "Jul 1 – 7",
    v: [640, 480, 300, 240],
    req: "184K",
    cost: "$412",
    peak: "Thu",
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    w: [
      [14, 15, 16, 20, 15, 11, 9],
      [12, 16, 14, 19, 15, 13, 11],
      [13, 14, 18, 17, 16, 12, 10],
      [10, 13, 15, 22, 18, 12, 10],
    ],
  },
  month: {
    range: "July",
    v: [2800, 1900, 1300, 900],
    req: "810K",
    cost: "$1,780",
    peak: "Jul 14",
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    w: [
      [12, 14, 15, 19, 16, 13, 11],
      [10, 15, 14, 16, 17, 15, 13],
      [14, 12, 16, 15, 14, 17, 12],
      [9, 13, 17, 18, 15, 14, 14],
    ],
  },
  year: {
    range: "2025",
    v: [31000, 22500, 14000, 9800],
    req: "9.6M",
    cost: "$21.4K",
    peak: "Mar",
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"],
    w: [
      [10, 17, 14, 15, 13, 14, 17],
      [12, 15, 16, 13, 14, 15, 15],
      [9, 14, 15, 16, 16, 14, 16],
      [11, 16, 13, 14, 15, 15, 16],
    ],
  },
};

export default function ChartCard() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
    const token = (n: string) =>
      getComputedStyle(root).getPropertyValue(n).trim();
    const ms = (n: string) => parseFloat(token(n)) || 0;

    const cleanups: Array<() => void> = [];
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const softTimers = new WeakMap<
      HTMLElement,
      ReturnType<typeof setTimeout>
    >();

    function softSwap(el: HTMLElement, next: string) {
      const prev = el.dataset.text != null ? el.dataset.text : el.textContent;
      if (prev === next) return;
      el.dataset.text = next;
      clearTimeout(softTimers.get(el));
      const out = document.createElement("span");
      out.className = "t-text-soft-old";
      out.setAttribute("aria-hidden", "true");
      out.textContent = prev;
      const inn = document.createElement("span");
      inn.className = "t-text-soft-new";
      inn.textContent = next;
      const w0 = el.getBoundingClientRect().width;
      el.classList.remove("is-swapping");
      el.replaceChildren(out, inn);
      const w1 = inn.getBoundingClientRect().width;
      el.style.width = w0 + "px";
      void el.offsetWidth;
      el.classList.add("is-swapping");
      el.style.width = w1 + "px";
      const t = setTimeout(
        () => {
          el.classList.remove("is-swapping");
          el.style.removeProperty("width");
          el.textContent = next;
        },
        Math.max(ms("--text-soft-dur"), ms("--text-soft-resize-dur")) + 40,
      );
      softTimers.set(el, t);
      timers.push(t);
    }

    const fmt = (k: number) => {
      k = Math.round(k);
      return k >= 1000 ? (k / 1000).toFixed(1) + "M" : k + "K";
    };
    const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
    const cellsOf = (d: Slice) =>
      d.v.map((v, i) => {
        const s = sum(d.w[i]);
        return d.w[i].map((w) => (v * w) / s);
      });

    const wrap = q<HTMLDivElement>(".chart-wrap");
    const tip = q<HTMLDivElement>(".tip");
    const tipName = q<HTMLSpanElement>(".tip-name");
    const tipVal = q<HTMLSpanElement>(".tip-val");
    const legend = q<HTMLUListElement>(".legend");
    const totalEl = q<HTMLSpanElement>(".total");
    const rangeEl = q<HTMLSpanElement>(".range");
    const barsEl = q<HTMLDivElement>(".bars");
    let current = DATA.week;
    let cells = cellsOf(current);

    const segs: Seg[] = [];
    const labels: HTMLSpanElement[] = [];
    for (let c = 0; c < 7; c++) {
      const col = document.createElement("div");
      col.className = "bcol";
      const stack = document.createElement("div");
      stack.className = "stack";
      MODELS.forEach((m, i) => {
        const s = document.createElement("div") as Seg;
        s.className = "seg";
        s.style.setProperty("--c", m.color);
        s._m = i;
        s._c = c;
        stack.appendChild(s);
        segs.push(s);
      });
      const lb = document.createElement("span");
      lb.className = "blabel";
      lb.textContent = DATA.week.labels[c];
      labels.push(lb);
      col.appendChild(stack);
      col.appendChild(lb);
      barsEl.appendChild(col);
    }

    function layout() {
      const gap = parseFloat(token("--chart-gap")) || 0;
      const avail = 126 - gap * 3;
      let max = 0;
      for (let c = 0; c < 7; c++) {
        let t = 0;
        cells.forEach((r) => (t += r[c]));
        max = Math.max(max, t);
      }
      segs.forEach((s) => {
        s.style.height = ((cells[s._m][s._c] / max) * avail).toFixed(2) + "px";
      });
    }

    const vals: HTMLSpanElement[] = [];
    MODELS.forEach((m) => {
      const row = document.createElement("li");
      row.className = "row";
      row.style.setProperty("--c", m.color);
      const key = document.createElement("span");
      key.className = "key";
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = m.name;
      const val = document.createElement("span");
      val.className = "t-text-soft val";
      val.style.setProperty("--text-soft-align", "end");
      row.append(key, name, val);
      legend.appendChild(row);
      vals.push(val);
    });
    const rows = Array.prototype.slice.call(legend.children) as HTMLElement[];

    const dEls = Array.prototype.slice.call(
      root.querySelectorAll("[data-d]"),
    ) as HTMLElement[];

    function render(d: Slice, first: boolean) {
      current = d;
      cells = cellsOf(d);
      const t = sum(d.v);
      if (first) {
        totalEl.textContent = fmt(t);
        rangeEl.textContent = d.range;
        vals.forEach((el, i) => (el.textContent = fmt(d.v[i])));
        dEls.forEach(
          (el) =>
            (el.textContent = String(d[el.dataset.d as keyof Slice] ?? "")),
        );
        labels.forEach((el, i) => (el.textContent = d.labels[i]));
        requestAnimationFrame(() => requestAnimationFrame(layout));
      } else {
        layout();
        softSwap(totalEl, fmt(t));
        softSwap(rangeEl, d.range);
        vals.forEach((el, i) => softSwap(el, fmt(d.v[i])));
        dEls.forEach((el) =>
          softSwap(el, String(d[el.dataset.d as keyof Slice] ?? "")),
        );
        labels.forEach((el, i) => (el.textContent = d.labels[i]));
      }
    }
    render(DATA.week, true);

    function dim(idx: number) {
      segs.forEach((s) =>
        s.classList.toggle("is-dim", idx !== -1 && s._m !== idx),
      );
    }

    let hideT: ReturnType<typeof setTimeout>;
    segs.forEach((seg) => {
      const show = (e: PointerEvent) => {
        clearTimeout(hideT);
        const r = wrap.getBoundingClientRect();
        const v = cells[seg._m][seg._c];
        let colTotal = 0;
        cells.forEach((row) => (colTotal += row[seg._c]));
        tipName.textContent =
          MODELS[seg._m].name + " · " + current.labels[seg._c];
        tipVal.textContent =
          fmt(v) + " · " + Math.round((v / colTotal) * 100) + "%";
        const x = Math.min(
          Math.max(e.clientX - r.left + 12, 0),
          r.width - 150,
        );
        const y = e.clientY - r.top - 12;
        tip.style.transform =
          "translate(" + x + "px, " + Math.max(y - 44, -8) + "px)";
        tip.classList.add("is-on");
        dim(seg._m);
      };
      const leave = () => {
        clearTimeout(hideT);
        hideT = setTimeout(() => {
          tip.classList.remove("is-on");
          dim(-1);
        }, 80);
        timers.push(hideT);
      };
      seg.addEventListener("pointerenter", show);
      seg.addEventListener("pointermove", show);
      seg.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        seg.removeEventListener("pointerenter", show);
        seg.removeEventListener("pointermove", show);
        seg.removeEventListener("pointerleave", leave);
      });
    });

    rows.forEach((row, i) => {
      const on = () => dim(i);
      const off = () => dim(-1);
      row.addEventListener("pointerenter", on);
      row.addEventListener("pointerleave", off);
      cleanups.push(() => {
        row.removeEventListener("pointerenter", on);
        row.removeEventListener("pointerleave", off);
      });
    });

    const bar = q<HTMLDivElement>(".t-tabs");
    const pill = bar.querySelector<HTMLSpanElement>(".t-tabs-pill")!;
    const tabs = Array.prototype.slice.call(
      bar.querySelectorAll(".t-tab"),
    ) as HTMLButtonElement[];

    function moveTo(tab: HTMLButtonElement, animate: boolean) {
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
    }
    const active = () =>
      tabs.filter((t) => t.getAttribute("aria-selected") === "true")[0] ||
      tabs[0];

    tabs.forEach((tab) => {
      const onClick = () => {
        tabs.forEach((t) =>
          t.setAttribute("aria-selected", t === tab ? "true" : "false"),
        );
        moveTo(tab, true);
        render(DATA[tab.dataset.period as Period], false);
      };
      tab.addEventListener("click", onClick);
      cleanups.push(() => tab.removeEventListener("click", onClick));
    });

    const raf = requestAnimationFrame(() => moveTo(active(), false));
    const onResize = () => moveTo(active(), false);
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));

    const acc = q<HTMLDivElement>(".t-acc");
    const accHead = q<HTMLButtonElement>(".t-acc-head");
    const onAcc = () => {
      const open = acc.getAttribute("data-open") === "true";
      acc.setAttribute("data-open", String(!open));
      accHead.setAttribute("aria-expanded", String(!open));
    };
    accHead.addEventListener("click", onAcc);
    cleanups.push(() => accHead.removeEventListener("click", onAcc));

    // Touch press: a tap holds .is-pressed for at least --press-dur.
    const PRESS_SEL = 'button,[role="tab"],.t-pressable';
    const minPress = ms("--press-dur") || 150;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLButtonElement>(
        PRESS_SEL,
      );
      if (!el || el.disabled) return;
      const t0 = performance.now();
      el.classList.add("is-pressed");
      const up = () => {
        document.removeEventListener("pointerup", up, true);
        document.removeEventListener("pointercancel", up, true);
        const t = setTimeout(
          () => el.classList.remove("is-pressed"),
          Math.max(0, minPress - (performance.now() - t0)),
        );
        timers.push(t);
      };
      document.addEventListener("pointerup", up, true);
      document.addEventListener("pointercancel", up, true);
    };
    root.addEventListener("pointerdown", onDown, { passive: true });
    cleanups.push(() => root.removeEventListener("pointerdown", onDown));

    return () => {
      cleanups.forEach((fn) => fn());
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      barsEl.replaceChildren();
      legend.replaceChildren();
    };
  }, []);

  return (
    <div className="spend" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="head">
        <div>
          <h2 className="h-title">Token spend</h2>
          <p className="h-meta">
            <span className="t-text-soft range" />
          </p>
        </div>
        <div className="t-tabs" role="tablist" aria-label="Period">
          <span className="t-tabs-pill" aria-hidden="true" />
          <button
            className="t-tab"
            role="tab"
            aria-selected="true"
            data-period="week"
          >
            Week
          </button>
          <button
            className="t-tab"
            role="tab"
            aria-selected="false"
            data-period="month"
          >
            Month
          </button>
          <button
            className="t-tab"
            role="tab"
            aria-selected="false"
            data-period="year"
          >
            Year
          </button>
        </div>
      </div>

      <div className="sum">
        <span className="t-text-soft total" />
        <span className="cap">Tokens</span>
      </div>

      <div className="chart-wrap">
        <div className="bars" />
        <div className="tip" aria-hidden="true">
          <span className="tip-name" />
          <span className="tip-val" />
        </div>
      </div>

      <ul className="legend" />

      <div className="t-acc" data-open="false">
        <button className="t-acc-head" aria-expanded="false">
          Details
          <span className="t-acc-chevron">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.46967 6.46967C4.76256 6.17678 5.23744 6.17678 5.53033 6.46967L8 8.93934L10.4697 6.46967C10.7626 6.17678 11.2374 6.17678 11.5303 6.46967C11.8232 6.76256 11.8232 7.23744 11.5303 7.53033L8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303L4.46967 7.53033C4.17678 7.23744 4.17678 6.76256 4.46967 6.46967Z" />
            </svg>
          </span>
        </button>
        <div className="t-acc-panel">
          <div className="t-acc-panel-inner">
            <ul className="details">
              <li className="drow">
                <span className="name">Requests</span>
                <span
                  className="t-text-soft val"
                  data-d="req"
                  style={{ "--text-soft-align": "end" } as React.CSSProperties}
                />
              </li>
              <li className="drow">
                <span className="name">Estimated cost</span>
                <span
                  className="t-text-soft val"
                  data-d="cost"
                  style={{ "--text-soft-align": "end" } as React.CSSProperties}
                />
              </li>
              <li className="drow">
                <span className="name">Peak day</span>
                <span
                  className="t-text-soft val"
                  data-d="peak"
                  style={{ "--text-soft-align": "end" } as React.CSSProperties}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = `
.spend {
  --chart-morph-dur: 400ms;
  --chart-morph-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --chart-gap: 3px;
  --chart-corner: 2px;
  --tabs-dur: 250ms;
  --tabs-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --tabs-text-muted: var(--stage-muted);
  --tabs-text-active: var(--stage-fg);
  --tabs-bar-bg: rgba(0,0,0,.04);
  --tabs-pill-bg: #ffffff;
  --text-soft-dur: 200ms;
  --text-soft-blur: 2px;
  --text-soft-ease: ease-in-out;
  --text-soft-resize-dur: 240ms;
  --text-soft-resize-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --tip-dur: 150ms;
  --tip-scale: 0.97;
  --tip-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --acc-expand: 250ms;
  --acc-collapse: 250ms;
  --acc-chevron: 250ms;
  --acc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --press-scale: 0.97;
  --press-dur: 150ms;
  --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);
  --chip: rgba(0,0,0,.04);
  --card-shadow: 0 0 0 1px rgba(0,0,0,.04), 0 8px 32px -4px rgba(0,0,0,.06), 0 1px 3px 0 rgba(0,0,0,.04);
  --material-shadow: 0 4px 42px rgba(0,0,0,.06), 0 2px 6px rgba(0,0,0,.05), 0 0 0 1px rgba(0,0,0,.06);
  --pill-shadow: 0 1px 2px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04);

  --stage-bg: var(--color-bg);
  --stage-fg: var(--color-fg);
  --stage-muted: var(--color-muted);
  --stage-border: var(--color-line);
  --stage-surface: var(--color-card);
  --stage-accent: var(--color-fg);
}
html[data-theme="dark"] .spend {
  --tabs-bar-bg: rgba(255,255,255,.07);
  --tabs-pill-bg: rgba(255,255,255,.12);
  --chip: rgba(255,255,255,.07);
  --card-shadow: 0 0 0 1px rgba(255,255,255,.06), 0 8px 32px -4px rgba(0,0,0,.4);
  --material-shadow: 0 1px 3px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.04), inset 0 0 0 1px rgba(196,196,196,.08);
  --pill-shadow: none;
}

:where(.spend), :where(.spend) * { box-sizing: border-box; margin: 0; padding: 0; }
:where(.spend) button { font: inherit; }
.spend {
  width: 320px;
  max-width: 100%;
  padding: 0 0 24px;
  overflow: hidden;
  border-radius: 20px;
  background: var(--stage-surface);
  box-shadow: var(--card-shadow);
  color: var(--stage-fg);
  display: grid;
  gap: 16px;
}
.spend .head { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; padding: 24px; }
.spend .head::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--stage-border) 49%, transparent) 20%, color-mix(in srgb, var(--stage-border) 49%, transparent) 80%, transparent); }
.spend > :not(.head) { margin-left: 24px; margin-right: 24px; }
.spend .h-title { font-size: 28px; line-height: 34px; font-weight: 500; white-space: nowrap; }
.spend .h-meta { margin-top: 4px; font-size: 12px; line-height: 16px; color: var(--stage-muted); font-variant-numeric: tabular-nums; }

.spend .chart-wrap { position: relative; height: 150px; display: flex; justify-content: center; }
.spend .total { font-size: 16px; line-height: 22px; font-weight: 500; justify-self: center; font-variant-numeric: tabular-nums; }
.spend .cap { font-size: 12px; line-height: 16px; color: var(--stage-muted); }

.spend .tip {
  position: absolute;
  left: 0; top: 0;
  z-index: 5;
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--stage-surface);
  box-shadow: var(--material-shadow);
  display: grid;
  pointer-events: none;
  white-space: nowrap;
  opacity: 0;
  scale: var(--tip-scale);
  transition: opacity var(--tip-dur) var(--tip-ease), scale var(--tip-dur) var(--tip-ease);
}
.spend .tip.is-on { opacity: 1; scale: 1; }
.spend .tip-name { font-size: 13px; line-height: 20px; }
.spend .tip-val { font-size: 12px; line-height: 16px; color: var(--stage-muted); font-variant-numeric: tabular-nums; }

.spend .legend { list-style: none; display: grid; gap: 0; }
.spend .row {
  display: flex; align-items: center; gap: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 13px; line-height: 20px;
  transition: background-color var(--tip-dur) var(--tip-ease);
}
@media (hover: hover) and (pointer: fine) { .spend .row:hover { background: var(--chip); } }
.spend .key { width: 8px; height: 8px; border-radius: 3px; background: var(--c); flex: none; }
.spend .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.spend .val { color: var(--stage-muted); font-variant-numeric: tabular-nums; flex: none; }

/* Tabs sliding */
.spend .t-tabs { position: relative; display: inline-flex; align-items: center; gap: 2px; padding: 3px; border-radius: 48px; background: var(--tabs-bar-bg); flex: none; }
.spend .t-tab {
  position: relative; appearance: none; border: 0; background: transparent;
  height: 26px; padding: 0 10px; font-size: 12px; line-height: 16px; font-weight: 500;
  color: var(--tabs-text-muted); cursor: pointer; border-radius: 48px; z-index: 1;
  transition: color var(--tabs-dur) var(--tabs-ease), transform var(--press-dur) var(--ease-smooth-out);
}
.spend .t-tab:is(:active,.is-pressed) { transform: scale(var(--press-scale)); }
.spend .t-tab[aria-selected="true"] { color: var(--tabs-text-active); }
@media (hover: hover) and (pointer: fine) { .spend .t-tab:not([aria-selected="true"]):hover { color: var(--tabs-text-active); } }
.spend .t-tab:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--stage-surface), 0 0 0 4px var(--stage-accent); }
.spend .t-tabs-pill {
  position: absolute; top: 3px; left: 0; height: 26px; width: 0;
  background: var(--tabs-pill-bg); box-shadow: var(--pill-shadow); border-radius: 48px;
  transform: translateX(0);
  transition: transform var(--tabs-dur) var(--tabs-ease), width var(--tabs-dur) var(--tabs-ease);
  will-change: transform, width; z-index: 0; pointer-events: none;
}

/* Stacked bar chart */
.spend .sum { display: flex; align-items: baseline; gap: 8px; }
.spend .bars { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; width: 100%; height: 150px; }
.spend .bcol { display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; min-width: 0; }
.spend .stack { display: flex; flex-direction: column-reverse; justify-content: flex-start; gap: var(--chart-gap); height: 126px; }
.spend .seg { flex: none; height: 0; background: var(--c); border-radius: var(--chart-corner); cursor: pointer; transition: height var(--chart-morph-dur) var(--chart-morph-ease), opacity var(--tip-dur) var(--tip-ease); }
.spend .seg.is-dim { opacity: 0.2; }
.spend .blabel { align-self: center; font-size: 12px; line-height: 16px; color: var(--stage-muted); }

/* Accordion */
.spend .t-acc-head {
  --press-scale: 0.99;
  width: 100%; height: 36px; padding: 0 10px 0 12px; border: 0; border-radius: 10px;
  background: var(--chip); color: var(--stage-fg); cursor: pointer;
  display: flex; align-items: center; justify-content: space-between;
  font-size: 13px; line-height: 20px; font-weight: 500;
  transition: transform var(--press-dur) var(--ease-smooth-out);
}
.spend .t-acc-head:is(:active,.is-pressed) { transform: scale(var(--press-scale)); }
.spend .t-acc-head:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--stage-surface), 0 0 0 4px var(--stage-accent); }
.spend .t-acc-chevron { color: var(--stage-muted); width: 16px; height: 16px; align-items: center; justify-content: center; }
.spend .t-acc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--acc-collapse) var(--acc-ease); }
.spend .t-acc[data-open="true"] .t-acc-panel { grid-template-rows: 1fr; transition: grid-template-rows var(--acc-expand) var(--acc-ease); }
.spend .t-acc-panel-inner { overflow: hidden; opacity: 0; filter: blur(2px); transition: opacity var(--acc-collapse) var(--acc-ease), filter var(--acc-collapse) var(--acc-ease); }
.spend .t-acc[data-open="true"] .t-acc-panel-inner { opacity: 1; filter: blur(0); transition: opacity var(--acc-expand) var(--acc-ease), filter var(--acc-expand) var(--acc-ease); }
.spend .t-acc-chevron { display: inline-flex; transform: scaleY(1); transform-origin: center; transition: transform var(--acc-chevron) var(--acc-ease); }
.spend .t-acc-chevron path { vector-effect: non-scaling-stroke; }
.spend .t-acc[data-open="true"] .t-acc-chevron { transform: scaleY(-1); }
.spend .details { list-style: none; display: grid; gap: 0; padding-top: 4px; }
.spend .drow { display: flex; align-items: center; gap: 8px; padding: 4px 12px; font-size: 13px; line-height: 20px; }

/* Text swap soft */
.spend .t-text-soft { display: inline-grid; justify-items: var(--text-soft-align, start); transition: width var(--text-soft-resize-dur) var(--text-soft-resize-ease); }
.spend .t-text-soft > span { grid-area: 1 / 1; white-space: pre; transition: filter var(--text-soft-dur) var(--text-soft-ease), opacity var(--text-soft-dur) var(--text-soft-ease); }
.spend .t-text-soft-new { opacity: 0; filter: blur(var(--text-soft-blur)); }
.spend .t-text-soft.is-swapping .t-text-soft-old { opacity: 0; filter: blur(var(--text-soft-blur)); }
.spend .t-text-soft.is-swapping .t-text-soft-new { opacity: 1; filter: blur(0); }

@media (prefers-reduced-motion: reduce) {
  .spend .t-tabs-pill, .spend .t-tab, .spend .seg, .spend .t-text-soft, .spend .t-text-soft > span, .spend .tip, .spend .row { transition: none !important; }
  .spend .t-tab:is(:active,.is-pressed), .spend .t-acc-head:is(:active,.is-pressed) { transform: none; }
  .spend .t-acc-panel, .spend .t-acc-panel-inner, .spend .t-acc-chevron, .spend .t-acc-head { transition: none !important; }
}

.spend :where(button,[role="button"],[role="tab"],summary,.t-pressable){-webkit-tap-highlight-color:transparent;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
`;
