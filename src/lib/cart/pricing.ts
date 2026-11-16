import { getCartLines, getCartSubtotal } from "@/data/selectors/commerce";
import { getShippingMethods } from "@/data/selectors/content";
import type { Cart, MinorUnits } from "@/types";

export function cartCount(cart: Cart): number {
  return cart.items.reduce((n, i) => n + i.quantity, 0);
}

/** Totals in integer minor units, always recomputed from the fixtures. No tax in this prototype. */
export function cartTotals(cart: Cart, shippingMethodId?: string): { subtotal: MinorUnits; shipping: MinorUnits; total: MinorUnits } {
  const subtotal = getCartSubtotal(getCartLines(cart));
  const shipping = cart.items.length === 0 ? 0 : getShippingMethods().find((m) => m.id === shippingMethodId)?.price ?? 0;
  return { subtotal, shipping, total: subtotal + shipping };
}
