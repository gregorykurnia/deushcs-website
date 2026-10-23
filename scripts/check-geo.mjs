#!/usr/bin/env node
// Checks that AI search tools and crawlers can read the site (Task G1.3, SEO/geo-implementation-plan.md §S4).
// Prints PASS or FAIL per check and exits 1 if any check fails.
//
//   node scripts/check-geo.mjs https://deushcs.com                  after launch
//   node scripts/check-geo.mjs http://localhost:3190 --prelaunch    a production build before launch
//
// `--prelaunch` skips the robots.txt check (the site still disallows everything then). The sitemap's
// URLs are fetched from `<origin>` by path, so a local build is checked even though its sitemap names
// another host. Parsing helpers are shared with scripts/check-launch.mjs.

import { pathToFileURL } from "node:url";
import { jsonLdObjects, sitemapUrls } from "./check-launch.mjs";

/** Crawlers whose access §S4 requires: search engines, AI search and AI assistants, AI training opt-out tokens. */
export const ROBOT_AGENTS = [
  "*",
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

/** The crawlers that fetch pages for the sitemap check, each with a full user-agent string. */
export const CRAWLER_USER_AGENTS = {
  Googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  Bingbot: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  "OAI-SearchBot": "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)",
  "ChatGPT-User": "Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)",
  PerplexityBot: "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  ClaudeBot: "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  Applebot: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)",
};

/** The JSON-LD types each page must carry (§S1). Pages not listed need `DEFAULT_TYPES`. G1.4 and G2 extend this map. */
export const EXPECTED_TYPES = {
  "/en": ["WebSite", "Organization"],
  "/en/solutions/game-based-assessment": ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
  "/en/solutions/enhance": ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
  "/en/about": ["AboutPage", "BreadcrumbList"],
  "/en/contact": ["ContactPage", "BreadcrumbList"],
};
export const DEFAULT_TYPES = ["BreadcrumbList"];

/** Text a bot gets instead of the page when a firewall or bot rule stops it. */
const CHALLENGE_MARKERS = [/vercel security checkpoint/i, /captcha/i, /just a moment\.\.\./i, /attention required/i, /cf-challenge/i, /access denied/i];

// ---- Parsing (exported for tests/unit/check-geo.test.ts) ----

/** robots.txt as groups: `[{ agents: ["googlebot"], rules: [{ k: "disallow", value: "/" }] }]`. */
export function robotsGroups(text) {
  const groups = [];
  let current = null;
  let collecting = false; // true while the group's user-agent lines are still being read
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const at = line.indexOf(":");
    if (at < 0) continue;
    const k = line.slice(0, at).trim().toLowerCase();
    const value = line.slice(at + 1).trim();
    if (k === "user-agent") {
      if (!current || !collecting) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      collecting = true;
    } else if (k === "allow" || k === "disallow") {
      collecting = false;
      current?.rules.push({ k, value });
    } else if (k !== "sitemap") {
      collecting = false;
    }
  }
  return groups;
}

/** Whether the rules of the group that applies to `agent` (its own group, else `*`) block `/`. */
export function disallowsRoot(text, agent) {
  const groups = robotsGroups(text);
  const name = agent.toLowerCase();
  const own = groups.filter((g) => g.agents.includes(name));
  const applying = own.length ? own : groups.filter((g) => g.agents.includes("*"));
  const rules = applying.flatMap((g) => g.rules);
  // An `Allow: /` is as long as `Disallow: /`, and the allow wins a tie (RFC 9309).
  return rules.some((r) => r.k === "disallow" && r.value === "/") && !rules.some((r) => r.k === "allow" && r.value === "/");
}

/** The crawlers in `agents` that robots.txt shuts out of the whole site. */
export function blockedAgents(text, agents = ROBOT_AGENTS) {
  return agents.filter((agent) => disallowsRoot(text, agent));
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", ndash: "–", mdash: "—" };

function decodeEntities(text) {
  return text.replace(/&(?:#(\d+)|#x([\da-f]+)|([a-z]+));/gi, (whole, dec, hex, name) => {
    if (dec) return String.fromCodePoint(Number(dec));
    if (hex) return String.fromCodePoint(parseInt(hex, 16));
    return ENTITIES[name.toLowerCase()] ?? whole;
  });
}

/** Collapses whitespace (including non-breaking spaces) so wrapped text compares equal. */
export function squash(text) {
  return text.replace(/[\s ]+/g, " ").trim();
}

/** The text a visitor reads in the server HTML: scripts, styles and comments dropped, tags removed, entities decoded. */
export function visibleText(html) {
  const withoutCode = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, " ")
    // Tags become nothing when inline (so `<strong>pay</strong>,` stays "pay,") and a space when they break a line.
    .replace(/<\/?(?:b|strong|em|i|span|a|u|small|mark|code|abbr|sup|sub)\b[^>]*>/gi, "")
    .replace(/<[^>]+>/g, " ");
  return squash(decodeEntities(withoutCode));
}

