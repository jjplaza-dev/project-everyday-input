"use client";

import { useCart } from "@/components/cart/CartProvider";
import { btnSignal } from "@/components/shared/button-styles";

export function AddToCartButton({ variantId, productId, productName, className = "" }: { variantId: string; productId: string; productName: string; className?: string }) {
  const { add, setDrawerOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => { add(variantId, productId); setDrawerOpen(true); }}
      className={`${btnSignal} ${className}`}
    >
      Add to cart<span className="sr-only">: {productName}</span>
    </button>
  );
}
