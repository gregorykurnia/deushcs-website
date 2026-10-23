"use client";

import { useEffect } from "react";
import { linkEvents, track } from "@/lib/analytics";
import { currentVisit } from "@/lib/visit-source";

// Counts clicks on links, once for the whole site (WEBSITE-PLAN.md §8.4). What a link is comes from
// its href and its `data-cta` (see `linkEvents`), so WhatsApp, email and Potentia links count
// wherever they're rendered, in server or client components. WhatsApp clicks also say which site
// started the visit (`VisitSource`). Rendered once, in the locale layout.
export function ClickTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const from = currentVisit()?.referrer;
      for (const [name, props] of linkEvents(href, link.getAttribute("data-cta"), from)) {
        track(name, props);
      }
    }
    // Capture phase, so a link's own click handler can't stop the count.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
