import { Fragment } from "react";

// DESIGN-GUIDE.md §3.3 "Emphasis in body copy": the content files mark one or two key phrases
// with **double asterisks** ("Trusted by **40+ brands**"). This renders them as <b> at 700 in ink,
// and everything else as plain text. Nothing else is parsed. Not for headings: those carry no bold.
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <b key={i} className="font-bold text-ink">
        {part}
      </b>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
