import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/RatingStars";
import { SampleDataNote } from "@/components/shared/ContentPage";
import { getCategories } from "@/data/selectors/categories";
import { getFaqGroups } from "@/data/selectors/content";
import { findCompatibleProducts, getCompatibilityConnections, getCompatibilitySections } from "@/data/selectors/guides";
import { connectionLabels, platformLabels } from "@/lib/labels";
import type { CompatibilityRow } from "@/types";

export const metadata: Metadata = {
  title: "Compatibility guide",
  description: "Which connections work with which devices, and what to check before you buy.",
};

const worksLabel: Record<CompatibilityRow["works"], string> = { yes: "Yes", partial: "Check", no: "No" };

export default function CompatibilityPage() {
  const connections = getCompatibilityConnections();
  const sections = getCompatibilitySections();
  const categories = getCategories();
  const preview = findCompatibleProducts("windows", "usb-c");
  const faq = getFaqGroups().find((g) => g.group === "compatibility");

  return (
    <>
      <header className="bg-tech-grid border-b bg-secondary">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compatibility guide" }]} />
          <h1 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-primary">Compatibility guide</h1>
          <p className="mt-3 max-w-[60ch] text-primary/80">
            Match connections to your devices before you buy. This is general guidance: always check your own device's specifications.
          </p>
        </div>
      </header>

      <div className="container-page space-y-14 py-12">
        <SampleDataNote>
          "Yes" means it usually works. "Check" means it depends on your model, an adapter, or software. "No" means it normally will not.
        </SampleDataNote>

        {sections.map((s) => (
          <section key={s.id} aria-labelledby={`sec-${s.id}`}>
            <h2 id={`sec-${s.id}`} className="text-display text-2xl text-primary">{s.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{s.summary}</p>
            <div className="mt-4 overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <caption className="sr-only">{s.title}: compatibility by platform and connection</caption>
                <thead className="bg-secondary">
                  <tr>
                    <th scope="col" className="px-3 py-2 font-semibold">Platform</th>
                    {connections.map((c) => <th key={c} scope="col" className="px-3 py-2 font-semibold">{connectionLabels[c]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[...new Set(s.rows.map((r) => r.platform))].map((platform) => (
                    <tr key={platform} className="border-t align-top">
                      <th scope="row" className="px-3 py-2 font-medium">{platformLabels[platform]}</th>
                      {connections.map((c) => {
                        const cell = s.rows.find((r) => r.platform === platform && r.connection === c);
                        return (
                          <td key={c} className="px-3 py-2">
                            {cell ? (<><span className="font-semibold text-primary">{worksLabel[cell.works]}</span><span className="block text-xs text-muted-foreground">{cell.note}</span></>) : "-"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <section aria-labelledby="notes-title">
          <h2 id="notes-title" className="text-display text-2xl text-primary">Notes by category</h2>
          <dl className="mt-4 grid gap-4 md:grid-cols-2">
            {categories.map((c) => (
              <div key={c.id} className="rounded-xl border bg-card p-4">
                <dt className="font-semibold text-primary">{c.name}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{c.buyingGuide}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="checker-title" className="rounded-xl border bg-secondary p-6">
          <h2 id="checker-title" className="text-display text-2xl text-primary">Compatibility checker preview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Example only: {platformLabels.windows} with {connectionLabels["usb-c"]}. An interactive checker arrives in a later phase.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {preview.map((p) => (
              <li key={p.id} className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-primary">{p.name}</li>
            ))}
          </ul>
        </section>

        {faq && (
          <section aria-labelledby="cfaq-title">
            <h2 id="cfaq-title" className="text-display text-2xl text-primary">Compatibility questions</h2>
            <div className="mt-3 max-w-[68ch] divide-y border-y">
              {faq.items.map((i) => (
                <details key={i.id} className="py-3">
                  <summary className="min-h-11 cursor-pointer font-medium text-primary">{i.question}</summary>
                  <p className="pb-2 pt-1">{i.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
