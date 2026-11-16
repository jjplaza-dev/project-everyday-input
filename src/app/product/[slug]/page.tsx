import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductArt } from "@/components/art/ProductArt";
import { ProductCard } from "@/components/product/ProductCard";
import { VariantPurchase } from "@/components/product/VariantPurchase";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { Breadcrumbs, RatingStars } from "@/components/shared/RatingStars";
import { getCategories } from "@/data/selectors/categories";
import {
  getBrandName, getProductBySlug, getProductSlugs, getProductsByCategory, getVariantsForProduct,
} from "@/data/selectors/products";
import { getReviewsForProduct, getReviewSummary } from "@/data/selectors/reviews";
import { connectionLabels, intendedUseLabels, platformLabels } from "@/lib/labels";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return product ? { title: product.name, description: product.shortDescription } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategories().find((c) => c.id === product.categoryId);
  const variants = getVariantsForProduct(product.id);
  const summary = getReviewSummary(product.id);
  const reviews = getReviewsForProduct(product.id);
  const related = getProductsByCategory(product.categoryId).filter((p) => p.id !== product.id).slice(0, 3);
  const { compatibility } = product;

  return (
    <div className="container-page py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <figure className="rounded-xl border bg-secondary p-8">
          {category && <ProductArt iconKey={category.iconKey} className="mx-auto aspect-square w-full max-w-sm" />}
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Illustrative drawing. Product photography is added later.
          </figcaption>
        </figure>

        <div>
          <p className="text-sm text-muted-foreground">{getBrandName(product.brandId)}</p>
          <h1 className="text-display mt-1 text-[clamp(1.75rem,3.5vw,2.5rem)] text-primary">{product.name}</h1>
          <div className="mt-2"><RatingStars summary={summary} /></div>
          <p className="mt-4 max-w-[60ch] text-muted-foreground">{product.shortDescription}</p>
          <VariantPurchase product={product} variants={variants} />

          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-foreground">
            {product.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Best for: {product.intendedUse.map((u) => intendedUseLabels[u]).join(", ")}.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="specs-title">
          <h2 id="specs-title" className="text-display text-2xl text-primary">Details</h2>
          <table className="mt-4 w-full text-left text-sm">
            <caption className="sr-only">Product details</caption>
            <tbody>
              {product.specGroups.flatMap((g) => g.items).map((item) => (
                <tr key={item.label} className="border-b">
                  <th scope="row" className="w-1/3 py-2 pr-4 font-medium capitalize text-muted-foreground">{item.label}</th>
                  <td className="py-2">{item.value}{item.unit ? ` ${item.unit}` : ""}</td>
                </tr>
              ))}
              <tr className="border-b">
                <th scope="row" className="py-2 pr-4 font-medium text-muted-foreground">Price</th>
                <td className="py-2">Sample price, not a real offer</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section aria-labelledby="compat-title">
          <h2 id="compat-title" className="text-display text-2xl text-primary">Compatibility</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">Works with</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {compatibility.platforms.length === 0 ? <span>Not tied to a specific platform.</span> :
                  compatibility.platforms.map((p) => (
                    <Link key={p} href={`/shop?platform=${p}`} className="inline-flex min-h-9 items-center rounded-lg border bg-secondary px-2 text-primary underline-offset-4 hover:underline">
                      {platformLabels[p]}<span className="sr-only">, see all products that work with it</span>
                    </Link>
                  ))}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Connection</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {compatibility.connections.length === 0 ? <span>No electronic connection.</span> :
                  compatibility.connections.map((c) => (
                    <Link key={c} href={`/shop?conn=${c}`} className="inline-flex min-h-9 items-center rounded-lg border bg-secondary px-2 text-primary underline-offset-4 hover:underline">
                      {connectionLabels[c]}<span className="sr-only">, see all products with it</span>
                    </Link>
                  ))}
              </dd>
            </div>
            {compatibility.requirements.length > 0 && (
              <div>
                <dt className="font-medium text-muted-foreground">Check before you buy</dt>
                <dd className="mt-1">
                  <ul className="list-disc pl-5">{compatibility.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
                </dd>
              </div>
            )}
          </dl>
          <p className="mt-6 rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
            Delivery: methods and estimates are shown at checkout. Rates in this prototype are samples.
          </p>
        </section>
      </div>

      <ReviewsSection productId={product.id} productName={product.name} sampleReviews={reviews} />

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-14">
          <h2 id="related-title" className="text-display text-2xl text-primary">More in this category</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {related.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
