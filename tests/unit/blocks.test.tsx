import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";

// Markup tests for the Task 0.9 blocks and Task 0.10 controls: semantics, ARIA wiring and the
// no-JavaScript state. Behaviour (autoplay, keyboard, layout) is in tests/e2e/styleguide.spec.ts.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href === "/" ? "" : href}`} {...props} />
  ),
}));

const { JourneyTimeline, MilestoneTimeline } = await import("@/components/blocks/JourneyTimeline");
const { WhereWeHelpTabs } = await import("@/components/blocks/WhereWeHelpTabs");
const { EventLog, toDuration } = await import("@/components/blocks/EventLog");
const { StatReadout, ProofRow } = await import("@/components/blocks/StatReadout");
const { WhyPanel } = await import("@/components/blocks/WhyPanel");
const { ProfileCard, AppraisalCard } = await import("@/components/blocks/DataCards");
const { DataTable } = await import("@/components/ui/data-table");
const { Accordion } = await import("@/components/ui/accordion");
const { Field, Input } = await import("@/components/ui/field");
const { Checkbox } = await import("@/components/ui/checkbox");
const { ChoiceChips } = await import("@/components/ui/choice-chips");
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

  it("milestones: last year is now", () => {
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
    expect(html.match(/bg-ember/g)).toHaveLength(1);
  });
});

describe("WhereWeHelpTabs", () => {
  const tabs = [
    { title: "Choose the right people", body: "Body one", product: "DEUS Discover", placeholder: "TODO: one" },
    { title: "Find the potential", body: "Body two", placeholder: "TODO: two" },
    { title: "Pay for performance", body: "Body three", placeholder: "TODO: three" },
  ];

  it("renders a vertical tablist with the first tab selected and a full, still bar before script", () => {
    const html = render(<WhereWeHelpTabs label="From hire to reward" tabs={tabs} />);
    expect(html).toContain('role="tablist"');
    expect(html).toContain('aria-orientation="vertical"');
    expect(html.match(/role="tab"/g)).toHaveLength(3);
    expect(html.match(/aria-selected="true"/g)).toHaveLength(1);
    expect(html).toContain("Body one");
    expect(html).not.toContain("Body two");
    // autoplay only starts from script
    expect(html).not.toContain("tab-progress");
    expect(html.match(/role="tabpanel"/g)).toHaveLength(3);
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
