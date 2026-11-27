"use client";

import TechText from "./TechText";

/* TechText sizes to its box, so the wrapper pins an explicit height. */
export default function TechTextDemo() {
  return (
    <div className="h-[200px] w-[320px] max-w-full overflow-hidden rounded-3xl bg-card text-fg">
      <TechText
        text="Design"
        fontSize={96}
        color="#1d1d1f"
        accentColor="#026edb"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
