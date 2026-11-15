import type { Collection } from "@/types";

const ids = (...slugs: string[]) => slugs.map((s) => `prod-${s}`);

export const collections: Collection[] = [
  {
    id: "col-gaming-station", slug: "gaming-station", title: "Gaming station", intent: "gaming", isSample: true,
    description: "A keyboard, mouse, pad, headset and controller for a PC gaming desk.",
    productIds: ids("halden-75-hot-swap-keyboard", "quillon-lite-wireless-mouse", "verrin-cloth-mousepad-large", "tessel-usb-headset", "tessel-wireless-controller", "brightmoor-usb-a-extension-cable"),
  },
  {
    id: "col-remote-work", slug: "remote-work", title: "Remote work desk", intent: "remote-work", isSample: true,
    description: "Comfortable, quiet gear for a laptop-based workday, from stand to charger.",
    productIds: ids("tessel-tkl-tactile-keyboard", "brightmoor-vertical-ergo-mouse", "oakline-aluminium-laptop-stand", "tessel-7-in-1-usb-c-hub", "tessel-usb-headset", "halden-65w-gan-charger"),
  },
  {
    id: "col-study-desk", slug: "study-desk", title: "Study desk", intent: "study", isSample: true,
    description: "Quiet, compact items for homework and late-night study sessions.",
    productIds: ids("oakline-silent-office-mouse", "oakline-felt-desk-mat", "quillon-wired-earphones", "halden-bamboo-monitor-riser", "oakline-adjustable-phone-stand", "verrin-wireless-charging-pad"),
  },
  {
    id: "col-creator-desk", slug: "creator-desk", title: "Creator desk", intent: "creative", isSample: true,
    description: "A microphone, monitor arm and connectivity for recording, editing and streaming.",
    productIds: ids("brightmoor-usb-studio-microphone", "verrin-dual-monitor-arm", "oakline-felt-desk-mat", "tessel-7-in-1-usb-c-hub", "halden-75-hot-swap-keyboard"),
  },
  {
    id: "col-keyboard-enthusiast", slug: "keyboard-enthusiast", title: "Keyboard enthusiast", intent: "enthusiast", isSample: true,
    description: "Hot-swap boards, keycaps and a desk mat for people who tinker with their typing setup.",
    productIds: ids("halden-75-hot-swap-keyboard", "tessel-tkl-tactile-keyboard", "verrin-pbt-keycap-set", "oakline-felt-desk-mat"),
  },
  {
    id: "col-mobile-essentials", slug: "mobile-essentials", title: "Mobile essentials", intent: "mobile", isSample: true,
    description: "Charging, stands and cables for phones and small tablets.",
    productIds: ids("halden-65w-gan-charger", "verrin-wireless-charging-pad", "oakline-adjustable-phone-stand", "quillon-usb-c-to-hdmi-cable", "quillon-wired-earphones"),
  },
];
