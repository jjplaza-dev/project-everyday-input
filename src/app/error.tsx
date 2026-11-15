"use client";

import Link from "next/link";
import { btnPrimary, btnSecondary } from "@/components/shared/button-styles";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page py-20 text-center">
      <h1 className="text-display text-[clamp(2rem,4vw,3rem)] text-primary">Something went wrong</h1>
      <p className="mx-auto mt-4 max-w-[52ch] text-muted-foreground">
        The page could not be shown. You can try again, or head back to the shop.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className={btnPrimary}>Try again</button>
        <Link href="/shop" className={btnSecondary}>Shop all gear</Link>
      </div>
    </div>
  );
}
