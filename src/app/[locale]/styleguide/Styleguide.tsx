import { Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AppraisalCard, PlayCard, ProfileCard, ResultCard } from "@/components/blocks/DataCards";
import { EventLog } from "@/components/blocks/EventLog";
import { LinkCard } from "@/components/blocks/LinkCard";
import { LogoWall } from "@/components/blocks/LogoWall";
import { QuoteCard, QuoteGrid } from "@/components/blocks/QuoteCard";
import { StoryCard, StoryGrid } from "@/components/blocks/StoryCard";
import { GameGrid, GameTile } from "@/components/blocks/GameTile";
import { JourneyTimeline, MilestoneTimeline } from "@/components/blocks/JourneyTimeline";
import { PotentiaBand } from "@/components/blocks/PotentiaBand";
import { ProductGrid, ProductTile } from "@/components/blocks/ProductTile";
import { ScrollSyncedScreen } from "@/components/blocks/ScrollSyncedScreen";
import { ProofRow, StatReadout, StatTiles } from "@/components/blocks/StatReadout";
import { WhereWeHelpTabs } from "@/components/blocks/WhereWeHelpTabs";
import { WhyPanel } from "@/components/blocks/WhyPanel";
import { StatusPanel } from "@/components/site/StatusPanel";
import { solutionsHref } from "@/components/site/nav";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChoiceChips } from "@/components/ui/choice-chips";
import { Container } from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { FormError, SuccessPanel } from "@/components/ui/form-status";
import { Chip, SectionLabel, Tag } from "@/components/ui/pills";
import { Placeholder } from "@/components/ui/placeholder";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { TextLink } from "@/components/ui/text-link";
import { images } from "@/content/images";
import { styleguideCopy, styleguideLabels as L } from "@/content/styleguide";
import { Link } from "@/i18n/navigation";
import { productChoices } from "@/lib/leads/schema";
import { potentiaHref, whatsappHref } from "@/lib/links";
import { cn } from "@/lib/utils";

/** A white card on the sheet, like the mockup's guide (`.g`). */
function Sheet({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("min-w-0 rounded-lg border border-line bg-white p-6 desk:p-10", className)}>
      <h3 className="mb-6 text-h3-panel text-ink">{title}</h3>
      {children}
    </div>
  );
}

