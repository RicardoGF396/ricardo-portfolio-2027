"use client";

import { useState } from "react";
import ElasticSlider from "./ElasticSlider";

export default function ElasticSliderDemo() {
  const [value, setValue] = useState(64);

  return (
    <div className="flex flex-col gap-4 p-5">
      <div>
        <div className="text-[13px] font-medium text-fg">Spring stiffness</div>
        <div className="text-[12px] text-muted">
          Drag past either end. The track stretches and snaps back.
        </div>
      </div>
      <ElasticSlider
        value={value}
        onChange={setValue}
        ariaLabel="Spring stiffness"
        rangeColor="#026edb"
        valuePosition="top"
      />
      <div className="flex flex-col gap-2 border-t border-line pt-3">
        <div className="text-[12px] text-muted">Stepped, no value label</div>
        <ElasticSlider
          defaultValue={40}
          isStepped
          stepSize={10}
          valuePosition="none"
          ariaLabel="Damping"
          rangeColor="#026edb"
        />
      </div>
    </div>
  );
}
