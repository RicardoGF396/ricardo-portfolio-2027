import { MorphingText } from "./MorphingText";

/* The docs demo's single line of morphing words, sized down to fit 320px: the
 * primitive's own 40pt (6rem at lg) is overridden at every breakpoint, since
 * tailwind-merge only resolves a conflict per modifier. Words are the six
 * verbs that actually fill the week. */

const WORDS = [
  "Research",
  "Sketch",
  "Prototype",
  "Build",
  "Measure",
  "Refine",
];

export default function MorphingTextDemo() {
  return (
    <div className="w-full py-9 text-center">
      <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
        A week in the studio
      </p>

      <MorphingText
        texts={WORDS}
        className="mt-4 h-20 text-[2.75rem] md:h-20 md:text-[2.75rem] lg:text-[2.75rem]"
      />
    </div>
  );
}
