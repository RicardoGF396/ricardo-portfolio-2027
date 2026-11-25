"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

/* Vercel Web Analytics, with a way to leave your own visits out of it.
 *
 * `beforeSend` runs in the browser before every pageview is sent; returning
 * null drops it silently. It has to be a function, and functions cannot cross
 * the server/client boundary as props — hence this "use client" wrapper rather
 * than dropping <Analytics /> straight into the layout.
 *
 * To stop counting yourself, visit the site once per browser with:
 *
 *     https://www.ricardogf.com/?no-analytics=1
 *
 * That writes a flag to localStorage and every later visit from that browser
 * is dropped. `?no-analytics=0` turns counting back on.
 *
 * The honest limits: localStorage is per browser profile, not per machine, so
 * Chrome and Safari each need their own visit, a private window never keeps
 * it, and clearing site data wipes it. There is no IP-level exclusion in
 * Vercel Web Analytics to do this properly.
 */
const FLAG = "va-disabled";
const PARAM = "no-analytics";

export default function Analytics() {
  return (
    <VercelAnalytics
      beforeSend={(event) => {
        try {
          const param = new URL(event.url).searchParams.get(PARAM);

          if (param === "1") {
            localStorage.setItem(FLAG, "1");
            /* Drop this one too — the visit that switches it off should not
             * be the last one counted. */
            return null;
          }
          if (param === "0") localStorage.removeItem(FLAG);

          if (localStorage.getItem(FLAG)) return null;
        } catch {
          /* Blocked storage, a private window, a URL that will not parse:
           * none of them are a reason to lose a real visitor's pageview. */
        }
        return event;
      }}
    />
  );
}
