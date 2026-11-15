import { categories } from "@/data/fixtures/categories";
import type { Category } from "@/types";

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
