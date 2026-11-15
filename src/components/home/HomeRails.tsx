import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getCollections } from "@/data/selectors/collections";
import { getBestsellers } from "@/data/selectors/products";
import { pluralize } from "@/lib/format";

export function BestsellersRail() {
  return (
    <section aria-labelledby="bestsellers-title" className="container-page pb-16 md:pb-20">
      <div className="flex items-end justify-between gap-4">
        <h2 id="bestsellers-title" className="text-display text-3xl text-primary">Bestsellers</h2>
        <Link href="/shop" className="text-sm font-medium text-primary underline-offset-4 hover:underline">View all gear</Link>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Sample ranking for the prototype catalog.</p>
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getBestsellers(4).map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
      </ul>
    </section>
  );
}

export function CollectionTiles() {
  return (
    <section aria-labelledby="collections-title" className="container-page pb-16 md:pb-20">
      <h2 id="collections-title" className="text-display text-3xl text-primary">Build a setup</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {getCollections().map((c) => (
          <li key={c.id}>
            <Link href={`/collections/${c.slug}`} className="group flex h-full flex-col gap-1 rounded-xl border bg-secondary p-5 transition-shadow duration-150 hover:shadow-float">
              <span className="text-display text-xl text-primary group-hover:underline">{c.title}</span>
              <span className="text-sm text-muted-foreground">{c.description}</span>
              <span className="mt-2 text-sm font-medium text-primary">{pluralize(c.productIds.length, "product")}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
