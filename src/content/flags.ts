// Switches for [VERIFY] items. Each stays off until the owner answers the open question in
// WEBSITE-PLAN.md §14; the defaults below are the ones listed there. The four assessment-page
// switches (showBadHireCost to showMarketClaim) come from [VERIFY] notes in content/en/ (Task 3.1);
// §14 doesn't list them yet.

export const siteFlags = {
  /** Q8: client logo wall (Home, Clients). While off, Home shows "40+ brands" with the industries.
   *  On: the owner cleared every client for the wall, 2026-10-23. */
  showLogoWall: true,
  /** Client stories: every story page, the Clients hub's stories section and the "Read client stories"
   *  links on Home and GBA. Off: the owner hid them until new stories are added (2026-10-23). */
  showStories: false,
  /** Q7: name Telkom, with photo and quote, in its story (otherwise "a national telecom group"). */
  telkomNamed: false,
  /** Q11: publish the Calvin Christian School story (held until names and titles are confirmed). */
  publishCalvin: false,
  /** Q9: office address in the footer and on Contact. */
  showAddress: false,
  /** Q10: leadership section on About (needs photos and bios). */
  showLeadership: false,
  /** Q19: Enhance "Better together" section. */
  showBetterTogether: false,
  /** GBA "Business impact": the "5 to 10 times" bad-hire cost line (game-based-assessment.md §10). */
  showBadHireCost: false,
  /** GBA FAQ: the minimum purchase and group rules (game-based-assessment.md §14). */
  showMinimumOrder: false,
  /** GBA science section, "Normed for Indonesia": the comparison with Western norms (game-based-assessment.md §9). Confirmed by the owner 2026-10-15. */
  showMarketClaim: true,
  /** Contact success message: a committed reply time, e.g. "within one working day". */
  replyTime: null as string | null,
} as const satisfies Record<string, boolean | string | null>;

export type SiteFlags = typeof siteFlags;
