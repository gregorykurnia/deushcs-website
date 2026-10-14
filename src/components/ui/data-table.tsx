import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { ScrollFade } from "./scroll-fade";

// DESIGN-GUIDE.md §7.24, extrapolated. Pricing, the games list and the use-case × module matrix.
// A white table in a hairline frame (radius 24), cloud header row, the first column as row
// headers in ink. Matrix cells are an azure check ("Yes") or a slate-2 en dash ("No"), never
// ember. Below 901px, `scroll` keeps the table and scrolls it sideways with the first column
// pinned; `cards` turns each row into a white card of label and value pairs.

export type TableColumn = {
  key: string;
  label: string;
  /** `num`: right-aligned tabular numbers in ink (prices, counts). */
  align?: "start" | "num";
};

/** Text, or a yes/no mark for matrices. */
export type TableCell = string | boolean;
export type TableRow = Record<string, TableCell>;

type DataTableProps = {
  caption: string;
  /** Hide the caption visually when a heading above already names the table. */
  captionHidden?: boolean;
  /** The first column holds the row headers. */
  columns: readonly TableColumn[];
  rows: readonly TableRow[];
  mobile?: "scroll" | "cards";
  /** A recommended column, filled sky-1 (never ember). */
  highlight?: string;
  /** Narrowest width before the table scrolls (scroll layout). */
  minWidth?: number;
  className?: string;
};

function CellValue({ value }: { value: TableCell | undefined }) {
  const t = useTranslations("DataTable");
  if (value === true) {
    return (
      <>
        <Check aria-hidden="true" className="inline size-[18px] text-azure" strokeWidth={2.2} />
        <span className="sr-only">{t("yes")}</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="text-slate-2">
          –
        </span>
        <span className="sr-only">{t("no")}</span>
      </>
    );
  }
  return value ?? null;
}

export function DataTable({
  caption,
  captionHidden = false,
  columns,
  rows,
  mobile = "scroll",
  highlight,
  minWidth = 640,
  className,
}: DataTableProps) {
  const [first, ...rest] = columns;
  if (!first) return null;
  const cards = mobile === "cards";

  const table = (
    <table
      style={{ "--min": `${minWidth}px` } as CSSProperties}
      className={cn(
        "w-full border-collapse text-ui",
        mobile === "scroll" && "max-desk:min-w-[var(--min)]",
      )}
    >
      {/* the visible caption sits outside the frame, above it; this one names the table */}
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th
              key={col.key}
              scope="col"
              className={cn(
                "bg-cloud px-5 py-4 text-left text-label/[1.4] font-bold text-ink",
                col.align === "num" && "text-right",
                col.key === highlight && "bg-sky-1",
                i === 0 && mobile === "scroll" && "max-desk:sticky max-desk:left-0 max-desk:z-[1]",
              )}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>
            <th
              scope="row"
              className={cn(
                "border-t border-line bg-white px-5 py-4 text-left align-top font-semibold text-ink",
                first.key === highlight && "bg-sky-1",
                mobile === "scroll" && "max-desk:sticky max-desk:left-0 max-desk:z-[1] max-desk:min-w-44",
              )}
            >
              <CellValue value={row[first.key]} />
            </th>
            {rest.map((col) => (
              <td
                key={col.key}
                className={cn(
                  "border-t border-line px-5 py-4 align-top text-slate",
                  col.align === "num" && "text-right text-ink tabular-nums",
                  col.key === highlight && "bg-sky-1",
                )}
              >
                <CellValue value={row[col.key]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={className}>
      {!captionHidden && (
        <p aria-hidden="true" className="pb-3 text-label text-slate">
          {caption}
        </p>
      )}

      <div className={cn("overflow-hidden rounded-lg border border-line bg-white", cards && "max-desk:hidden")}>
        {mobile === "scroll" ? <ScrollFade label={caption}>{table}</ScrollFade> : table}
      </div>

      {cards && (
        <ul aria-label={caption} className="flex flex-col gap-3 desk:hidden">
          {rows.map((row, r) => (
            <li key={r} className="rounded-md border border-line bg-white p-5">
              <p className="text-ui font-semibold text-ink">
                <CellValue value={row[first.key]} />
              </p>
              <dl className="mt-3 grid gap-3">
                {rest.map((col) => (
                  <div key={col.key}>
                    <dt className="text-meta text-slate">{col.label}</dt>
                    <dd className={cn("text-ui text-ink", col.align === "num" && "tabular-nums")}>
                      <CellValue value={row[col.key]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
