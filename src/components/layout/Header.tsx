import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { CartButton } from "@/components/cart/CartButton";
import { SearchBox } from "@/components/layout/SearchBox";
import { getPrimaryNav, getSiteIdentity } from "@/data/selectors/site";

export function Header() {
  const nav = getPrimaryNav();
  const { name } = getSiteIdentity();

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/" className="text-display text-xl text-primary">
          {name}
        </Link>

        <nav aria-label="Main" className="ml-4 hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-primary hover:bg-secondary"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute left-0 top-full hidden w-80 rounded-xl border bg-white p-2 shadow-float group-focus-within:block group-hover:block">
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden md:block">
          <SearchBox />
        </div>

        <Link
          href="/search"
          aria-label="Search"
          className="ml-auto inline-flex size-11 items-center justify-center rounded-lg hover:bg-secondary md:hidden"
        >
          <Search className="size-5" aria-hidden="true" />
        </Link>

        <CartButton />

        <details className="relative md:hidden">
          <summary className="inline-flex size-11 cursor-pointer list-none items-center justify-center rounded-lg hover:bg-secondary [&::-webkit-details-marker]:hidden">
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Menu</span>
          </summary>
          <nav aria-label="Mobile" className="absolute right-0 top-full z-40 mt-2 w-72 rounded-xl border bg-white p-2 shadow-float">
            <ul>
              {nav.flatMap((item) => [
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-lg px-3 py-3 text-sm font-semibold text-primary hover:bg-secondary">
                    {item.label}
                  </Link>
                </li>,
                ...(item.children ?? []).map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className="block rounded-lg py-2 pl-6 pr-3 text-sm text-foreground hover:bg-secondary">
                      {child.label}
                    </Link>
                  </li>
                )),
              ])}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
