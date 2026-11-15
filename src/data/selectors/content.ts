import { policies } from "@/data/fixtures/policies";
import { faqItems, shippingMethods, supportChannels } from "@/data/fixtures/service";
import type { FAQItem, ShippingMethod, SitePolicy, SupportChannel } from "@/types";

export function getPolicy(slug: SitePolicy["slug"]): SitePolicy | undefined {
  return policies.find((p) => p.slug === slug);
}

export function getShippingMethods(): ShippingMethod[] {
  return shippingMethods;
}

export function getSupportChannels(): SupportChannel[] {
  return supportChannels;
}

const groupLabels: Record<FAQItem["group"], string> = {
  orders: "Orders",
  shipping: "Shipping",
  payments: "Payments",
  compatibility: "Compatibility",
};

export function getFaqGroups(): { group: FAQItem["group"]; label: string; items: FAQItem[] }[] {
  return (Object.keys(groupLabels) as FAQItem["group"][]).map((group) => ({
    group,
    label: groupLabels[group],
    items: faqItems.filter((i) => i.group === group),
  }));
}
