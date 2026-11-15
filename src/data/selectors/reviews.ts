import { reviews } from "@/data/fixtures/reviews";
import type { Review, ReviewSummary } from "@/types";

export function getReviewsForProduct(productId: string): Review[] {
  return reviews
    .filter((r) => r.productId === productId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getReviewSummary(productId: string): ReviewSummary {
  const list = getReviewsForProduct(productId);
  const distribution: ReviewSummary["distribution"] = [0, 0, 0, 0, 0];
  for (const r of list) distribution[r.rating - 1] += 1;
  const average = list.length ? list.reduce((sum, r) => sum + r.rating, 0) / list.length : 0;
  return { average, count: list.length, distribution };
}
