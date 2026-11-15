import Link from "next/link";
import { btnPrimary, btnSecondary } from "@/components/shared/button-styles";
import { getCategories } from "@/data/selectors/categories";

export default function NotFound() {
  return (
    <div className="container-page py-20 text-center">
      <h1 className="text-display text-[clamp(2.25rem,5vw,4rem)] text-primary">We could not find that page</h1>
      <p className="mx-auto mt-4 max-w-[56ch] text-muted-foreground">
        The page may have moved, or the address may be mistyped. Try the shop or one of the categories below.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className={btnPrimary}>Shop all gear</Link>
        <Link href="/public" className={btnSecondary}>Back to home</Link>
      </div>
      <ul className="mt-10 flex flex-wrap justify-center gap-2">
        {getCategories().map((c) => (
          <li key={c.id}>
            <Link href={`/category/${c.slug}`} className="inline-flex min-h-11 items-center rounded-lg border border-input bg-white px-3 text-sm text-primary hover:bg-secondary">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
