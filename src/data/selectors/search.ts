import { getCategories } from "@/data/selectors/categories";
import { getBrandName, getProducts } from "@/data/selectors/products";
import { connectionLabels, platformLabels } from "@/lib/labels";
import type { Product } from "@/types";

/** Lowercase and strip everything but letters and digits, so "USB-C", "usb c" and "usbc" all match. */
const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

type Field = { weight: number; text: string };

function fieldsFor(p: Product): Field[] {
  const category = getCategories().find((c) => c.id === p.categoryId)?.name ?? "";
  return [
    { weight: 10, text: compact(p.name) },
    { weight: 6, text: compact(getBrandName(p.brandId)) },
    { weight: 5, text: compact(category) },
    { weight: 3, text: compact(`${p.shortDescription} ${p.highlights.join(" ")}`) },
    {
      weight: 2,
      text: compact([
        ...p.specGroups.flatMap((g) => g.items.map((i) => `${i.label} ${i.value}`)),
        ...p.compatibility.platforms.map((x) => platformLabels[x]),
        ...p.compatibility.connections.map((x) => connectionLabels[x]),
        ...p.compatibility.requirements,
      ].join(" ")),
    },
  ];
}

/** Every word must match somewhere (AND). The best-matching field sets the word's score; a name that starts with the word scores extra. */
export function scoreProduct(p: Product, query: string): number {
  const words = query.toLowerCase().split(/\s+/).map(compact).filter(Boolean);
  if (words.length === 0) return 1;
  const fields = fieldsFor(p);
  let total = 0;
  for (const w of words) {
    const hit = fields.filter((f) => f.text.includes(w)).reduce((best, f) => Math.max(best, f.weight), 0);
    if (hit === 0) return 0;
    total += hit + (fields[0].text.startsWith(w) ? 5 : 0);
  }
  return total;
}

/** Map of product id to score; only products that match are included. An empty query matches everything. */
export function getSearchScores(query: string): Map<string, number> {
  const scores = new Map<string, number>();
  for (const p of getProducts()) {
    const s = scoreProduct(p, query);
    if (s > 0) scores.set(p.id, s);
  }
  return scores;
}

export function searchProducts(query: string): Product[] {
  const scores = getSearchScores(query);
  return getProducts()
    .filter((p) => scores.has(p.id))
    .sort((a, b) => (scores.get(b.id) ?? 0) - (scores.get(a.id) ?? 0) || a.name.localeCompare(b.name));
}

export function getSuggestions(query: string, limit = 5): Product[] {
  return query.trim().length < 2 ? [] : searchProducts(query).slice(0, limit);
}
