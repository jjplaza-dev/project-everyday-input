import { ProductCard } from "@/components/product/ProductCard";
import { pluralize } from "@/lib/format";
import type { Product } from "@/types";

export type FacetGroup = { label: string; options: string[] };

export function CatalogView({
  title,
  intro,
  products,
  facetGroups,
  children,
}: {
  title: string;
  intro?: string;
  products: Product[];
  facetGroups: FacetGroup[];
  children?: React.ReactNode;
}) {
  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="text-display text-[clamp(2rem,4vw,3rem)] text-primary">{title}</h1>
      {intro && <p className="mt-3 max-w-[68ch] text-muted-foreground">{intro}</p>}
      {children}
      <p className="mt-6 rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
        Sample catalog: products, prices and stock are placeholders. Filters and sorting are previews and become
        interactive in a later phase.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside aria-label="Filters" className="hidden lg:block">
          <h2 className="text-sm font-semibold text-primary">Filters</h2>
          {facetGroups.map((group) => (
            <section key={group.label} className="mt-5 border-t pt-4">
              <h3 className="text-sm font-semibold text-primary">{group.label}</h3>
              <ul className="mt-2 space-y-1.5">
                {group.options.map((option) => (
                  <li key={option} className="flex items-center gap-2 text-sm text-foreground">
                    <span aria-hidden="true" className="size-4 shrink-0 rounded-sm border border-input bg-white" />
                    {option}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </aside>

        <section aria-label="Results">
          <div className="flex items-center justify-between border-b pb-3 text-sm">
            <p className="font-medium text-primary">{pluralize(products.length, "product")}</p>
            <p className="text-muted-foreground">Sorted by featured</p>
          </div>
          {products.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">No products match yet.</p>
          ) : (
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
