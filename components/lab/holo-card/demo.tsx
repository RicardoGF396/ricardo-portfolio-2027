"use client";

import HoloCard from "./HoloCard";

/* The foil is drawn over `image`, so the art is an inline SVG rather than a remote photo. */
const ART = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a3d8f"/><stop offset="0.55" stop-color="#026edb"/><stop offset="1" stop-color="#6fb4ff"/></linearGradient>
</defs>
<rect width="500" height="700" fill="url(#g)"/>
<circle cx="360" cy="230" r="150" fill="#fff" fill-opacity="0.14"/>
<circle cx="150" cy="330" r="90" fill="#fff" fill-opacity="0.1"/>
<rect x="36" y="36" width="428" height="628" rx="22" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="4"/>
<g font-family="Helvetica, Arial, sans-serif" fill="#fff">
<text x="64" y="104" font-size="26" letter-spacing="4" fill-opacity="0.8">CASE STUDY</text>
<text x="64" y="520" font-size="64" font-weight="700">Naveo</text>
<text x="64" y="568" font-size="28" fill-opacity="0.9">Last-mile delivery tracking</text>
<text x="64" y="616" font-size="22" letter-spacing="2" fill-opacity="0.75">PRODUCT DESIGN / NEXT.JS</text>
</g></svg>`;

const IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(ART)}`;

export default function HoloCardDemo() {
  return (
    <div className="flex justify-center py-3">
      <HoloCard image={IMAGE} width={220} preset="rainbow" />
    </div>
  );
}
