export type Platform =
  | "windows" | "macos" | "linux" | "chromeos" | "ios" | "android"
  | "playstation" | "xbox" | "switch";

export type ConnectionType =
  | "usb-a" | "usb-c" | "bluetooth" | "wireless-dongle"
  | "aux-3-5mm" | "hdmi" | "ethernet" | "qi-wireless";

export type CompatibilityProfile = {
  platforms: Platform[];
  connections: ConnectionType[];
  requirements: string[];
  notes: string[];
};

export type CompatibilityRow = {
  platform: Platform;
  connection: ConnectionType;
  works: "yes" | "partial" | "no";
  note: string;
};

export type CompatibilityGuideSection = {
  id: string;
  title: string;
  summary: string;
  rows: CompatibilityRow[];
  categoryIds: string[];
};
