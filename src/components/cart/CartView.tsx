"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { CartLines } from "@/components/cart/CartLines";
import { btnPrimary, btnSignal } from "@/components/shared/button-styles";
import { EmptyState } from "@/components/shared/EmptyState";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { getCartLines } from "@/data/selectors/commerce";
import { cartTotals } from "@/lib/cart/pricing";
import { formatMoney, pluralize } from "@/lib/format";

export function CartView() {
  const { cart, ready, count, clear, saveFailed } = useCart();
  const lines = getCartLines(cart);
  const { subtotal } = cartTotals(cart);

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">Your cart</h1>

      {saveFailed && (
        <p role="alert" className="mt-4 rounded-lg border border-destructive px-4 py-3 text-sm text-destructive">
          This browser blocked saving your cart, so it will be lost when you leave the page.
        </p>
      )}

      {!ready ? (
        <p role="status" className="mt-8 text-muted-foreground">Loading your cart.</p>
      ) : lines.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={<ShoppingBag className="size-6" aria-hidden="true" />}
            title="Your cart is empty"
            actions={<Link href="/shop" className={btnPrimary}>Shop all gear</Link>}
          >
            Add a keyboard, mouse or stand and it will appear here.
          </EmptyState>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="rounded-xl border bg-card px-4">
            <CartLines lines={lines} />
            <div className="border-t py-3">
              <button type="button" onClick={clear} className="min-h-11 text-sm font-medium text-primary underline underline-offset-4">Clear cart</button>
            </div>
          </div>
          <aside aria-labelledby="cart-summary" className="h-fit rounded-xl border bg-card p-5 shadow-rest">
            <h2 id="cart-summary" className="text-display text-2xl text-primary">Summary</h2>
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between"><dt>Subtotal ({pluralize(count, "item")})</dt><dd className="tabular-nums">{formatMoney(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Delivery</dt><dd className="text-muted-foreground">Chosen at checkout</dd></div>
            </dl>
            <p className="mt-2 text-xs text-muted-foreground">Sample prices. Tax is not calculated in this prototype.</p>
            <Link href="/checkout" className={`${btnSignal} mt-5 w-full`}>Continue to checkout</Link>
            <Link href="/shop" className="mt-3 block text-center text-sm font-medium text-primary underline-offset-4 hover:underline">Keep shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
