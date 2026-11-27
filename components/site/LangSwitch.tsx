import { IconLanguage } from "@tabler/icons-react";

import { LOCALES, LOCALE_NAME, type Locale } from "@/lib/i18n";
import LangLink from "./LangLink";

/* The language switch, as one icon beside the social links.
 *
 * It used to be a two-segment EN | ES button sharing a `flex-wrap` row with
 * the call-to-action buttons, so it moved between one row and two depending on
 * how wide "Download résumé" / "Descargar CV" happened to be — the control
 * jumped every time you used it. Up here nothing around it changes width.
 *
 * What is drawn is the code of the language you would get, not the one you are
 * reading: the icon says what the control is for, and "ES" says where it goes.
 * Both codes are two characters, so this never reflows either. */
export default function LangSwitch({
  lang,
  className = "",
}: {
  lang: Locale;
  className?: string;
}) {
  const other = LOCALES.find((locale) => locale !== lang) ?? lang;

  return (
    <LangLink
      to={other}
      label={LOCALE_NAME[other]}
      className={`flex h-8 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-medium uppercase text-[#42413F] opacity-70 transition-colors hover:bg-[#ECECEC] hover:text-blue-600 hover:opacity-100 ${className}`}
    >
      <IconLanguage stroke={1.75} size={18} />
      {/* Fixed width: "es" and "en" are a pixel apart otherwise, and the whole
       * point of moving this control was that it stops shifting. */}
      <span className="w-5 text-center">{other}</span>
    </LangLink>
  );
}