export async function Styleguide({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const long = (await searchParams).long === "1";
  const c = long ? styleguideCopy.long : styleguideCopy.normal;
  const tf = await getTranslations("ContactForm");
  const t404 = await getTranslations("NotFound");

  const productOptions = productChoices.map((value) => ({
    value,
    label: tf(`productInterest.${value}`),
  }));
  const sizeOptions = (["under-100", "100-499", "500-1999", "2000-plus"] as const).map((value) => ({
    value,
    label: tf(`size.${value}`),
  }));
  const toggle = (
    <Button asChild variant="secondary" size="sm">
      <Link href={long ? "/styleguide" : "/styleguide?long=1"} scroll={false}>
        {long ? c.intro.longOff : c.intro.longOn}
      </Link>
    </Button>
  );

  return (
    <div data-long={long || undefined}>
      {/* Intro */}
      <Container className="pt-16 pb-[var(--section-y)] text-center">
        <SectionLabel className="mb-5">{c.intro.label}</SectionLabel>
        <h1 className="text-[60px]/none font-semibold tracking-[-0.05em] text-ink desk:text-[96px]">{c.intro.title}</h1>
        <p className="mx-auto mt-[22px] max-w-[34em] text-lede-sm text-balance text-slate">{c.intro.lede}</p>
        <p className="mx-auto mt-3 max-w-[34em] text-label text-slate">{c.intro.note}</p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {toggle}
          <p className="text-meta text-slate">{L.toggleHint}</p>
        </div>
      </Container>
      {/* Always within reach while scrolling the sheet */}
      <div className="fixed bottom-6 left-6 z-40 max-desk:hidden">{toggle}</div>

      {/* Colour and type */}
      <Section surface="cloud">
        <SectionHeader label={c.headings.colour.label} title={c.headings.colour.title} />
        <div className="grid gap-5">
          <Sheet title={L.sub.swatches}>
            <ul className="grid grid-cols-2 gap-3.5 min-[600px]:grid-cols-3 desk:grid-cols-6">
              {L.swatches.map((s) => (
                <li key={s.name}>
                  <div className={cn("h-[120px] rounded-[20px] border border-line", s.className)} />
                  <b className="mt-3.5 block text-ui font-bold text-ink">{s.name}</b>
                  <span className="block text-meta text-slate">{s.value}</span>
                  <span className="block text-meta/[1.45] text-slate">{s.role}</span>
                </li>
              ))}
            </ul>
          </Sheet>
          <Sheet title={L.sub.gradients}>
            <ul className="grid gap-3.5 min-[600px]:grid-cols-2 desk:grid-cols-5">
              {L.gradients.map((g) => (
                <li key={g.name} className={cn("flex h-24 items-end rounded-[20px] border border-line px-[18px] py-3.5 text-meta font-semibold text-ink", g.className)}>
                  {g.name}
                </li>
              ))}
            </ul>
          </Sheet>
          <Sheet title={c.headings.type.title}>
            <ul>
              {L.type.map((row) => (
                <li key={row.name} className="grid items-baseline gap-2 border-t border-line py-3.5 desk:grid-cols-[200px_1fr]">
                  <small className="text-meta text-slate">{row.name}</small>
                  <span className={cn("text-ink", row.className)}>{c.headings.journey.title}</span>
                </li>
              ))}
            </ul>
          </Sheet>
        </div>
      </Section>

      {/* Buttons, links, pills */}
      <Section>
        <SectionHeader label={c.headings.actions.label} title={c.headings.actions.title} />
        <div className="grid gap-5 desk:grid-cols-3">
          <Sheet title={L.sub.buttons}>
            <div className="flex flex-col items-start gap-3">
              <Button>{c.buttons.primary}</Button>
              <Button variant="secondary">{c.buttons.secondary}</Button>
              <Button size="sm">{c.buttons.small}</Button>
              <Button variant="text">{c.buttons.text}</Button>
              <Button variant="secondary" size="icon" aria-label={c.buttons.icon}>
                <Menu aria-hidden="true" />
              </Button>
              <Button busy>{tf("sending")}</Button>
              <Button disabled>{c.buttons.disabled}</Button>
            </div>
          </Sheet>
          <Sheet title={L.sub.links}>
            <div className="flex flex-col items-start gap-4">
              <TextLink href="/clients">{c.links.next}</TextLink>
              <TextLink href={potentiaHref()}>{c.links.external}</TextLink>
              <TextLink href="#styleguide-tabs" icon="down">{c.links.down}</TextLink>
              <p className="text-body text-slate">
                {c.links.inlineBefore}
                <TextLink href="/privacy" variant="inline">{c.links.inline}</TextLink>
                {c.links.inlineAfter}
              </p>
            </div>
          </Sheet>
          <Sheet title={c.headings.pills.title}>
            <p className="mb-3 text-meta text-slate">{L.sub.label}</p>
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel>{c.pills.label}</SectionLabel>
              <span className="rounded-md bg-[image:var(--grad-closing)] p-3">
                <SectionLabel>{c.pills.label}</SectionLabel>
              </span>
            </div>
            <p className="mt-6 mb-3 text-meta text-slate">{L.sub.tags}</p>
            <div className="flex flex-wrap gap-2">
              {c.pills.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <p className="mt-6 mb-3 text-meta text-slate">{L.sub.chips}</p>
            <div className="flex flex-wrap gap-2">
              {c.pills.chips.map((chip, i) => (
                <Chip key={chip} pressed={i === 0}>
                  {chip}
                </Chip>
              ))}
            </div>
          </Sheet>
        </div>
      </Section>

      {/* Section header */}
      <Section surface="cloud">
        <SectionHeader label={c.sectionHeader.label} title={c.sectionHeader.title} lede={c.sectionHeader.lede} className="mb-0" />
      </Section>

      {/* Journey timeline (hero window) */}
      <section className="relative overflow-hidden pt-[var(--section-y)]">
        <Container>
          <SectionHeader label={c.headings.journey.label} title={c.headings.journey.title} lede={c.headings.journey.lede} className="mb-0" />
        </Container>
        <JourneyTimeline
          className="mt-16"
          caption={c.journey.caption}
          label={c.journey.label}
          steps={[
            {
              when: c.journey.when[0],
              card: <PlayCard image={{ ...images.gbaStory, alt: "" }} title={c.journey.play.title} meta={c.journey.play.meta} />,
            },
            {
              when: c.journey.when[1],
              card: <ProfileCard {...c.journey.profile} />,
            },
            {
              when: c.journey.when[2],
              card: <AppraisalCard {...c.journey.appraisal} />,
            },
          ]}
        />
      </section>

      {/* Where we help */}
      <Section id="styleguide-tabs">
        <SectionHeader label={c.headings.tabs.label} title={c.headings.tabs.title} />
        <WhereWeHelpTabs
          label={c.tabs.label}
          tabs={[
            { ...c.tabs.items[0]!, image: { ...images.gbaNumerical, alt: c.tabs.items[0]!.alt ?? "" }, result: c.tabs.result },
            { ...c.tabs.items[1]! },
            { ...c.tabs.items[2]!, image: { ...images.enhanceDashboard, alt: c.tabs.items[2]!.alt ?? "" } },
          ]}
        />
        <Sheet title={L.sub.cards} className="mt-16 bg-cloud">
          <div className="grid items-start gap-5 min-[600px]:grid-cols-2 desk:grid-cols-4">
            <PlayCard surface="solid" image={{ ...images.gbaStory, alt: c.journey.play.alt }} title={c.journey.play.title} meta={c.journey.play.meta} />
            <ProfileCard surface="solid" {...c.journey.profile} />
            <AppraisalCard surface="solid" {...c.journey.appraisal} />
            <ResultCard {...c.tabs.result} />
          </div>
        </Sheet>
      </Section>

      {/* Scroll-synced product screen (Enhance) */}
      <Section surface="cloud" id="styleguide-scroll">
        <SectionHeader label={c.headings.scroll.label} title={c.headings.scroll.title} />
        <ScrollSyncedScreen
          steps={c.scroll.map(({ alt, ...step }, i) => ({
            ...step,
            image: alt ? { ...(i === 2 ? images.enhanceDashboard : images.enhanceCalibrationMatrix), alt } : undefined,
          }))}
        />
      </Section>

      {/* Product tiles */}
      <Section surface="cloud" tight>
        <SectionHeader label={c.headings.products.label} title={c.headings.products.title} />
        <ProductGrid>
          <ProductTile
            variant="lead"
            title={c.products.lead.title}
            subtitle={c.products.lead.subtitle}
            body={c.products.lead.body}
            tags={c.products.lead.tags}
            linkLabel={c.products.lead.link}
            href="/solutions/enhance"
            image={{ ...images.enhanceDashboard, alt: "" }}
          />
          <ProductTile
            variant="side"
            title={c.products.discover.title}
            subtitle={c.products.discover.subtitle}
            body={c.products.discover.body}
            linkLabel={c.products.discover.link}
            href="/solutions/game-based-assessment#personality"
            image={{ ...images.gbaStory, alt: "" }}
          />
          <ProductTile
            variant="side"
            title={c.products.nextChapter.title}
            subtitle={c.products.nextChapter.subtitle}
            body={c.products.nextChapter.body}
            linkLabel={c.products.nextChapter.link}
            href="/solutions/game-based-assessment#cognitive"
            image={{ ...images.gbaSpeed, alt: "" }}
          />
          <ProductTile
            variant="potentia"
            chip={c.products.potentia.chip}
            title={c.products.potentia.title}
            body={c.products.potentia.body}
            linkLabel={c.products.potentia.link}
            href={potentiaHref()}
            art={{
              phone: { ...images.potentiaPhone, alt: c.products.potentia.phoneAlt },
              report: { ...images.potentiaReport, alt: c.products.potentia.reportAlt },
            }}
          />
        </ProductGrid>
      </Section>

      {/* Game tiles, event log, stat tiles */}
      <Section surface="sky-wash">
        <SectionHeader label={c.headings.games.label} title={c.headings.games.title} lede={c.headings.games.lede} />
        <GameGrid>
          <GameTile
            image={{ ...images.gbaStory, alt: c.games.tiles[0]!.alt }}
            title={c.games.tiles[0]!.title}
            caption={c.games.tiles[0]!.caption}
            overlay={<EventLog title={c.games.log.title} rows={c.games.log.rows} />}
          />
          <GameTile image={{ ...images.gbaCategorization, alt: c.games.tiles[1]!.alt }} title={c.games.tiles[1]!.title} caption={c.games.tiles[1]!.caption} />
          <GameTile image={{ ...images.gbaSpeed, alt: c.games.tiles[2]!.alt }} title={c.games.tiles[2]!.title} caption={c.games.tiles[2]!.caption} />
          <GameTile placeholder={c.games.tiles[3]!.placeholder} title={c.games.tiles[3]!.title} caption={c.games.tiles[3]!.caption} />
        </GameGrid>
        <div className="mt-10 grid items-center gap-10 desk:mt-16 desk:grid-cols-2 desk:gap-16">
          <p className="text-[17px]/[1.65] text-slate desk:text-[18px]">{c.games.note}</p>
          <StatTiles items={c.games.stats} />
        </div>
        <h3 className="mt-16 mb-6 text-h3-panel text-ink">{L.sub.gameList}</h3>
        <GameGrid variant="list">
          {c.games.list.map((game, i) => (
            <GameTile
              key={game.title}
              size="list"
              image={{ ...[images.gbaNumerical, images.gbaCategorization, images.gbaSpeed][i]!, alt: "" }}
              title={game.title}
              caption={game.caption}
              overlayOnMobile="below"
              overlay={i === 0 ? <EventLog title={c.games.log.title} rows={c.games.log.rows.slice(0, 2)} /> : undefined}
            />
          ))}
        </GameGrid>
      </Section>

      {/* Why DEUS */}
      <Section tight>
        <SectionHeader label={c.headings.why.label} title={c.headings.why.title} />
        <WhyPanel items={c.why} />
      </Section>
      <Section surface="cloud">
        <h3 className="mb-6 text-h3-panel text-ink">{L.sub.whyThree}</h3>
        <WhyPanel items={c.values} surface="cloud" columns={3} />
      </Section>

      {/* Stats */}
      <Section>
        <SectionHeader label={c.headings.stats.label} title={c.headings.stats.title} />
        <h3 className="mb-6 text-h3-panel text-ink">{L.sub.bigPanel}</h3>
        <StatReadout stats={c.bigStats} />
        <h3 className="mt-16 mb-6 text-h3-panel text-ink">{L.sub.proof}</h3>
        <ProofRow line={c.proof.line} industries={c.proof.industries} />
      </Section>

      {/* Milestones (About) */}
      <Section tight>
        <SectionHeader label={c.headings.milestones.label} title={c.headings.milestones.title} />
        <MilestoneTimeline label={c.milestones.label} milestones={c.milestones.items} />
      </Section>

      {/* Potentia band */}
      <Section tight>
        <SectionHeader label={c.headings.potentia.label} title={c.headings.potentia.title} />
        <PotentiaBand
          lang="id"
          eyebrow={c.potentiaBand.eyebrow}
          title={c.potentiaBand.title}
          body={c.potentiaBand.body}
          link={{ label: c.potentiaBand.link, href: potentiaHref() }}
          art={{
            phone: { ...images.potentiaPhone, alt: "" },
            report: { ...images.potentiaReport, alt: "" },
          }}
        />
      </Section>

      {/* Form controls */}
      <Section surface="cloud">
        <SectionHeader label={c.headings.forms.label} title={c.headings.forms.title} />
        <div className="grid gap-5 desk:grid-cols-2">
          <Sheet title={L.sub.fields}>
            <div className="grid gap-4">
              <div className="grid gap-4 desk:grid-cols-2">
                <Field label={tf("labels.name")}>
                  <Input name="sg-name" autoComplete="off" />
                </Field>
                <Field label={tf("labels.email")}>
                  <Input name="sg-email" type="email" defaultValue={c.forms.sampleEmail} autoComplete="off" />
                </Field>
              </div>
              <Field label={tf("labels.company")} error={tf("errors.company")}>
                <Input name="sg-company" autoComplete="off" />
              </Field>
              <Field label={tf("labels.whatsapp")} optional={tf("optional")} hint={tf("hints.whatsapp")}>
                <Input name="sg-whatsapp" type="tel" placeholder="+62" autoComplete="off" />
              </Field>
              <Field label={tf("labels.role")} optional={tf("optional")}>
                <Input name="sg-role" disabled defaultValue={c.forms.sampleCompany} />
              </Field>
              <Field label={tf("labels.message")} optional={tf("optional")} hint={tf("hints.message")}>
                <Textarea name="sg-message" defaultValue={c.forms.sampleMessage} />
              </Field>
            </div>
          </Sheet>
          <div className="grid content-start gap-5">
            <Sheet title={L.sub.choice}>
              <div className="grid gap-6">
                <ChoiceChips legend={tf("labels.productInterest")} name="sg-product" options={productOptions} defaultValue="enhance" />
                <ChoiceChips legend={tf("labels.size")} optional={tf("optional")} name="sg-size" options={sizeOptions} error={tf("errors.productInterest")} />
                <Field label={tf("labels.size")} optional={tf("optional")}>
                  <Select name="sg-size-select" defaultValue="">
                    <option value="" disabled>
                      {c.forms.selectPlaceholder}
                    </option>
                    {sizeOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            </Sheet>
            <Sheet title={L.sub.consent}>
              <div className="grid gap-5">
                <Checkbox
                  name="sg-consent"
                  label={
                    <>
                      {tf("labels.consent")}{" "}
                      <TextLink href="/privacy" variant="inline">{tf("labels.privacy")}</TextLink>
                    </>
                  }
                />
                <Checkbox name="sg-consent-checked" defaultChecked label={tf("labels.consent")} />
                <Checkbox name="sg-consent-error" label={tf("labels.consent")} error={tf("errors.consent")} />
              </div>
            </Sheet>
          </div>
          <Sheet title={L.sub.formError}>
            <FormError>{tf("errors.server")}</FormError>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" busy>
                {tf("sending")}
              </Button>
              <Button type="button">{tf("submit")}</Button>
            </div>
          </Sheet>
          <Sheet title={L.sub.success}>
            <SuccessPanel
              focusOnMount={false}
              title={tf("success.title")}
              body={tf("success.body")}
              action={
                <p className="text-body text-slate">
                  {tf("success.hurry")}{" "}
                  <TextLink href={whatsappHref()} icon="none" variant="inline">
                    {tf("success.whatsapp")}
                  </TextLink>
                </p>
              }
            />
          </Sheet>
        </div>
      </Section>

      {/* Segmented tabs */}
      <Section>
        <SectionHeader label={c.headings.segmented.label} title={c.headings.segmented.title} />
        <SegmentedTabs
          label={c.segmented.label}
          items={c.segmented.items.map((item) => ({
            value: item.value,
            label: item.label,
            content: (
              <div className="rounded-xl border border-line bg-[image:var(--grad-stage)] p-6 desk:p-14">
                <Placeholder caption={item.body} className="h-[220px] shadow-float" />
              </div>
            ),
          }))}
        />
      </Section>

      {/* FAQ */}
      <Section tight>
        <SectionHeader label={c.headings.faq.label} title={c.headings.faq.title} />
        <Accordion items={c.faq} />
      </Section>

      {/* Data tables */}
      <Section surface="cloud">
        <SectionHeader label={c.headings.tables.label} title={c.headings.tables.title} />
        <h3 className="mb-4 text-h3-panel text-ink">{L.sub.tableCards}</h3>
        <DataTable mobile="cards" {...c.tables.pricing} />
        <h3 className="mt-16 mb-4 text-h3-panel text-ink">{L.sub.tableScroll}</h3>
        <DataTable mobile="scroll" highlight="cognitive" {...c.tables.matrix} />
      </Section>

      {/* Story pieces (Task 0.11) */}
      <Section>
        <SectionHeader label={c.headings.stories.label} title={c.headings.stories.title} />
        <h3 className="mb-4 text-h3-panel text-ink">{L.sub.storyGrid}</h3>
        <StoryGrid>
          {c.stories.cards.map((card) => (
            <StoryCard key={card.client} {...card} href="/clients" />
          ))}
        </StoryGrid>
        <h3 className="mt-16 mb-4 text-h3-panel text-ink">{L.sub.linkCard}</h3>
        <LinkCard line={c.stories.link.line} href="/clients" />
        <h3 className="mt-16 mb-4 text-h3-panel text-ink">{L.sub.quoteCloud}</h3>
        <QuoteCard {...c.quotes.participants[0]} lang="id" translationLang="en" className="max-w-[560px]" />
      </Section>

      <Section surface="cloud">
        <SectionHeader label={c.headings.quotes.label} title={c.headings.quotes.title} />
        <h3 className="mb-4 text-h3-panel text-ink">{L.sub.quoteMain}</h3>
        <QuoteCard variant="main" surface="white" lang="id" translationLang="en" {...c.quotes.main} />
        <h3 className="mt-16 mb-4 text-h3-panel text-ink">{L.sub.quoteGrid}</h3>
        <QuoteGrid>
          {c.quotes.participants.map((q) => (
            <li key={q.quote}>
              <QuoteCard surface="white" lang="id" translationLang="en" {...q} />
            </li>
          ))}
        </QuoteGrid>
      </Section>

      <Section>
        <SectionHeader label={c.headings.logos.label} title={c.headings.logos.title} />
        <ProofRow line={c.logos.line}>
          <LogoWall
            label={L.sub.logoWall}
            className="mt-10"
            logos={c.logos.names.map((name, i) => ({
              name,
              image: i === 5 ? { src: "/assets/deus-logo.png", width: 1024, height: 1024 } : { src: "/assets/logo-sample.svg", width: 140, height: 32 },
            }))}
          />
        </ProofRow>
        <p className="mt-10 text-center text-label text-slate">{L.sub.logoRaster}</p>
      </Section>

      {/* Placeholder */}
      <Section>
        <SectionHeader label={c.headings.placeholder.label} title={c.headings.placeholder.title} />
        <Placeholder caption={c.placeholder} className="mx-auto h-[260px] max-w-[620px]" />
      </Section>

      {/* 404 panel */}
      <section className="pt-[var(--section-y-tight)]">
        <Container>
          <SectionHeader label={c.headings.status.label} title={c.headings.status.title} className="mb-0" />
        </Container>
        <StatusPanel
          headingAs="h2"
          label={t404("label")}
          title={t404("title")}
          lede={t404("lede")}
          actions={
            <>
              <Button asChild>
                <Link href="/">{t404("home")}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={solutionsHref}>{t404("solutions")}</Link>
              </Button>
            </>
          }
        />
      </section>
    </div>
  );
}
