import {
  announcement,
  footerGroups,
  primaryNav,
  servicePoints,
  siteName,
  siteTagline,
} from "@/data/fixtures/site";
import { getCategories } from "@/data/selectors/categories";
import type { FooterGroup, NavItem, ServicePoint } from "@/types";

export function getSiteIdentity() {
  return { name: siteName, tagline: siteTagline };
}

export function getAnnouncement(): string {
  return announcement;
}

/** Primary navigation; the Shop entry gets one child per category. */
export function getPrimaryNav(): NavItem[] {
  return primaryNav.map((item) =>
    item.href === "/shop"
      ? {
          ...item,
          children: getCategories().map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
        }
      : item,
  );
}

export function getFooterGroups(): FooterGroup[] {
  return footerGroups;
}

export function getServicePoints(): ServicePoint[] {
  return servicePoints;
}
