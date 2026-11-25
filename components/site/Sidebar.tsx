import Link from "next/link";
import Image from "next/image";
import {
  IconDownload,
  IconMessage,
  IconFileText,
  IconFolder,
  IconMail,
  IconArrowRight,
  IconUserCircle,
  type TablerIcon,
} from "@tabler/icons-react";

import { CV, SITE } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import LangToggle from "./LangToggle";

interface NavLinkProps {
  /* Which label in the dictionary's `nav` block this row shows. */
  key: keyof Dictionary["nav"];
  /* Written without the language prefix; localePath adds it at render. */
  path: string;
  /* The component itself, not JSX: `IconUser`, never `<IconUser />`. The
   * element gets created at render, so each item can size or colour it. */
  icon: TablerIcon;
}

const navLinks: NavLinkProps[] = [
  { key: "resume", path: "/resume", icon: IconFileText },
  { key: "about", path: "/about", icon: IconUserCircle },
  { key: "projects", path: "/projects", icon: IconFolder },
  { key: "contact", path: "/contact", icon: IconMail },
];

/* The page rows' classes, named so the JSX below stays readable. */
const ROW =
  "w-full group flex items-center justify-between font-medium transition-all duration-300 hover:text-blue-600 max-lg:text-sm lg:pr-6 lg:hover:bg-blue-50 lg:hover:pr-4";
const ROW_LABEL = "flex items-center gap-2 py-3 lg:px-4 lg:py-2";
const ROW_ICON =
  "text-gray-600 transition-colors duration-300 group-hover:text-blue-600 max-sm:hidden";

/* The left column: it lives in the root layout, so it survives navigation and
 * only the centre column swaps. Nothing here is route-aware on purpose —
 * keeping it a server component means no JS ships for the shell. The single
 * exception is the link inside LangToggle, which has to know the current path.
 *
 * The EN | ES toggle is rendered twice and each copy is hidden at the other's
 * breakpoint: beside the call-to-action buttons from lg up, and at the end of
 * the nav row under lg. One place cannot serve both — the button row is part
 * of the hero, which inner pages fold away on small screens, and the nav row
 * turns into a stacked list of pages on large ones.
 *
 * From lg up it is the sticky full-height column. Under lg the shell stacks,
 * and this becomes the page header, which changes three things:
 *   - no `h-screen` / `sticky`: stacked, that was a whole empty screen to
 *     scroll past before the content;
 *   - the nav moves up under the name (`order-2`) and lies flat as one row;
 *   - the hero only shows on the home grid. On an inner page it would push
 *     the page a full screen down on every visit. That is done in CSS with
 *     `:has()` against PageShell's `.page-shell`, so it stays a server
 *     component and still ships no JS. */
export default function Sidebar({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    /* Width comes from the shell's grid track now, not a column span. */
    <div>
      <div className="flex w-full flex-col gap-5 p-6 lg:sticky lg:top-0 lg:h-screen lg:justify-between lg:gap-4 2xl:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3 lg:gap-4">
            <div className="relative size-10 shrink-0 rounded-full overflow-hidden">
              <Image fill sizes="40px" alt="Ricardo" src="/images/its me.jpeg" />
            </div>
            <div className="min-w-0">
              <Link href={localePath(lang)} className="font-medium text-sm">
                {SITE.name}
              </Link>
              <p className="text-sm text-[#42413F]">{dict.site.role}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="https://www.linkedin.com/in/ricardogf396/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Image
                className="opacity-70 hover:opacity-90"
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={32}
                height={32}
              />
            </Link>
            <Link
              href="https://github.com/RicardoGF396"
              target="_blank"
              aria-label="GitHub"
            >
              <Image
                className="opacity-70 hover:opacity-90"
                src="/icons/github.svg"
                alt="GitHub"
                width={32}
                height={32}
              />
            </Link>
          </div>
        </div>

        <div className="order-3 flex max-w-2xl flex-col gap-8 pt-2 lg:order-none lg:max-w-none lg:pt-0 max-lg:[body:has(.page-shell)_&]:hidden">
          <div className="flex flex-col gap-4">
            {/* The hero steps with its track, not with the screen: stacked on
                a tablet it has the full width and can be larger than in the
                240px column that follows at lg. */}
            <h1 className="font-display font-semibold text-5xl sm:text-6xl lg:text-5xl xl:text-7xl text-black tracking-tighter">
              {dict.sidebar.hero}
            </h1>
            <p className="text-lg font-display text-[#42413F]">
              {dict.sidebar.intro}
            </p>
          </div>
          {/* `whitespace-nowrap` so a label never breaks mid-button, and
           * `flex-wrap` so the pair drops to two rows instead of squashing
           * when the track is narrow. */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="bg-[#026edb] cursor-pointer hover:bg-[#0263c5] shadow-xs flex shrink-0 items-center gap-2 whitespace-nowrap font-medium text-lg px-4 py-1 rounded-lg text-white"
            >
              <IconMessage size={18} />
              {dict.sidebar.talk}
            </a>
            {/* The CV in the language of the page. /resume offers both — one
             * button here, because the sidebar is already dense. */}
            <a
              href={CV[lang].href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ECECEC] cursor-pointer hover:bg-[#e3e2e2] shadow-xs flex shrink-0 items-center gap-2 whitespace-nowrap font-medium text-lg px-4 py-1 rounded-lg text-[#42413F]"
            >
              <IconDownload size={18} />
              {dict.sidebar.downloadResume}
            </a>
            {/* The large-screen copy of the language toggle. */}
            <LangToggle
              lang={lang}
              label={dict.shell.language}
              className="max-lg:hidden"
            />
          </div>
        </div>

        {/* One row under lg — four pages and the language toggle — and the
         * stacked list of pages from lg up. The row drops the icons below sm
         * and the arrows always: the labels with both do not fit across a
         * 375px phone. */}
        <nav className="order-2 lg:order-none">
          <ul className="flex items-center justify-between border-y border-line lg:block lg:border-y-0">
            {navLinks.map(({ key, path, icon: Icon }) => (
              <li key={path} className="lg:border-b lg:border-line">
                {/* The whole row is the link, not just the label — a 40px-tall
                 * target instead of the width of the word. */}
                <Link href={localePath(lang, path)} className={ROW}>
                  <span className={ROW_LABEL}>
                    <Icon stroke={1.75} size={18} className={ROW_ICON} />
                    {dict.nav[key]}
                  </span>
                  <IconArrowRight
                    stroke={1.5}
                    size={18}
                    className="max-lg:hidden"
                  />
                </Link>
              </li>
            ))}

            {/* The small-screen copy of the language toggle, at the end of
             * the row. Gone from lg up, where the list is pages only. */}
            <li className="lg:hidden">
              <LangToggle lang={lang} label={dict.shell.language} size="sm" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
