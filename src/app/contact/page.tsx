import type { Metadata } from "next";
import Link from "next/link";
import { btnSecondary } from "@/components/shared/button-styles";
import { ContentPage } from "@/components/shared/ContentPage";
import { getSupportChannels } from "@/data/selectors/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <ContentPage title="Contact" intro="Ways to reach the store. Chat channels are shown here as previews until they are connected.">
      <ul className="grid gap-4 sm:grid-cols-2">
        {getSupportChannels().map((c) => (
          <li key={c.id} className="rounded-xl border bg-card p-4 shadow-rest">
            <h2 className="font-semibold text-primary">{c.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              {c.status === "configured" ? "Available" : c.availabilityNote}
            </p>
          </li>
        ))}
      </ul>
      <section aria-labelledby="quick-title">
        <h2 id="quick-title" className="text-display text-2xl text-primary">Quick answers</h2>
        <p className="mt-2 text-foreground">Many questions about orders, delivery and compatibility are answered already.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/faq" className={btnSecondary}>Read the FAQ</Link>
          <Link href="/shipping-delivery" className={btnSecondary}>Shipping and delivery</Link>
          <Link href="/returns" className={btnSecondary}>Returns</Link>
        </div>
      </section>
    </ContentPage>
  );
}
