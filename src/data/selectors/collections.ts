import { collections } from "@/data/fixtures/collections";
import { getProducts } from "@/data/selectors/products";
import type { Collection, Product } from "@/types";

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionSlugs(): string[] {
  return collections.map((c) => c.slug);
}

/** Products in collection order; unknown ids are skipped. */
export function getCollectionProducts(collection: Collection): Product[] {
  const all = getProducts();
  return collection.productIds
    .map((id) => all.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}
