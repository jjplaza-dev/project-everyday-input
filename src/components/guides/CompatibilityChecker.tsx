"use client";

import { useId, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { findProductsByCompatibility } from "@/data/selectors/guides";
import { pluralize } from "@/lib/format";
import { connectionLabels, platformLabels } from "@/lib/labels";
import type { ConnectionType, Platform } from "@/types";

export function CompatibilityChecker() {
  const uid = useId();
  const [platform, setPlatform] = useState<Platform | "">("");
  const [connection, setConnection] = useState<ConnectionType | "">("");

  const results = findProductsByCompatibility({ platform: platform || undefined, connection: connection || undefined });
  const chosen = platform !== "" || connection !== "";
  const select = "mt-1 min-h-11 w-full rounded-lg border border-input bg-white px-3 text-sm";

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-p`} className="text-sm font-semibold text-primary">Your device or platform</label>
          <select id={`${uid}-p`} value={platform} onChange={(e) => setPlatform(e.target.value as Platform | "")} className={select}>
            <option value="">Any</option>
            {(Object.keys(platformLabels) as Platform[]).map((k) => <option key={k} value={k}>{platformLabels[k]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-c`} className="text-sm font-semibold text-primary">Connection you have</label>
          <select id={`${uid}-c`} value={connection} onChange={(e) => setConnection(e.target.value as ConnectionType | "")} className={select}>
            <option value="">Any</option>
            {(Object.keys(connectionLabels) as ConnectionType[]).map((k) => <option key={k} value={k}>{connectionLabels[k]}</option>)}
          </select>
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-4 text-sm font-medium text-primary">
        {chosen ? `${pluralize(results.length, "product")} listed as compatible` : "Choose a platform, a connection, or both."}
      </p>
      {chosen && results.length === 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          No sample products list that combination. You may need an adapter or hub, so check the tables above and your device's specifications.
        </p>
      )}
      {results.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {results.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      )}
      <p className="mt-4 text-xs text-muted-foreground">
        Results use each product's listed platforms and connections. Always confirm with your own device's specifications.
      </p>
    </div>
  );
}
