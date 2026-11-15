import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { getGuides } from "@/data/selectors/guides";
import { intendedUseLabels } from "@/lib/labels";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = { title: "Setup guides", description: "Practical guides for gaming, remote work, study and creative desks." };

export default function GuidesPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Setup guides" }]} />
      <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">Setup guides</h1>
      <p className="mt-3 max-w-[68ch] text-muted-foreground">Step-by-step help choosing and connecting gear for the way you use your desk.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {getGuides().map((g) => (
          <li key={g.id}>
            <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col gap-2 rounded-xl border bg-card p-5 shadow-rest transition-shadow duration-150 hover:shadow-float">
              <span className="text-sm font-medium text-signal-ink">{intendedUseLabels[g.audience]}</span>
              <span className="text-display text-2xl text-primary group-hover:underline">{g.title}</span>
              <span className="text-sm text-muted-foreground">{g.summary}</span>
              <span className="mt-auto pt-2 text-sm font-medium text-primary">{pluralize(g.steps.length, "step")}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
