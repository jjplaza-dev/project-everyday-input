"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { btnPrimary, btnSecondary, btnSignal } from "@/components/shared/button-styles";
import { EmptyState } from "@/components/shared/EmptyState";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { getCartLines } from "@/data/selectors/commerce";
import { getShippingMethods } from "@/data/selectors/content";
import { cartTotals } from "@/lib/cart/pricing";
import { validateAddress, validateEmail, type AddressErrors } from "@/lib/checkout/validate";
import { formatMoney } from "@/lib/format";
import { CHECKOUT_KEY, readSessionJSON, writeSessionJSON } from "@/lib/storage";
import type { Address, PaymentMethod } from "@/types";

type Draft = { email: string; address: Address; shippingMethodId: string; paymentMethod: PaymentMethod };
const STEPS = ["Contact", "Delivery", "Payment", "Review"] as const;
const emptyAddress: Address = { fullName: "", line1: "", line2: "", city: "", region: "", postalCode: "", country: "" };
const input = "mt-1 min-h-11 w-full rounded-lg border border-input bg-white px-3 text-sm aria-[invalid=true]:border-destructive";

export function CheckoutView() {
  const uid = useId();
  const { cart, ready } = useCart();
  const methods = getShippingMethods();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({ email: "", address: emptyAddress, shippingMethodId: methods[0]?.id ?? "", paymentMethod: "stripe" });
  const [emailError, setEmailError] = useState<string>();
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const movedFocus = useRef(false);

  // Restore the in-progress draft for this tab only, after mount.
  useEffect(() => {
    const saved = readSessionJSON<Partial<Draft> | null>(CHECKOUT_KEY, null);
    if (saved && typeof saved === "object") {
      setDraft((d) => ({ ...d, ...saved, address: { ...emptyAddress, ...(saved.address ?? {}) } }));
    }
  }, []);
  useEffect(() => { writeSessionJSON(CHECKOUT_KEY, draft); }, [draft]);
  useEffect(() => {
    if (movedFocus.current) headingRef.current?.focus();
    movedFocus.current = true;
  }, [step]);

  const lines = getCartLines(cart);
  const totals = cartTotals(cart, draft.shippingMethodId);
  const method = methods.find((m) => m.id === draft.shippingMethodId);
  const order = {
    lines: lines.map((l) => ({ productName: l.product.name, variantLabel: l.variant.label === "Standard" ? "" : l.variant.label, quantity: l.quantity, unitPrice: l.unitPrice })),
    ...totals,
  };

  const setAddr = (k: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraft((d) => ({ ...d, address: { ...d.address, [k]: e.target.value } }));
  const focusField = (form: HTMLFormElement, name: string) => form.querySelector<HTMLElement>(`[data-field="${name}"]`)?.focus();

  const submitContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validateEmail(draft.email);
    setEmailError(err);
    if (err) return focusField(e.currentTarget, "email");
    setDraft((d) => ({ ...d, email: d.email.trim() }));
    setStep(1);
  };
  const submitDelivery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateAddress(draft.address);
    setAddressErrors(errs);
    const first = (Object.keys(errs) as (keyof Address)[])[0];
    if (first) return focusField(e.currentTarget, first);
    setStep(2);
  };

  if (!ready) return <div className="container-page py-14"><p role="status" className="text-muted-foreground">Loading your cart.</p></div>;
  if (lines.length === 0) {
    return (
      <div className="container-page py-10 md:py-14">
        <EmptyState icon={<ShoppingBag className="size-6" aria-hidden="true" />} title="Your cart is empty" actions={<Link href="/shop" className={btnPrimary}>Shop all gear</Link>}>
          Add something to your cart before checking out.
        </EmptyState>
      </div>
    );
  }

  const errId = (k: string) => `${uid}-${k}-err`;
  const Err = ({ k, msg }: { k: string; msg?: string }) => (msg ? <p id={errId(k)} className="mt-1 text-sm text-destructive">{msg}</p> : null);
  const A = draft.address;
  const heading = (i: number) => (
    <h2 ref={step === i ? headingRef : undefined} tabIndex={step === i ? -1 : undefined} className="text-display text-2xl text-primary outline-none">
      {i + 1}. {STEPS[i]}
    </h2>
  );

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">Checkout</h1>
      <ol aria-label="Checkout steps" className="mt-6 flex flex-wrap gap-2 text-sm">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className={`rounded-lg border px-3 py-2 font-medium ${i === step ? "border-primary bg-primary text-primary-foreground" : "bg-white text-primary"}`}>
            {i + 1}. {s}{i < step ? " (done)" : ""}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-8">
          <section aria-label="Contact">
            {heading(0)}
            {step === 0 ? (
              <form onSubmit={submitContact} noValidate className="mt-3 max-w-md">
                <label htmlFor={`${uid}-email`} className="text-sm font-semibold text-primary">Email address</label>
                <input id={`${uid}-email`} data-field="email" type="email" autoComplete="email" value={draft.email} onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))} aria-invalid={!!emailError} aria-describedby={emailError ? errId("email") : undefined} className={input} />
                <Err k="email" msg={emailError} />
                <button type="submit" className={`${btnPrimary} mt-4`}>Continue to delivery</button>
              </form>
            ) : step > 0 && (
              <p className="mt-2 text-sm">{draft.email} <button type="button" onClick={() => setStep(0)} className="ml-2 min-h-11 font-medium text-primary underline underline-offset-4">Edit<span className="sr-only"> contact</span></button></p>
            )}
          </section>

          {step >= 1 && (
            <section aria-label="Delivery">
              {heading(1)}
              {step === 1 ? (
                <form onSubmit={submitDelivery} noValidate className="mt-3 max-w-xl space-y-4">
                  {([["fullName", "Full name", "name"], ["line1", "Street address", "address-line1"], ["line2", "Apartment, suite or unit (optional)", "address-line2"], ["city", "City", "address-level2"], ["region", "State or region", "address-level1"], ["postalCode", "Postal code", "postal-code"], ["country", "Country", "country-name"]] as const).map(([k, label, ac]) => (
                    <div key={k}>
                      <label htmlFor={`${uid}-${k}`} className="text-sm font-semibold text-primary">{label}</label>
                      <input id={`${uid}-${k}`} data-field={k} autoComplete={ac} value={A[k] ?? ""} onChange={setAddr(k)} aria-invalid={!!addressErrors[k]} aria-describedby={addressErrors[k] ? errId(k) : undefined} className={input} />
                      <Err k={k} msg={addressErrors[k]} />
                    </div>
                  ))}
                  <fieldset>
                    <legend className="text-sm font-semibold text-primary">Delivery method</legend>
                    <ul className="mt-2 space-y-2">
                      {methods.map((m) => (
                        <li key={m.id}>
                          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-input bg-white p-3 text-sm">
                            <input type="radio" name={`${uid}-ship`} checked={draft.shippingMethodId === m.id} onChange={() => setDraft((d) => ({ ...d, shippingMethodId: m.id }))} className="size-4 accent-primary" />
                            <span className="flex-1"><span className="font-medium text-primary">{m.label}</span><span className="block text-muted-foreground">{m.estimateText}</span></span>
                            <span className="tabular-nums">{formatMoney(m.price)}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </fieldset>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(0)} className={btnSecondary}>Back</button>
                    <button type="submit" className={btnPrimary}>Continue to payment</button>
                  </div>
                </form>
              ) : (
                <p className="mt-2 text-sm">
                  {A.fullName}, {A.line1}, {A.city}. {method?.label}, {method && formatMoney(method.price)}.
                  <button type="button" onClick={() => setStep(1)} className="ml-2 min-h-11 font-medium text-primary underline underline-offset-4">Edit<span className="sr-only"> delivery</span></button>
                </p>
              )}
            </section>
          )}

          {step >= 2 && (
            <section aria-label="Payment">
              {heading(2)}
              {step === 2 ? (
                <div className="mt-3 max-w-xl">
                  <fieldset>
                    <legend className="text-sm font-semibold text-primary">Payment method</legend>
                    <ul className="mt-2 space-y-2">
                      {([["stripe", "Card payment (Stripe)"], ["paypal", "PayPal"]] as const).map(([v, label]) => (
                        <li key={v}>
                          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-input bg-white p-3 text-sm">
                            <input type="radio" name={`${uid}-pay`} checked={draft.paymentMethod === v} onChange={() => setDraft((d) => ({ ...d, paymentMethod: v }))} className="size-4 accent-primary" />
                            <span className="font-medium text-primary">{label}</span>
                            <span className="ml-auto text-muted-foreground">Not connected yet</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </fieldset>
                  <p className="mt-3 text-sm text-muted-foreground">No card details are collected by this prototype.</p>
                  <div className="mt-4 flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className={btnSecondary}>Back</button>
                    <button type="button" onClick={() => setStep(3)} className={btnPrimary}>Review order</button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm">{draft.paymentMethod === "stripe" ? "Card payment (Stripe)" : "PayPal"}, not connected yet.
                  <button type="button" onClick={() => setStep(2)} className="ml-2 min-h-11 font-medium text-primary underline underline-offset-4">Edit<span className="sr-only"> payment</span></button>
                </p>
              )}
            </section>
          )}

          {step === 3 && (
            <section aria-label="Review">
              {heading(3)}
              <p className="mt-2 text-sm">Check the details above and the summary, then place your order when payments are connected.</p>
              <button type="button" disabled aria-describedby={`${uid}-pay-note`} className={`${btnSignal} mt-3 w-full disabled:opacity-60 sm:w-auto`}>Pay {formatMoney(totals.total)}</button>
              <p id={`${uid}-pay-note`} className="mt-2 text-sm text-muted-foreground">Payments are connected in the next phase.</p>
            </section>
          )}
        </div>

        <OrderSummary order={order} shippingLabel={step >= 1 ? method?.label : undefined} />
      </div>
    </div>
  );
}
