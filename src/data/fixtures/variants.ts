import { LOW_STOCK_THRESHOLD } from "@/lib/config/stock";
import { products } from "@/data/fixtures/products";
import type { ProductVariant, StockStatus } from "@/types";

export function stockStatusFor(quantity: number): StockStatus {
  if (quantity <= 0) return "out-of-stock";
  return quantity <= LOW_STOCK_THRESHOLD ? "low-stock" : "in-stock";
}

/** Quantity of the default variant; anything not listed defaults to 24. */
const defaultStock: Record<string, number> = {
  "brightmoor-usb-a-extension-cable": 3,
  "verrin-cloth-mousepad-large": 0,
  "quillon-controller-charging-dock": 0,
  "halden-bamboo-monitor-riser": 4,
};

/** Products that offer more than one option (the default variant is "Standard" otherwise). */
const colourOptions: Record<string, { label: string; quantity: number }[]> = {
  "halden-75-hot-swap-keyboard": [{ label: "Slate", quantity: 18 }, { label: "Cream", quantity: 0 }],
  "oakline-felt-desk-mat": [{ label: "Charcoal", quantity: 12 }, { label: "Sand", quantity: 3 }],
};

export const variants: ProductVariant[] = products.flatMap((p) => {
  const options = colourOptions[p.slug] ?? [{ label: "Standard", quantity: defaultStock[p.slug] ?? 24 }];
  return options.map((o, i) => ({
    id: `var-${p.slug}-${i + 1}`,
    productId: p.id,
    sku: `EI-${p.slug.slice(0, 10).toUpperCase().replace(/-/g, "")}-${i + 1}`,
    label: o.label,
    options: { option: o.label },
    stockQuantity: o.quantity,
    stockStatus: stockStatusFor(o.quantity),
  }));
});
