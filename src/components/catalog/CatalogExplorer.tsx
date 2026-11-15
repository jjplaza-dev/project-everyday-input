"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { SearchX } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { btnPrimary } from "@/components/shared/button-styles";
import { EmptyState } from "@/components/shared/EmptyState";
import { getCatalogResult, sortOptions, type CatalogScope } from "@/data/selectors/catalog";
import { buildFacetGroups, clearFilters, toggleOption, type FacetGroupView } from "@/data/selectors/facets";
import { getCategories } from "@/data/selectors/categories";
import { pluralize } from "@/lib/format";
import { parseFilterState, serializeFilterState } from "@/lib/url-state";
import type { FilterState, SortId } from "@/types";

export function CatalogExplorer({ scope }: { scope: CatalogScope }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const fallbackSort: SortId = scope.kind === "search" ? "relevance" : "featured";
  const parsed = parseFilterState(params, fallbackSort);
  const state = parsed.sort === "relevance" && scope.kind !== "search" ? { ...parsed, sort: fallbackSort } : parsed;
  const result = getCatalogResult(scope, state);
  const groups = buildFacetGroups(scope, result.base, state);
  const chips = groups.flatMap((g) => g.options.filter((o) => o.selected).map((o) => ({ key: g.key, ...o })));

  const href = (s: FilterState) => {
    const qs = serializeFilterState(s, fallbackSort);
    return qs ? `${pathname}?${qs}` : pathname;
  };
  const go = (s: FilterState) => router.push(href(s), { scroll: false });

  const panel = <FilterPanel groups={groups} onToggle={(key, value) => go(toggleOption(state, key, value))} />;

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside aria-label="Filters" className="hidden lg:block">
        <h2 className="text-sm font-semibold text-primary">Filters</h2>
        {panel}
      </aside>

      <section aria-label="Results">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 text-sm">
          <p role="status" aria-live="polite" className="font-medium text-primary">{pluralize(result.total, "product")}</p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => dialogRef.current?.showModal()} className="inline-flex min-h-11 items-center rounded-lg border border-input bg-white px-4 font-medium text-primary hover:bg-secondary lg:hidden">
              Filters{chips.length > 0 ? ` (${chips.length})` : ""}
            </button>
            <label className="flex items-center gap-2 text-muted-foreground">
              <span>Sort by</span>
              <select
                value={state.sort}
                onChange={(e) => go({ ...state, sort: e.target.value as SortId, page: 1 })}
                className="min-h-11 rounded-lg border border-input bg-white px-2 text-primary"
              >
                {sortOptions.filter((o) => o.id !== "relevance" || scope.kind === "search").map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {chips.length > 0 && (
          <ul aria-label="Active filters" className="mt-3 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <li key={`${c.key}-${c.value}`}>
                <button type="button" onClick={() => go(toggleOption(state, c.key, c.value))} aria-label={`Remove filter: ${c.label}`} className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-input bg-secondary px-3 text-sm text-primary hover:bg-accent">
                  {c.label} <span aria-hidden="true">&times;</span>
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => go(clearFilters(state))} className="min-h-9 px-2 text-sm font-medium text-primary underline underline-offset-4">Clear all</button>
            </li>
          </ul>
        )}

        {result.total === 0 ? (
          <div className="mt-6">
            <EmptyState
              icon={<SearchX className="size-6" aria-hidden="true" />}
              title={state.query ? `No results for “${state.query}”` : "No products match these filters"}
              actions={
                <>
                  {chips.length > 0 && <button type="button" onClick={() => go(clearFilters(state))} className={btnPrimary}>Clear filters</button>}
                  {getCategories().slice(0, 3).map((c) => (
                    <Link key={c.id} href={`/category/${c.slug}`} className="inline-flex min-h-11 items-center rounded-lg border border-input bg-white px-3 text-sm text-primary hover:bg-secondary">{c.name}</Link>
                  ))}
                </>
              }
            >
              Try removing a filter, checking the spelling, or browsing a category.
            </EmptyState>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {result.items.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
          </ul>
        )}

        {result.pageCount > 1 && (
          <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: result.pageCount }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={href({ ...state, page: n })}
                scroll={false}
                aria-current={n === result.page ? "page" : undefined}
                aria-label={`Page ${n}`}
                className={`inline-flex size-11 items-center justify-center rounded-lg border text-sm font-medium ${n === result.page ? "border-primary bg-primary text-primary-foreground" : "border-input bg-white text-primary hover:bg-secondary"}`}
              >
                {n}
              </Link>
            ))}
          </nav>
        )}
      </section>

      <dialog ref={dialogRef} aria-labelledby="filters-title" className="m-0 ml-auto h-dvh max-h-dvh w-80 max-w-full rounded-none bg-white p-0 backdrop:bg-black/40">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 id="filters-title" className="font-semibold text-primary">Filters</h2>
            <form method="dialog"><button className="min-h-11 px-2 text-sm font-medium text-primary underline underline-offset-4">Close</button></form>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-4">{panel}</div>
          <form method="dialog" className="border-t p-4">
            <button className={`${btnPrimary} w-full`}>Show {pluralize(result.total, "product")}</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

function FilterPanel({ groups, onToggle }: { groups: FacetGroupView[]; onToggle: (key: string, value: string) => void }) {
  return (
    <div>
      {groups.map((g) => (
        <fieldset key={g.key} className="mt-5 border-t pt-4">
          <legend className="text-sm font-semibold text-primary">{g.label}</legend>
          <ul className="mt-2 space-y-1">
            {g.options.map((o) => (
              <li key={o.value}>
                <label className="flex min-h-9 cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" checked={o.selected} onChange={() => onToggle(g.key, o.value)} className="size-4 accent-primary" />
                  <span>{o.label}</span>
                  <span className="ml-auto text-muted-foreground">{o.count}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}
