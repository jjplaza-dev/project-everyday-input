import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";

export const metadata: Metadata = { title: "Shop all gear" };

export default function ShopPage() {
  return (
      <CatalogView
          title="Shop all gear"
          intro="Keyboards, mice, audio, stands, cables and more for gaming, remote work, study and creative desks."
          scope={{ kind: "shop" }}
      />
  );
}