/** The text of the page's first `<h1>`, or null. */
export function firstH1(html) {
  const match = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  return match ? visibleText(match[1]) : null;
}

/** Every question and answer in the page's FAQPage JSON-LD, as `{ question, answer }`. */
export function faqItems(objects) {
  return objects
    .filter((o) => o["@type"] === "FAQPage" || (Array.isArray(o["@type"]) && o["@type"].includes("FAQPage")))
    .flatMap((o) => [o.mainEntity ?? []].flat())
    .map((q) => ({ question: q.name ?? "", answer: q.acceptedAnswer?.text ?? "" }));
}

/** The schema.org types of every JSON-LD object on the page. */
export function typeNames(objects) {
  return new Set(objects.flatMap((o) => [o["@type"] ?? []].flat()));
}

/** What is wrong with a page's server HTML: no H1, or an FAQ question or answer that isn't in the text. Empty means fine. */
export function htmlProblems(html) {
  const problems = [];
  const text = visibleText(html);
  const h1 = firstH1(html);
  if (!h1) problems.push("no <h1> in the server HTML");
  else if (!text.includes(h1)) problems.push(`H1 "${h1}" is not in the page text`);
  let objects;
  try {
    objects = jsonLdObjects(html);
  } catch (error) {
    return [...problems, `JSON-LD does not parse: ${error.message}`];
  }
  for (const { question, answer } of faqItems(objects)) {
    if (!text.includes(squash(question))) problems.push(`FAQ question missing from the HTML: "${question}"`);
    if (!text.includes(squash(answer))) problems.push(`FAQ answer missing from the HTML: "${answer.slice(0, 60)}…"`);
  }
  return problems;
}

/** The JSON-LD problems of a page at `path`: blocks that don't parse, types §S1 gives the page that are missing. */
export function jsonLdProblems(html, path) {
  let objects;
  try {
    objects = jsonLdObjects(html);
  } catch (error) {
    return [`JSON-LD does not parse: ${error.message}`];
  }
  const found = typeNames(objects);
  const missing = (EXPECTED_TYPES[path] ?? DEFAULT_TYPES).filter((type) => !found.has(type));
  return missing.length ? [`missing JSON-LD type${missing.length > 1 ? "s" : ""}: ${missing.join(", ")} (found: ${[...found].join(", ") || "none"})`] : [];
}

/** Whether `html` is a bot-challenge page rather than the site. */
export function isChallengePage(html) {
  // A challenge page is short and says so at the top; the site's own copy further down can use these words.
  const top = `${/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? ""} ${visibleText(html).slice(0, 600)}`;
  return CHALLENGE_MARKERS.some((marker) => marker.test(top) || marker.test(html.slice(0, 4000)));
}

/** What is wrong with `/llms.txt` (§S5): not 200 as text/plain, or a sitemap page it doesn't list. Empty means fine. */
export function llmsProblems({ status, contentType, text }, paths) {
  if (status !== 200) return [`llms.txt answered ${status}`];
  if (!contentType.includes("text/plain")) return [`llms.txt answered ${contentType || "no content type"}`];
  // Links are `[Title](URL)`. Their paths are compared, so a local build's links to its own origin count.
  const linked = new Set(
    [...text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)]
      .map(([, url]) => url)
      .filter((url) => URL.canParse(url))
      .map((url) => new URL(url).pathname),
  );
  return paths.filter((path) => !linked.has(path)).map((path) => `${path} is not listed in llms.txt`);
}

// ---- Checks against a running site ----

const results = [];
function report(ok, label, details = []) {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  for (const line of details.slice(0, 20)) console.log(`        ${line}`);
  if (details.length > 20) console.log(`        … and ${details.length - 20} more`);
}

