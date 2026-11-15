import { getProducts, getProductStockStatus } from "@/data/selectors/products";
import { getReviewSummary } from "@/data/selectors/reviews";
import { getSearchScores } from "@/data/selectors/search";
import { PAGE_SIZE } from "@/lib/url-state";
import type { FilterState, Product, SortId, SortOption } from "@/types";

export type CatalogScope = { kind: "shop" } | { kind: "category"; categoryId: string } | { kind: "search" };

export const sortOptions: SortOption[] = [
  { id: "relevance", label: "Relevance" },
  { id: "featured", label: "Featured" },
  { id: "bestsellers", label: "Bestsellers" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "rating", label: "Top rated" },
];

export function getBaseProducts(scope: CatalogScope, query: string): Product[] {
  const all = getProducts();
  if (scope.kind === "category") return all.filter((p) => p.categoryId === scope.categoryId);
  if (scope.kind === "search") {
    const scores = getSearchScores(query);
    return all.filter((p) => scores.has(p.id));
  }
  return all;
}

const overlaps = (selected: readonly string[], have: readonly string[]) => selected.some((v) => have.includes(v));

/** True if the product passes every active facet. `skip` ignores one facet, used to count its own options. */
export function matchesFilters(p: Product, s: FilterState, skip?: string): boolean {
  const on = (key: string) => key !== skip;
  if (on("cat") && s.categoryIds.length && !s.categoryIds.includes(p.categoryId)) return false;
  if (on("brand") && s.brandIds.length && !s.brandIds.includes(p.brandId)) return false;
  if (on("price")) {
    const { min, max } = s.priceRange;
    if (min !== undefined && p.basePrice < min) return false;
    if (max !== undefined && p.basePrice >= max) return false;
  }
  if (on("avail") && s.availability.length && !s.availability.includes(getProductStockStatus(p.id))) return false;
  if (on("platform") && s.platforms.length && !overlaps(s.platforms, p.compatibility.platforms)) return false;
  if (on("conn") && s.connections.length && !overlaps(s.connections, p.compatibility.connections)) return false;
  if (on("use") && s.intendedUse.length && !overlaps(s.intendedUse, p.intendedUse)) return false;
  if (on("rating") && s.minRating) {
    const r = getReviewSummary(p.id);
    if (r.count === 0 || r.average < s.minRating) return false;
  }
  for (const [attr, values] of Object.entries(s.attributes)) {
    if (on(`a.${attr}`) && values.length && !values.includes(String(p.attributes[attr]))) return false;
  }
  return true;
}

export function sortProducts(products: Product[], sort: SortId, scores?: Map<string, number>): Product[] {
  const rank = (p: Product) => p.bestsellerRank ?? 99;
  const avg = (p: Product) => getReviewSummary(p.id).average;
  const byName = (a: Product, b: Product) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id);
  const compare: Record<SortId, (a: Product, b: Product) => number> = {
    relevance: (a, b) => (scores?.get(b.id) ?? 0) - (scores?.get(a.id) ?? 0),
    featured: (a, b) => Number(b.isFeatured) - Number(a.isFeatured) || rank(a) - rank(b),
    bestsellers: (a, b) => rank(a) - rank(b),
    newest: (a, b) => b.addedAt.localeCompare(a.addedAt),
    "price-asc": (a, b) => a.basePrice - b.basePrice,
    "price-desc": (a, b) => b.basePrice - a.basePrice,
    rating: (a, b) => avg(b) - avg(a),
  };
  return [...products].sort((a, b) => compare[sort](a, b) || byName(a, b));
}

export function getCatalogResult(scope: CatalogScope, state: FilterState) {
  const base = getBaseProducts(scope, state.query);
  const matched = base.filter((p) => matchesFilters(p, state));
  const sorted = sortProducts(matched, state.sort, scope.kind === "search" ? getSearchScores(state.query) : undefined);
  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(state.page, pageCount);
  return { base, total: sorted.length, items: sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), page, pageCount };
}
