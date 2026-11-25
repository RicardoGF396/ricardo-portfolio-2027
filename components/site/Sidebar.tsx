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

/* Hosted CV. The Download button points straight at it, so the file can be
 * replaced at the bucket without touching the app. */
export const RESUME_PDF =
  "https://ahmbzaaiwzglvhtpotvp.supabase.co/storage/v1/object/public/portafolio/Ricardo_Gonzalez_Flores_Resume.pdf";

export const EMAIL = "ricardogf396@gmail.com";

interface NavLinkProps {
  name: string;
  link: string;
  /* The component itself, not JSX: `IconUser`, never `<IconUser />`. The
   * element gets created at render, so each item can size or colour it. */
  icon: TablerIcon;
}

const navLinks: NavLinkProps[] = [
  { name: "Resume", link: "/resume", icon: IconFileText },
  { name: "About", link: "/about", icon: IconUserCircle },
  { name: "Projects", link: "/projects", icon: IconFolder },
  { name: "Contact", link: "/contact", icon: IconMail },
];

/* The left column: it lives in the root layout, so it survives navigation and
 * only the centre column swaps. Nothing here is route-aware on purpose —
 * keeping it a server component means no JS ships for the shell. */
export default function Sidebar() {
  return (
    /* Width comes from the shell's grid track now, not a column span. */
    <div>
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between gap-4 p-6 2xl:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative size-10 rounded-full overflow-hidden">
              <Image fill alt="Ricardo" src="/images/its me.jpeg" />
            </div>
            <div>
              <Link href="/" className="font-medium text-sm">
                Ricardo González Flores
              </Link>
              <p className="text-sm text-[#42413F]">
                UX/UI Developer · Design Systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {/* The hero steps with its track. The 8xl only reads once the
                sidebar reaches 380px at 2xl; at 260–300px it would set one
                word per line. */}
            <h1 className="font-display font-semibold text-5xl xl:text-7xl text-black tracking-tighter">
              I design it, then I build it.
            </h1>
            <p className="text-lg font-display text-[#42413F]">
              I&apos;m a UX/UI developer — I design the interface in Figma, then
              ship it myself. React and Angular on the web; Flutter, React
              Native and Swift on mobile. Five years on both sides of the
              handoff; most recently I led the design team behind 12 government
              platforms in a single year.
            </p>
          </div>
          {/* `whitespace-nowrap` so a label never breaks mid-button, and
           * `flex-wrap` so the pair drops to two rows instead of squashing
           * when the track is narrow. */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="bg-[#026edb] cursor-pointer hover:bg-[#0263c5] shadow-xs flex shrink-0 items-center gap-2 whitespace-nowrap font-medium text-lg px-4 py-1 rounded-lg text-white"
            >
              <IconMessage size={18} />
              Let&apos;s talk
            </a>
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ECECEC] cursor-pointer hover:bg-[#e3e2e2] shadow-xs flex shrink-0 items-center gap-2 whitespace-nowrap font-medium text-lg px-4 py-1 rounded-lg text-[#42413F]"
            >
              <IconDownload size={18} />
              Download Resume
            </a>
          </div>
        </div>

        <nav>
          <ul>
            {navLinks.map(({ name, link, icon: Icon }) => (
              <li key={link} className="border-b border-line">
                {/* The whole row is the link, not just the label — a 40px-tall
                 * target instead of the width of the word. */}
                <Link
                  href={link}
                  className="w-full group flex items-center justify-between font-medium transition-all duration-300 pr-6 hover:pr-4 hover:bg-blue-50 hover:text-blue-600"
                >
                  <span className="flex items-center gap-2 py-2 px-4">
                    <Icon
                      stroke={1.75}
                      size={18}
                      className="text-gray-600 transition-colors duration-300 group-hover:text-blue-600"
                    />
                    {name}
                  </span>
                  <IconArrowRight stroke={1.5} size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
