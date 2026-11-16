import { getVariantById } from "@/data/selectors/products";
import type { Cart, CartAction, CartItem, CartState } from "@/types";

export const MAX_PER_LINE = 10;

// src/lib/cart/reducer.ts

export const emptyCart = (): Cart => ({
  items: [],
  updatedAt: "", // Change from new Date().toISOString() to avoid SSR instability
  version: 1
});

/** Most of one variant that can be in the cart: its stock, capped. 0 if unknown or sold out. */
export function maxQuantity(variantId: string): number {
  const v = getVariantById(variantId);
  return v ? Math.min(v.stockQuantity, MAX_PER_LINE) : 0;
}

/**
 * Rebuilds a cart from untrusted stored data: drops unknown or sold-out variants, merges duplicates,
 * clamps quantities to stock, and takes productId from the fixtures. Prices are never stored.
 */
export function sanitizeCart(input: unknown): Cart {
  const raw = (input as { items?: unknown } | null)?.items;
  const merged = new Map<string, number>();
  if (Array.isArray(raw)) {
    for (const item of raw) {
      const id = (item as { variantId?: unknown })?.variantId;
      const qty = (item as { quantity?: unknown })?.quantity;
      if (typeof id !== "string" || typeof qty !== "number" || !Number.isFinite(qty)) continue;
      merged.set(id, (merged.get(id) ?? 0) + Math.floor(qty));
    }
  }
  const items: CartItem[] = [];
  for (const [variantId, qty] of merged) {
    const v = getVariantById(variantId);
    const max = maxQuantity(variantId);
    if (!v || max < 1 || qty < 1) continue;
    items.push({ variantId, productId: v.productId, quantity: Math.min(qty, max) });
  }
  return { items, updatedAt: new Date().toISOString(), version: 1 };
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  const { cart } = state;
  const touch = (items: CartItem[]): CartState => ({ ...state, cart: { ...cart, items, updatedAt: new Date().toISOString() } });

  switch (action.type) {
    case "hydrate":
      return { status: "ready", cart: sanitizeCart(action.cart) };
    case "add": {
      const max = maxQuantity(action.variantId);
      if (max < 1) return state;
      const existing = cart.items.find((i) => i.variantId === action.variantId);
      if (!existing) return touch([...cart.items, { variantId: action.variantId, productId: action.productId, quantity: 1 }]);
      return touch(cart.items.map((i) => (i === existing ? { ...i, quantity: Math.min(i.quantity + 1, max) } : i)));
    }
    case "setQuantity": {
      const max = maxQuantity(action.variantId);
      if (action.quantity < 1 || max < 1) return state;
      return touch(cart.items.map((i) => (i.variantId === action.variantId ? { ...i, quantity: Math.min(Math.floor(action.quantity), max) } : i)));
    }
    case "remove":
      return touch(cart.items.filter((i) => i.variantId !== action.variantId));
    case "clear":
      return touch([]);
  }
}