async function get(url, userAgent = "deushcs-check-geo") {
  return fetch(url, { redirect: "manual", signal: AbortSignal.timeout(20_000), headers: { "user-agent": userAgent } });
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

async function checkRobots(origin) {
  const res = await get(`${origin}/robots.txt`);
  const problems = [];
  if (res.status !== 200) problems.push(`robots.txt answered ${res.status}`);
  const blocked = blockedAgents(await res.text());
  if (blocked.length) problems.push(`Disallow: / applies to ${blocked.join(", ")}`);
  report(!problems.length, `robots.txt lets all ${ROBOT_AGENTS.length} crawlers in (search, AI search, AI assistants)`, problems);
}

/** The sitemap's URLs as paths on `origin` (a local build's sitemap names another host). */
async function sitemapPaths(origin) {
  const res = await get(`${origin}/sitemap.xml`);
  if (res.status !== 200) throw new Error(`sitemap.xml answered ${res.status}`);
  const paths = sitemapUrls(await res.text()).map((url) => new URL(url).pathname);
  if (!paths.length) throw new Error("sitemap.xml lists no URLs");
  return paths;
}

async function checkCrawlers(origin, paths) {
  const cases = paths.flatMap((path) => Object.entries(CRAWLER_USER_AGENTS).map(([bot, ua]) => ({ path, bot, ua })));
  const failures = await pool(cases, 8, async ({ path, bot, ua }) => {
    const res = await get(`${origin}${path}`, ua);
    if (res.status !== 200) return `${path} answered ${res.status} to ${bot}`;
    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("text/html")) return `${path} answered ${type || "no content type"} to ${bot}`;
    if (isChallengePage(await res.text())) return `${path} showed a challenge page to ${bot}`;
    return null;
  });
  const names = Object.keys(CRAWLER_USER_AGENTS).length;
  report(!failures.some(Boolean), `every sitemap URL answers 200 with HTML to ${names} crawlers (${paths.length} URLs, no challenge page)`, failures.filter(Boolean));
}

async function checkPages(origin, paths) {
  const pages = await pool(paths, 8, async (path) => {
    const res = await get(`${origin}${path}`);
    return { path, status: res.status, html: await res.text() };
  });
  const htmlFailures = [];
  const typeFailures = [];
  for (const page of pages) {
    if (typeof page === "string") {
      htmlFailures.push(page);
      continue;
    }
    if (page.status !== 200) {
      htmlFailures.push(`${page.path} answered ${page.status}`);
      continue;
    }
    for (const problem of htmlProblems(page.html)) htmlFailures.push(`${page.path}: ${problem}`);
    for (const problem of jsonLdProblems(page.html, page.path)) typeFailures.push(`${page.path}: ${problem}`);
  }
  report(!htmlFailures.length, `raw HTML holds each page's H1 and every FAQPage question and answer (${paths.length} pages)`, htmlFailures);
  report(!typeFailures.length, `every JSON-LD block parses and each page carries its schema.org types (${paths.length} pages)`, typeFailures);
}

async function checkLlms(origin, paths) {
  const res = await get(`${origin}/llms.txt`);
  const contentType = res.headers.get("content-type") ?? "";
  const problems = llmsProblems({ status: res.status, contentType, text: await res.text() }, paths);
  report(!problems.length, `/llms.txt answers 200 as text/plain and lists every sitemap page (${paths.length} pages)`, problems);
}

async function main() {
  const args = process.argv.slice(2);
  const prelaunch = args.includes("--prelaunch");
  const originArg = args.find((a) => !a.startsWith("--"));
  if (!originArg) {
    console.error("Usage: node scripts/check-geo.mjs <origin> [--prelaunch]");
    process.exit(2);
  }
  const origin = new URL(originArg).origin;
  console.log(`Checking ${origin}${prelaunch ? " (pre-launch: robots.txt check skipped)" : ""}\n`);

  if (!prelaunch) {
    try {
      await checkRobots(origin);
    } catch (error) {
      report(false, "robots.txt check could not run", [error.message]);
    }
  }
  let paths = null;
  try {
    paths = await sitemapPaths(origin);
  } catch (error) {
    report(false, "sitemap.xml lists the pages to check", [error.message]);
  }
  if (paths) {
    for (const step of [checkCrawlers, checkPages, checkLlms]) {
      try {
        await step(origin, paths);
      } catch (error) {
        report(false, "check could not run", [error.message]);
      }
    }
  }

  const failed = results.filter((ok) => !ok).length;
  console.log(`\n${failed ? `${failed} of ${results.length} checks FAILED` : `All ${results.length} checks passed`}`);
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
