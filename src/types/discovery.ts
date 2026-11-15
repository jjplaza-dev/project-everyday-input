import type { ConnectionType, Platform } from "./compatibility";
import type { IntendedUse, StockStatus } from "./catalog";

export type FacetOption = { value: string; label: string };

export type FacetDefinition = {
  id: string;
  label: string;
  type: "checkbox" | "range" | "toggle";
  /** Product field or attribute key this facet filters on. */
  field: string;
  options?: FacetOption[];
};

export type SortId =
  | "relevance" | "featured" | "bestsellers" | "newest"
  | "price-asc" | "price-desc" | "rating";

export type SortOption = { id: SortId; label: string };

/** Shape only in Phase 2; behavior arrives in Phase 3. */
export type FilterState = {
  query: string;
  categoryIds: string[];
  brandIds: string[];
  priceRange: { min?: number; max?: number };
  availability: StockStatus[];
  platforms: Platform[];
  connections: ConnectionType[];
  intendedUse: IntendedUse[];
  minRating?: number;
  attributes: Record<string, string[]>;
  sort: SortId;
  page: number;
};
