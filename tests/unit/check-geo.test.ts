import type { MetadataRoute } from "next";
import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import { faqPageJsonLd, serializeJsonLd } from "@/lib/structured-data";
import {
  ROBOT_AGENTS,
  blockedAgents,
  firstH1,
  htmlProblems,
  isChallengePage,
  jsonLdProblems,
  llmsProblems,
  visibleText,
} from "../../scripts/check-geo.mjs";

// Task G1.3: the parsing behind scripts/check-geo.mjs. The checks themselves run against a live site.

afterEach(() => vi.unstubAllEnvs());

/** What Next.js serves at /robots.txt for a `robots()` result (one group per rule, then the sitemap). */
function robotsTxt({ rules, sitemap }: MetadataRoute.Robots): string {
  const list = (value: string | string[] | undefined) => (value === undefined ? [] : [value].flat());
  const groups = [rules].flat().map((rule) =>
    [
      ...list(rule.userAgent ?? "*").map((agent) => `User-Agent: ${agent}`),
      ...list(rule.allow).map((path) => `Allow: ${path}`),
      ...list(rule.disallow).map((path) => `Disallow: ${path}`),
    ].join("\n"),
  );
  return [...groups, ...list(sitemap).map((url) => `Sitemap: ${url}`)].join("\n\n");
}

describe("src/app/robots.ts", () => {
  it("lets every search and AI crawler in once the site is indexable", () => {
    vi.stubEnv("SITE_INDEXABLE", "true");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    expect(blockedAgents(robotsTxt(robots()))).toEqual([]);
  });

  it("shuts them all out while it isn't", () => {
    vi.stubEnv("SITE_INDEXABLE", "false");
    expect(blockedAgents(robotsTxt(robots()))).toEqual(ROBOT_AGENTS);
  });
});

describe("blockedAgents", () => {
  it("names the crawlers a robots.txt shuts out", () => {
    const text = "User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nUser-agent: CCBot\nDisallow: /\n";
    expect(blockedAgents(text)).toEqual(["GPTBot", "CCBot"]);
  });

  it("matches agent names without regard to case, and a crawler's own group beats `*`", () => {
    expect(blockedAgents("User-agent: *\nDisallow: /\n\nUser-agent: claudebot\nAllow: /\n")).not.toContain("ClaudeBot");
    expect(blockedAgents("User-agent: *\nDisallow: /\n\nUser-agent: claudebot\nAllow: /\n")).toContain("Googlebot");
  });

  it("does not count a partial Disallow, an empty one or a comment as blocking", () => {
    expect(blockedAgents("User-agent: *\nDisallow: /private\n# Disallow: /\n")).toEqual([]);
    expect(blockedAgents("User-agent: *\nDisallow:\n")).toEqual([]);
  });
});

const faq = [{ question: "How much does it cost?", answer: "From **IDR 50,000** per candidate." }];
const page = (body: string, head = "") =>
  `<html><head>${head}<script type="application/ld+json">${serializeJsonLd(faqPageJsonLd(faq))}</script></head><body>${body}</body></html>`;

describe("htmlProblems", () => {
  it("passes when the H1 and every FAQ question and answer are in the server HTML", () => {
    const html = page(
      `<h1>Game-based <em>assessment</em></h1><details><summary>How much does it cost?</summary><p>From <strong>IDR 50,000</strong> per
        candidate.</p></details>`,
    );
    expect(htmlProblems(html)).toEqual([]);
  });

  it("fails a page whose FAQ text is only in the JSON-LD and not in the raw HTML", () => {
    // The FAQ would be drawn by JavaScript after load, so crawlers that run none never see it.
    const html = page(`<h1>Game-based assessment</h1><div id="faq"></div>`);
    const problems = htmlProblems(html);
    expect(problems).toHaveLength(2);
    expect(problems[0]).toMatch(/FAQ question missing.*How much does it cost\?/);
    expect(problems[1]).toMatch(/FAQ answer missing/);
  });

  it("does not take script payloads for page text", () => {
    const html = page(`<h1>Title</h1><script>self.__next_f.push(["How much does it cost? From IDR 50,000 per candidate."])</script>`);
    expect(htmlProblems(html)).toHaveLength(2);
  });

  it("fails a page with no H1", () => {
    expect(htmlProblems("<html><body><p>Hello</p></body></html>")).toEqual(["no <h1> in the server HTML"]);
  });

  it("decodes entities before comparing", () => {
    const html = page(
      `<h1>Pay &amp; performance</h1><p>How much does it cost?</p><p>From IDR&nbsp;50,000 per candidate.</p>`,
    );
    expect(firstH1(html)).toBe("Pay & performance");
    expect(htmlProblems(html)).toEqual([]);
  });
});

