"use client";

import ASCIIText from "./ASCIIText";

/* Light theme with the site blue; the box needs an explicit size for the WebGL
 * canvas, and `relative` because the component's root is `absolute inset-0`:
 * without a positioned parent it resolved against the viewport and drew a
 * full-page "Ricardo" over the whole site, which `overflow-hidden` here could
 * not clip — a clipper only clips descendants whose containing block it is. */
export default function ASCIITextDemo() {
  return (
    <div className="relative h-[220px] w-[320px] max-w-full overflow-hidden rounded-3xl bg-card">
      <ASCIIText
        text="Ricardo"
        theme="light"
        asciiFontSize={7}
        textColor="#1d1d1f"
        colors={["#026edb", "#5b8def", "#1d1d1f"]}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
