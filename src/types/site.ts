export type NavItem = { label: string; href: string; children?: NavItem[] };

export type FooterGroup = { title: string; links: NavItem[] };

export type PromoBanner = { headline: string; body: string; cta: { label: string; href: string } };

export type ServicePointIcon = "compatibility" | "delivery" | "guides" | "reviews";
export type ServicePoint = { icon: ServicePointIcon; title: string; body: string };

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  group: "orders" | "shipping" | "payments" | "compatibility";
};

export type SitePolicy = {
  slug: "shipping-delivery" | "returns" | "privacy" | "terms" | "about";
  title: string;
  sections: { heading: string; body: string }[];
  isSample: boolean;
};
