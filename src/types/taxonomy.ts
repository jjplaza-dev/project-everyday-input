import type { FacetDefinition } from "./discovery";
import type { ImageAsset } from "./catalog";

export type CategoryIconKey =
  | "keyboard" | "mouse" | "desk-mat" | "headset"
  | "laptop" | "usb" | "smartphone" | "gamepad";

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconKey: CategoryIconKey;
  heroImage?: ImageAsset;
  filterSchema: FacetDefinition[];
  buyingGuide: string;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  intent: "gaming" | "remote-work" | "study" | "creative" | "enthusiast" | "mobile";
  description: string;
  productIds: string[];
  heroImage?: ImageAsset;
  isSample: true;
};
