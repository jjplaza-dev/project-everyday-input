import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { getCollectionBySlug, getCollectionProducts, getCollectionSlugs } from "@/data/selectors/collections";
import { formatMoney } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  return collection ? { title: collection.title, description: collection.description } : {};
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = getCollectionProducts(collection);
  const total = products.reduce((sum, p) => sum + p.basePrice, 0);

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections", href: "/collections" }, { label: collection.title }]} />
      <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">{collection.title}</h1>
      <p className="mt-3 max-w-[68ch] text-muted-foreground">{collection.description}</p>

      <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
      </ul>

      <section aria-labelledby="complete-title" className="mt-14 rounded-xl border bg-secondary p-6">
        <h2 id="complete-title" className="text-display text-2xl text-primary">Complete the setup</h2>
        <ol className="mt-4 divide-y">
          {products.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-4 py-2 text-sm">
              <Link href={`/product/${p.slug}`} className="font-medium text-primary underline-offset-4 hover:underline">{p.name}</Link>
              <span className="tabular-nums">{formatMoney(p.basePrice)}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex justify-between border-t pt-3 font-semibold text-primary">
          <span>Set total at sample prices</span>
          <span className="tabular-nums">{formatMoney(total)}</span>
        </p>
      </section>
    </div>
  );
}
