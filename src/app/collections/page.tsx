import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { getCollections } from "@/data/selectors/collections";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = { title: "Collections", description: "Curated sets of gear for different desks." };

export default function CollectionsPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />
      <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">Collections</h1>
      <p className="mt-3 max-w-[68ch] text-muted-foreground">Sets of gear that work together, grouped by how you use your desk.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {getCollections().map((c) => (
          <li key={c.id}>
            <Link href={`/collections/${c.slug}`} className="group flex h-full flex-col gap-2 rounded-xl border bg-card p-5 shadow-rest transition-shadow duration-150 hover:shadow-float">
              <span className="text-display text-2xl text-primary group-hover:underline">{c.title}</span>
              <span className="text-sm text-muted-foreground">{c.description}</span>
              <span className="mt-auto pt-2 text-sm font-medium text-primary">{pluralize(c.productIds.length, "product")}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
