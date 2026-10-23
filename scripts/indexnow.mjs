#!/usr/bin/env node
// Tells IndexNow (Bing, and through it Copilot and reportedly ChatGPT search) which pages are on the site
// (Task G1.8, SEO/geo-implementation-plan.md §S5). Run it after a production deploy succeeds (CLAUDE.md,
// "Releasing to production").
//
//   node scripts/indexnow.mjs https://deushcs.com --dry-run    prints the URL list, sends nothing
//   node scripts/indexnow.mjs https://deushcs.com              posts the list to api.indexnow.org
//
// It refuses any origin but https://deushcs.com, and refuses to send while robots.txt disallows all.
// The key is public by design: public/<key>.txt serves it, so IndexNow can check that the site agrees.

import { pathToFileURL } from "node:url";
import { disallowsRoot } from "./check-geo.mjs";
import { sitemapUrls } from "./check-launch.mjs";

export const SITE_ORIGIN = "https://deushcs.com";
export const INDEXNOW_KEY = "72a148284c20414e96d2cb7789257bee";
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
/** IndexNow takes at most 10,000 URLs in one request. */
const MAX_URLS = 10_000;

/** The origin to submit to. Throws for any other origin, so nothing else is ever sent. */
export function allowedOrigin(arg) {
  let origin;
  try {
    origin = new URL(arg).origin;
  } catch {
    throw new Error(`not a URL: ${arg}`);
  }
  if (origin !== SITE_ORIGIN) throw new Error(`refusing ${origin}: this script only submits ${SITE_ORIGIN}`);
  return origin;
}

/** The sitemap's URLs, once each. Throws if it is empty, names another host or lists too many. */
export function submittableUrls(sitemapXml) {
  const urls = [...new Set(sitemapUrls(sitemapXml))];
  if (!urls.length) throw new Error("sitemap.xml lists no URLs");
  const others = urls.filter((url) => !(URL.canParse(url) && new URL(url).origin === SITE_ORIGIN));
  if (others.length) throw new Error(`sitemap.xml names other hosts: ${others.join(", ")}`);
  if (urls.length > MAX_URLS) throw new Error(`sitemap.xml lists ${urls.length} URLs, and IndexNow takes ${MAX_URLS} at most`);
  return urls;
}

/** Why the list must not be sent yet, or null. A robots.txt that disallows all is the pre-launch state (§S5). */
export function blockedReason({ status, text }) {
  if (status !== 200) return `robots.txt answered ${status}`;
  return disallowsRoot(text, "*") ? "robots.txt disallows all, so the site isn't open to search engines yet" : null;
}

/** The request body IndexNow expects: the host, the key, where its key file is, and the URLs. */
export function indexNowBody(urls) {
  return {
    host: new URL(SITE_ORIGIN).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };
}

async function get(url) {
  return fetch(url, { redirect: "manual", signal: AbortSignal.timeout(20_000), headers: { "user-agent": "deushcs-indexnow" } });
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const originArg = args.find((arg) => !arg.startsWith("--"));
  if (!originArg) {
    console.error("Usage: node scripts/indexnow.mjs https://deushcs.com [--dry-run]");
    process.exit(2);
  }
  let origin;
  try {
    origin = allowedOrigin(originArg);
  } catch (error) {
    console.error(`Refused: ${error.message}. Nothing sent.`);
    process.exit(1);
  }

  let urls;
  let blocked;
  try {
    const robots = await get(`${origin}/robots.txt`);
    blocked = blockedReason({ status: robots.status, text: await robots.text() });
    const sitemap = await get(`${origin}/sitemap.xml`);
    if (sitemap.status !== 200) throw new Error(`sitemap.xml answered ${sitemap.status}`);
    urls = submittableUrls(await sitemap.text());
  } catch (error) {
    console.error(`Refused: ${error.message}. Nothing sent.`);
    process.exit(1);
  }

  console.log(`${urls.length} URLs in ${origin}/sitemap.xml:`);
  for (const url of urls) console.log(`  ${url}`);
  if (dryRun) {
    console.log(blocked ? `Dry run: nothing sent. A real run would refuse: ${blocked}.` : "Dry run: nothing sent.");
    process.exit(0);
  }
  if (blocked) {
    console.error(`Refused: ${blocked}. Nothing sent.`);
    process.exit(1);
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(indexNowBody(urls)),
    signal: AbortSignal.timeout(20_000),
  });
  // 200 and 202 mean IndexNow took the list (202: its key check is still pending). Anything else is a refusal.
  console.log(`IndexNow answered ${res.status} for ${urls.length} URLs.`);
  process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
