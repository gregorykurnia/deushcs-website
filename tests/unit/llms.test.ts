import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/llms.txt/route";
import sitemap from "@/app/sitemap";
import { homeAnswerPassage, homeEn } from "@/content/en/home";
import { llmsTxt } from "@/lib/llms";

// Task G1.8: /llms.txt lists every page the sitemap lists, each with its one-line summary (GEO §S5).

const site = "https://deushcs.com";

beforeEach(() => vi.stubEnv("NEXT_PUBLIC_SITE_URL", site));
afterEach(() => vi.unstubAllEnvs());

const lines = () => llmsTxt().split("\n");
const links = () => lines().filter((line) => line.startsWith("- "));

describe("GET /llms.txt", () => {
  it("answers 200 as text/plain, with the text llmsTxt() builds", async () => {
    const res = GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/^text\/plain/);
    expect(await res.text()).toBe(llmsTxt());
  });
});

describe("llmsTxt", () => {
  it("opens with the site name and Home's answer passage, on one line", () => {
    expect(lines().slice(0, 3)).toEqual(["# DEUS Human Capital Services", "", `> ${homeAnswerPassage}`]);
  });

  it("lists every sitemap page, and no other URL", () => {
    const listed = links().map((line) => /\]\(([^)]+)\)/.exec(line)?.[1]);
    expect(listed.sort()).toEqual(sitemap().map(({ url }) => url).sort());
  });

  it("gives each page its SEO title and its description as a one-line summary", () => {
    expect(links().length).toBeGreaterThan(0);
    for (const line of links()) expect(line).toMatch(/^- \[[^\]]+\]\(https:\/\/deushcs\.com\/en[^)]*\): \S/);
    expect(lines()).toContain(`- [${homeEn.meta.title}](${site}/en): ${homeEn.meta.description}`);
  });

  it("groups the pages under their sections in order, and leaves out a section with no pages", () => {
    expect(lines().filter((line) => line.startsWith("## "))).toEqual(["## Products", "## Company"]);
  });
});
