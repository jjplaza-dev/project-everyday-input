import Link from "next/link";
import { Star } from "lucide-react";
import type { ReviewSummary } from "@/types";

/** Renders nothing when there are no reviews. The text equivalent carries the exact figure. */
export function RatingStars({ summary }: { summary: ReviewSummary }) {
  if (summary.count === 0) return null;
  const filled = Math.round(summary.average);
  return (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} className={`size-4 ${n <= filled ? "fill-signal text-signal" : "text-input"}`} strokeWidth={1.5} />
        ))}
      </span>
      <span>
        <span className="sr-only">Rated </span>
        {summary.average.toFixed(1)}
        <span className="sr-only"> out of 5 stars</span> ({summary.count}
        <span className="sr-only"> sample reviews</span>)
      </span>
    </p>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="underline-offset-4 hover:underline">{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-primary">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
