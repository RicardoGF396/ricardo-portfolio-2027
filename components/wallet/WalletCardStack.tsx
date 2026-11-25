"use client";

import { useEffect, useRef } from "react";

/* Wallet Card Stack — from the transitions.dev Community
 * (https://transitions.dev/studio.html?id=cq1oWxLHR7D).
 *
 * A stack of richly colored wallet cards (glows, guilloche patterns, an EMV
 * chip, a contactless mark). Tap a back card to bring it to the front and spin
 * the balance; tap the front card to show/hide its details; hover a card to
 * slide a soft sheen across it.
 *
 * Ported to React/TS. The CSS is kept VERBATIM (source of every duration,
 * easing and the prefers-reduced-motion fallback); the only changes are that
 * every selector is scoped under `.wallet` and the `--stage-*` theme variables
 * are mapped to this project's light tokens (`--color-*`). The behaviour is the
 * original imperative script run once in an effect (the reel counter uses live
 * SVG blur filters — too delicate to re-express declaratively), with cleanup so
 * React Strict Mode never double-wires it. There is no React state, so the
 * imperatively-owned DOM is never reconciled after mount. */

interface ReelCol extends HTMLSpanElement {
  _strip: HTMLSpanElement;
  _blur: SVGElement;
  _fid: string;
  _target: number;
  _digit: number;
  _dist: number;
  _delay: number;
}

type Card = { cls: string; name: string; type: string; digits: string; brand: string };

const CARDS: Card[] = [
  { cls: "w-card--graphite", name: "Everyday", type: "Debit", digits: "•••• 4821", brand: "Lumen" },
  { cls: "w-card--ocean", name: "Travel", type: "Credit", digits: "•••• 0937", brand: "Lumen" },
  { cls: "w-card--copper", name: "Savings", type: "Debit", digits: "•••• 5502", brand: "Lumen" },
];

