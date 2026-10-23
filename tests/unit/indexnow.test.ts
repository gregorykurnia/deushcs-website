import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  INDEXNOW_KEY,
  allowedOrigin,
  blockedReason,
  indexNowBody,
  submittableUrls,
} from "../../scripts/indexnow.mjs";

// Task G1.8: the origin rule and the parsing behind scripts/indexnow.mjs. Nothing here sends to IndexNow:
// the command-line test stops before any request, and the rest is pure.

describe("allowedOrigin", () => {
  it("accepts the site's origin, with or without a trailing slash or a path", () => {
    expect(allowedOrigin("https://deushcs.com")).toBe("https://deushcs.com");
    expect(allowedOrigin("https://deushcs.com/")).toBe("https://deushcs.com");
    expect(allowedOrigin("https://deushcs.com/en/about")).toBe("https://deushcs.com");
  });

  it("refuses any other origin, lookalikes and the local build included", () => {
    const others = [
      "http://localhost:3190",
      "http://deushcs.com",
      "https://www.deushcs.com",
      "https://deushcs.com.evil.example",
      "https://deushcs.com:8443",
      "https://evil.example/deushcs.com",
      "https://deushcs.vercel.app",
      "deushcs.com",
    ];
    for (const other of others) expect(() => allowedOrigin(other), other).toThrow(/refusing|not a URL/);
  });

  it("the command line refuses another origin before it fetches anything", () => {
    const script = new URL("../../scripts/indexnow.mjs", import.meta.url).pathname;
    const run = spawnSync(process.execPath, [script, "https://www.deushcs.com", "--dry-run"], { encoding: "utf8" });
    expect(run.status).toBe(1);
    expect(run.stderr).toMatch(/refusing https:\/\/www\.deushcs\.com/);
    expect(run.stdout).toBe("");
  });
});

describe("submittableUrls", () => {
  const sitemap = (...locs: string[]) => `<urlset>${locs.map((loc) => `<url><loc>${loc}</loc></url>`).join("")}</urlset>`;

  it("returns the sitemap's URLs, once each, in order", () => {
    const xml = sitemap("https://deushcs.com/en", "https://deushcs.com/en/about", "https://deushcs.com/en");
    expect(submittableUrls(xml)).toEqual(["https://deushcs.com/en", "https://deushcs.com/en/about"]);
  });

  it("refuses a sitemap that names another host", () => {
    expect(() => submittableUrls(sitemap("https://deushcs.com/en", "http://localhost:3190/en/about"))).toThrow(
      /other hosts.*localhost/,
    );
  });

  it("refuses an empty sitemap", () => {
    expect(() => submittableUrls("<urlset></urlset>")).toThrow(/no URLs/);
  });
});

describe("blockedReason", () => {
  it("refuses while robots.txt disallows all, as before launch", () => {
    expect(blockedReason({ status: 200, text: "User-agent: *\nDisallow: /\n" })).toMatch(/disallows all/);
  });

  it("lets the site through once robots.txt allows it", () => {
    expect(blockedReason({ status: 200, text: "User-agent: *\nAllow: /\n\nSitemap: https://deushcs.com/sitemap.xml\n" })).toBeNull();
  });

  it("refuses when robots.txt can't be read", () => {
    expect(blockedReason({ status: 503, text: "" })).toMatch(/answered 503/);
  });
});

describe("indexNowBody", () => {
  it("names the host, the key and the key file, and the URLs", () => {
    expect(indexNowBody(["https://deushcs.com/en"])).toEqual({
      host: "deushcs.com",
      key: INDEXNOW_KEY,
      keyLocation: `https://deushcs.com/${INDEXNOW_KEY}.txt`,
      urlList: ["https://deushcs.com/en"],
    });
  });
});

describe("the key file", () => {
  it("is public/<key>.txt, and holds the key and nothing else", () => {
    expect(INDEXNOW_KEY).toMatch(/^[a-zA-Z0-9-]{8,128}$/);
    expect(readFileSync(new URL(`../../public/${INDEXNOW_KEY}.txt`, import.meta.url), "utf8")).toBe(INDEXNOW_KEY);
  });
});
