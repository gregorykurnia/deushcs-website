#!/usr/bin/env node
// Checks a running copy of the site before and after the domain cutover (Task 7.3c, runbook in
// docs/launch/cutover.md). Prints PASS or FAIL per check and exits 1 if any check fails.
//
//   node scripts/check-launch.mjs https://deushcs.com              after the cutover (Task 7.5)
//   node scripts/check-launch.mjs http://localhost:3190 --prelaunch  a production build before it
//
// `--prelaunch` expects the state before SITE_INDEXABLE=true (robots.txt disallows everything, pages
// carry `noindex`) and skips the host and DNS checks. The DNS checks run `dig` (built into macOS) and
// compare the mail records with docs/launch/dns-before.txt. Needs Node 22.18 or later, which reads
// src/lib/old-site-redirects.ts directly.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

export const SITE = "https://deushcs.com";
export const SITE_NAME = "DEUS Human Capital Services";
const DNS_FILE = fileURLToPath(new URL("../docs/launch/dns-before.txt", import.meta.url));

/** The pages Google is asked to index first (Task 7.6). */
export const KEY_PAGES = [
  { name: "Home", path: "/en" },
  { name: "Enhance", path: "/en/solutions/enhance" },
  { name: "GBA", path: "/en/solutions/game-based-assessment" },
  { name: "About", path: "/en/about" },
  { name: "Contact", path: "/en/contact" },
];

const PERMANENT = new Set([301, 308]);
const REDIRECT = new Set([301, 302, 303, 307, 308]);

// ---- Parsing (exported for tests/unit/check-launch.test.ts) ----

/** Attributes of every `<tag …>` in the HTML, e.g. `tags(html, "meta")` → `[{ name, content }, …]`. */
export function tags(html, tag) {
  const found = [];
  for (const [, attrs] of html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, "gi"))) {
    const entry = {};
    for (const [, key, , value] of attrs.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)) {
      entry[key.toLowerCase()] = value.replace(/&amp;/g, "&");
    }
    found.push(entry);
  }
  return found;
}

/** The page's robots directives (meta tags and the X-Robots-Tag header), lower case. */
export function robotsDirectives(html, header = "") {
  const metas = tags(html, "meta")
    .filter((m) => ["robots", "googlebot"].includes(m.name?.toLowerCase()))
    .map((m) => m.content ?? "");
  return [...metas, header].join(",").toLowerCase();
}

/** The `<link rel="canonical">` href, or null. */
export function canonicalHref(html) {
  return tags(html, "link").find((l) => l.rel?.toLowerCase() === "canonical")?.href ?? null;
}

/** Every JSON-LD object on the page, flattened out of arrays and `@graph`. */
export function jsonLdObjects(html) {
  const objects = [];
  const walk = (value) => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") {
      objects.push(value);
      if (value["@graph"]) walk(value["@graph"]);
    }
  };
  for (const [, body] of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    walk(JSON.parse(body));
  }
  return objects;
}

/** robots.txt as `{ allowsAll, disallowsAll, sitemaps }` for `User-agent: *`. */
export function parseRobots(text) {
  const lines = text.split(/\r?\n/).map((l) => l.replace(/#.*/, "").trim());
  let inStar = false;
  const rules = [];
  const sitemaps = [];
  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    const k = key.trim().toLowerCase();
    if (k === "user-agent") inStar = value === "*";
    else if (k === "sitemap") sitemaps.push(value);
    else if (inStar && (k === "allow" || k === "disallow")) rules.push({ k, value });
  }
  const disallowsAll = rules.some((r) => r.k === "disallow" && r.value === "/");
  const allowsAll = !disallowsAll && !rules.some((r) => r.k === "disallow" && r.value !== "");
  return { allowsAll, disallowsAll, sitemaps };
}

/** `<loc>` URLs in a sitemap. */
export function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(([, loc]) => loc.replace(/&amp;/g, "&"));
}

/**
 * docs/launch/dns-before.txt (scripts/record-dns.sh) → `[{ name, type, answers }]`, one per query.
 * Answers drop the TTL and class, so `deushcs.com. 3600 IN MX 10 mx1.titan.email.` → `MX 10 mx1.titan.email.`.
 */
