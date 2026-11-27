"use client";

import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "./ColorPicker";

/* The layout from the Kibo docs, narrowed to the tile and started on the
 * site blue. The selection field is `size-full` upstream, so the height is
 * set here. */
export default function ColorPickerDemo() {
  return (
    <ColorPicker
      className="max-w-[272px] gap-3 rounded-xl border border-border bg-background p-3 shadow-sm"
      defaultValue="#026edb"
    >
      <ColorPickerSelection className="h-32" />
      <div className="flex items-center gap-3">
        <ColorPickerEyeDropper />
        <div className="grid w-full gap-1.5">
          <ColorPickerHue />
          <ColorPickerAlpha />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ColorPickerOutput />
        <ColorPickerFormat />
      </div>
    </ColorPicker>
  );
}