function Nfc() {
  return (
    <svg
      className="hi w-nfc"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}

export default function WalletCardStack() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wallet = rootRef.current;
    if (!wallet) return;

    const cards = Array.from(wallet.querySelectorAll<HTMLButtonElement>(".w-card"));
    const acc = wallet.querySelector<HTMLDivElement>(".t-acc")!;
    const head = acc.querySelector<HTMLButtonElement>(".t-acc-head")!;
    const swapEl = wallet.querySelector<HTMLElement>(".t-text-swap")!;
    const ms = (n: string, fb: number) => {
      const v = parseFloat(getComputedStyle(wallet).getPropertyValue(n));
      return isFinite(v) ? v : fb;
    };

    const data = [
      { name: "Everyday", balance: 12480.5, num: "•••• 4821", exp: "08/28", spent: "$1,284.20" },
      { name: "Travel", balance: 3215.08, num: "•••• 0937", exp: "11/27", spent: "$642.90" },
      { name: "Savings", balance: 48902.17, num: "•••• 5502", exp: "03/29", spent: "$120.00" },
    ];
    let order = [2, 1, 0];
    const fmt = (n: number) =>
      "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let rafId = 0;

    function reelCounter(reel: HTMLElement, live: HTMLElement, defs: Element) {
      const NS = "http://www.w3.org/2000/svg";
      let cur = "";
      let fid = 0;
      const num = (n: string) => parseFloat(getComputedStyle(wallet!).getPropertyValue(n)) || 0;
      const place = (strip: HTMLElement, i: number) => {
        strip.style.transform = "translateY(calc(var(--reel-cell) * -" + i + "))";
      };
      function column(): ReelCol {
        const col = document.createElement("span") as ReelCol;
        col.className = "t-reel-col";
        const strip = document.createElement("span");
        strip.className = "t-reel-strip";
        for (let k = 0; k < 20; k++) {
          const d = document.createElement("span");
          d.className = "t-reel-digit";
          d.textContent = String(k % 10);
          strip.appendChild(d);
        }
        col.appendChild(strip);
        const f = document.createElementNS(NS, "filter");
        const id = "t-reel-blur-" + fid++;
        f.setAttribute("id", id);
        f.setAttribute("x", "-20%");
        f.setAttribute("y", "-50%");
        f.setAttribute("width", "140%");
        f.setAttribute("height", "200%");
        const g = document.createElementNS(NS, "feGaussianBlur");
        g.setAttribute("stdDeviation", "0 0");
        f.appendChild(g);
        defs.appendChild(f);
        col._strip = strip;
        col._blur = g;
        col._fid = id;
        return col;
      }
      return function set(text: string, animate: boolean) {
        if (text === cur) return;
        live.textContent = text;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) animate = false;
        cancelAnimationFrame(rafId);
        const pd = cur.replace(/\D/g, "");
        const nd = text.replace(/\D/g, "");
        let di = 0;
        const moving: ReelCol[] = [];
        cur = text;
        reel.replaceChildren();
        defs.replaceChildren();
        text.split("").forEach((ch) => {
          if (!/\d/.test(ch)) {
            const s = document.createElement("span");
            s.className = "t-reel-sym";
            s.textContent = ch;
            reel.appendChild(s);
            return;
          }
          const d = +ch;
          const fromEnd = nd.length - 1 - di++;
          const p = pd.charAt(pd.length - 1 - fromEnd);
          const col = column();
          let start = d;
          let target = d;
          let dist = 0;
          if (animate && p !== ch) {
            const from = p === "" ? 0 : +p;
            const fwd = (d - from + 10) % 10;
            if (fwd <= 10 - fwd) {
              start = from;
              target = from + fwd;
              dist = fwd;
            } else {
              start = from + 10;
              target = from + fwd;
              dist = 10 - fwd;
            }
            col._target = target;
            col._digit = d;
            col._dist = dist;
            moving.push(col);
          }
          col._strip.style.transition = "none";
          place(col._strip, start);
          reel.appendChild(col);
        });
        if (!moving.length) return;
        void reel.offsetHeight;
        const dur = num("--reel-dur");
        const stag = num("--reel-stagger");
        const blur = num("--reel-spin-blur");
        moving.forEach((col, i) => {
          col._delay = i * stag;
          col._strip.style.filter = "url(#" + col._fid + ")";
          col._strip.style.transition =
            "transform var(--reel-dur) var(--reel-ease) " + col._delay + "ms";
          place(col._strip, col._target);
        });
        const t0 = performance.now();
        (function tick(now: number) {
          let done = true;
          moving.forEach((col) => {
            const pp = (now - t0 - col._delay) / dur;
            if (pp < 1) done = false;
            const b =
              pp <= 0 || pp >= 1
                ? 0
                : blur * Math.min(1, col._dist / 5) * Math.pow(1 - pp, 3);
            col._blur.setAttribute("stdDeviation", "0 " + b.toFixed(2));
          });
          if (!done) {
            rafId = requestAnimationFrame(tick);
            return;
          }
          moving.forEach((col) => {
            col._strip.style.filter = "none";
            col._strip.style.transition = "none";
            place(col._strip, col._digit);
          });
        })(t0);
      };
    }

    const setBalance = reelCounter(
      wallet.querySelector<HTMLElement>(".t-reel")!,
      wallet.querySelector<HTMLElement>(".sr-only")!,
      wallet.querySelector(".t-reel-defs defs")!,
    );
    setBalance(fmt(data[0].balance), false);

    const swapDur = ms("--text-swap-dur", 150);
    let swapTimer = 0 as unknown as ReturnType<typeof setTimeout>;
    function swapText(next: string) {
      clearTimeout(swapTimer);
      swapEl.classList.add("is-exit");
      swapTimer = setTimeout(() => {
        swapEl.textContent = next;
        swapEl.classList.remove("is-exit");
        swapEl.classList.add("is-enter-start");
        void swapEl.offsetHeight;
        swapEl.classList.remove("is-enter-start");
      }, swapDur);
    }

    const isOpen = () => acc.getAttribute("data-open") === "true";

    function layout() {
      const front = order[order.length - 1];
      const open = isOpen();
      cards.forEach((c, i) => {
        const p = order.indexOf(i);
        c.style.setProperty("--p", String(p));
        c.style.zIndex = String(p + 1);
        const isFront = i === front;
        c.classList.toggle("is-front", isFront);
        if (isFront) {
          c.setAttribute("aria-expanded", String(open));
          c.setAttribute("aria-label", data[i].name + " card, " + (open ? "hide" : "show") + " details");
        } else {
          c.removeAttribute("aria-expanded");
          c.setAttribute("aria-label", "Select " + data[i].name + " card");
        }
      });
    }

    function setOpen(v: boolean) {
      acc.setAttribute("data-open", String(v));
      wallet!.setAttribute("data-open", String(v));
      head.setAttribute("aria-expanded", String(v));
      layout();
    }

    let detailTimer = 0 as unknown as ReturnType<typeof setTimeout>;
    function fillDetails(i: number) {
      wallet!.querySelector('[data-k="num"]')!.textContent = data[i].num;
      wallet!.querySelector('[data-k="exp"]')!.textContent = data[i].exp;
      wallet!.querySelector('[data-k="spent"]')!.textContent = data[i].spent;
    }

    function select(i: number) {
      const wasOpen = isOpen();
      order = order.filter((x) => x !== i).concat(i);
      if (wasOpen) setOpen(false);
      else layout();
      setBalance(fmt(data[i].balance), true);
      swapText(data[i].name);
      clearTimeout(detailTimer);
      detailTimer = setTimeout(() => fillDetails(i), wasOpen ? ms("--acc-collapse", 250) : 0);
    }

    const cleanups: Array<() => void> = [];
    cards.forEach((c, i) => {
      const h = () => {
        if (order[order.length - 1] === i) setOpen(!isOpen());
        else select(i);
      };
      c.addEventListener("click", h);
      cleanups.push(() => c.removeEventListener("click", h));
    });
    const headH = () => setOpen(!isOpen());
    head.addEventListener("click", headH);
    cleanups.push(() => head.removeEventListener("click", headH));

    // Touch press: a tap holds .is-pressed for at least --press-dur, scoped here.
    const pressMin = ms("--press-dur", 150);
    const pressSel = "button,[role='button'],summary,.t-pressable";
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(pressSel);
      if (!el || (el as HTMLButtonElement).disabled) return;
      const t0 = performance.now();
      el.classList.add("is-pressed");
      const up = () => {
        document.removeEventListener("pointerup", up, true);
        document.removeEventListener("pointercancel", up, true);
        setTimeout(
          () => el.classList.remove("is-pressed"),
          Math.max(0, pressMin - (performance.now() - t0)),
        );
      };
      document.addEventListener("pointerup", up, true);
      document.addEventListener("pointercancel", up, true);
    };
    wallet.addEventListener("pointerdown", onDown, { passive: true });
    cleanups.push(() => wallet.removeEventListener("pointerdown", onDown));

    layout();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(swapTimer);
      clearTimeout(detailTimer);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="wallet" data-open="false" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: WALLET_CSS }} />

      <div className="wallet-head">
        <span className="balance">
          <span className="t-reel" aria-hidden="true" />
          <span className="sr-only" aria-live="polite" />
        </span>
        <p className="meta">
          Available on <span className="t-text-swap">Everyday</span>
        </p>
        <svg className="t-reel-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <defs />
        </svg>
      </div>

      <div className="stack t-resize">
        {CARDS.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`w-card ${c.cls}`}
            data-i={i}
            aria-controls="card-details"
          >
            <span className="w-row">
              <span className="w-name">{c.name}</span>
              <span className="w-type">{c.type}</span>
            </span>
            <span className="w-mid" aria-hidden="true">
              <span className="w-emv" />
              <Nfc />
            </span>
            <span className="w-row w-row--end">
              <span className="w-num">
                <span className="w-digits">{c.digits}</span>
                <span className="w-holder">Maya Chen</span>
              </span>
              <span className="w-brand">{c.brand}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="t-acc" data-open="false">
        <button type="button" className="t-acc-head" aria-expanded="false" aria-controls="card-details">
          Card details
          <span className="t-acc-chevron">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path
                d="M4.46967 6.46967C4.76256 6.17678 5.23744 6.17678 5.53033 6.46967L8 8.93934L10.4697 6.46967C10.7626 6.17678 11.2374 6.17678 11.5303 6.46967C11.8232 6.76256 11.8232 7.23744 11.5303 7.53033L8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303L4.46967 7.53033C4.17678 7.23744 4.17678 6.76256 4.46967 6.46967Z"
                style={{ fill: "currentColor", stroke: "none" }}
              />
            </svg>
          </span>
        </button>
        <div className="t-acc-panel" id="card-details">
          <div className="t-acc-panel-inner">
            <div className="d-row">
              <span className="d-label">Card number</span>
              <span className="d-val" data-k="num">
                •••• 4821
              </span>
            </div>
            <div className="d-row">
              <span className="d-label">Expires</span>
              <span className="d-val" data-k="exp">
                08/28
              </span>
            </div>
            <div className="d-row">
              <span className="d-label">Spent this month</span>
              <span className="d-val" data-k="spent">
                $1,284.20
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* CSS kept verbatim from the transitions.dev source; the only changes: every
 * selector is scoped under `.wallet`, `:root` → `.wallet` with the `--stage-*`
 * tokens mapped to this project's `--color-*`, `html[data-theme="dark"]` →
 * `html[data-theme="dark"] .wallet`, the touch `:where(...)` block scoped under
 * `.wallet`, and the unused `.hi-play`/`.hi-heart` rules dropped. */
