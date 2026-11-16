"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { CartLines } from "@/components/cart/CartLines";
import { btnSecondary, btnSignal } from "@/components/shared/button-styles";
import { getCartLines } from "@/data/selectors/commerce";
import { cartTotals } from "@/lib/cart/pricing";
import { formatMoney } from "@/lib/format";

export function CartDrawer() {
  const { cart, ready, count, drawerOpen, setDrawerOpen } = useCart();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (drawerOpen && !d.open) d.showModal();
    if (!drawerOpen && d.open) d.close();
  }, [drawerOpen]);

  const close = () => setDrawerOpen(false);
  const lines = getCartLines(cart);
  const { subtotal } = cartTotals(cart);

  return (
    <dialog
      ref={ref}
      aria-labelledby="cart-drawer-title"
      onClose={close}
      onClick={(e) => { if (e.target === ref.current) close(); }}
      className="m-0 ml-auto h-dvh max-h-dvh w-[26rem] max-w-full rounded-none bg-white p-0 backdrop:bg-black/40"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 id="cart-drawer-title" className="text-display text-2xl text-primary">Your cart ({count})</h2>
          <button type="button" onClick={close} className="min-h-11 px-2 text-sm font-medium text-primary underline underline-offset-4">Close</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          {!ready ? (
            <p className="py-8 text-muted-foreground">Loading your cart.</p>
          ) : lines.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-semibold text-primary">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">Add a keyboard, mouse or stand and it will appear here.</p>
              <Link href="/shop" onClick={close} className={`${btnSecondary} mt-4`}>Shop all gear</Link>
            </div>
          ) : (
            <CartLines lines={lines} onNavigate={close} />
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t p-4">
            <p className="flex justify-between font-semibold text-primary"><span>Subtotal</span><span className="tabular-nums">{formatMoney(subtotal)}</span></p>
            <p className="mt-1 text-xs text-muted-foreground">Delivery is chosen at checkout. Sample prices.</p>
            <div className="mt-3 grid gap-2">
              <Link href="/checkout" onClick={close} className={btnSignal}>Checkout</Link>
              <Link href="/cart" onClick={close} className={btnSecondary}>View cart</Link>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
