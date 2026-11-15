import { Suspense } from "react";
import { CatalogExplorer } from "@/components/catalog/CatalogExplorer";
import type { CatalogScope } from "@/data/selectors/catalog";

function CatalogSkeleton() {
  return (
    <div className="mt-8" role="status">
      <span className="sr-only">Loading products</span>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => <li key={i} className="h-64 animate-pulse rounded-xl bg-secondary" />)}
      </ul>
    </div>
  );
}

export function CatalogView({
  title,
  intro,
  scope,
  children,
}: {
  title: string;
  intro?: string;
  scope: CatalogScope;
  children?: React.ReactNode;
}) {
  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="text-display text-[clamp(2rem,4vw,3rem)] text-primary">{title}</h1>
      {intro && <p className="mt-3 max-w-[68ch] text-muted-foreground">{intro}</p>}
      {children}
      <p className="mt-6 rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
        Sample catalog: products, prices and stock are placeholders.
      </p>
      {/* useSearchParams needs a Suspense boundary; the skeleton shows until the client explorer is ready. */}
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogExplorer scope={scope} />
      </Suspense>
    </div>
  );
}
