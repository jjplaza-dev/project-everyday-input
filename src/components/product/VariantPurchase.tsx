"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { StockIndicator } from "@/components/product/ProductCard";
import { btnSignal } from "@/components/shared/button-styles";
import { formatMoney } from "@/lib/format";
import type { Product, ProductVariant } from "@/types";

export function VariantPurchase({ product, variants }: { product: Product; variants: ProductVariant[] }) {
  const { add, setDrawerOpen } = useCart();
  const firstAvailable = variants.find((v) => v.stockStatus !== "out-of-stock") ?? variants[0];
  const [selectedId, setSelectedId] = useState(firstAvailable?.id);
  const selected = variants.find((v) => v.id === selectedId) ?? firstAvailable;
  if (!selected) return null;

  const price = product.basePrice + (selected.priceDelta ?? 0);
  const hasOptions = variants.length > 1;

  return (
    <div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-lg">
        <p className="font-bold tabular-nums text-primary">{formatMoney(price)}</p>
        <span aria-live="polite"><StockIndicator status={selected.stockStatus} /></span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">SKU {selected.sku}{hasOptions ? `, ${selected.label}` : ""}</p>

      {hasOptions && (
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-primary">Option: {selected.label}</legend>
          <ul className="mt-2 flex flex-wrap gap-2">
            {variants.map((v) => {
              const unavailable = v.stockStatus === "out-of-stock";
              return (
                <li key={v.id}>
                  <label className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-sm ${unavailable ? "cursor-not-allowed border-border bg-secondary text-muted-foreground" : "cursor-pointer border-input bg-white hover:bg-secondary"} ${v.id === selected.id ? "ring-2 ring-primary" : ""}`}>
                    <input
                      type="radio"
                      name={`option-${product.id}`}
                      value={v.id}
                      checked={v.id === selected.id}
                      disabled={unavailable}
                      onChange={() => setSelectedId(v.id)}
                      className="size-4 accent-primary"
                    />
                    <span className="font-medium">{v.label}</span>
                    {unavailable && <span>(out of stock)</span>}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}

      <div className="mt-6">
        <button
          type="button"
          disabled={selected.stockStatus === "out-of-stock"}
          onClick={() => { add(selected.id, product.id); setDrawerOpen(true); }}
          className={`${btnSignal} w-full disabled:opacity-60 sm:w-auto`}
        >
          {selected.stockStatus === "out-of-stock" ? "Out of stock" : "Add to cart"}
        </button>
        <p className="mt-2 text-sm text-muted-foreground">
          Adds the selected option{hasOptions ? ` (${selected.label})` : ""}. Delivery is chosen at checkout.
        </p>
      </div>
    </div>
  );
}