const WALLET_CSS = `
.wallet {
  --stage-bg: var(--color-bg);
  --stage-fg: var(--color-fg);
  --stage-muted: var(--color-muted);
  --stage-border: var(--color-line);
  --stage-surface: var(--color-card);
  --stage-accent: var(--color-fg);
  --stage-on-accent: var(--color-bg);

  --duration-slow: 400ms;
  --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);
  --distance-micro: 4px;
  --wallet-peek: 40px;
  --wallet-tuck: 8px;
  --wallet-tuck-scale: 0.05;
  --reel-dur: 327ms;
  --reel-cell: 34px;
  --reel-spin-blur: 2px;
  --reel-stagger: 19ms;
  --reel-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --acc-expand: 250ms;
  --acc-collapse: 250ms;
  --acc-chevron: 250ms;
  --acc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --resize-dur: 300ms;
  --resize-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --text-swap-dur: 150ms;
  --text-swap-translate-y: 4px;
  --text-swap-blur: 2px;
  --text-swap-ease: ease-in-out;
  --press-scale: 0.99;
  --press-dur: 150ms;
  --sheen-dur: 600ms;
  --sheen-shift: 30%;
  --card-h: 168px;
  --hover: rgba(0,0,0,.02);
  --divider: color-mix(in srgb, var(--stage-border) 49%, transparent);
}
html[data-theme="dark"] .wallet { --hover: rgba(255,255,255,.02); }

:where(.wallet) button { font: inherit; color: inherit; border: 0; padding: 0; margin: 0; background: none; cursor: pointer; }
:where(.wallet) p { margin: 0; }

.wallet {
  width: 320px;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 24px;
  background: var(--stage-surface);
  color: var(--stage-fg);
  box-shadow: 0 0 0 1px rgba(0,0,0,.04), 0 8px 32px -4px rgba(0,0,0,.06), 0 1px 3px 0 rgba(0,0,0,.04);
  -webkit-font-smoothing: antialiased;
}
.wallet :focus-visible { outline: 2px solid var(--stage-accent); outline-offset: 2px; }

.wallet .wallet-head { padding: 8px 8px 16px; }
.wallet .balance { display: block; height: var(--reel-cell); font-size: 28px; line-height: 34px; font-weight: 500; font-variant-numeric: tabular-nums; }
.wallet .meta { font-size: 12px; line-height: 16px; color: var(--stage-muted); }

/* Spinning counter */
.wallet .t-reel { display: inline-flex; align-items: center; height: var(--reel-cell); font-variant-numeric: tabular-nums; white-space: nowrap; }
.wallet .t-reel-col { position: relative; height: var(--reel-cell); overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%); mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%); }
.wallet .t-reel-strip { display: flex; flex-direction: column; will-change: transform, filter; }
.wallet .t-reel-digit, .wallet .t-reel-sym { height: var(--reel-cell); display: flex; align-items: center; justify-content: center; }
.wallet .t-reel-defs { position: absolute; width: 0; height: 0; overflow: hidden; }
.wallet .sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

/* Text states swap */
.wallet .t-text-swap { display: inline-block; transform: translateY(0); filter: blur(0); opacity: 1; transition: transform var(--text-swap-dur) var(--text-swap-ease), filter var(--text-swap-dur) var(--text-swap-ease), opacity var(--text-swap-dur) var(--text-swap-ease); }
.wallet .t-text-swap.is-exit { transform: translateY(calc(var(--text-swap-translate-y) * -1)); filter: blur(var(--text-swap-blur)); opacity: 0; }
.wallet .t-text-swap.is-enter-start { transform: translateY(var(--text-swap-translate-y)); filter: blur(var(--text-swap-blur)); opacity: 0; transition: none; }

/* Card resize */
.wallet .t-resize { transition: width var(--resize-dur) var(--resize-ease), height var(--resize-dur) var(--resize-ease); }

/* Stack */
.wallet .stack { position: relative; height: calc(var(--card-h) + var(--wallet-peek) * 2); }
.wallet[data-open="true"] .stack { height: calc(var(--card-h) + var(--wallet-tuck) * 2); }

.wallet .w-card {
  --p: 0;
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: var(--card-h);
  box-sizing: border-box;
  padding: 16px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  text-align: left;
  color: #fff;
  transform-origin: 50% 0;
  translate: 0 calc(var(--p) * var(--wallet-peek) + var(--hy, 0px));
  transform: scale(1);
  scale: 1;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), inset 0 1px 0 rgba(255,255,255,.14), 0 -2px 10px -2px rgba(0,0,0,.18), 0 8px 20px -8px rgba(0,0,0,.3);
  transition: translate var(--duration-slow) var(--ease-smooth-out), transform var(--duration-slow) var(--ease-smooth-out), scale var(--press-dur) var(--ease-smooth-out);
}
.wallet .w-card::before {
  content: "";
  position: absolute; inset: 0;
  z-index: 0;
  pointer-events: none;
  background: var(--pattern);
  -webkit-mask-image: linear-gradient(135deg, transparent 15%, #000 85%);
  mask-image: linear-gradient(135deg, transparent 15%, #000 85%);
}
.wallet .w-card::after {
  content: "";
  position: absolute; top: 0; bottom: 0; left: -50%; right: -50%;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(115deg, transparent 38%, rgba(255,255,255,.09) 48%, rgba(255,255,255,.03) 54%, transparent 62%);
  translate: calc(var(--sheen-shift) * -1) 0;
  opacity: .6;
  transition: translate var(--sheen-dur) var(--ease-smooth-out), opacity var(--sheen-dur) var(--ease-smooth-out);
}
@media (hover: hover) and (pointer: fine) { .wallet .w-card:hover::after { translate: var(--sheen-shift) 0; opacity: 1; } }
.wallet .w-card > * { position: relative; z-index: 1; }
.wallet .w-card:is(:active,.is-pressed) { scale: var(--press-scale); }
@media (hover: hover) and (pointer: fine) { .wallet:not([data-open="true"]) .w-card:not(.is-front):hover { --hy: calc(var(--distance-micro) * -1); } }
.wallet[data-open="true"] .w-card {
  translate: 0 calc(var(--p) * var(--wallet-tuck));
  transform: scale(calc(1 - (2 - var(--p)) * var(--wallet-tuck-scale)));
}

.wallet .w-card--graphite {
  --pattern: repeating-radial-gradient(circle at 120% 140%, rgba(255,255,255,.07) 0 1px, transparent 1px 11px);
  background: radial-gradient(90% 120% at 100% 0%, rgba(139,124,255,.34), transparent 60%), radial-gradient(80% 100% at 0% 100%, rgba(45,212,191,.16), transparent 60%), linear-gradient(140deg, #262a36 0%, #14161d 55%, #0b0c10 100%);
}
.wallet .w-card--ocean {
  --pattern: repeating-radial-gradient(200% 100% at -10% 130%, rgba(255,255,255,.07) 0 1px, transparent 1px 9px);
  background: radial-gradient(90% 120% at 100% 0%, rgba(94,234,212,.26), transparent 60%), radial-gradient(90% 110% at 0% 100%, rgba(37,99,235,.34), transparent 60%), linear-gradient(140deg, #0d5469 0%, #0b3656 55%, #071d33 100%);
}
.wallet .w-card--copper {
  --pattern: repeating-conic-gradient(from 0deg at 110% -10%, rgba(255,255,255,.06) 0 1deg, transparent 1deg 6deg);
  background: radial-gradient(90% 120% at 100% 0%, rgba(255,190,110,.24), transparent 60%), radial-gradient(90% 110% at 0% 100%, rgba(225,60,110,.26), transparent 60%), linear-gradient(140deg, #9a4422 0%, #6e2a14 55%, #3a1409 100%);
}

.wallet .w-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.wallet .w-row--end { align-items: flex-end; }
.wallet .w-name { flex: 1; min-width: 0; font-size: 15px; line-height: 20px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.wallet .w-type { flex: none; }
.wallet .w-type, .wallet .w-holder { font-size: 12px; line-height: 16px; color: rgba(255,255,255,.82); }
.wallet .w-num { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.wallet .w-digits, .wallet .w-holder { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.wallet .w-digits { font-size: 13px; line-height: 20px; font-variant-numeric: tabular-nums; }
.wallet .w-brand { font-size: 15px; line-height: 20px; font-weight: 500; flex: none; }
.wallet .w-mid { display: flex; align-items: center; gap: 12px; }
.wallet .w-emv {
  position: relative;
  width: 34px; height: 26px;
  border-radius: 6px;
  background: radial-gradient(60% 80% at 30% 20%, rgba(255,255,255,.55), transparent 70%), linear-gradient(135deg, #f6e7bd, #c9a560 50%, #efd89f 75%, #b58f4c);
  box-shadow: inset 0 0 0 1px rgba(80,55,10,.35), inset 0 -1px 0 rgba(80,55,10,.25), 0 1px 2px rgba(0,0,0,.25);
}
.wallet .w-emv::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: linear-gradient(90deg, transparent 32%, rgba(80,55,10,.3) 32% 35%, transparent 35% 65%, rgba(80,55,10,.3) 65% 68%, transparent 68%), linear-gradient(0deg, transparent 30%, rgba(80,55,10,.25) 30% 34%, transparent 34% 66%, rgba(80,55,10,.25) 66% 70%, transparent 70%);
}
.wallet .w-emv::after {
  content: ""; position: absolute; left: 35%; right: 35%; top: 34%; bottom: 34%;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px rgba(80,55,10,.3);
}
.wallet .w-nfc { display: inline-flex; color: rgba(255,255,255,.82); rotate: 90deg; }

/* Accordion */
.wallet .t-acc { margin-top: 8px; }
.wallet .t-acc-head {
  width: 100%; height: 36px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 6px 0 8px;
  border-radius: 12px;
  font-size: 13px; line-height: 20px; font-weight: 500;
  transition: transform var(--press-dur) var(--ease-smooth-out), background-color var(--press-dur) var(--ease-smooth-out);
}
@media (hover: hover) and (pointer: fine) { .wallet .t-acc-head:hover { background: var(--hover); } }
.wallet .t-acc-head:is(:active,.is-pressed) { transform: scale(var(--press-scale)); }
.wallet .t-acc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--acc-collapse) var(--acc-ease); }
.wallet .t-acc[data-open="true"] .t-acc-panel { grid-template-rows: 1fr; transition: grid-template-rows var(--acc-expand) var(--acc-ease); }
.wallet .t-acc-panel-inner { overflow: hidden; opacity: 0; filter: blur(2px); padding: 0 8px; transition: opacity var(--acc-collapse) var(--acc-ease), filter var(--acc-collapse) var(--acc-ease); }
.wallet .t-acc[data-open="true"] .t-acc-panel-inner { opacity: 1; filter: blur(0); transition: opacity var(--acc-expand) var(--acc-ease), filter var(--acc-expand) var(--acc-ease); }
.wallet .t-acc-chevron { display: inline-flex; width: 16px; height: 16px; color: var(--stage-muted); transform: scaleY(1); transform-origin: center; transition: transform var(--acc-chevron) var(--acc-ease); }
.wallet .t-acc-chevron svg { width: 16px; height: 16px; }
.wallet .t-acc-chevron path { vector-effect: non-scaling-stroke; }
.wallet .t-acc[data-open="true"] .t-acc-chevron { transform: scaleY(-1); }

.wallet .d-row { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 36px; font-size: 13px; line-height: 20px; }
.wallet .d-row + .d-row::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--divider) 20%, var(--divider) 80%, transparent); }
.wallet .d-label { color: var(--stage-muted); }
.wallet .d-val { color: var(--stage-fg); font-variant-numeric: tabular-nums; }

@media (prefers-reduced-motion: reduce) {
  .wallet .t-reel-strip { transition: none !important; filter: none !important; }
  .wallet .t-text-swap { transition: none !important; }
  .wallet .t-resize { transition: none !important; }
  .wallet .t-acc-panel, .wallet .t-acc-panel-inner, .wallet .t-acc-chevron { transition: none !important; }
  .wallet .w-card, .wallet .w-card::after { transition: none !important; }
  .wallet .w-card:is(:active,.is-pressed), .wallet .t-acc-head:is(:active,.is-pressed) { scale: 1; transform: none; }
  .wallet[data-open="true"] .w-card:is(:active,.is-pressed) { transform: scale(calc(1 - (2 - var(--p)) * var(--wallet-tuck-scale))); }
}

/* Touch: controls press in full on a tap, never select their label, and hover only applies with a mouse. */
.wallet :where(button,[role="button"],[role="tab"],[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"],[role="option"],[role="switch"],summary,.t-pressable){-webkit-tap-highlight-color:transparent;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
`;
