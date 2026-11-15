import type { OrderEmailTemplate } from "@/types";

/** Sample content for the on-page email preview. No email is ever sent. */
export const orderEmailTemplate: OrderEmailTemplate = {
  subject: "Your Everyday Input order EI-SAMPLE-0001",
  preheader: "Thanks for your order. Here is a summary of what you bought.",
  sections: [
    { heading: "Thank you for your order", body: "We have received your order and will send tracking details when it ships." },
    { heading: "Delivery", body: "Delivery method and estimate are shown on your order summary. Estimates in this prototype are samples." },
    { heading: "Need help?", body: "Reply through the chat or visit our FAQ for answers about delivery, returns and compatibility." },
  ],
  footerNote: "Sample template for the prototype. No real order was placed.",
};
