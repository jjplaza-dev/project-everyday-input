import type { StoredReview } from "@/types";

/** Versioned keys. Bump the suffix if a stored shape changes. */
export const REVIEWS_KEY = "ei.reviews.v1";

/** Returns the parsed value, or the fallback when storage is missing, blocked, empty or corrupt. */
export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/** Returns false if the value could not be saved (storage blocked or full). */
export function writeJSON(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export const CHECKOUT_KEY = "ei.checkout.v1";

/** sessionStorage variants: the value lasts for this tab only. */
export function readSessionJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeSessionJSON(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const isReview = (r: unknown): r is StoredReview => {
  if (typeof r !== "object" || r === null) return false;
  const v = r as Record<string, unknown>;
  return (
    typeof v.id === "string" && typeof v.productId === "string" &&
    typeof v.rating === "number" && v.rating >= 1 && v.rating <= 5 &&
    typeof v.title === "string" && typeof v.body === "string" &&
    typeof v.displayName === "string" && typeof v.createdAt === "string"
  );
};

/** Stored reviews for one product. Anything with the wrong shape is dropped. */
export function readStoredReviews(productId: string): StoredReview[] {
  const all = readJSON<Record<string, unknown>>(REVIEWS_KEY, {});
  const list = all && typeof all === "object" ? all[productId] : undefined;
  return Array.isArray(list) ? list.filter(isReview) : [];
}

export function saveStoredReview(review: StoredReview): boolean {
  const all = readJSON<Record<string, unknown>>(REVIEWS_KEY, {});
  const safe = all && typeof all === "object" ? all : {};
  const existing = Array.isArray(safe[review.productId]) ? (safe[review.productId] as unknown[]).filter(isReview) : [];
  return writeJSON(REVIEWS_KEY, { ...safe, [review.productId]: [...existing, review] });
}
