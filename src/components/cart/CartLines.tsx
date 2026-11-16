"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { ProductArt } from "@/components/art/ProductArt";
import { useCart } from "@/components/cart/CartProvider";
import { getCategories } from "@/data/selectors/categories";
import type { CartLine } from "@/data/selectors/commerce";
import { maxQuantity } from "@/lib/cart/reducer";
import { formatMoney } from "@/lib/format";

const stepBtn = "inline-flex size-11 items-center justify-center rounded-lg border border-input bg-white text-primary hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40";

export function CartLines({ lines, onNavigate }: { lines: CartLine[]; onNavigate?: () => void }) {
  const { setQuantity, remove } = useCart();
  const categories = getCategories();

  return (
    <ul className="divide-y">
      {lines.map((l) => {
        const icon = categories.find((c) => c.id === l.product.categoryId)?.iconKey;
        const max = maxQuantity(l.variant.id);
        const atMax = l.quantity >= max;
        const name = l.product.name;
        return (
          <li key={l.variant.id} className="flex gap-4 py-4">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-secondary">
              {icon && <ProductArt iconKey={icon} className="size-14" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between gap-3">
                <div>
                  <Link href={`/product/${l.product.slug}`} onClick={onNavigate} className="font-semibold text-primary hover:underline">{name}</Link>
                  {l.variant.label !== "Standard" && <p className="text-sm text-muted-foreground">{l.variant.label}</p>}
                  <p className="text-sm text-muted-foreground">{formatMoney(l.unitPrice)} each</p>
                </div>
                <p className="font-bold tabular-nums text-primary">{formatMoney(l.lineTotal)}</p>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button type="button" className={stepBtn} onClick={() => setQuantity(l.variant.id, l.quantity - 1)} disabled={l.quantity <= 1} aria-label={`Decrease quantity of ${name}`}>
                  <Minus className="size-4" aria-hidden="true" />
                </button>
                <span className="min-w-8 text-center tabular-nums" aria-live="polite"><span className="sr-only">Quantity </span>{l.quantity}</span>
                <button type="button" className={stepBtn} onClick={() => setQuantity(l.variant.id, l.quantity + 1)} disabled={atMax} aria-label={`Increase quantity of ${name}`}>
                  <Plus className="size-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => remove(l.variant.id)} className="ml-2 min-h-11 px-2 text-sm font-medium text-primary underline underline-offset-4">
                  Remove<span className="sr-only"> {name}</span>
                </button>
              </div>
              {atMax && <p className="mt-1 text-xs text-muted-foreground">Maximum for this item: {max}. {max === l.variant.stockQuantity ? "That is all we have in stock." : "Larger orders are not supported here."}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