describe("visibleText", () => {
  it("joins inline markup and drops comments", () => {
    expect(visibleText("<p>pay<!-- -->, <strong>bonus</strong>, raise</p>")).toBe("pay, bonus, raise");
  });
});

describe("jsonLdProblems", () => {
  const block = (data: object) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`;

  it("expects the types §S1 gives the page, and BreadcrumbList on the rest", () => {
    const home = block({ "@type": "WebSite" }) + block([{ "@type": "Organization" }]);
    expect(jsonLdProblems(home, "/en")).toEqual([]);
    expect(jsonLdProblems(block({ "@type": "WebSite" }), "/en")[0]).toMatch(/missing JSON-LD type: Organization/);
    expect(jsonLdProblems(block({ "@graph": [{ "@type": "BreadcrumbList" }] }), "/en/solutions")).toEqual([]);
    expect(jsonLdProblems("<html></html>", "/en/solutions")[0]).toMatch(/missing JSON-LD type: BreadcrumbList/);
    expect(jsonLdProblems(block({ "@type": "BreadcrumbList" }), "/en/about")[0]).toMatch(/missing JSON-LD type: AboutPage/);
    expect(jsonLdProblems(block({ "@type": "BreadcrumbList" }), "/en/contact")[0]).toMatch(/missing JSON-LD type: ContactPage/);
  });

  it("fails a block that does not parse", () => {
    expect(jsonLdProblems(`<script type="application/ld+json">{"@type":</script>`, "/en/about")[0]).toMatch(/does not parse/);
  });
});

describe("isChallengePage", () => {
  it("spots a bot-challenge page but not the site's own pages", () => {
    expect(isChallengePage("<html><head><title>Vercel Security Checkpoint</title></head><body></body></html>")).toBe(true);
    expect(isChallengePage("<html><body><h1>Just a moment...</h1></body></html>")).toBe(true);
    expect(isChallengePage("<html><head><title>Enhance | DEUS</title></head><body><h1>Enhance</h1></body></html>")).toBe(false);
  });
});

describe("llmsProblems", () => {
  const plain = "text/plain; charset=utf-8";
  const file = [
    "# DEUS Human Capital Services",
    "",
    "> A summary.",
    "",
    "## Company",
    "",
    "- [Home](https://deushcs.com/en): Home.",
    "- [About](https://deushcs.com/en/about): About.",
  ].join("\n");

  it("passes when /llms.txt answers 200 as text/plain and lists every sitemap page", () => {
    expect(llmsProblems({ status: 200, contentType: plain, text: file }, ["/en", "/en/about"])).toEqual([]);
  });

  it("matches pages by path, so a local build's links to its own origin count", () => {
    const local = file.replaceAll("https://deushcs.com", "http://localhost:3190");
    expect(llmsProblems({ status: 200, contentType: plain, text: local }, ["/en", "/en/about"])).toEqual([]);
  });

  it("names each sitemap page the file doesn't list", () => {
    expect(llmsProblems({ status: 200, contentType: plain, text: file }, ["/en", "/en/clients"])).toEqual([
      "/en/clients is not listed in llms.txt",
    ]);
  });

  it("fails anything but 200 as text/plain", () => {
    expect(llmsProblems({ status: 404, contentType: "text/html", text: "" }, ["/en"])).toEqual(["llms.txt answered 404"]);
    expect(llmsProblems({ status: 200, contentType: "text/html; charset=utf-8", text: file }, ["/en"])).toEqual([
      "llms.txt answered text/html; charset=utf-8",
    ]);
  });
});
