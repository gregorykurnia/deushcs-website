import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { gbaVsPsychometricEn } from "@/content/en/guides/game-based-assessment-vs-psychometric-tests";
import { whatIsGbaEn } from "@/content/en/guides/what-is-game-based-assessment";
import type { GuideContent } from "@/content/types";

// Task G3.2: the shared guide layout (DESIGN-GUIDE.md §7.31): what the server HTML holds for a guide, and which
// next step it shows (the download offer while `showSampleReport` is on, otherwise one line, left out when its
// use-case page isn't registered). Looks are in the screenshots and tests/e2e/guides.spec.ts.

const flags = vi.hoisted(() => ({ showSampleReport: false }));
vi.mock("@/content/flags", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/content/flags")>();
  return {
    siteFlags: new Proxy(actual.siteFlags, {
      get: (target, key) => (key in flags ? flags[key as keyof typeof flags] : target[key as keyof typeof target]),
    }),
  };
});
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
  usePathname: () => "/guides/what-is-game-based-assessment",
}));
vi.mock("@/lib/leads/actions", () => ({ submitLead: vi.fn() }));

const { GuideArticle } = await import("@/components/guides/GuideArticle");
const { GuideIndex } = await import("@/components/guides/GuideIndex");

/** The server HTML, with the entities React writes for quotes and ampersands turned back into text. */
function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  )
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

const guide = whatIsGbaEn;
const nextStepLine = `${guide.nextStep.text}</span>`;

describe("GuideArticle", () => {
  const html = render(<GuideArticle guide={guide} related={[gbaVsPsychometricEn]} />);

  it("opens with the H1, the answer, the key points, the author and the date", () => {
    expect(html).toContain(`<h1 id="guide-title"`);
    expect(html).toContain(guide.header.title);
    expect(html).toContain(guide.header.answer);
    for (const point of guide.header.keyPoints) expect(html).toContain(point);
    expect(html).toContain("By DEUS Human Capital Services");
    expect(html).toContain('<time dateTime="2026-10-23">Last updated: October 23, 2026</time>');
  });

  it("gives each question its own H2 and the table the existing table component, with every row", () => {
    for (const section of guide.sections) expect(html).toContain(`<h2 id="${section.id}"`);
    expect(html).toContain("<table");
    expect(html).toContain("Seven short, timed games");
  });

  it("keeps the FAQ in the HTML, with its data, and lists the sources as links that open in a new tab", () => {
    for (const item of guide.faq.items) expect(html).toContain(item.question);
    expect(html).toContain('"@type":"FAQPage"');
    for (const source of guide.sources) expect(html).toContain(`href="${source.href}" target="_blank" rel="noopener"`);
  });

  it("ends with the one call to action, the related guides that exist, and the closing panel", () => {
    expect(html).toContain(`href="/en${guide.cta.link.href}"`);
    expect(html).toContain(`href="/en/guides/${gbaVsPsychometricEn.slug}"`);
    expect(html).not.toContain("management-trainee-recruitment");
    expect(html.indexOf("Related guides")).toBeGreaterThan(html.indexOf("Sources"));
    expect(html).toContain('aria-labelledby="closing-title"');
  });

  it("leaves the Related guides section out when there is nothing to list", () => {
    expect(render(<GuideArticle guide={guide} related={[]} />)).not.toContain("Related guides");
  });

  it("shows the one-line next step while the sample report is off, and not the download card", () => {
    flags.showSampleReport = false;
    const out = render(<GuideArticle guide={guide} related={[]} />);
    expect(out).toContain(nextStepLine);
    expect(out).toContain(`href="/en${guide.nextStep.link.href}"`);
    expect(out).not.toContain("data-download-offer");
  });

  it("shows the download card in its place while the sample report is on", () => {
    flags.showSampleReport = true;
    const out = render(<GuideArticle guide={guide} related={[]} />);
    flags.showSampleReport = false;
    expect(out).toContain("data-download-offer");
    expect(out).not.toContain(nextStepLine);
  });

  it("shows the line on a guide with no download, whatever the switch says", () => {
    flags.showSampleReport = true;
    const out = render(<GuideArticle guide={{ ...guide, nextStep: { ...guide.nextStep, offer: false } }} related={[]} />);
    flags.showSampleReport = false;
    expect(out).toContain(nextStepLine);
    expect(out).not.toContain("data-download-offer");
  });

  it("leaves the line out when its use-case page isn't registered, and keeps one that links elsewhere", () => {
    const unknown: GuideContent = { ...guide, nextStep: { ...guide.nextStep, useCase: "no-such-use-case" } };
    expect(render(<GuideArticle guide={unknown} related={[]} />)).not.toContain(nextStepLine);
    const elsewhere: GuideContent = {
      ...guide,
      nextStep: { text: "Ready to talk?", link: { label: "Book a call", href: "/solutions/enhance#book-a-call" }, offer: false },
    };
    expect(render(<GuideArticle guide={elsewhere} related={[]} />)).toContain("Ready to talk?");
  });
});

describe("GuideIndex", () => {
  it("lists each guide with its title, its answer and a link, and nothing else", () => {
    const html = render(<GuideIndex guides={[whatIsGbaEn, gbaVsPsychometricEn]} />);
    expect(html).toContain('<h1 id="guides-title"');
    expect(html).toContain(messages.Guides.indexTitle);
    for (const g of [whatIsGbaEn, gbaVsPsychometricEn]) {
      expect(html).toContain(g.header.title);
      expect(html).toContain(g.header.answer);
      expect(html).toContain(`href="/en/guides/${g.slug}"`);
    }
    expect((html.match(/<li /g) ?? []).length).toBe(2);
  });
});
