import type { ReviewDraft } from "@/types";

export type ReviewErrors = Partial<Record<keyof ReviewDraft, string>>;

export const REVIEW_LIMITS = { title: { min: 3, max: 80 }, body: { min: 10, max: 1000 }, name: { min: 2, max: 40 } } as const;

export function validateReviewDraft(d: ReviewDraft): ReviewErrors {
  const errors: ReviewErrors = {};
  const rating = Number(d.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Choose a rating from 1 to 5 stars.";
  const title = d.title.trim();
  if (title.length < REVIEW_LIMITS.title.min || title.length > REVIEW_LIMITS.title.max) {
    errors.title = `Enter a title of ${REVIEW_LIMITS.title.min} to ${REVIEW_LIMITS.title.max} characters.`;
  }
  const body = d.body.trim();
  if (body.length < REVIEW_LIMITS.body.min || body.length > REVIEW_LIMITS.body.max) {
    errors.body = `Write ${REVIEW_LIMITS.body.min} to ${REVIEW_LIMITS.body.max} characters about the product.`;
  }
  const name = d.displayName.trim();
  if (name.length < REVIEW_LIMITS.name.min || name.length > REVIEW_LIMITS.name.max) {
    errors.displayName = `Enter a display name of ${REVIEW_LIMITS.name.min} to ${REVIEW_LIMITS.name.max} characters.`;
  }
  return errors;
}
