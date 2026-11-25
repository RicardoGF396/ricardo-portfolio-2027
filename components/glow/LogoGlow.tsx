"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";

const BRANDS = [
  { name: "Microsoft", src: "/logos/microsoft.svg", w: 22, h: 22 },
  { name: "Meta", src: "/logos/meta.svg", w: 29, h: 19 },
  { name: "Google", src: "/logos/google.svg", w: 22, h: 22 },
];

export default function LogoGlow() {
  const pill = useRef<HTMLDivElement>(null);
  const [ring, setRing] = useState<{ x: number; seq: number } | null>(null);

  // `seq` changes on every tap so the ring remounts and its animation restarts.
  const fire = (e: MouseEvent<HTMLButtonElement>) => {
    if (!pill.current) return;
    const b = e.currentTarget.getBoundingClientRect();
    const p = pill.current.getBoundingClientRect();
    const x = b.left + b.width / 2 - p.left - pill.current.clientLeft;
    setRing((r) => ({ x, seq: (r?.seq ?? 0) + 1 }));
  };

  return (
    <div
      ref={pill}
      className="relative overflow-hidden border-y flex items-center justify-between border-l border-[#e8e8ed] bg-white py-3 pl-6 rounded-l-full"
    >
      <style dangerouslySetInnerHTML={{ __html: RING_CSS }} />

      {ring && (
        <span
          key={ring.seq}
          className="lg-ring pointer-events-none absolute top-1/2 z-0 size-[380px] rounded-full"
          style={{ left: ring.x }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 flex items-center">
        {BRANDS.map((b) => (
          <button
            key={b.name}
            type="button"
            className="relative -ml-4 first:ml-0 border cursor-pointer hover:bg-gray-50 border-[#e8e8ed] shadow-xs bg-white rounded-full p-3 flex items-center justify-center"
            onClick={fire}
            aria-label={b.name}
          >
            <span className="relative size-8">
              <Image src={b.src} alt="" fill />
            </span>
          </button>
        ))}
      </div>

      <p className="relative z-10 font-medium text-lg">Share project wit</p>
    </div>
  );
}

// Anillo: centro transparente, bandas de color y borde exterior nítido.
const RING_CSS = `
.lg-ring {
  background: radial-gradient(
    closest-side,
    rgb(147 197 253 / 0) 42%,
    #93c5fd 58%,
    #a78bfa 72%,
    #f472b6 84%,
    #fb923c 92%,
    #fcd34d 98.5%,
    rgb(252 211 77 / 0) 100%
  );
  filter: blur(9px);
  transform: translate(-50%, -50%) scale(0);
  animation: lg-ring 1500ms forwards;
}

@keyframes lg-ring {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }
  60% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    animation-timing-function: cubic-bezier(0.55, 0, 0.8, 0.3);
  }
  100% {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lg-ring {
    transform: translate(-50%, -50%) scale(1);
    animation: lg-ring-fade 700ms ease forwards;
  }
  @keyframes lg-ring-fade {
    0%, 100% { opacity: 0; }
    30% { opacity: 1; }
  }
}
`;
