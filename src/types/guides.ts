import type { ImageAsset } from "./catalog";

export type GuideStep = {
  id: string;
  heading: string;
  body: string;
  diagramKey?: string;
  calloutVariant?: "tip" | "note" | "check";
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  audience: "gaming" | "remote-work" | "study" | "creative";
  summary: string;
  heroImage?: ImageAsset;
  steps: GuideStep[];
  relatedProductIds: string[];
  relatedGuideIds: string[];
};
