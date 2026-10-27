import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";

// Markup tests for the Task 0.9 blocks, Task 0.10 controls and Task 0.11 story pieces: semantics, ARIA wiring and the
// no-JavaScript state. Behaviour (autoplay, keyboard, layout) is in tests/e2e/styleguide.spec.ts.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href === "/" ? "" : href}`} {...props} />
  ),
}));

const { JourneyTimeline, MilestoneTimeline } = await import("@/components/blocks/JourneyTimeline");
const { WhereWeHelpTabs } = await import("@/components/blocks/WhereWeHelpTabs");
const { ScrollSyncedScreen } = await import("@/components/blocks/ScrollSyncedScreen");
const { EventLog, toDuration } = await import("@/components/blocks/EventLog");
const { StatReadout, ProofRow, IndustryTicker, IndustryPills } = await import("@/components/blocks/StatReadout");
const { WhyPanel } = await import("@/components/blocks/WhyPanel");
const { ProfileCard, AppraisalCard } = await import("@/components/blocks/DataCards");
const { DataTable } = await import("@/components/ui/data-table");
const { Accordion } = await import("@/components/ui/accordion");
const { Field, Input } = await import("@/components/ui/field");
const { Checkbox } = await import("@/components/ui/checkbox");
const { ChoiceChips } = await import("@/components/ui/choice-chips");
const { StoryCard, StoryGrid } = await import("@/components/blocks/StoryCard");
const { LinkCard } = await import("@/components/blocks/LinkCard");
const { QuoteCard, QuoteGrid } = await import("@/components/blocks/QuoteCard");
const { LogoWall, logoSize } = await import("@/components/blocks/LogoWall");
const { Rich } = await import("@/components/ui/rich");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

describe("Rich", () => {
  it("renders **bold** as <b> and nothing else", () => {
    const html = render(<Rich text="Trusted by **40+ brands** across <six> industries" />);
    expect(html).toContain('<b class="font-bold text-ink">40+ brands</b>');
    expect(html).toContain("&lt;six&gt;");
  });
});

