import { describe, expect, it } from "vitest";
import {
  canonicalHref,
  compareDns,
  dnsChecks,
  jsonLdObjects,
  parseDnsRecord,
  parseRobots,
  robotsDirectives,
  sitemapUrls,
} from "../../scripts/check-launch.mjs";

// Task 7.3c: the parsing behind scripts/check-launch.mjs. The checks themselves run against a live site.

const record = `;; DNS for deushcs.com, recorded 2026-10-23
;; query deushcs.com A
deushcs.com.		60	IN	A	153.92.12.146

;; query deushcs.com MX
deushcs.com.		3600	IN	MX	20 mx2.titan.email.
deushcs.com.		3600	IN	MX	10 mx1.titan.email.

;; query deushcs.com TXT
deushcs.com.		3600	IN	TXT	"v=spf1 include:spf.titan.email ~all"

;; query _dmarc.deushcs.com TXT

;; query resend._domainkey.notify.deushcs.com TXT
resend._domainkey.notify.deushcs.com. 14400 IN TXT "p=abc"
`;

describe("parseDnsRecord", () => {
  it("reads each query with its answers, without TTL or class, and empty queries as no record", () => {
    expect(parseDnsRecord(record)).toEqual([
      { name: "deushcs.com", type: "A", answers: ["A 153.92.12.146"] },
      { name: "deushcs.com", type: "MX", answers: ["MX 20 mx2.titan.email.", "MX 10 mx1.titan.email."] },
      { name: "deushcs.com", type: "TXT", answers: ['TXT "v=spf1 include:spf.titan.email ~all"'] },
      { name: "_dmarc.deushcs.com", type: "TXT", answers: [] },
      { name: "resend._domainkey.notify.deushcs.com", type: "TXT", answers: ['TXT "p=abc"'] },
    ]);
  });
});

describe("dnsChecks and compareDns", () => {
  const checks = dnsChecks(parseDnsRecord(record));
  const byLabel = (label: string) => checks.find((c) => c.label === label)!;

  it("compares mail records only, never the web records the cutover changes", () => {
    expect(checks.map((c) => c.label)).toEqual([
      "MX",
      "SPF (TXT on @)",
      "Search Console (TXT on @)",
      "DMARC (_dmarc.deushcs.com)",
      "DKIM (resend._domainkey.notify.deushcs.com)",
    ]);
  });

  it("passes when the answers match in any order, and fails when one changed", () => {
    const mx = byLabel("MX");
    expect(compareDns(mx, ["MX 10 mx1.titan.email.", "MX 20 mx2.titan.email."])).toBeNull();
    expect(compareDns(mx, ["MX 10 mx1.titan.email."])).toMatch(/now: MX 10 mx1/);
  });

  it("treats a record absent before and after as unchanged", () => {
    expect(compareDns(byLabel("DMARC (_dmarc.deushcs.com)"), [])).toBeNull();
  });

  it("checks SPF alone among the TXT records on @", () => {
    const live = ['TXT "v=spf1 include:spf.titan.email ~all"', 'TXT "google-site-verification=xyz"'];
    expect(compareDns(byLabel("SPF (TXT on @)"), live)).toBeNull();
  });

  it("requires a Search Console record, recorded before and still there", () => {
    const sc = byLabel("Search Console (TXT on @)");
    expect(compareDns(sc, ['TXT "google-site-verification=xyz"'])).toMatch(/none recorded/);
    const recorded = { ...sc, answers: [...sc.answers, 'TXT "google-site-verification=xyz"'] };
    expect(compareDns(recorded, ['TXT "google-site-verification=xyz"', 'TXT "v=spf1 x"'])).toBeNull();
    expect(compareDns(recorded, ['TXT "v=spf1 x"'])).toMatch(/missing now/);
  });
});

describe("page parsing", () => {
  const html = `<html><head><meta name="robots" content="noindex, nofollow"/>
    <link rel="canonical" href="https://deushcs.com/en/about"/>
    <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","name":"DEUS Human Capital Services"}]}</script>
    <script type="application/ld+json">[{"@type":"Organization","name":"DEUS Human Capital Services","url":"https://deushcs.com/en"}]</script>
    </head></html>`;

  it("reads robots directives from meta tags and the header", () => {
    expect(robotsDirectives(html)).toContain("noindex");
    expect(robotsDirectives("<html></html>", "noindex")).toContain("noindex");
    expect(robotsDirectives("<html></html>")).not.toContain("noindex");
  });

  it("reads the canonical link", () => {
    expect(canonicalHref(html)).toBe("https://deushcs.com/en/about");
    expect(canonicalHref("<html></html>")).toBeNull();
  });

  it("flattens JSON-LD arrays and @graph", () => {
    const types = jsonLdObjects(html)
      .filter((o) => o.name === "DEUS Human Capital Services")
      .map((o) => o["@type"]);
    expect(types).toEqual(["WebSite", "Organization"]);
  });
});

describe("robots.txt and sitemap parsing", () => {
  it("tells the pre-launch robots.txt from the launched one", () => {
    expect(parseRobots("User-Agent: *\nDisallow: /\n")).toEqual({ allowsAll: false, disallowsAll: true, sitemaps: [] });
    expect(parseRobots("User-Agent: *\nAllow: /\n\nSitemap: https://deushcs.com/sitemap.xml\n")).toEqual({
      allowsAll: true,
      disallowsAll: false,
      sitemaps: ["https://deushcs.com/sitemap.xml"],
    });
  });

  it("lists the sitemap's URLs", () => {
    const xml = "<urlset><url><loc>https://deushcs.com/en</loc></url><url><loc>https://deushcs.com/en/about</loc></url></urlset>";
    expect(sitemapUrls(xml)).toEqual(["https://deushcs.com/en", "https://deushcs.com/en/about"]);
  });
});
