import type { FooterGroup, NavItem, ServicePoint } from "@/types";

export const siteName = "Everyday Input";
export const siteTagline = "Gear that works. Setups that feel right.";

export const announcement =
  "Prototype storefront: products, prices, reviews and policies are sample placeholders.";

/** "Shop" children are derived from categories by the selector. */
export const primaryNav: NavItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Setup guides", href: "/guides" },
  { label: "Compatibility", href: "/compatibility" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Collections", href: "/collections" },
      { label: "Search", href: "/search" },
      { label: "Cart", href: "/cart" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Setup guides", href: "/guides" },
      { label: "Compatibility guide", href: "/compatibility" },
      { label: "Shipping and delivery", href: "/shipping-delivery" },
      { label: "Returns", href: "/returns" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const servicePoints: ServicePoint[] = [
  { icon: "compatibility", title: "Compatibility on every product", body: "See which platforms and connections each item works with before you add it to your cart." },
  { icon: "guides", title: "Setup guides", body: "Four guides cover gaming, remote work, study and creative desks, with the gear each one needs." },
  { icon: "delivery", title: "Delivery details up front", body: "Methods and estimates are shown before checkout. Rates in this prototype are samples." },
  { icon: "reviews", title: "Clearly labeled reviews", body: "Sample reviews are marked as samples. Reviews you write are saved on your device only." },
];
