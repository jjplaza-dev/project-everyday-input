import type { ConnectionType, IntendedUse, Platform } from "@/types";

export const platformLabels: Record<Platform, string> = {
  windows: "Windows", macos: "macOS", linux: "Linux", chromeos: "ChromeOS",
  ios: "iOS", android: "Android", playstation: "PlayStation", xbox: "Xbox", switch: "Nintendo Switch",
};

export const connectionLabels: Record<ConnectionType, string> = {
  "usb-a": "USB-A", "usb-c": "USB-C", bluetooth: "Bluetooth", "wireless-dongle": "Wireless receiver",
  "aux-3-5mm": "3.5 mm audio", hdmi: "HDMI", ethernet: "Ethernet", "qi-wireless": "Qi wireless charging",
};

export const intendedUseLabels: Record<IntendedUse, string> = {
  gaming: "Gaming", "remote-work": "Remote work", study: "Study", creative: "Creative work",
};
