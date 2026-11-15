import type { Metadata } from "next";
import { ContentPage, SampleDataNote } from "@/components/shared/ContentPage";
import { getFaqGroups } from "@/data/selectors/content";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <ContentPage title="Frequently asked questions" intro="Answers about orders, delivery, payments and compatibility.">
      <SampleDataNote />
      {getFaqGroups().map((g) => (
        <section key={g.group} aria-labelledby={`faq-${g.group}`}>
          <h2 id={`faq-${g.group}`} className="text-display text-2xl text-primary">{g.label}</h2>
          <div className="mt-3 divide-y border-y">
            {g.items.map((item) => (
              <details key={item.id} className="group py-3">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium text-primary [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span aria-hidden="true" className="text-muted-foreground group-open:hidden">+</span>
                  <span aria-hidden="true" className="hidden text-muted-foreground group-open:inline">&minus;</span>
                </summary>
                <p className="pb-2 pt-1 text-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </ContentPage>
  );
}