export function parseDnsRecord(text) {
  const queries = [];
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    const query = /^;; query (\S+) (\S+)$/.exec(line);
    if (query) {
      current = { name: query[1], type: query[2], answers: [] };
      queries.push(current);
    } else if (current && line.trim() && !line.startsWith(";")) {
      current.answers.push(normaliseAnswer(line));
    }
  }
  return queries;
}

/** One dig answer line without its owner name, TTL and class: `TXT "v=spf1 …"`. */
export function normaliseAnswer(line) {
  const [, , , type, ...data] = line.trim().split(/\s+/);
  return `${type} ${data.join(" ")}`;
}

/** Web records (changed by the cutover) and CAA are recorded for the rollback only, not compared. */
export function isMailQuery({ name, type }) {
  const web = ["A", "AAAA", "CNAME"].includes(type) && /^(www\.)?deushcs\.com$/.test(name);
  return !web && type !== "CAA";
}

/** What a mail query is called in the report, and which of its answers count. */
export function dnsChecks(queries) {
  const checks = [];
  for (const q of queries.filter(isMailQuery)) {
    if (q.name === "deushcs.com" && q.type === "TXT") {
      checks.push({ label: "SPF (TXT on @)", ...q, pick: (a) => a.includes("v=spf1") });
      checks.push({ label: "Search Console (TXT on @)", ...q, pick: (a) => a.includes("google-site-verification="), required: true });
    } else {
      const label =
        q.type === "MX" && q.name === "deushcs.com"
          ? "MX"
          : q.name.startsWith("_dmarc")
            ? `DMARC (${q.name})`
            : q.name.includes("_domainkey")
              ? `DKIM (${q.name})`
              : `${q.type} ${q.name}`;
      checks.push({ label, ...q, pick: () => true });
    }
  }
  return checks;
}

/** Compares one check's recorded answers with the live ones; returns a failure message or null. */
export function compareDns(check, liveAnswers) {
  const before = check.answers.filter(check.pick).sort();
  const now = liveAnswers.filter(check.pick).sort();
  if (check.required) {
    if (before.length === 0) return "none recorded in dns-before.txt: add the record, then re-run scripts/record-dns.sh";
    const missing = before.filter((a) => !now.includes(a));
    return missing.length ? `missing now: ${missing.join(" | ")}` : null;
  }
  if (before.join("\n") === now.join("\n")) return null;
  return `before: ${before.join(" | ") || "(none)"}; now: ${now.join(" | ") || "(none)"}`;
}

// ---- Checks against a running site ----

const results = [];
function report(ok, label, details = []) {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  for (const line of details.slice(0, 20)) console.log(`        ${line}`);
  if (details.length > 20) console.log(`        … and ${details.length - 20} more`);
}

async function get(url) {
  return fetch(url, { redirect: "manual", signal: AbortSignal.timeout(20_000), headers: { "user-agent": "deushcs-check-launch" } });
}

/** Runs `fn` over `items`, `limit` at a time. */
async function pool(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]).catch((error) => `${items[i]}: ${error.message}`);
      }
    }),
  );
  return out;
}

async function checkRobots(origin, prelaunch) {
  const res = await get(`${origin}/robots.txt`);
  const robots = parseRobots(await res.text());
  const problems = [];
  if (res.status !== 200) problems.push(`robots.txt answered ${res.status}`);
  if (prelaunch) {
    if (!robots.disallowsAll) problems.push("expected Disallow: / before launch");
    if (robots.sitemaps.length) problems.push(`names a sitemap before launch: ${robots.sitemaps.join(", ")}`);
    report(!problems.length, "robots.txt disallows everything and names no sitemap (pre-launch)", problems);
  } else {
    if (!robots.allowsAll) problems.push("does not allow everything");
    if (!robots.sitemaps.includes(`${SITE}/sitemap.xml`)) problems.push(`sitemap lines: ${robots.sitemaps.join(", ") || "(none)"}`);
    report(!problems.length, `robots.txt allows all and names ${SITE}/sitemap.xml`, problems);
  }
}

