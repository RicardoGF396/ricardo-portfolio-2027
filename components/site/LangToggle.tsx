import { LOCALES, LOCALE_NAME, type Locale } from "@/lib/i18n";
import LangLink from "./LangLink";

/* The language switch, as a two-segment button: EN | ES.
 *
 * It was a fifth row in the nav at first — "English →", styled like the page
 * links around it — and read as one more page rather than as a control. A
 * segmented button says what it is at a glance, and shows the state as well
 * as the action: the filled segment is the language you are reading, the
 * other one is the way out.
 *
 * Only the inactive segment is a link. The active one is a plain span marked
 * `aria-current`, so there is nothing focusable that goes nowhere. The codes
 * are what is drawn; each link's accessible name is the language's own name
 * ("Español"), supplied through LangLink. */
export default function LangToggle({
  lang,
  label,
  size = "md",
  className = "",
}: {
  lang: Locale;
  /* Names the group for assistive tech: "Language" / "Idioma". */
  label: string;
  /* `md` matches the height of the sidebar's call-to-action buttons; `sm` is
   * for the one-line nav row on small screens. */
  size?: "sm" | "md";
  className?: string;
}) {
  const segment =
    size === "md"
      ? "px-3 py-1 text-base rounded-md"
      : "px-2 py-0.5 text-xs rounded";

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex shrink-0 items-center gap-0.5 bg-[#ECECEC] p-0.5 font-medium ${
        size === "md" ? "rounded-lg" : "rounded-md"
      } ${className}`}
    >
      {LOCALES.map((locale) =>
        locale === lang ? (
          <span
            key={locale}
            aria-current="true"
            className={`${segment} bg-white text-black shadow-xs uppercase`}
          >
            {locale}
          </span>
        ) : (
          <LangLink
            key={locale}
            to={locale}
            label={LOCALE_NAME[locale]}
            className={`${segment} text-[#42413F] uppercase transition-colors hover:bg-white/60 hover:text-blue-600`}
          >
            {locale}
          </LangLink>
        ),
      )}
    </div>
  );
}
