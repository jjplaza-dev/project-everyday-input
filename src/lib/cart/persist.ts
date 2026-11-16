import { readJSON, writeJSON } from "@/lib/storage";
import { emptyCart, sanitizeCart } from "@/lib/cart/reducer";
import type { Cart } from "@/types";

export const CART_KEY = "ei.cart.v1";

/** Never throws: missing, blocked or corrupt storage gives an empty cart. */
export function loadCart(): Cart {
  const stored = readJSON<unknown>(CART_KEY, null);
  return stored === null ? emptyCart() : sanitizeCart(stored);
}

export function saveCart(cart: Cart): boolean {
  return writeJSON(CART_KEY, cart);
}
