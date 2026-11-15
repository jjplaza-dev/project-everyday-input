"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Search } from "lucide-react";
import { getSuggestions } from "@/data/selectors/search";
import { getBrandName } from "@/data/selectors/products";

export function SearchBox() {
  const router = useRouter();
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const items = getSuggestions(query, 5);
  const show = open && items.length > 0;

  const choose = (slug: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/product/${slug}`);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (show && active >= 0) return choose(items[active].slug);
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" && items.length) { e.preventDefault(); setOpen(true); setActive((a) => (a + 1) % items.length); }
    else if (e.key === "ArrowUp" && items.length) { e.preventDefault(); setActive((a) => (a <= 0 ? items.length - 1 : a - 1)); }
    else if (e.key === "Escape") { setOpen(false); setActive(-1); }
  };

  return (
    <form role="search" onSubmit={submit} className="relative">
      <label htmlFor={`${id}-input`} className="sr-only">Search products</label>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <input
        id={`${id}-input`}
        type="search"
        role="combobox"
        aria-expanded={show}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        aria-activedescendant={show && active >= 0 ? `${id}-opt-${active}` : undefined}
        autoComplete="off"
        value={query}
        placeholder="Search keyboards, mice, hubs"
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(-1); }}
        onKeyDown={onKeyDown}
        onBlur={() => setOpen(false)}
        className="h-11 w-72 rounded-lg border border-input bg-white pl-9 pr-3 text-sm"
      />
      <p role="status" className="sr-only">{show ? `${items.length} suggestions` : ""}</p>
      <ul id={`${id}-list`} role="listbox" aria-label="Suggestions" hidden={!show} className="absolute left-0 right-0 top-full z-40 mt-1 rounded-xl border bg-white p-1 shadow-float">
        {items.map((p, i) => (
          <li
            key={p.id}
            id={`${id}-opt-${i}`}
            role="option"
            aria-selected={i === active}
            onMouseDown={(e) => { e.preventDefault(); choose(p.slug); }}
            className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${i === active ? "bg-secondary" : ""}`}
          >
            <span className="font-medium text-primary">{p.name}</span>
            <span className="block text-xs text-muted-foreground">{getBrandName(p.brandId)}</span>
          </li>
        ))}
      </ul>
    </form>
  );
}
