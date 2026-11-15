import { CategoryGrid, Hero, ServiceStrip } from "@/components/home/HomeSections";
import { BestsellersRail, CollectionTiles } from "@/components/home/HomeRails";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <BestsellersRail />
      <CollectionTiles />
      <ServiceStrip />
    </>
  );
}
