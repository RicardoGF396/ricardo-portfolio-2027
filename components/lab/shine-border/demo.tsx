"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShineBorder } from "./ShineBorder";

/* The docs demo's shape — a card with the shine on its border, a short form
 * inside — rebuilt on plain markup, since this project vendors Button and Input
 * but not shadcn's Card or Label. Shine colours are the site blue instead of
 * the docs' purple-pink-amber. */
export default function ShineBorderDemo() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-line bg-card p-5">
      <ShineBorder
        borderWidth={2}
        shineColor={["#026edb", "#7cc0ff", "#026edb"]}
      />

      <h3 className="text-base font-semibold">Booking Q1 2027</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Two slots left for product design and front-end work.
      </p>

      <form
        className="mt-4 flex flex-col gap-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="text-xs font-medium text-muted-foreground" htmlFor="shine-email">
          Where should the reply go?
        </label>
        <Input
          id="shine-email"
          type="email"
          placeholder="you@studio.com"
          className="h-9 bg-bg text-sm"
        />
        <Button type="submit" size="sm" className="mt-1 w-full">
          Start a conversation
        </Button>
      </form>
    </div>
  );
}
