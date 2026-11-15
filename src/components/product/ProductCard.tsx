import Link from "next/link";
import { Check, Minus, X } from "lucide-react";
import { ProductArt } from "@/components/art/ProductArt";
import { btnSecondary } from "@/components/shared/button-styles";
import { RatingStars } from "@/components/shared/RatingStars";
import { getReviewSummary } from "@/data/selectors/reviews";
import { getCategories } from "@/data/selectors/categories";
import { getBrandName, getProductStockStatus } from "@/data/selectors/products";
import { formatMoney } from "@/lib/format";
import type { Product, StockStatus } from "@/types";

const stockView: Record<StockStatus, { label: string; className: string; Icon: typeof Check }> = {
  "in-stock": { label: "In stock", className: "text-success", Icon: Check },
  "low-stock": { label: "Low stock", className: "text-signal-ink", Icon: Minus },
  "out-of-stock": { label: "Out of stock", className: "text-muted-foreground", Icon: X },
};

export function StockIndicator({ status }: { status: StockStatus }) {
  const { label, className, Icon } = stockView[status];
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-medium ${className}`}>
      <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
      {label}
    </span>
  );
}

export function PriceBlock({ product }: { product: Product }) {
  return (
    <p className="font-bold tabular-nums text-primary">
      {product.compareAtPrice && (
        <>
          <span className="sr-only">Original price </span>
          <s className="mr-2 font-normal text-muted-foreground">{formatMoney(product.compareAtPrice)}</s>
          <span className="sr-only">Now </span>
        </>
      )}
      {formatMoney(product.basePrice)}
    </p>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const category = getCategories().find((c) => c.id === product.categoryId);
  const status = getProductStockStatus(product.id);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-rest transition-shadow duration-150 hover:shadow-float">
      <Link href={`/product/${product.slug}`} className="block bg-secondary p-6" tabIndex={-1} aria-hidden="true">
        {category && <ProductArt iconKey={category.iconKey} className="mx-auto aspect-square w-full max-w-40" />}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-sm text-muted-foreground">{getBrandName(product.brandId)}</p>
        <h3 className="line-clamp-2 font-semibold text-primary">
          <Link href={`/product/${product.slug}`} className="hover:underline">{product.name}</Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.highlights[0]}</p>
        <RatingStars summary={getReviewSummary(product.id)} />
        <div className="mt-auto flex items-center justify-between pt-2">
          <PriceBlock product={product} />
          <StockIndicator status={status} />
        </div>
        <Link href={`/product/${product.slug}`} className={`${btnSecondary} mt-2`}>
          View details
        </Link>
      </div>
    </article>
  );
}
