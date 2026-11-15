import { formatMoney } from "@/lib/format";
import type { Order } from "@/types";

export function OrderSummary({ order, shippingLabel }: { order: Order; shippingLabel?: string }) {
  return (
    <section aria-labelledby="summary-title" className="rounded-xl border bg-card p-5 shadow-rest">
      <h2 id="summary-title" className="text-display text-2xl text-primary">Order summary</h2>
      <ul className="mt-4 divide-y">
        {order.lines.map((l) => (
          <li key={`${l.productName}-${l.variantLabel}`} className="flex justify-between gap-4 py-2 text-sm">
            <span>
              <span className="font-medium text-primary">{l.productName}</span>
              {l.variantLabel && <span className="text-muted-foreground">, {l.variantLabel}</span>}
              <span className="block text-muted-foreground">Quantity {l.quantity}</span>
            </span>
            <span className="tabular-nums">{formatMoney(l.unitPrice * l.quantity)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-4 space-y-1 border-t pt-3 text-sm">
        <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{formatMoney(order.subtotal)}</dd></div>
        <div className="flex justify-between">
          <dt>Delivery{shippingLabel ? ` (${shippingLabel})` : ""}</dt>
          <dd className="tabular-nums">{formatMoney(order.shipping)}</dd>
        </div>
        <div className="flex justify-between pt-2 text-base font-bold text-primary">
          <dt>Total</dt><dd className="tabular-nums">{formatMoney(order.total)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-muted-foreground">Sample prices. Tax is not calculated in this prototype.</p>
    </section>
  );
}
