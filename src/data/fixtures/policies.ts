import type { SitePolicy } from "@/types";

/** Placeholder text for the store owner to replace. Not legal advice. */
export const policies: SitePolicy[] = [
  {
    slug: "shipping-delivery",
    title: "Shipping and delivery",
    isSample: true,
    sections: [
      { heading: "Delivery methods", body: "The methods, prices and estimates below are placeholders for the store owner to replace. They are not delivery promises." },
      { heading: "Packaging", body: "Sample text: describe how keyboards, mice, cables and other gear are packed for transit." },
      { heading: "International orders", body: "International delivery, duties and taxes are not configured in this prototype. Replace this section with your actual coverage and charges." },
    ],
  },
  {
    slug: "returns",
    title: "Returns and refunds",
    isSample: true,
    sections: [
      { heading: "Return window", body: "Sample text: state how long customers have to return an item and the condition it must be in." },
      { heading: "How to start a return", body: "Sample text: explain the steps, what to include in the parcel, and who pays for return postage." },
      { heading: "Refunds", body: "Sample text: explain when and how refunds are issued, and how long they take to appear." },
    ],
  },
  {
    slug: "about",
    title: "About Everyday Input",
    isSample: true,
    sections: [
      { heading: "What we do", body: "Everyday Input is an online store for computer and phone accessories: keyboards, mice, audio, stands, cables, chargers and controllers." },
      { heading: "How we choose products", body: "We look for reliable build quality, comfort and thoughtful design, and we list what each product works with so you can match it to your setup and budget." },
      { heading: "Who it is for", body: "Gamers, remote workers, students, creators and desk-setup enthusiasts. The setup guides cover each of these in turn." },
      { heading: "About this prototype", body: "This site is a prototype. Products, brands, prices and reviews are invented samples." },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    isSample: true,
    sections: [
      { heading: "Sample text", body: "This page is a placeholder and is not legal advice. The store owner should replace it with a policy that reflects real practices." },
      { heading: "What the prototype stores", body: "In later phases, your cart and any reviews you write are saved in your own browser only. They are not sent to a server." },
      { heading: "Payments", body: "When enabled, payments are handled by Stripe or PayPal. This site does not collect or store card details." },
      { heading: "Chat", body: "When enabled, live chat is provided by Crisp, and a link to Messenger may be offered. Those services have their own privacy practices." },
    ],
  },
  {
    slug: "terms",
    title: "Terms of use",
    isSample: true,
    sections: [
      { heading: "Sample text", body: "This page is a placeholder and is not legal advice. The store owner should replace it with real terms." },
      { heading: "Prototype status", body: "No real orders are taken. Prices, stock and delivery information are samples." },
      { heading: "Orders and pricing", body: "Sample text: explain how orders are accepted, how prices are set, and what happens if an item is unavailable." },
    ],
  },
];
