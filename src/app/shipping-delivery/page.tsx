import type { Metadata } from "next";
import { PolicyPage } from "@/components/shared/ContentPage";
import { getShippingMethods } from "@/data/selectors/content";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "Shipping and delivery" };

export default function ShippingDeliveryPage() {
  return (
    <PolicyPage slug="shipping-delivery">
      <section aria-labelledby="methods-title">
        <h2 id="methods-title" className="text-display text-2xl text-primary">Sample delivery methods</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Sample delivery methods and prices</caption>
            <thead>
              <tr className="border-b">
                <th scope="col" className="py-2 pr-4 font-semibold">Method</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Estimate</th>
                <th scope="col" className="py-2 text-right font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              {getShippingMethods().map((m) => (
                <tr key={m.id} className="border-b">
                  <th scope="row" className="py-2 pr-4 font-medium">{m.label}</th>
                  <td className="py-2 pr-4 text-muted-foreground">{m.estimateText}</td>
                  <td className="py-2 text-right tabular-nums">{formatMoney(m.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PolicyPage>
  );
}
