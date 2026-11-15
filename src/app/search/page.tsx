import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { CatalogView, type FacetGroup } from "@/components/catalog/CatalogView";
import { btnPrimary } from "@/components/shared/button-styles";
import { EmptyState } from "@/components/shared/EmptyState";
import { getCategories } from "@/data/selectors/categories";
import { getProductsByCategory } from "@/data/selectors/products";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  const facetGroups: FacetGroup[] = [
    { label: "Category", options: getCategories().map((c) => c.name) },
    { label: "Availability", options: ["In stock", "Low stock"] },
    { label: "Price", options: ["Under $25", "$25 to $75", "Over $75"] },
  ];
  return (
    <>
      <CatalogView
        title="Search results for “keyboard”"
        intro="Preview with sample results. The search box does not filter yet; real search arrives in a later phase."
        products={getProductsByCategory("cat-keyboards")}
        facetGroups={facetGroups}
      />
      <div className="container-page pb-4">
        <h2 className="sr-only">Empty results preview</h2>
        <EmptyState
          icon={<Search className="size-6" aria-hidden="true" />}
          title="No results for “xyzzy”"
          actions={<Link href="/shop" className={btnPrimary}>Browse all gear</Link>}
        >
          This is how an empty search looks. Check the spelling, try a more general word, or browse a category.
        </EmptyState>
      </div>
    </>
  );
}
