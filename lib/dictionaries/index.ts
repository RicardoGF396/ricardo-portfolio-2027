import type { Locale } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { es } from "./es";

export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { en, es };

/* Synchronous on purpose. Next's guide loads these with a dynamic import to
 * keep them out of the client bundle; here every reader is a Server
 * Component and the copy is two small objects, so there is nothing to split
 * and no reason to make each caller await. Client components never import
 * this — they get the strings they need as props. */
export function getDictionary(lang: Locale): Dictionary {
  return DICTIONARIES[lang];
}
