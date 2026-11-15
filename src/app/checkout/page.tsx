import type { Metadata } from "next";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { btnSignal } from "@/components/shared/button-styles";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { getSampleCheckoutDraft, getSampleOrder, getSelectedShipping } from "@/data/selectors/commerce";
import { getShippingMethods } from "@/data/selectors/content";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "Checkout" };

const steps = ["Contact", "Delivery", "Payment", "Review"];

export default function CheckoutPage() {
  const draft = getSampleCheckoutDraft();
  const order = getSampleOrder();
  const selected = getSelectedShipping(draft);
  const a = draft.shippingAddress;

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">Checkout</h1>

      <ol aria-label="Checkout steps" className="mt-6 flex flex-wrap gap-2 text-sm">
        {steps.map((s, i) => (
          <li key={s} className="rounded-lg border bg-white px-3 py-2 font-medium text-primary">{i + 1}. {s}</li>
        ))}
      </ol>
      <p className="mt-4 rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
        Preview with sample values. The forms work and payments connect in later phases.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-8">
          <section aria-labelledby="contact-title">
            <h2 id="contact-title" className="text-display text-2xl text-primary">1. Contact</h2>
            <p className="mt-2 text-sm">{draft.contact.email}</p>
          </section>

          <section aria-labelledby="delivery-title">
            <h2 id="delivery-title" className="text-display text-2xl text-primary">2. Delivery</h2>
            <address className="mt-2 text-sm not-italic">
              {a.fullName}<br />{a.line1}<br />{a.city}, {a.region} {a.postalCode}<br />{a.country}
            </address>
            <ul className="mt-4 space-y-2">
              {getShippingMethods().map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-4 rounded-lg border bg-white p-3 text-sm">
                  <span>
                    <span className="font-medium text-primary">{m.label}</span>
                    {m.id === selected?.id && <span className="ml-2 font-medium text-success">Selected</span>}
                    <span className="block text-muted-foreground">{m.estimateText}</span>
                  </span>
                  <span className="tabular-nums">{formatMoney(m.price)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="payment-title">
            <h2 id="payment-title" className="text-display text-2xl text-primary">3. Payment</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="rounded-lg border bg-white p-3"><span className="font-medium text-primary">Card payment</span>, Stripe. Not connected yet.</li>
              <li className="rounded-lg border bg-white p-3"><span className="font-medium text-primary">PayPal</span>. Not connected yet.</li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">Payments not configured. No card details are collected by this prototype.</p>
          </section>

          <section aria-labelledby="review-title">
            <h2 id="review-title" className="text-display text-2xl text-primary">4. Review</h2>
            <button type="button" disabled aria-describedby="pay-note" className={`${btnSignal} mt-3 w-full disabled:opacity-60 sm:w-auto`}>
              Pay {formatMoney(order.total)}
            </button>
            <p id="pay-note" className="mt-2 text-sm text-muted-foreground">Payments are connected in a later phase.</p>
          </section>
        </div>

        <OrderSummary order={order} shippingLabel={selected?.label} />
      </div>
    </div>
  );
}
