import type { CompatibilityGuideSection, CompatibilityRow, ConnectionType, Platform } from "@/types";

const row = (platform: Platform, connection: ConnectionType, works: CompatibilityRow["works"], note: string): CompatibilityRow => ({
  platform, connection, works, note,
});

export const compatibilityConnections: ConnectionType[] = ["usb-a", "usb-c", "bluetooth", "wireless-dongle", "aux-3-5mm"];

/** General guidance only. Always check your own device's specifications. */
export const compatibilitySections: CompatibilityGuideSection[] = [
  {
    id: "computers",
    title: "Computers",
    summary: "Windows, macOS and Linux laptops and desktops.",
    categoryIds: ["cat-keyboards", "cat-mice", "cat-audio", "cat-usb", "cat-stands"],
    rows: [
      row("windows", "usb-a", "yes", "Standard on most PCs."),
      row("windows", "usb-c", "yes", "Data works on most ports. Video output depends on the port."),
      row("windows", "bluetooth", "partial", "Built in on most laptops. Some desktops need an adapter."),
      row("windows", "wireless-dongle", "yes", "Plug the receiver into any free USB-A port."),
      row("windows", "aux-3-5mm", "partial", "Many laptops have a combined headset jack. Some desktops use separate jacks."),
      row("macos", "usb-a", "partial", "Many current Macs only have USB-C. An adapter or hub is needed."),
      row("macos", "usb-c", "yes", "Data and charging work. Check display output on your model."),
      row("macos", "bluetooth", "yes", "Supported on current Macs."),
      row("macos", "wireless-dongle", "partial", "Receivers need a USB-A port or an adapter."),
      row("macos", "aux-3-5mm", "partial", "Not every model has a headphone jack."),
      row("linux", "usb-a", "yes", "Standard on most machines."),
      row("linux", "usb-c", "yes", "Data works. Video output depends on hardware and drivers."),
      row("linux", "bluetooth", "partial", "Depends on the distribution and the adapter."),
      row("linux", "wireless-dongle", "partial", "Most keyboard and mouse receivers work. Vendor software may not."),
      row("linux", "aux-3-5mm", "partial", "Depends on the machine's audio jack."),
    ],
  },
  {
    id: "phones",
    title: "Phones and tablets",
    summary: "iPhone, iPad and Android devices.",
    categoryIds: ["cat-phone", "cat-audio", "cat-mice"],
    rows: [
      row("ios", "usb-a", "no", "Phones and tablets have no USB-A port. Adapters may be needed."),
      row("ios", "usb-c", "partial", "Only models with USB-C. Accessory support varies."),
      row("ios", "bluetooth", "partial", "Support for keyboards, mice and controllers varies by version."),
      row("ios", "wireless-dongle", "no", "Receivers need a USB port."),
      row("ios", "aux-3-5mm", "partial", "Recent models have no headphone jack. An adapter is needed."),
      row("android", "usb-a", "partial", "Needs a USB-C OTG adapter."),
      row("android", "usb-c", "yes", "Accessory support depends on the phone."),
      row("android", "bluetooth", "yes", "Widely supported."),
      row("android", "wireless-dongle", "partial", "Needs an OTG adapter."),
      row("android", "aux-3-5mm", "partial", "Many phones no longer have a headphone jack."),
    ],
  },
];
