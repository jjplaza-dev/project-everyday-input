"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { CART_KEY, loadCart, saveCart } from "@/lib/cart/persist";
import { cartCount } from "@/lib/cart/pricing";
import { cartReducer, emptyCart } from "@/lib/cart/reducer";
import type { Cart } from "@/types";

type CartContextValue = {
  cart: Cart;
  ready: boolean;
  count: number;
  saveFailed: boolean;
  add: (variantId: string, productId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: emptyCart(), status: "loading" as const });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const fromStorage = useRef(false);

  // Read the saved cart after mount so the first render matches the server HTML.
  useEffect(() => {
    fromStorage.current = true;
    dispatch({ type: "hydrate", cart: loadCart() });
  }, []);

  // Another tab changed the cart.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY || e.key === null) {
        fromStorage.current = true;
        dispatch({ type: "hydrate", cart: loadCart() });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Save after local changes. Changes that just came from storage are not written back.
  useEffect(() => {
    if (state.status !== "ready") return;
    if (fromStorage.current) { fromStorage.current = false; return; }
    setSaveFailed(!saveCart(state.cart));
  }, [state]);

  const add = useCallback((variantId: string, productId: string) => dispatch({ type: "add", variantId, productId }), []);
  const setQuantity = useCallback((variantId: string, quantity: number) => dispatch({ type: "setQuantity", variantId, quantity }), []);
  const remove = useCallback((variantId: string) => dispatch({ type: "remove", variantId }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart: state.cart, ready: state.status === "ready", count: cartCount(state.cart), saveFailed,
      add, setQuantity, remove, clear, drawerOpen, setDrawerOpen,
    }),
    [state, saveFailed, add, setQuantity, remove, clear, drawerOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
