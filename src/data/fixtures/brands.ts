import type { Brand } from "@/types";

/** Invented brand names for the prototype catalog. */
export const brands: Brand[] = ["Halden", "Tessel", "Verrin", "Quillon", "Brightmoor", "Oakline"].map((name) => ({
  id: `brand-${name.toLowerCase()}`,
  slug: name.toLowerCase(),
  name,
  isSample: true,
}));
