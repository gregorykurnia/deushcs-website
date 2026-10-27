import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProblemGrid, RoleCards, SystemsDiagram } from "@/components/enhance/EnhanceBlocks";
import { ReviewToPay } from "@/components/enhance/ReviewToPay";
import { enhanceEn } from "@/content/en/enhance";
import { images } from "@/content/images";
import { emailHref } from "@/lib/links";

// Task 1.6: what the Enhance page adds to the blocks it reuses: alt text for its screens, the
// systems diagram, the email link's prefill, the SoftwareApplication data and the page-only
// blocks. The page's behaviour (sections, anchors, form, no-JS, the redirect) is in
// tests/e2e/enhance.spec.ts.

describe("Enhance content for the page", () => {
  it("gives each screen on disk alt text", () => {
    for (const alt of Object.values(enhanceEn.screens)) expect(alt).toMatch(/^DEUS Enhance /);
    expect(images.enhanceCalibrationMatrix.src).toBe("/assets/enhance-3.png");
    expect(images.enhanceRewardGrouping.src).toBe("/assets/enhance-2.png");
  });

  it("has three solution cards, in this order (round 4 §S10)", () => {
    expect(enhanceEn.solution.cards.map((card) => card.title)).toEqual([
      "Set KPIs and track them",
      "Review and calibrate",
      "Turn results into pay",
    ]);
    // the six steps are gone, and so is any lede: the cards follow the title
    expect("steps" in enhanceEn.solution).toBe(false);
    expect("lede" in enhanceEn.solution).toBe(false);
    // the third card keeps only the gist of old step 6's second sentence
    expect(enhanceEn.solution.cards[2]!.body).toBe(
      "Connect ratings to bonuses, incentives, salary increases and development, so similar performance leads to similar rewards.",
    );
  });

  it("gives the reward grouping screen its alt, and drops the two screens no page shows", () => {
    expect(enhanceEn.screens.rewardGrouping).toBe(
      "DEUS Enhance reward grouping: employees with similar performance grouped for their rewards",
    );
    expect("teamMembers" in enhanceEn.screens).toBe(false);
    expect("dashboard" in enhanceEn.screens).toBe(false);
  });

  it("points every booking link at the form in the closing panel (F79)", () => {
    expect(enhanceEn.hero.primary.href).toBe("#book-a-call");
    expect(JSON.stringify(enhanceEn)).not.toContain("#next-step");
  });

  it("names the four systems the copy lists, flowing into Enhance", () => {
    expect(enhanceEn.systems.diagram).toEqual({
      sources: ["HRIS", "ERP", "Payroll", "Operational systems"],
      hub: "DEUS Enhance",
    });
  });

  it("keeps the deck's email subject and body", () => {
    expect(enhanceEn.nextStep.email.subject).toBe("Inquiry about DEUS Enhance");
    expect(enhanceEn.nextStep.email.body).toMatch(/^Dear DEUS Admin,\n\nI'm \[Name\] from \[Company Name\]\./);
  });
});

describe("emailHref", () => {
  it("is the bare address without a prefill", () => {
    expect(emailHref()).toBe("mailto:admin@deushcs.com");
  });

  it("encodes the subject and body, with %20 for spaces", () => {
    const href = emailHref({ subject: "Inquiry about DEUS Enhance", body: "Dear DEUS Admin,\n\nHi" });
    expect(href).toBe(
      "mailto:admin@deushcs.com?subject=Inquiry%20about%20DEUS%20Enhance&body=Dear%20DEUS%20Admin%2C%0A%0AHi",
    );
  });
});

/** The text of every `<tag>` in the markup (tests run in node, without a DOM). */
function texts(html: string, tag: string, attrs = "[^>]*") {
  const pattern = new RegExp(`<${tag}${attrs}>([\\s\\S]*?)</${tag}>`, "g");
  return [...html.matchAll(pattern)].map((m) => (m[1] ?? "").replace(/<[^>]+>/g, ""));
}

describe("Enhance blocks", () => {
  it("ProblemGrid numbers the five problems and ends with the teaser link", () => {
    const html = renderToStaticMarkup(
      <ProblemGrid items={enhanceEn.problem.items} teaser={enhanceEn.problem.teaser} teaserHref="#urgency" />,
    );
    expect(texts(html, "h3")).toEqual(enhanceEn.problem.items.map((item) => item.title));
    // plain numbers in circles, never "01" (guide §12)
    expect(texts(html, "span", ' aria-hidden="true"[^>]*')).toEqual(["1", "2", "3", "4", "5"]);
    expect(html).toContain('<a href="#urgency"');
    expect(texts(html, "b")).toEqual(["Up next →"]);
  });

  it("RoleCards shows the five roles in order, the same for the urgency and the outcome", () => {
    const urgency = texts(renderToStaticMarkup(<RoleCards roles={enhanceEn.urgency.roles} surface="white" />), "h3");
    const outcome = texts(renderToStaticMarkup(<RoleCards roles={enhanceEn.outcome.roles} surface="sky-wash" />), "h3");
    expect(urgency).toHaveLength(5);
    expect(outcome).toEqual(urgency);
  });

  it("SystemsDiagram lists each system and the hub", () => {
    const html = renderToStaticMarkup(<SystemsDiagram {...enhanceEn.systems.diagram} />);
    expect(texts(html, "li")).toEqual(enhanceEn.systems.diagram.sources);
    expect(texts(html, "p")).toEqual(["DEUS Enhance"]);
  });
});

describe("ReviewToPay (the hero's review-to-pay loop, F72)", () => {
  const [kpi, appraisal, calibration, bonus] = enhanceEn.hero.sequence.steps;
  const html = renderToStaticMarkup(
    <ReviewToPay
      caption={enhanceEn.hero.sequence.caption}
      frames={[
        { label: kpi.label, image: { ...images.enhancePaCycle, alt: kpi.alt } },
        { label: appraisal.label, image: { ...images.enhancePaDashboard, alt: appraisal.alt } },
        { label: calibration.label, image: { ...images.enhanceCalibrationMatrix, alt: calibration.alt } },
        { label: bonus.label, image: { ...images.enhanceBonusDashboard, alt: bonus.alt } },
      ]}
    />,
  );

  it("names the four steps in order, KPI to bonus, under its caption", () => {
    expect(texts(html, "figcaption")).toEqual(["From review to pay decision"]);
    expect(texts(html, "span", ' class="rtp-label[^"]*"')).toEqual(["KPIs", "Appraisal", "Calibration", "Bonus"]);
  });

  it("shows each step's screen", () => {
    for (const step of [kpi, appraisal, calibration, bonus]) expect(html).toContain(`alt="${step.alt.replace(/'/g, "&#x27;")}"`);
    expect(html.match(/class="rtp-frame /g)).toHaveLength(4);
  });

  it("rests paused until script sees it on screen, and takes focus so it can be paused", () => {
    expect(html).not.toContain("data-playing");
    expect(html).toMatch(/<figure[^>]*tabindex="0"/i);
  });
});
