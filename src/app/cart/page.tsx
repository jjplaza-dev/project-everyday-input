import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ProductArt } from "@/components/art/ProductArt";
import { btnPrimary, btnSignal } from "@/components/shared/button-styles";
import { EmptyState } from "@/components/shared/EmptyState";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { getCategories } from "@/data/selectors/categories";
import { getCartLines, getCartSubtotal, getSampleCart } from "@/data/selectors/commerce";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  const lines = getCartLines(getSampleCart());
  const categories = getCategories();
  const subtotal = getCartSubtotal(lines);

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">Your cart</h1>
      <p className="mt-3 rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
        Preview with sample items. Adding, changing and removing items works in a later phase.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <ul className="divide-y rounded-xl border bg-card">
          {lines.map((l) => {
            const icon = categories.find((c) => c.id === l.product.categoryId)?.iconKey;
            return (
              <li key={l.variant.id} className="flex gap-4 p-4">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  {icon && <ProductArt iconKey={icon} className="size-14" />}
                </div>
                <div className="flex flex-1 flex-wrap justify-between gap-x-4 gap-y-1">
                  <div>
                    <Link href={`/product/${l.product.slug}`} className="font-semibold text-primary hover:underline">{l.product.name}</Link>
                    {l.variant.label !== "Standard" && <p className="text-sm text-muted-foreground">{l.variant.label}</p>}
                    <p className="text-sm text-muted-foreground">Quantity {l.quantity}</p>
                  </div>
                  <p className="font-bold tabular-nums text-primary">{formatMoney(l.lineTotal)}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <aside aria-labelledby="cart-summary" className="h-fit rounded-xl border bg-card p-5 shadow-rest">
          <h2 id="cart-summary" className="text-display text-2xl text-primary">Summary</h2>
          <dl className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{formatMoney(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd className="text-muted-foreground">Chosen at checkout</dd></div>
          </dl>
          <Link href="/checkout" className={`${btnSignal} mt-5 w-full`}>Continue to checkout</Link>
          <Link href="/shop" className="mt-3 block text-center text-sm font-medium text-primary underline-offset-4 hover:underline">Keep shopping</Link>
        </aside>
      </div>

      <h2 className="text-display mt-14 text-2xl text-primary">Empty cart preview</h2>
      <div className="mt-4">
        <EmptyState
          icon={<ShoppingBag className="size-6" aria-hidden="true" />}
          title="Your cart is empty"
          actions={<Link href="/shop" className={btnPrimary}>Shop all gear</Link>}
        >
          Add a keyboard, mouse or stand and it will appear here.
        </EmptyState>
      </div>
    </div>
  );
}
