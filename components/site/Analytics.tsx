"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/* The measurement layer: Vercel Web Analytics (who visits, which pages) and
 * Speed Insights (how fast the site actually is for them — the Core Web
 * Vitals, measured on real devices rather than in a lab).
 *
 * Both run here, behind one rule, so your own visits stay out of both. Each
 * takes a `beforeSend` that runs in the browser before anything is sent;
 * returning null drops that one silently. They have to be functions, and
 * functions cannot cross the server/client boundary as props — hence this
 * "use client" wrapper rather than dropping the two components straight into
 * the layout.
 *
 * To stop counting yourself, visit the site once per browser with:
 *
 *     https://www.ricardogf.com/?no-analytics=1
 *
 * That writes a flag to localStorage and every later visit from that browser
 * is dropped. `?no-analytics=0` turns measuring back on.
 *
 * The honest limits: localStorage is per browser profile, not per machine, so
 * Chrome and Safari each need their own visit, a private window never keeps
 * it, and clearing site data wipes it. There is no IP-level exclusion in
 * either product to do this properly.
 */
const FLAG = "va-disabled";
const PARAM = "no-analytics";

/* True when this event should not be sent. Also where the flag gets written:
 * the query parameter is read from the event's own URL, which is the one page
 * both products hand us, so neither needs to touch the router. */
function isOptedOut(url: string): boolean {
  try {
    const param = new URL(url).searchParams.get(PARAM);

    if (param === "1") {
      localStorage.setItem(FLAG, "1");
      /* Drop this one too — the visit that switches it off should not be the
       * last one counted. */
      return true;
    }
    if (param === "0") localStorage.removeItem(FLAG);

    return Boolean(localStorage.getItem(FLAG));
  } catch {
    /* Blocked storage, a private window, a URL that will not parse: none of
     * them are a reason to lose a real visitor's data. */
    return false;
  }
}

export default function Analytics() {
  return (
    <>
      <VercelAnalytics
        beforeSend={(event) => (isOptedOut(event.url) ? null : event)}
      />
      <SpeedInsights
        beforeSend={(event) => (isOptedOut(event.url) ? null : event)}
      />
    </>
  );
}
