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

export type ReviewSummary = {
  average: number;
  count: number;
  /** Index 0 = one star, index 4 = five stars. */
  distribution: [number, number, number, number, number];
};
