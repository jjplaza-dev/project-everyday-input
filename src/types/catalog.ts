import type { CompatibilityProfile } from "./compatibility";

/** Money is always integer minor units (cents). */
export type MinorUnits = number;

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";
export type IntendedUse = "gaming" | "remote-work" | "study" | "creative";
export type ImageKind = "studio" | "lifestyle" | "illustration";

export type ImageAsset = {
  id: string;
  src: string;
  alt: string;
  kind: ImageKind;
  width: number;
  height: number;
  credit?: string;
  license?: string;
  isPlaceholder: boolean;
};

export type SpecItem = { label: string; value: string; unit?: string };
export type SpecGroup = { label: string; items: SpecItem[] };

export type Brand = { id: string; slug: string; name: string; isSample: true };

export type ProductVariant = {
  id: string;
  productId: string;
  sku: string;
  label: string;
  options: Record<string, string>;
  priceDelta?: MinorUnits;
  stockQuantity: number;
  stockStatus: StockStatus;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  categoryId: string;
  shortDescription: string;
  highlights: string[];
  longDescription: string;
  basePrice: MinorUnits;
  compareAtPrice?: MinorUnits;
  currency: "USD";
  images: ImageAsset[];
  specGroups: SpecGroup[];
  compatibility: CompatibilityProfile;
  attributes: Record<string, string | number | boolean>;
  intendedUse: IntendedUse[];
  badges: string[];
  isFeatured: boolean;
  bestsellerRank?: number;
  addedAt: string;
  isSample: true;
};
