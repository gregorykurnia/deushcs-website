import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendEvent = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track: sendEvent }));

const { linkEvents, track } = await import("@/lib/analytics");

describe("linkEvents", () => {
  it("counts a WhatsApp link", () => {
    expect(linkEvents("https://wa.me/6282312121660?text=Halo%20DEUS")).toEqual([["whatsapp_click", {}]]);
  });

  it("counts an email link", () => {
    expect(linkEvents("mailto:admin@deushcs.com")).toEqual([["email_click", {}]]);
  });

  it("counts a link to deuspotentia.com, with its UTM tags, and its subdomains", () => {
    const potentia = "https://deuspotentia.com/?utm_source=deushcs.com&utm_medium=referral";
    expect(linkEvents(potentia)).toEqual([["outbound_click", {}]]);
    expect(linkEvents("https://www.deuspotentia.com/")).toEqual([["outbound_click", {}]]);
  });

  it("doesn't count a host that only ends the same way", () => {
    expect(linkEvents("https://notdeuspotentia.com/")).toEqual([]);
  });

  it("counts nothing for other links", () => {
    expect(linkEvents("/solutions/enhance")).toEqual([]);
    expect(linkEvents("#solutions")).toEqual([]);
    expect(linkEvents("https://www.linkedin.com/company/deus")).toEqual([]);
  });

  it("counts a call to action by its name", () => {
    expect(linkEvents("/contact", "header-demo")).toEqual([["cta_click", { cta: "header-demo" }]]);
  });

  it("counts a call to action that leads to Potentia as both", () => {
    expect(linkEvents("https://deuspotentia.com/", "deuspotentia.com")).toEqual([
      ["cta_click", { cta: "deuspotentia.com" }],
      ["outbound_click", {}],
    ]);
  });
});

describe("track", () => {
  beforeEach(() => {
    sendEvent.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does nothing on the server", () => {
    track("cta_click", { cta: "closing" });
    expect(sendEvent).not.toHaveBeenCalled();
  });

  it("sends the event with the path of the page it happened on", () => {
    vi.stubGlobal("window", { location: { pathname: "/id/solutions/enhance" } });
    track("cta_click", { cta: "hero-primary" });
    expect(sendEvent).toHaveBeenCalledWith("cta_click", { cta: "hero-primary", page: "/id/solutions/enhance" });
  });

  it("sends an event without props with just the page", () => {
    vi.stubGlobal("window", { location: { pathname: "/contact" } });
    track("whatsapp_click");
    expect(sendEvent).toHaveBeenCalledWith("whatsapp_click", { page: "/contact" });
  });
});
