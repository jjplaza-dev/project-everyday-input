import { guides } from "@/data/fixtures/guides";
import { compatibilityConnections, compatibilitySections } from "@/data/fixtures/compatibility";
import { getProducts } from "@/data/selectors/products";
import type { CompatibilityGuideSection, ConnectionType, Guide, Platform, Product } from "@/types";

export function getGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}

export function getRelatedGuides(guide: Guide): Guide[] {
  return guide.relatedGuideIds.flatMap((id) => guides.find((g) => g.id === id) ?? []);
}

export function getGuideProducts(guide: Guide): Product[] {
  const all = getProducts();
  return guide.relatedProductIds.flatMap((id) => all.find((p) => p.id === id) ?? []);
}

export function getCompatibilitySections(): CompatibilityGuideSection[] {
  return compatibilitySections;
}

export function getCompatibilityConnections(): ConnectionType[] {
  return compatibilityConnections;
}

/** Products whose profile lists both the platform and the connection. */
export function findCompatibleProducts(platform: Platform, connection: ConnectionType): Product[] {
  return getProducts().filter(
    (p) => p.compatibility.platforms.includes(platform) && p.compatibility.connections.includes(connection),
  );
}
