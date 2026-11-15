import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogView, type FacetGroup } from "@/components/catalog/CatalogView";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { getCategories, getCategoryBySlug, getCategorySlugs } from "@/data/selectors/categories";
import { getProductsByCategory } from "@/data/selectors/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const facetGroups: FacetGroup[] = [
    ...category.filterSchema.map((f) => ({
      label: f.label,
      options: f.options?.map((o) => o.label) ?? ["Yes"],
    })),
    { label: "Availability", options: ["In stock", "Low stock"] },
    { label: "Price", options: ["Under $25", "$25 to $75", "Over $75"] },
  ];
  const others = getCategories().filter((c) => c.id !== category.id);

  return (
    <CatalogView
      title={category.name}
      intro={category.description}
      products={getProductsByCategory(category.id)}
      facetGroups={facetGroups}
    >
      <div className="mt-6 flex items-start gap-3 rounded-xl border bg-secondary p-4">
        <span className="text-primary"><CategoryIcon iconKey={category.iconKey} /></span>
        <div>
          <h2 className="text-sm font-semibold text-primary">Buying guide</h2>
          <p className="mt-1 text-sm text-muted-foreground">{category.buyingGuide}</p>
        </div>
      </div>
      <nav aria-label="Other categories" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c.id}>
              <Link href={`/category/${c.slug}`} className="inline-flex min-h-11 items-center rounded-lg border border-input bg-white px-3 text-sm text-primary hover:bg-secondary">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </CatalogView>
  );
}
