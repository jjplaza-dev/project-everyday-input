import { brands } from "@/data/fixtures/brands";
import { products } from "@/data/fixtures/products";
import { variants } from "@/data/fixtures/variants";
import type { Product, ProductVariant, StockStatus } from "@/types";

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export function getBestsellers(limit = 8): Product[] {
  return products
      .filter((p) => p.bestsellerRank !== undefined)
      .sort((a, b) => (a.bestsellerRank ?? 0) - (b.bestsellerRank ?? 0))
      .slice(0, limit);
}

export function getBrandName(brandId: string): string {
  return brands.find((b) => b.id === brandId)?.name ?? "";
}

export function getVariantsForProduct(productId: string): ProductVariant[] {
  return variants.filter((v) => v.productId === productId);
}

export function getVariantById(variantId: string): ProductVariant | undefined {
  return variants.find((v) => v.id === variantId);
}

/** Aggregate status: in stock if any variant is in stock, else low stock if any is low, else out of stock. */
export function getProductStockStatus(productId: string): StockStatus {
  const statuses = getVariantsForProduct(productId).map((v) => v.stockStatus);
  if (statuses.includes("in-stock")) return "in-stock";
  if (statuses.includes("low-stock")) return "low-stock";
  return "out-of-stock";
}