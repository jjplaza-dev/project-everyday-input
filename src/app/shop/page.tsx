import type { Metadata } from "next";
import { CatalogView, type FacetGroup } from "@/components/catalog/CatalogView";
import { getCategories } from "@/data/selectors/categories";
import { getProducts } from "@/data/selectors/products";

export const metadata: Metadata = { title: "Shop all gear" };

export default function ShopPage() {
  const facetGroups: FacetGroup[] = [
    { label: "Category", options: getCategories().map((c) => c.name) },
    { label: "Availability", options: ["In stock", "Low stock"] },
    { label: "Price", options: ["Under $25", "$25 to $75", "Over $75"] },
    { label: "Intended use", options: ["Gaming", "Remote work", "Study", "Creative"] },
  ];
  return (
    <CatalogView
      title="Shop all gear"
      intro="Keyboards, mice, audio, stands, cables and more for gaming, remote work, study and creative desks."
      products={getProducts()}
      facetGroups={facetGroups}
    />
  );
}
