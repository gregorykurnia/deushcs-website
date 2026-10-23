"use client";

import { useEffect } from "react";
import { currentVisit } from "@/lib/visit-source";

// Remembers where this tab's visit started: its first page, the site that sent it and its campaign
// tags (SEO/geo-implementation-plan.md §S10, `src/lib/visit-source.ts`). The lead form sends them
// with the lead, and WhatsApp clicks count by that site. Rendered once, in the locale layout; client
// navigation keeps the layout mounted, and a reload finds the record already there.
export function VisitSource() {
  useEffect(() => {
    currentVisit();
  }, []);

  return null;
}