async function checkKeyPages(origin, prelaunch) {
  for (const { name, path } of KEY_PAGES) {
    const res = await get(`${origin}${path}`);
    const html = await res.text();
    const problems = [];
    if (res.status !== 200) problems.push(`answered ${res.status}`);
    const robots = robotsDirectives(html, res.headers.get("x-robots-tag") ?? "");
    const noindex = robots.includes("noindex") || robots.includes("none");
    if (prelaunch && !noindex) problems.push("no noindex before launch");
    if (!prelaunch && noindex) problems.push(`robots says: ${robots.replace(/^,+|,+$/g, "")}`);
    const canonical = canonicalHref(html);
    if (!canonical) problems.push("no canonical link");
    else if (prelaunch) {
      if (new URL(canonical, origin).pathname !== path) problems.push(`canonical is ${canonical}`);
    } else if (canonical !== `${SITE}${path}`) problems.push(`canonical is ${canonical}, expected ${SITE}${path}`);
    const label = prelaunch
      ? `${name} (${path}): noindex, canonical on ${path} (${canonical ?? "none"})`
      : `${name} (${path}): no noindex, canonical ${SITE}${path}`;
    report(!problems.length, label, problems);
  }
}

// `http://www.` may take two hops (to https first, then to the bare domain), as on most hosts.
async function checkHosts() {
  const host = new URL(SITE).host;
  const cases = [
    { from: `http://${host}/`, hops: 1 },
    { from: `https://www.${host}/`, hops: 1 },
    { from: `http://www.${host}/`, hops: 2 },
  ];
  for (const { from, hops } of cases) {
    const label = `${from} reaches ${SITE} in ${hops === 1 ? "one permanent redirect" : "at most two permanent redirects"}`;
    const trail = [];
    let url = from;
    let ok = false;
    try {
      for (let hop = 0; hop < hops && !ok; hop++) {
        const res = await get(url);
        const location = res.headers.get("location");
        trail.push(`${url} answered ${res.status} → ${location ?? "(no location)"}`);
        if (!PERMANENT.has(res.status) || !location) break;
        url = new URL(location, url).toString();
        ok = new URL(url).origin === SITE;
      }
    } catch (error) {
      trail.push(error.message);
    }
    report(ok, label, ok ? [] : trail);
  }
}

async function checkRootRedirect(origin) {
  const res = await get(`${origin}/`);
  const location = res.headers.get("location");
  const problems = [];
  if (!REDIRECT.has(res.status) || !location) problems.push(`answered ${res.status}`);
  else {
    const target = new URL(location, origin);
    if (target.origin !== origin || target.pathname !== "/en") problems.push(`redirects to ${target}`);
    else {
      const home = await get(target);
      if (home.status !== 200) problems.push(`${target} answered ${home.status}`);
    }
  }
  report(!problems.length, "/ reaches Home (/en) in one redirect", problems);
}

async function checkSitemap(origin, prelaunch) {
  const res = await get(`${origin}/sitemap.xml`);
  const urls = res.status === 200 ? sitemapUrls(await res.text()) : [];
  const problems = [];
  if (res.status !== 200) problems.push(`sitemap.xml answered ${res.status}`);
  else if (!urls.length) problems.push("sitemap.xml lists no URLs");
  if (!prelaunch) for (const url of urls) if (new URL(url).origin !== SITE) problems.push(`${url} is not on ${SITE}`);
  const failures = await pool(urls, 8, async (url) => {
    const { pathname, search } = new URL(url);
    const page = await get(`${origin}${pathname}${search}`);
    return page.status === 200 ? null : `${url} answered ${page.status}`;
  });
  problems.push(...failures.filter(Boolean));
  report(!problems.length, `every sitemap URL answers 200 (${urls.length} URLs)`, problems);
}

