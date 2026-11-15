import type { MinorUnits } from "./catalog";

export type PaymentMethod = "stripe" | "paypal";
/** Minimal in Phase 2; finalized in Phase 6. */
export type OrderStatus = "confirmed" | "pending" | "failed";

export type ShippingMethod = {
  id: string;
  label: string;
  description: string;
  /** Placeholder text, never a real delivery promise. */
  estimateText: string;
  price: MinorUnits;
  isSample: true;
};

export type CartItem = { variantId: string; productId: string; quantity: number };
export type Cart = { items: CartItem[]; updatedAt: string; version: 1 };

export type Address = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export type CheckoutDraft = {
  contact: { email: string };
  shippingAddress: Address;
  shippingMethodId: string;
  paymentMethod: PaymentMethod;
};

export type OrderLine = {
  productName: string;
  variantLabel: string;
  quantity: number;
  unitPrice: MinorUnits;
};

export type Order = {
  reference: string;
  lines: OrderLine[];
  subtotal: MinorUnits;
  shipping: MinorUnits;
  total: MinorUnits;
  currency: "USD";
  paymentProvider: PaymentMethod;
  createdAt: string;
  status: OrderStatus;
};

export type OrderEmailTemplate = {
  subject: string;
  preheader: string;
  sections: { heading: string; body: string }[];
  footerNote: string;
};
