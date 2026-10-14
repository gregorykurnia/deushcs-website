// Switches for [VERIFY] items. Each stays off until the owner answers the open question in
// WEBSITE-PLAN.md §14; the defaults below are the ones listed there.

export const siteFlags = {
  /** Q8: client logo wall (Home, Clients). While off, Home shows "40+ brands" with the industries. */
  showLogoWall: false,
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
  /** Contact success message: a committed reply time, e.g. "within one working day". */
  replyTime: null as string | null,
} as const satisfies Record<string, boolean | string | null>;

export type SiteFlags = typeof siteFlags;
