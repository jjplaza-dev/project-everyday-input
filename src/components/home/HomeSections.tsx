import Link from "next/link";
import { BookOpen, Plug, Star, Truck } from "lucide-react";
import { DeskScene } from "@/components/art/DeskScene";
import { btnPrimary, btnSecondary } from "@/components/shared/button-styles";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { getCategories } from "@/data/selectors/categories";
import { getServicePoints, getSiteIdentity } from "@/data/selectors/site";
import type { ServicePointIcon } from "@/types";

const serviceIcons = { compatibility: Plug, guides: BookOpen, delivery: Truck, reviews: Star } as const satisfies Record<
  ServicePointIcon,
  React.ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>
>;

export function Hero() {
  const { tagline } = getSiteIdentity();
  return (
    <section aria-labelledby="hero-title" className="bg-secondary">
      <div className="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <h1 id="hero-title" className="text-display text-[clamp(2.25rem,5vw,4rem)] text-primary">
            {tagline}
          </h1>
          <p className="mt-5 max-w-[56ch] text-lg text-muted-foreground">
            Keyboards, mice, audio, stands and cables picked for build quality and honest compatibility notes, so
            what you order works with the devices you already own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className={btnPrimary}>Shop all gear</Link>
            <Link href="/compatibility" className={btnSecondary}>Check compatibility</Link>
          </div>
        </div>
        <div className="bg-tech-grid rounded-xl border bg-white p-4 shadow-rest">
          <DeskScene className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories-title" className="container-page py-16 md:py-20">
      <h2 id="categories-title" className="text-display text-3xl text-primary">Shop by category</h2>
      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getCategories().map((c) => (
          <li key={c.id}>
            <Link
              href={`/category/${c.slug}`}
              className="group flex h-full flex-col gap-3 rounded-xl border bg-card p-4 shadow-rest transition-shadow duration-150 hover:shadow-float"
            >
              <span className="flex size-14 items-center justify-center rounded-lg bg-secondary text-primary">
                <CategoryIcon iconKey={c.iconKey} />
              </span>
              <span className="font-semibold text-primary group-hover:underline">{c.name}</span>
              <span className="text-sm text-muted-foreground">{c.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServiceStrip() {
  return (
    <section aria-label="What to expect" className="bg-secondary">
      <ul className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {getServicePoints().map((s) => {
          const Icon = serviceIcons[s.icon];
          return (
            <li key={s.title} className="flex gap-3">
              <Icon className="mt-1 size-6 shrink-0 text-signal-ink" strokeWidth={1.5} aria-hidden />
              <div>
                <h3 className="font-semibold text-primary">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
