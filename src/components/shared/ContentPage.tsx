import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { getPolicy } from "@/data/selectors/content";
import type { SitePolicy } from "@/types";

export function SampleDataNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
      {children ?? "Sample content: this text is a placeholder for the store owner to replace."}
    </p>
  );
}

/** Narrow-measure layout for policy, FAQ and company pages. */
export function ContentPage({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">{title}</h1>
      {intro && <p className="mt-3 max-w-[68ch] text-muted-foreground">{intro}</p>}
      <div className="mt-8 max-w-[68ch] space-y-8">{children}</div>
    </div>
  );
}

export function PolicyPage({ slug, children }: { slug: SitePolicy["slug"]; children?: React.ReactNode }) {
  const policy = getPolicy(slug);
  if (!policy) notFound();
  return (
    <ContentPage title={policy.title}>
      {policy.isSample && <SampleDataNote />}
      {policy.sections.map((s) => (
        <section key={s.heading}>
          <h2 className="text-display text-2xl text-primary">{s.heading}</h2>
          <p className="mt-2 text-foreground">{s.body}</p>
        </section>
      ))}
      {children}
    </ContentPage>
  );
}
