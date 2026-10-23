import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/llms.txt/route";
import sitemap from "@/app/sitemap";
import { homeAnswerPassage, homeEn } from "@/content/en/home";
import { gbaVsPsychometricEn } from "@/content/en/guides/game-based-assessment-vs-psychometric-tests";
import { whatIsGbaEn } from "@/content/en/guides/what-is-game-based-assessment";
import { managementTraineeEn } from "@/content/en/use-cases/management-trainee-assessment";
import { siteFlags } from "@/content/flags";
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
    // the "Use cases" and "Guides" sections hold the use-case pages and the guides, so they follow `showUseCases` and `showGuides`
    const sections = [
      "## Products",
      ...(siteFlags.showUseCases ? ["## Use cases"] : []),
      ...(siteFlags.showGuides ? ["## Guides"] : []),
      "## Company",
    ];
    expect(lines().filter((line) => line.startsWith("## "))).toEqual(sections);
  });

  it("lists the guides index and each guide under Guides, only while showGuides is on", () => {
    const index = `- [Guides for HR teams in Indonesia](${site}/en/guides): `;
    expect(lines().some((l) => l.startsWith(index))).toBe(siteFlags.showGuides);
    for (const guide of [whatIsGbaEn, gbaVsPsychometricEn]) {
      const line = `- [${guide.meta.title}](${site}/en/guides/${guide.slug}): ${guide.meta.description}`;
      expect(lines().includes(line), guide.slug).toBe(siteFlags.showGuides);
    }
  });

  it("lists a use-case page under Use cases with its SEO title and description, only while showUseCases is on", () => {
    const line = `- [${managementTraineeEn.meta.title}](${site}/en/solutions/${managementTraineeEn.slug}): ${managementTraineeEn.meta.description}`;
    expect(lines().includes(line)).toBe(siteFlags.showUseCases);
    if (siteFlags.showUseCases) {
      const at = lines().indexOf(line);
      const heading = lines().slice(0, at).filter((l) => l.startsWith("## ")).at(-1);
      expect(heading).toBe("## Use cases");
    }
  });
});
