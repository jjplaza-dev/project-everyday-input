import type { FAQItem, ShippingMethod, SupportChannel } from "@/types";

/** Placeholder methods and estimates for the owner to replace. Not delivery promises. */
export const shippingMethods: ShippingMethod[] = [
  { id: "ship-standard", label: "Standard delivery", description: "Tracked delivery to your address.", estimateText: "Sample estimate: 3 to 7 business days", price: 599, isSample: true },
  { id: "ship-express", label: "Express delivery", description: "Faster tracked delivery.", estimateText: "Sample estimate: 1 to 3 business days", price: 1499, isSample: true },
];

export const supportChannels: SupportChannel[] = [
  { id: "support-crisp", kind: "crisp", label: "Live chat", description: "Ask about compatibility, orders or delivery in a chat window.", availabilityNote: "Not connected in this prototype.", status: "not-configured" },
  { id: "support-messenger", kind: "messenger", label: "Messenger", description: "Message the store on Facebook Messenger.", availabilityNote: "Not connected in this prototype.", status: "not-configured" },
];

export const faqItems: FAQItem[] = [
  { id: "faq-1", group: "orders", question: "Is this a real store?", answer: "No. This is a prototype storefront. Products, prices, reviews and policies are sample placeholders, and no real orders are taken." },
  { id: "faq-2", group: "orders", question: "Can I change or cancel an order?", answer: "Placeholder answer: the store owner should state the cut-off for changes and cancellations here." },
  { id: "faq-3", group: "shipping", question: "How long will delivery take?", answer: "Delivery methods and estimates are shown at checkout. In this prototype they are samples, not promises." },
  { id: "faq-4", group: "shipping", question: "Do you deliver internationally?", answer: "International delivery is not configured in this prototype. The store owner should list the countries served and any duties or taxes." },
  { id: "faq-5", group: "payments", question: "Which payment methods will be offered?", answer: "Card payments through Stripe and PayPal are planned, in test mode only. Neither is connected yet." },
  { id: "faq-6", group: "payments", question: "Is my payment information stored here?", answer: "No payment details are collected or stored by this prototype." },
  { id: "faq-7", group: "compatibility", question: "How do I know if an accessory works with my device?", answer: "Each product page lists the platforms and connection types it works with, plus anything to check before buying. A dedicated compatibility guide is also planned." },
  { id: "faq-8", group: "compatibility", question: "Why does my laptop not output video over USB-C?", answer: "Not every USB-C port supports video output. Check your device's specifications for display output before buying a hub or USB-C to HDMI cable." },
];
