export type Review = {
  id: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  displayName: string;
  createdAt: string;
  useContext: string;
  isSample: boolean;
};

/** What the write-review form collects before validation. Values are raw strings from the form. */
export type ReviewDraft = {
  rating: string;
  title: string;
  body: string;
  displayName: string;
};

/** A review written in this browser. Never sent anywhere, never moderated. */
export type StoredReview = Review & { source: "device-local" };

export type ReviewSummary = {
  average: number;
  count: number;
  /** Index 0 = one star, index 4 = five stars. */
  distribution: [number, number, number, number, number];
};
