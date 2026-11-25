import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/* Served at /manifest.webmanifest. Not a PWA ambition — it is what gives the
 * site a proper name and icon when someone saves it to a phone home screen,
 * which for a portfolio link sent over WhatsApp is a real path. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.jobTitle}`,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
