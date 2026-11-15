import type { Cart, CheckoutDraft } from "@/types";

/** Static sample used by the Phase 2 cart, checkout and confirmation previews. Never persisted. */
export const sampleCart: Cart = {
  version: 1,
  updatedAt: "2026-11-15T10:00:00Z",
  items: [
    { variantId: "var-halden-75-hot-swap-keyboard-1", productId: "prod-halden-75-hot-swap-keyboard", quantity: 1 },
    { variantId: "var-quillon-lite-wireless-mouse-1", productId: "prod-quillon-lite-wireless-mouse", quantity: 1 },
    { variantId: "var-oakline-felt-desk-mat-1", productId: "prod-oakline-felt-desk-mat", quantity: 1 },
    { variantId: "var-halden-65w-gan-charger-1", productId: "prod-halden-65w-gan-charger", quantity: 2 },
  ],
};

export const sampleCheckoutDraft: CheckoutDraft = {
  contact: { email: "sample.customer@example.com" },
  shippingAddress: {
    fullName: "Sample Customer",
    line1: "123 Sample Street",
    city: "Sampleville",
    region: "CA",
    postalCode: "00000",
    country: "United States",
  },
  shippingMethodId: "ship-standard",
  paymentMethod: "stripe",
};

export const sampleOrderMeta = {
  reference: "EI-SAMPLE-0001",
  createdAt: "2026-11-15T10:00:00Z",
  status: "confirmed",
  paymentProvider: "stripe",
} as const;