async function checkOldPaths(origin) {
  let oldSiteRedirects;
  try {
    ({ oldSiteRedirects } = await import(pathToFileURL(fileURLToPath(new URL("../src/lib/old-site-redirects.ts", import.meta.url))).href));
  } catch (error) {
    report(false, "old WordPress paths redirect", [`could not read src/lib/old-site-redirects.ts (Node 22.18+ needed): ${error.message}`]);
    return;
  }
  const cases = oldSiteRedirects.flatMap(({ from, to }) => [`${from}`, `${from}/`].map((path) => ({ path, to })));
  const failures = await pool(cases, 8, async ({ path, to }) => {
    const res = await get(`${origin}${path}`);
    const location = res.headers.get("location");
    if (!PERMANENT.has(res.status) || !location) return `${path} answered ${res.status}`;
    const target = new URL(location, origin);
    if (target.origin !== origin || `${target.pathname}${target.hash}` !== to) return `${path} → ${target}, expected ${to}`;
    const page = await get(`${origin}${target.pathname}`);
    return page.status === 200 ? null : `${path} → ${target.pathname} answered ${page.status}`;
  });
  const problems = failures.filter(Boolean);
  report(!problems.length, `every old WordPress path is one permanent redirect to a 200 (${cases.length} paths)`, problems);
}

async function checkJsonLd(origin) {
  const res = await get(`${origin}/en`);
  const problems = [];
  try {
    const named = jsonLdObjects(await res.text()).filter((o) => o.name === SITE_NAME).map((o) => o["@type"]);
    if (!named.length) problems.push(`no JSON-LD object named "${SITE_NAME}"`);
    report(!problems.length, `Home's JSON-LD names "${SITE_NAME}"${named.length ? ` (${named.join(", ")})` : ""}`, problems);
  } catch (error) {
    report(false, `Home's JSON-LD names "${SITE_NAME}"`, [`JSON-LD does not parse: ${error.message}`]);
  }
}

function dig(...args) {
  return execFileSync("dig", args, { encoding: "utf8", timeout: 20_000 });
}

function checkDns() {
  let queries;
  try {
    queries = parseDnsRecord(readFileSync(DNS_FILE, "utf8"));
  } catch (error) {
    report(false, "mail DNS records match dns-before.txt", [error.message]);
    return;
  }
  let ns;
  try {
    ns = dig("+short", "NS", "deushcs.com").split("\n").filter(Boolean).sort()[0];
    if (!ns) throw new Error("no NS records for deushcs.com");
  } catch (error) {
    report(false, "mail DNS records match dns-before.txt", [`dig failed: ${error.message}`]);
    return;
  }
  for (const check of dnsChecks(queries)) {
    const live = dig(`@${ns}`, "+noall", "+answer", check.name, check.type)
      .split("\n")
      .filter((l) => l.trim() && !l.startsWith(";"))
      .map(normaliseAnswer);
    const problem = compareDns(check, live);
    report(!problem, `${check.label} matches dns-before.txt`, problem ? [problem] : []);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const prelaunch = args.includes("--prelaunch");
  const originArg = args.find((a) => !a.startsWith("--"));
  if (!originArg) {
    console.error("Usage: node scripts/check-launch.mjs <origin> [--prelaunch]");
    process.exit(2);
  }
  const origin = new URL(originArg).origin;
  console.log(`Checking ${origin}${prelaunch ? " (pre-launch: noindex expected, host and DNS checks skipped)" : ""}\n`);

  const steps = [
    () => checkRobots(origin, prelaunch),
    () => checkKeyPages(origin, prelaunch),
    ...(prelaunch ? [] : [() => checkHosts()]),
    () => checkRootRedirect(origin),
    () => checkSitemap(origin, prelaunch),
    () => checkOldPaths(origin),
    () => checkJsonLd(origin),
    ...(prelaunch ? [] : [() => checkDns()]),
  ];
  for (const step of steps) {
    try {
      await step();
    } catch (error) {
      report(false, "check could not run", [error.message]);
    }
  }

  const failed = results.filter((ok) => !ok).length;
  console.log(`\n${failed ? `${failed} of ${results.length} checks FAILED` : `All ${results.length} checks passed`}`);
  process.exit(failed ? 1 : 0);
}

// Node warns that the .ts file it reads has no module type; that note is noise here.
const emitWarning = process.emitWarning;
process.emitWarning = (warning, ...rest) => {
  const code = typeof rest[0] === "object" ? rest[0]?.code : rest[1];
  if (code !== "MODULE_TYPELESS_PACKAGE_JSON") emitWarning.call(process, warning, ...rest);
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
