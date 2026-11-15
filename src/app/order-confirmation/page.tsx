import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { btnPrimary } from "@/components/shared/button-styles";
import { getOrderEmailTemplate, getSampleCheckoutDraft, getSampleOrder, getSelectedShipping } from "@/data/selectors/commerce";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Order confirmation" };

export default function OrderConfirmationPage() {
  const order = getSampleOrder();
  const draft = getSampleCheckoutDraft();
  const shipping = getSelectedShipping(draft);
  const email = getOrderEmailTemplate();

  return (
    <div className="container-page py-10 md:py-14">
      <p className="rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
        Sample confirmation. No real order was placed.
      </p>
      <div className="mt-6 flex items-start gap-3">
        <CircleCheck className="mt-1 size-8 shrink-0 text-success" strokeWidth={1.5} aria-hidden="true" />
        <div>
          <h1 className="text-display text-[clamp(2rem,4vw,3rem)] text-primary">Thank you for your order</h1>
          <p className="mt-2 text-muted-foreground">
            Reference <span className="font-semibold text-primary">{order.reference}</span>, placed {formatDate(order.createdAt)}.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-8">
          <section aria-labelledby="deliver-title">
            <h2 id="deliver-title" className="text-display text-2xl text-primary">Delivery</h2>
            <p className="mt-2 text-sm">
              {shipping?.label}. <span className="text-muted-foreground">{shipping?.estimateText}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              To {draft.shippingAddress.fullName}, {draft.shippingAddress.city}.
            </p>
          </section>

          <section aria-labelledby="next-title">
            <h2 id="next-title" className="text-display text-2xl text-primary">What happens next</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              <li>Your order is prepared for dispatch.</li>
              <li>Tracking details are sent when it ships.</li>
              <li>Questions? See the FAQ or contact page.</li>
            </ol>
            <div className="mt-4"><Link href="/shop" className={btnPrimary}>Continue shopping</Link></div>
          </section>

          <section aria-labelledby="email-title">
            <h2 id="email-title" className="text-display text-2xl text-primary">Confirmation email preview</h2>
            <p className="mt-1 text-sm font-semibold text-signal-ink">Not sent: email service not configured.</p>
            <div className="mt-3 rounded-xl border bg-white p-5">
              <p className="text-xs text-muted-foreground">To: {draft.contact.email}</p>
              <p className="mt-1 font-semibold text-primary">{email.subject}</p>
              <p className="text-sm text-muted-foreground">{email.preheader}</p>
              {email.sections.map((s) => (
                <div key={s.heading} className="mt-4">
                  <h3 className="font-semibold text-primary">{s.heading}</h3>
                  <p className="text-sm">{s.body}</p>
                </div>
              ))}
              <p className="mt-4 border-t pt-3 text-xs text-muted-foreground">{email.footerNote}</p>
            </div>
          </section>
        </div>

        <OrderSummary order={order} shippingLabel={shipping?.label} />
      </div>
    </div>
  );
}
