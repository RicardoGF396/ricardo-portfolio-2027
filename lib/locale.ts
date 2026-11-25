import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./i18n";

/* Every page under app/[lang] starts the same way: await its params, make
 * sure the segment really is a language, and 404 if it is not. This is that
 * step, once.
 *
 * It lives apart from lib/i18n.ts because that file is also imported by
 * proxy.ts and by a client component, and neither should pull in
 * next/navigation's server half. */
export async function langFrom(
  params: Promise<{ lang: string }>,
): Promise<Locale> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}
