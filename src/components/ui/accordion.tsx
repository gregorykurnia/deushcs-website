import { Plus } from "lucide-react";
import { Rich } from "./rich";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.23 (FAQ), extrapolated. Built on native <details>, not Radix: it works
// without JavaScript, several items can be open at once, answers stay in the HTML when closed
// (search and FAQPage data), and browsers open the right item on find-in-page. The question row
// carries the tab's 32px circle with a Plus that turns ink and rotates to × when open.
// The height animates (.25s) where the browser supports it (globals.css `.faq-item`).

export type AccordionItem = {
  question: string;
  /** **bold** is allowed, as in the content files. */
  answer: string;
};

export function Accordion({ items, className }: { items: readonly AccordionItem[]; className?: string }) {
  return (
    <div className={cn("faq mx-auto max-w-[800px] border-t border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="faq-item group/faq border-b border-line">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left",
              "text-[18px]/[1.4] font-bold tracking-[-0.015em] text-ink [&::-webkit-details-marker]:hidden",
            )}
          >
            {item.question}
            <span
              aria-hidden="true"
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full bg-cloud text-slate",
                "transition-[background-color,color,rotate] duration-200",
                "group-hover/faq:text-ink group-open/faq:rotate-45 group-open/faq:bg-ink group-open/faq:text-white",
              )}
            >
              <Plus className="size-4" strokeWidth={2.2} />
            </span>
          </summary>
          <p className="max-w-[68ch] pb-6 text-body-sm text-slate desk:pr-14">
            <Rich text={item.answer} />
          </p>
        </details>
      ))}
    </div>
  );
}
