import { afterEach, describe, expect, it, vi } from "vitest";
import {
  VISIT_KEY,
  buildVisit,
  currentVisit,
  parseVisit,
  referrerHost,
  rememberVisit,
  type VisitRecord,
} from "@/lib/visit-source";

// SEO/geo-implementation-plan.md §S10: the first page of a visit, the site that sent it and its
// campaign tags, kept in sessionStorage for the tab and never overwritten later in the visit.

const locales = ["en", "id"] as const;
const page = (overrides: Partial<Parameters<typeof buildVisit>[0]> = {}) =>
  buildVisit({
    pathname: "/en/solutions/game-based-assessment",
    search: "?utm_source=chatgpt.com",
    referrer: "https://chatgpt.com/c/abc-123?model=x",
    host: "deushcs.com",
    locales,
    ...overrides,
  });

/** A Storage stand-in backed by a Map. */
function memoryStorage(initial: Record<string, string> = {}) {
  const map = new Map(Object.entries(initial));
  return {
    map,
    getItem: (key: string) => map.get(key) ?? null,
    setItem: vi.fn((key: string, value: string) => void map.set(key, value)),
  };
}

describe("referrerHost", () => {
  it("keeps another site's referrer as its host name only", () => {
    expect(referrerHost("https://chatgpt.com/c/abc-123?model=x", "deushcs.com")).toBe("chatgpt.com");
    expect(referrerHost("https://www.google.com/", "deushcs.com")).toBe("www.google.com");
    expect(referrerHost("https://WWW.LinkedIn.com/feed/", "deushcs.com")).toBe("www.linkedin.com");
  });

  it("drops this site's own pages, with or without www", () => {
    expect(referrerHost("https://deushcs.com/en/clients", "deushcs.com")).toBe("");
    expect(referrerHost("https://www.deushcs.com/en", "deushcs.com")).toBe("");
    expect(referrerHost("https://deushcs.com/en", "www.deushcs.com")).toBe("");
  });

  it("drops a missing referrer and anything that isn't a web address", () => {
    expect(referrerHost("", "deushcs.com")).toBe("");
    expect(referrerHost("not a url", "deushcs.com")).toBe("");
    expect(referrerHost("javascript:alert(1)", "deushcs.com")).toBe("");
    expect(referrerHost("android-app://com.google.android.gm/", "deushcs.com")).toBe("");
    expect(referrerHost("https://[::1]/", "deushcs.com")).toBe("");
  });
});

describe("buildVisit", () => {
  it("records the first page without its locale or query, the referring host and the tags", () => {
    expect(page({ search: "?utm_source=chatgpt.com&utm_medium=referral&utm_campaign=q4&gclid=x" })).toEqual({
      landingPage: "/solutions/game-based-assessment",
      referrer: "chatgpt.com",
      utm_source: "chatgpt.com",
      utm_medium: "referral",
      utm_campaign: "q4",
    });
  });

  it("stores the home page as /", () => {
    expect(page({ pathname: "/en" }).landingPage).toBe("/");
    expect(page({ pathname: "/id/" }).landingPage).toBe("/");
  });

  it("leaves the referrer empty when the visit starts from this site or from nowhere", () => {
    expect(page({ referrer: "https://deushcs.com/en" }).referrer).toBe("");
    expect(page({ referrer: "" }).referrer).toBe("");
  });

  it("leaves tags empty when the page has none, and caps long ones", () => {
    const visit = page({ search: `?utm_campaign=${"x".repeat(500)}` });
    expect(visit.utm_source).toBe("");
    expect(visit.utm_campaign).toHaveLength(200);
  });
});

describe("parseVisit", () => {
  it("reads back what buildVisit writes", () => {
    const visit = page();
    expect(parseVisit(JSON.stringify(visit))).toEqual(visit);
  });

  it("drops bad values instead of passing them on", () => {
    expect(
      parseVisit(
        JSON.stringify({
          landingPage: "https://evil.example/x",
          referrer: "https://chatgpt.com/c/123",
          utm_source: 42,
          utm_medium: "email",
        }),
      ),
    ).toEqual({ landingPage: "", referrer: "", utm_source: "", utm_medium: "email", utm_campaign: "" });
    expect(parseVisit(JSON.stringify({ landingPage: "//evil.example", referrer: "Chat GPT" }))).toMatchObject({
      landingPage: "",
      referrer: "",
    });
  });

  it("reads an unreadable record as empty", () => {
    expect(parseVisit("{not json")).toEqual({
      landingPage: "",
      referrer: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
    });
    expect(parseVisit("null").landingPage).toBe("");
  });
});

describe("rememberVisit", () => {
  it("writes the first page's record under deus-visit", () => {
    const storage = memoryStorage();
    const visit = page();
    expect(rememberVisit(storage, () => visit)).toEqual(visit);
    expect(JSON.parse(storage.map.get(VISIT_KEY)!)).toEqual(visit);
  });

  it("never overwrites the record later in the visit", () => {
    const storage = memoryStorage();
    const first = page();
    rememberVisit(storage, () => first);
    const later: VisitRecord = page({ pathname: "/en/contact", search: "?utm_source=newsletter", referrer: "" });
    const build = vi.fn(() => later);

    expect(rememberVisit(storage, build)).toEqual(first);
    expect(build).not.toHaveBeenCalled();
    expect(storage.setItem).toHaveBeenCalledTimes(1);
    expect(JSON.parse(storage.map.get(VISIT_KEY)!)).toEqual(first);
  });

  it("keeps an unreadable record too, rather than relabel the visit", () => {
    const storage = memoryStorage({ [VISIT_KEY]: "garbage" });
    expect(rememberVisit(storage, page)?.landingPage).toBe("");
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it("returns null when storage is blocked", () => {
    const blocked = {
      getItem: () => {
        throw new DOMException("denied", "SecurityError");
      },
      setItem: () => {},
    };
    expect(rememberVisit(blocked, page)).toBeNull();
    const full = { getItem: () => null, setItem: () => { throw new DOMException("full", "QuotaExceededError"); } };
    expect(rememberVisit(full, page)).toBeNull();
  });
});

describe("currentVisit", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is null on the server", () => {
    expect(currentVisit()).toBeNull();
  });

  it("records the tab's first page from the browser and keeps it on the next page", () => {
    const storage = memoryStorage();
    const location = { pathname: "/en/solutions/game-based-assessment", search: "?utm_source=chatgpt.com", hostname: "deushcs.com" };
    vi.stubGlobal("window", { sessionStorage: storage, location });
    vi.stubGlobal("document", { referrer: "https://chatgpt.com/" });

    expect(currentVisit()).toMatchObject({ landingPage: "/solutions/game-based-assessment", referrer: "chatgpt.com" });
    location.pathname = "/en/contact";
    location.search = "";
    vi.stubGlobal("document", { referrer: "https://deushcs.com/en/solutions/game-based-assessment" });
    expect(currentVisit()).toMatchObject({
      landingPage: "/solutions/game-based-assessment",
      referrer: "chatgpt.com",
      utm_source: "chatgpt.com",
    });
  });

  it("is null when the browser blocks sessionStorage", () => {
    vi.stubGlobal("window", {
      get sessionStorage(): Storage {
        throw new DOMException("denied", "SecurityError");
      },
      location: { pathname: "/en", search: "", hostname: "deushcs.com" },
    });
    expect(currentVisit()).toBeNull();
  });
});
