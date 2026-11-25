"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const avatar = (slug: string) =>
  `https://www.untitledui.com/images/avatars/${slug}?fm=webp&q=80`;

const PEOPLE = [
  { name: "Olivia Rhye", handle: "@olivia", src: avatar("olivia-rhye") },
  { name: "Phoenix Baker", handle: "@phoenix", src: avatar("phoenix-baker") },
  { name: "Lana Steiner", handle: "@lana", src: avatar("lana-steiner") },
  { name: "Demi Wilkinson", handle: "@demi", src: avatar("demi-wilkinson") },
  { name: "Candice Wu", handle: "@candice", src: avatar("candice-wu") },
  { name: "Natali Craig", handle: "@natali", src: avatar("natali-craig") },
  { name: "Drew Cano", handle: "@drew", src: avatar("drew-cano") },
  { name: "Orlando Diggs", handle: "@orlando", src: avatar("orlando-diggs") },
];

// Slot por distancia al centro: x, escala, blur, opacidad y z-index.
const SLOTS = [
  { x: 0, s: 1.9, blur: 0, o: 1, z: 30 },
  { x: 62, s: 1.3, blur: 0, o: 1, z: 20 },
  { x: 106, s: 1, blur: 2, o: 0.85, z: 10 },
  { x: 140, s: 0.7, blur: 5, o: 0, z: 0 },
];

export default function InviteCard() {
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState("");
  const [invited, setInvited] = useState<string[]>([
    "Olivia Rhye",
    "Phoenix Baker",
  ]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setOffset((o) => o + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const toggle = (name: string) =>
    setInvited((inv) =>
      inv.includes(name) ? inv.filter((n) => n !== name) : [...inv, name],
    );

  const q = query.trim().toLowerCase();
  const rows = PEOPLE.filter(
    (p) => !q || p.name.toLowerCase().includes(q),
  ).slice(0, 5);

  return (
    <div className="w-full max-w-[320px] rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_10px_40px_-24px_rgba(0,0,0,0.3)]">
      {/* Carrusel: cada avatar se coloca según su distancia al centro y va
          rotando en loop; en los extremos llega con opacidad 0, así el salto
          del wrap no se ve. */}
      <div className="relative mx-auto h-[84px]">
        {PEOPLE.map((p, i) => {
          const n = PEOPLE.length;
          let rel = (((i - offset) % n) + n) % n;
          if (rel > n / 2) rel -= n;
          const side = rel < 0 ? -1 : 1;
          const slot = SLOTS[Math.min(Math.abs(rel), 3)];
          return (
            <span
              key={p.name}
              className="absolute top-1/2 left-1/2 size-9 overflow-hidden rounded-full transition-all duration-700"
              style={{
                transform: `translate(-50%, -50%) translateX(${side * slot.x}px) scale(${slot.s})`,
                filter: `blur(${slot.blur}px)`,
                opacity: slot.o,
                zIndex: slot.z,
                boxShadow: "0 0 0 2px #fff, 0 6px 16px -6px rgba(0,0,0,0.35)",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Image src={p.src} alt="" fill sizes="68px" />
            </span>
          );
        })}
      </div>

      <h2 className="mt-4 text-center text-xl font-semibold text-fg">
        Invite your people
      </h2>
      <p className="mx-auto mt-1.5 max-w-55 text-center text-sm text-muted">
        Add the friends you want at Saturday&apos;s rooftop dinner.
      </p>

      <label className="mt-5 flex items-center gap-2.5 rounded-2xl border border-[#E2E2E2] bg-[#EBEBE9] px-3.5 py-2.5">
        <svg
          viewBox="0 0 24 24"
          className="size-4 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search friends"
          className="w-full text-sm text-[#696965] outline-none placeholder:text-[#696965]"
        />
      </label>

      <p className="mt-5 text-[13px] text-muted">Friends</p>

      <div className="mt-1">
        {rows.slice(0,4).map((p) => {
          const isIn = invited.includes(p.name);
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => toggle(p.name)}
              className="flex w-full cursor-pointer items-center gap-3 border-b border-line py-2.5 text-left last:border-0"
            >
              <span className="relative size-9 shrink-0 overflow-hidden rounded-full">
                <Image src={p.src} alt="" fill sizes="36px" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-fg">
                  {p.name}
                </span>
                <span className="block text-[13px] text-muted">{p.handle}</span>
              </span>
              {isIn ? (
                <span className="flex items-center gap-1.5 text-[13px] text-muted">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Invited
                </span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 text-muted"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              )}
            </button>
          );
        })}
        {rows.length === 0 && (
          <p className="py-3 text-center text-sm text-muted">No matches</p>
        )}
      </div>
    </div>
  );
}
