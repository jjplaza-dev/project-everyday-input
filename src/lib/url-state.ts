import type { ConnectionType, FilterState, IntendedUse, Platform, SortId, StockStatus } from "@/types";

export const PAGE_SIZE = 12;

/** Lower bound inclusive, upper bound exclusive. */
export const PRICE_BUCKETS: { id: string; label: string; min?: number; max?: number }[] = [
  { id: "u25", label: "Under $25", max: 2500 },
  { id: "25-75", label: "$25 to $74.99", min: 2500, max: 7500 },
  { id: "o75", label: "$75 and over", min: 7500 },
];

const SORTS: SortId[] = ["relevance", "featured", "bestsellers", "newest", "price-asc", "price-desc", "rating"];

type ParamsLike = {
  get(name: string): string | null;
  getAll(name: string): string[];
  forEach(cb: (value: string, key: string) => void): void;
};

export function defaultState(sort: SortId = "featured"): FilterState {
  return {
    query: "", categoryIds: [], brandIds: [], priceRange: {}, availability: [], platforms: [],
    connections: [], intendedUse: [], attributes: {}, sort, page: 1,
  };
}

export function bucketRange(id: string): FilterState["priceRange"] {
  const b = PRICE_BUCKETS.find((x) => x.id === id);
  return b ? { min: b.min, max: b.max } : {};
}

export function priceBucketId(s: FilterState): string | undefined {
  return PRICE_BUCKETS.find((b) => b.min === s.priceRange.min && b.max === s.priceRange.max)?.id;
}

export function bucketMatches(id: string, price: number): boolean {
  const { min, max } = bucketRange(id);
  return (min === undefined || price >= min) && (max === undefined || price < max);
}

/** Tolerant parser: unknown values are kept and simply match nothing. */
export function parseFilterState(p: ParamsLike, fallbackSort: SortId): FilterState {
  const list = (k: string) => p.getAll(k).flatMap((v) => v.split(",")).filter(Boolean);
  const attributes: Record<string, string[]> = {};
  p.forEach((v, k) => {
    if (k.startsWith("a.")) attributes[k.slice(2)] = v.split(",").filter(Boolean);
  });
  const sort = p.get("sort") as SortId;
  const rating = Number(p.get("rating"));
  return {
    query: (p.get("q") ?? "").trim(),
    categoryIds: list("cat"),
    brandIds: list("brand"),
    priceRange: bucketRange(p.get("price") ?? ""),
    availability: list("avail") as StockStatus[],
    platforms: list("platform") as Platform[],
    connections: list("conn") as ConnectionType[],
    intendedUse: list("use") as IntendedUse[],
    minRating: rating >= 1 && rating <= 5 ? rating : undefined,
    attributes,
    sort: SORTS.includes(sort) ? sort : fallbackSort,
    page: Math.max(1, parseInt(p.get("page") ?? "1", 10) || 1),
  };
}

export function serializeFilterState(s: FilterState, fallbackSort: SortId): string {
  const p = new URLSearchParams();
  const set = (k: string, v: string[]) => v.length > 0 && p.set(k, v.join(","));
  if (s.query) p.set("q", s.query);
  set("cat", s.categoryIds);
  set("brand", s.brandIds);
  set("avail", s.availability);
  set("platform", s.platforms);
  set("conn", s.connections);
  set("use", s.intendedUse);
  const bucket = priceBucketId(s);
  if (bucket) p.set("price", bucket);
  if (s.minRating) p.set("rating", String(s.minRating));
  for (const [k, v] of Object.entries(s.attributes)) set(`a.${k}`, v);
  if (s.sort !== fallbackSort) p.set("sort", s.sort);
  if (s.page > 1) p.set("page", String(s.page));
  return p.toString();
}
