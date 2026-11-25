import { Inter } from "next/font/google";

/* Inter for the distortion-wave cards. A self-hosted web font is the one kind
 * of font the wave can embed in its picture (it inlines loaded @font-face
 * rules), so picture and live DOM match for every visitor — a system font
 * only matches on machines that have it installed. */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  /* Exposes --font-inter-next, which globals.css maps to the
   * `--font-inter` theme token. `inter.className` still works as
   * before for the wave cards that apply the face directly. */
  variable: "--font-inter-next",
});
