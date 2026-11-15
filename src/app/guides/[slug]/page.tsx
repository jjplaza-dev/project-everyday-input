import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideDiagram } from "@/components/guides/GuideDiagram";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { getGuideBySlug, getGuideProducts, getGuideSlugs, getRelatedGuides } from "@/data/selectors/guides";

type Props = { params: Promise<{ slug: string }> };

const calloutLabels = { tip: "Tip", note: "Note", check: "Check before you buy" } as const;

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  return guide ? { title: guide.title, description: guide.summary } : {};
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const products = getGuideProducts(guide);
  const related = getRelatedGuides(guide);

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Setup guides", href: "/guides" }, { label: guide.title }]} />
      <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">{guide.title}</h1>
      <p className="mt-3 max-w-[68ch] text-muted-foreground">{guide.summary}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="In this guide" className="lg:sticky lg:top-24 lg:h-fit">
          <h2 className="text-sm font-semibold text-primary">In this guide</h2>
          <ol className="mt-2 space-y-1 text-sm">
            {guide.steps.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-block py-1 text-primary underline-offset-4 hover:underline">{i + 1}. {s.heading}</a>
              </li>
            ))}
          </ol>
        </nav>

        <ol className="max-w-[68ch] space-y-10">
          {guide.steps.map((s, i) => (
            <li key={s.id} id={s.id}>
              <h2 className="text-display text-2xl text-primary">{i + 1}. {s.heading}</h2>
              {s.calloutVariant ? (
                <p className="mt-2 rounded-lg border-l-4 border-signal bg-secondary px-4 py-3">
                  <span className="font-semibold text-primary">{calloutLabels[s.calloutVariant]}. </span>
                  {s.body}
                </p>
              ) : (
                <p className="mt-2">{s.body}</p>
              )}
              {s.diagramKey && <GuideDiagram diagramKey={s.diagramKey} />}
            </li>
          ))}
        </ol>
      </div>

      <section aria-labelledby="gear-title" className="mt-14">
        <h2 id="gear-title" className="text-display text-2xl text-primary">Gear for this setup</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="more-title" className="mt-14">
          <h2 id="more-title" className="text-display text-2xl text-primary">More guides</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {related.map((g) => (
              <li key={g.id}>
                <Link href={`/guides/${g.slug}`} className="inline-flex min-h-11 items-center rounded-lg border border-input bg-white px-4 text-sm font-medium text-primary hover:bg-secondary">{g.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
