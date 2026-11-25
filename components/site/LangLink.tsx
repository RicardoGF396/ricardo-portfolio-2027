"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";

/* A link to the page you are on, in the other language.
 *
 * This is the one piece of the sidebar that has to run in the browser: a
 * layout is not told which page is inside it, so only `usePathname` knows
 * that "/en/projects/naveo" should go to "/es/projects/naveo" rather than
 * back to the home page. Everything it renders arrives as children, so the
 * island is this one anchor and nothing else.
 *
 * A plain <a>, not next/link, on purpose: the language is the root segment,
 * and a full load is what guarantees <html lang>, the metadata and the JSON-LD
 * all change together instead of the body switching under a stale document. */
export default function LangLink({
  to,
  label,
  className,
  children,
}: {
  to: Locale;
  /* The accessible name. What is drawn is a two-letter code, and "ES" read
   * aloud says nothing about what it does; this is the language's own name. */
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const parts = pathname.split("/"); // "/en/about" → ["", "en", "about"]
  if (hasLocale(parts[1] ?? "")) parts[1] = to;
  else parts.splice(1, 0, to);

  return (
    <a
      href={parts.join("/")}
      /* hrefLang tells crawlers what is on the other end; `lang` tells a
       * screen reader to pronounce the label in the language it is written
       * in, which is not the language of the page it sits on. */
      hrefLang={to}
      lang={to}
      aria-label={label}
      className={className}
    >
      {children}
    </a>
  );
}