describe("JourneyTimeline", () => {
  const steps = [
    { when: "**March 2025**, assessed", card: <p>card one</p> },
    { when: "**April 2025**, hired", card: <p>card two</p> },
    { when: "**March 2026**, appraised", card: <p>card three</p> },
  ];

  it("is an ordered list whose last step is marked current", () => {
    const html = render(<JourneyTimeline caption="One person" label="Example journey" steps={steps} />);
    expect(html).toMatch(/<ol aria-label="Example journey"/);
    expect(html.match(/<li /g)).toHaveLength(3);
    expect(html).toContain("<b class=\"font-bold text-ink\">March 2026</b>, appraised");
    expect(html.match(/\(current step\)/g)).toHaveLength(1);
    // one ember node on desktop, one on the mobile date row
    expect(html.match(/journey-now/g)).toHaveLength(1);
  });

  it("puts nodes at 16.6%, 50% and 83.4%, as in the mockup", () => {
    const html = render(<JourneyTimeline caption="c" label="l" steps={steps} />);
    expect(html).toContain("left:16.6%");
    expect(html).toContain("left:50%");
    expect(html).toContain("left:83.4%");
  });

  it("milestones: every dot alike and filled before script, no ember; the last year is announced as now", () => {
    const html = render(
      <MilestoneTimeline
        label="Our journey"
        milestones={[
          { year: "2022", label: "Launch" },
          { year: "2026", label: "Today" },
        ]}
      />,
    );
    expect(html).toMatch(/2026<span class="sr-only"> \(current step\)<\/span>/);
    expect(html).not.toContain("ember");
    expect(html.match(/timeline-dot [^"]*border-azure bg-azure/g)).toHaveLength(2);
    expect(html).toContain('style="--i:1"');
    expect(html).not.toContain("data-sequence");
  });

  it("milestones: an entry's title sits between its year and its text", () => {
    const html = render(
      <MilestoneTimeline
        label="Our journey"
        milestones={[
          { year: "2022", title: "The beginning", label: "Launch" },
          { year: "2026", label: "Today" },
        ]}
      />,
    );
    expect(html).toMatch(/2022<\/p><p[^>]*>The beginning<\/p><p[^>]*>Launch<\/p>/);
    expect(html.match(/The beginning/g)).toHaveLength(1);
  });
});

describe("WhereWeHelpTabs", () => {
  const tabs = [
    { title: "Choose the right people", body: "Body one", product: "DEUS Discover", placeholder: "TODO: one" },
    { title: "Find the potential", body: "Body two", placeholder: "TODO: two" },
    { title: "Pay for performance", body: "Body three", placeholder: "TODO: three" },
  ];

  it("renders a vertical tablist with the first tab selected and no bar before script", () => {
    const html = render(<WhereWeHelpTabs label="From hire to reward" tabs={tabs} />);
    expect(html).toContain('role="tablist"');
    expect(html).toContain('aria-orientation="vertical"');
    expect(html.match(/role="tab"/g)).toHaveLength(3);
    expect(html.match(/aria-selected="true"/g)).toHaveLength(1);
    expect(html).toContain("Body one");
    expect(html).not.toContain("Body two");
    // autoplay only starts from script: before it (and with reduced motion) there's no bar, only its empty place
    expect(html).not.toContain("tab-progress");
    expect(html).not.toMatch(/<i[\s>]/);
    expect(html.match(/data-progress/g)).toHaveLength(1);
    expect(html.match(/role="tabpanel"/g)).toHaveLength(3);
    // one frame for every screen (F108)
    expect(html.match(/data-frame/g)).toHaveLength(3);
  });
});

describe("ScrollSyncedScreen", () => {
  const steps = [
    { title: "Set the framework", body: "Body one", placeholder: "TODO: one" },
    { title: "Track across levels", body: "Body two", placeholder: "TODO: two" },
    { title: "Review performance", body: "Body three", image: { src: "/assets/enhance-1.png", width: 811, height: 620, alt: "Appraisal dashboard" } },
  ];

  it("before script, every step sits beside its own screen: no stage, no active step, no ember bar", () => {
    const html = render(<ScrollSyncedScreen steps={steps} />);
    expect(html).toContain('data-scroll-sync="static"');
    expect(html.match(/<li /g)).toHaveLength(3);
    expect(html.match(/<h3 /g)).toHaveLength(3);
    for (const text of ["Body one", "Body two", "Body three", "TODO: one", "TODO: two", 'alt="Appraisal dashboard"']) {
      expect(html).toContain(text);
    }
    expect(html).not.toContain("data-stage");
    expect(html).not.toContain("data-step-bar");
    expect(html).not.toContain("aria-current");
  });
});

describe("EventLog", () => {
  it("gives timestamps a machine-readable duration", () => {
    expect(toDuration("00:45.4")).toBe("PT0M45.4S");
    expect(toDuration("1:02")).toBe("PT1M02S");
    expect(toDuration("soon")).toBeUndefined();
    const html = render(<EventLog title="Recording this scene" rows={[{ time: "00:43.8", action: "Reads both options" }]} />);
    expect(html).toContain('<time dateTime="PT0M43.8S"');
  });
});

describe("data cards and stats", () => {
  it("profile traits are a list, each label beside its tabular value", () => {
    const html = render(
      <ProfileCard label="Candidate profile" name="Rina" traits={[{ label: "Rational", value: 94 }]} />,
    );
    expect(html).toMatch(/<li><p[^>]*><span>Rational<\/span><span class="[^"]*tabular-nums[^"]*">94<\/span><\/p>/);
  });

  it("the only ember in the appraisal card is the approved status, in ember-ink", () => {
    const html = render(
      <AppraisalCard
        label="Q1"
        score="3.05"
        rating="Above expectations"
        split={[
          { label: "KPI", value: "2.96" },
          { label: "Competency", value: "3.40" },
        ]}
        bonus={{ label: "Bonus band B", status: "Approved" }}
      />,
    );
    expect(html).toContain('text-ember-ink">Approved');
    expect(html).not.toMatch(/(bg|text)-ember(?![-\w])/);
  });

  it("big stats keep the number and its label together", () => {
    const html = render(<StatReadout stats={[{ value: "40+", label: "brands" }]} />);
    expect(html).toMatch(/<dt[^>]*>brands<\/dt><dd[^>]*>40\+<\/dd>/);
    expect(render(<ProofRow line="Trusted by **40+ brands**" industries={["Retail"]} />)).toContain("<li>Retail</li>");
  });

  it("the industries: every one in the HTML as plain text, each fading up 80ms after the one before (F123)", () => {
    const html = render(<IndustryPills items={["Retail", "Telecommunications", "Education"]} />);
    expect(html.match(/<li[^>]*>/g)).toHaveLength(3);
    expect(html).toMatch(/<li[^>]*style="--i:2"[^>]*>Education<\/li>/);
    expect(html).not.toContain("industry-ticker");
    // pills are only for things you can click: no fill, no pill, no padding
    expect(html).toContain("tag-line");
    expect(html).toContain("text-slate");
    expect(html).not.toMatch(/rounded-|bg-sky|bg-white|px-\d|py-\d/);
  });

  it("the industry ticker: the full list once for screen readers, the moving words hidden, all in the HTML", () => {
    const items = ["Retail", "Telecommunications", "Education"];
    const html = render(<IndustryTicker items={items} />);
    // the static list (the line itself with reduced motion), visually hidden while the words move
    expect(html).toMatch(/<ul class="[^"]*motion-safe:sr-only[^"]*"><li>Retail<\/li><li>Telecommunications<\/li><li>Education<\/li><\/ul>/);
    // the rotating words: aria-hidden, stacked in one cell, 2.5s apart, the first already in
    expect(html).toMatch(/<span aria-hidden="true" class="hidden [^"]*motion-safe:inline-grid/);
    expect(html.match(/industry-ticker-word/g)).toHaveLength(3);
    expect(html).toContain("animation-name:industry-ticker-3;animation-duration:7.5s;animation-delay:-0.5s");
    expect(html).toContain("animation-name:industry-ticker-3;animation-duration:7.5s;animation-delay:4.5s");
    // in by 0.5s, out from 2.5s, gone by 3s: each word leads for a third of the loop
    expect(html).toContain("@keyframes industry-ticker-3{0%{opacity:0;translate:24px 0}6.667%,33.333%{opacity:1;translate:0 0}40%,100%{opacity:0;translate:-24px 0}}");
    // focusable, so a keyboard can pause it
    expect(html).toMatch(/<div tabindex="0" class="industry-ticker /);
  });

  it("the industry ticker stands still with one industry", () => {
    const html = render(<IndustryTicker items={["Retail"]} />);
    expect(html).toContain("<li>Retail</li>");
    expect(html).not.toContain("industry-ticker");
  });

  it("why panels use h3 titles and decorative icons", () => {
    const html = render(<WhyPanel items={[{ icon: "flask", title: "Evidence", body: "Body" }]} />);
    expect(html).toContain("<h3");
    expect(html).toContain('aria-hidden="true"');
  });
});

describe("DataTable", () => {
  const columns = [
    { key: "useCase", label: "Use case" },
    { key: "cognitive", label: "Cognitive" },
  ];
  const rows = [{ useCase: "Campus recruitment", cognitive: true }, { useCase: "Leadership", cognitive: false }];

  it("has a caption, scoped headers and spoken yes/no marks", () => {
    const html = render(<DataTable caption="Modules by use case" columns={columns} rows={rows} />);
    expect(html).toContain('<caption class="sr-only">Modules by use case</caption>');
    expect(html).toContain('scope="col"');
    expect(html.match(/scope="row"/g)).toHaveLength(2);
    expect(html).toContain('<span class="sr-only">Yes</span>');
    expect(html).toContain('<span class="sr-only">No</span>');
  });

  it("cards layout adds a phone list of label and value pairs", () => {
    const html = render(<DataTable mobile="cards" caption="Games" columns={columns} rows={rows} />);
    expect(html).toContain('<ul aria-label="Games"');
    expect(html).toContain("<dt");
  });
});

describe("Accordion", () => {
  it("uses native details, closed by default, with answers in the HTML", () => {
    const html = render(<Accordion items={[{ question: "Can candidates cheat?", answer: "No. **Very little** to look up." }]} />);
    expect(html).toContain("<details");
    expect(html).not.toContain(" open");
    expect(html).toContain("<summary");
    expect(html).toContain("Very little</b> to look up.");
  });
});

describe("form controls", () => {
  it("Field wires the label, error and hint to its input", () => {
    const html = render(
      <Field id="company" label="Company" error="Please tell us your company's name." hint="As on your invoice">
        <Input name="company" />
      </Field>,
    );
    expect(html).toContain('for="company"');
    expect(html).toContain('id="company"');
    expect(html).toContain('aria-describedby="company-error company-hint"');
    expect(html).toContain('aria-invalid="true"');
  });

  it("a field without an error isn't invalid", () => {
    const html = render(
      <Field id="name" label="Full name">
        <Input name="name" />
      </Field>,
    );
    expect(html).not.toContain('aria-invalid="');
    expect(html).not.toContain('aria-describedby="');
  });

  it("consent is a native checkbox inside its label", () => {
    const html = render(<Checkbox name="consent" label="I agree" error="Please tick the box" />);
    expect(html).toMatch(/<label[^>]*>.*<input[^>]*type="checkbox"/);
    expect(html).toContain('aria-invalid="true"');
  });

  it("choice chips are a radio group of native radios", () => {
    const html = render(
      <ChoiceChips
        legend="Company size"
        name="size"
        defaultValue="100-499"
        options={[
          { value: "under-100", label: "Under 100" },
          { value: "100-499", label: "100–499" },
        ]}
      />,
    );
    expect(html).toContain('role="radiogroup"');
    expect(html).toContain("<legend");
    expect(html.match(/type="radio"/g)).toHaveLength(2);
    expect(html).toMatch(/checked="" value="100-499"/);
  });
});

describe("StoryCard", () => {
  const card = { product: "Game-Based Assessment", client: "A national telecom group", result: "1,000+ candidates, results in one day.", href: "/clients/telkom" };

  it("is one link holding the tag, client, result heading and call to action", () => {
    const html = render(<StoryGrid><StoryCard {...card} /></StoryGrid>);
    expect(html.match(/<a /g)).toHaveLength(1);
    expect(html).toContain('href="/en/clients/telkom"');
    expect(html).toMatch(/<h3[^>]*line-clamp-3[^>]*>1,000\+ candidates, results in one day\.<\/h3>/);
    expect(html).toContain("Read the story");
  });

  it("only draws the sky tile when there is an image or a placeholder", () => {
    expect(render(<StoryCard {...card} />)).not.toContain("grad-thumb");
    expect(render(<StoryCard {...card} placeholder="TODO: photo" />)).toContain("TODO: photo");
  });

  it("says when the story is in another language", () => {
    expect(render(<StoryCard {...card} note="The story is in Indonesian." />)).toContain("The story is in Indonesian.");
  });
});

describe("LinkCard", () => {
  it("names the story in the link, and repeats nothing else", () => {
    const html = render(<LinkCard line="Telkom Group: 1,000+ MT candidates" href="/clients/telkom" />);
    expect(html).toContain("Client story");
    expect(html).toMatch(/<a [^>]*href="\/en\/clients\/telkom"[^>]*>.*Read the story.*<span class="sr-only">: Telkom Group: 1,000\+ MT candidates<\/span>/);
  });

  it("is a cloud panel by default, and white with a hairline on a tinted section", () => {
    const cloud = render(<LinkCard line="A story" href="/clients/a" />);
    expect(cloud).toMatch(/^<div class="[^"]*bg-cloud/);
    const white = render(<LinkCard line="A story" href="/clients/a" surface="white" />);
    expect(white).toMatch(/^<div class="[^"]*border border-line bg-white/);
    expect(white).not.toContain("bg-cloud");
  });
});

describe("QuoteCard", () => {
  it("is a figure with a blockquote, the translation below it and the attribution in a figcaption", () => {
    const html = render(
      <QuoteCard variant="main" lang="id" translationLang="en" quote="Senang sekali." translation="A real pleasure." name="Selection team" role="A telecom group" />,
    );
    expect(html).toMatch(/<figure[^>]*>.*<blockquote[^>]*><p lang="id">Senang sekali\.<\/p><p lang="en"[^>]*>A real pleasure\.<\/p><\/blockquote><figcaption/);
    expect(html).not.toMatch(/italic/);
    expect(html).toContain("Selection team");
  });

  it("leaves out the figcaption when nobody is named", () => {
    expect(render(<QuoteGrid><li><QuoteCard quote="Seru." /></li></QuoteGrid>)).not.toContain("<figcaption");
  });

  it("uses a hairline on white cards, for Cloud sections", () => {
    expect(render(<QuoteCard quote="Seru." surface="white" />)).toContain("border-line");
    expect(render(<QuoteCard quote="Seru." />)).toContain("bg-cloud");
  });
});

describe("LogoWall", () => {
  it("greyscales every logo, SVG or not, sizes them by area, and links only the ones given an href", () => {
    const html = render(
      <LogoWall
        label="Clients"
        logos={[
          { name: "Sample A", image: { src: "/assets/a.svg", width: 140, height: 32 } },
          { name: "Sample B", image: { src: "/assets/b.png", width: 200, height: 200 }, href: "/clients/b" },
        ]}
      />,
    );
    expect(html).toContain('aria-label="Clients"');
    expect(html).toMatch(/alt="Sample A"[^>]*grayscale|grayscale[^>]*alt="Sample A"/);
    expect(html).toMatch(/alt="Sample B"[^>]*grayscale|grayscale[^>]*alt="Sample B"/);
    expect(html.match(/<a /g)).toHaveLength(1);
  });

  it("gives a square mark and a long wordmark about the same area, inside 160x46", () => {
    expect(logoSize({ width: 200, height: 200 })).toEqual({ width: 46, height: 46 });
    expect(logoSize({ width: 480, height: 50 })).toEqual({ width: 160, height: 17 });
    expect(logoSize({ width: 480, height: 120 })).toEqual({ width: 110, height: 27 });
  });

  it("ends with the See all link when given one", () => {
    const html = render(
      <LogoWall logos={[{ name: "Sample A", image: { src: "/assets/a.png", width: 100, height: 50 } }]} more={{ label: "See all 40+", href: "/clients" }} />,
    );
    expect(html).toMatch(/<li[^>]*><a[^>]*href="\/en\/clients"[^>]*>See all 40\+/);
  });

});
