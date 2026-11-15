import { getCategories } from "@/data/selectors/categories";
import { matchesFilters, type CatalogScope } from "@/data/selectors/catalog";
import { getBrandName, getProductStockStatus } from "@/data/selectors/products";
import { getReviewSummary } from "@/data/selectors/reviews";
import { bucketMatches, bucketRange, defaultState, PRICE_BUCKETS, priceBucketId } from "@/lib/url-state";
import { connectionLabels, intendedUseLabels, platformLabels } from "@/lib/labels";
import type { FilterState, Product, StockStatus } from "@/types";

export type FacetOptionView = { value: string; label: string; count: number; selected: boolean };
export type FacetGroupView = { key: string; label: string; options: FacetOptionView[] };

const stockLabels: Record<StockStatus, string> = { "in-stock": "In stock", "low-stock": "Low stock", "out-of-stock": "Out of stock" };

function selectedFor(key: string, s: FilterState): string[] {
  switch (key) {
    case "cat": return s.categoryIds;
    case "brand": return s.brandIds;
    case "avail": return s.availability;
    case "platform": return s.platforms;
    case "conn": return s.connections;
    case "use": return s.intendedUse;
    case "price": return [priceBucketId(s)].filter((x): x is string => !!x);
    case "rating": return s.minRating ? [String(s.minRating)] : [];
    default: return s.attributes[key.slice(2)] ?? [];
  }
}

function optionMatches(key: string, value: string, p: Product): boolean {
  switch (key) {
    case "cat": return p.categoryId === value;
    case "brand": return p.brandId === value;
    case "avail": return getProductStockStatus(p.id) === value;
    case "platform": return (p.compatibility.platforms as string[]).includes(value);
    case "conn": return (p.compatibility.connections as string[]).includes(value);
    case "use": return (p.intendedUse as string[]).includes(value);
    case "price": return bucketMatches(value, p.basePrice);
    case "rating": { const r = getReviewSummary(p.id); return r.count > 0 && r.average >= Number(value); }
    default: return String(p.attributes[key.slice(2)]) === value;
  }
}

type Def = { key: string; label: string; options: { value: string; label: string }[] };

/** Groups and options for the current scope. Counts ignore the group's own selection so options stay usable. Empty unselected options are hidden. */
export function buildFacetGroups(scope: CatalogScope, base: Product[], state: FilterState): FacetGroupView[] {
  const unique = <T,>(xs: T[]) => [...new Set(xs)];
  const defs: Def[] = [];
  const categories = getCategories();

  if (scope.kind !== "category") defs.push({ key: "cat", label: "Category", options: categories.map((c) => ({ value: c.id, label: c.name })) });
  defs.push({ key: "brand", label: "Brand", options: unique(base.map((p) => p.brandId)).map((id) => ({ value: id, label: getBrandName(id) })) });
  defs.push({ key: "price", label: "Price", options: PRICE_BUCKETS.map((b) => ({ value: b.id, label: b.label })) });
  defs.push({ key: "avail", label: "Availability", options: (Object.keys(stockLabels) as StockStatus[]).map((v) => ({ value: v, label: stockLabels[v] })) });
  defs.push({ key: "platform", label: "Works with", options: unique(base.flatMap((p) => p.compatibility.platforms)).map((v) => ({ value: v, label: platformLabels[v] })) });
  defs.push({ key: "conn", label: "Connection", options: unique(base.flatMap((p) => p.compatibility.connections)).map((v) => ({ value: v, label: connectionLabels[v] })) });
  defs.push({ key: "use", label: "Intended use", options: unique(base.flatMap((p) => p.intendedUse)).map((v) => ({ value: v, label: intendedUseLabels[v] })) });
  defs.push({ key: "rating", label: "Rating", options: [{ value: "4", label: "4 stars and up" }, { value: "3", label: "3 stars and up" }] });

  if (scope.kind === "category") {
    const category = categories.find((c) => c.id === scope.categoryId);
    for (const f of category?.filterSchema ?? []) {
      if (!f.field.startsWith("attributes.")) continue;
      defs.push({ key: `a.${f.field.slice("attributes.".length)}`, label: f.label, options: f.options?.map((o) => ({ value: o.value, label: o.label })) ?? [{ value: "true", label: "Yes" }] });
    }
  }

  return defs
    .map((d) => {
      const picked = selectedFor(d.key, state);
      const options = d.options
        .map((o) => ({
          ...o,
          count: base.filter((p) => matchesFilters(p, state, d.key) && optionMatches(d.key, o.value, p)).length,
          selected: picked.includes(o.value),
        }))
        .filter((o) => o.count > 0 || o.selected);
      return { key: d.key, label: d.label, options };
    })
    .filter((g) => g.options.length > 0);
}

/** Returns a new state with one option flipped. Price and rating are single choice. Always returns to page 1. */
export function toggleOption(state: FilterState, key: string, value: string): FilterState {
  const flip = (list: readonly string[]) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  const next: FilterState = { ...state, page: 1 };
  switch (key) {
    case "cat": next.categoryIds = flip(state.categoryIds); break;
    case "brand": next.brandIds = flip(state.brandIds); break;
    case "avail": next.availability = flip(state.availability) as StockStatus[]; break;
    case "platform": next.platforms = flip(state.platforms) as FilterState["platforms"]; break;
    case "conn": next.connections = flip(state.connections) as FilterState["connections"]; break;
    case "use": next.intendedUse = flip(state.intendedUse) as FilterState["intendedUse"]; break;
    case "price": next.priceRange = priceBucketId(state) === value ? {} : bucketRange(value); break;
    case "rating": next.minRating = state.minRating === Number(value) ? undefined : Number(value); break;
    default: next.attributes = { ...state.attributes, [key.slice(2)]: flip(state.attributes[key.slice(2)] ?? []) };
  }
  return next;
}

export function clearFilters(state: FilterState): FilterState {
  return { ...defaultState(state.sort), query: state.query };
}
