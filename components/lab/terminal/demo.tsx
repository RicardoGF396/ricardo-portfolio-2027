import { AnimatedSpan, Terminal, TypingAnimation } from "./Terminal";

/* The docs demo's shape — a typed command, a run of checks, then a typed
 * closing note — with this portfolio's own deploy as the transcript. Lines are
 * kept short and set at text-xs so nothing scrolls sideways at 320px. */
export default function TerminalDemo() {
  return (
    <Terminal className="h-auto max-h-none w-full max-w-none">
      <TypingAnimation className="text-xs">
        &gt; npm run build
      </TypingAnimation>

      <AnimatedSpan className="text-xs text-emerald-600">
        ✔ Compiled in 11.4s
      </AnimatedSpan>

      <AnimatedSpan className="text-xs text-emerald-600">
        ✔ Types and lint clean
      </AnimatedSpan>

      <AnimatedSpan className="text-xs text-emerald-600">
        ✔ 18 routes prerendered
      </AnimatedSpan>

      <AnimatedSpan className="text-xs text-emerald-600">
        ✔ Fonts subset to Latin
      </AnimatedSpan>

      <AnimatedSpan className="text-xs text-emerald-600">
        ✔ Images optimised
      </AnimatedSpan>

      <AnimatedSpan className="text-xs text-[#026edb]">
        <span>ℹ First load JS:</span>
        <span className="pl-2">- / 96 kB</span>
        <span className="pl-2">- /projects 112 kB</span>
      </AnimatedSpan>

      <TypingAnimation className="text-xs text-muted-foreground">
        Deployed to production.
      </TypingAnimation>

      <TypingAnimation className="text-xs text-muted-foreground">
        Lighthouse: 100 / 100 / 100.
      </TypingAnimation>
    </Terminal>
  );
}
