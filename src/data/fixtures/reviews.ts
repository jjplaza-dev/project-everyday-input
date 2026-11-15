import type { Review } from "@/types";

const r = (
  slug: string, n: number, rating: Review["rating"], title: string, body: string,
  displayName: string, createdAt: string, useContext: string,
): Review => ({ id: `rev-${slug}-${n}`, productId: `prod-${slug}`, rating, title, body, displayName, createdAt, useContext, isSample: true });

/** Invented sample reviews for the prototype. Not from real customers. */
export const reviews: Review[] = [
  r("halden-75-hot-swap-keyboard", 1, 5, "Compact without losing the arrow keys", "The 75% layout fits my desk and I kept the arrow keys. Swapping a switch took about a minute.", "Sam", "2026-09-03", "Office and gaming"),
  r("halden-75-hot-swap-keyboard", 2, 4, "Good typing feel, firm case", "Sound is muted and the board feels solid. Bluetooth pairing took two tries.", "Priya", "2026-09-18", "Remote work"),
  r("halden-75-hot-swap-keyboard", 3, 4, "Wish the cream colour was in stock", "The slate colour looks sharp. Cream was sold out when I ordered.", "Dana", "2026-10-02", "Creative work"),
  r("quillon-lite-wireless-mouse", 1, 5, "Light and comfortable", "Easy to move in short flicks. The battery has lasted a couple of weeks of evening use.", "Marcus", "2026-09-10", "Gaming"),
  r("quillon-lite-wireless-mouse", 2, 4, "Great weight, a little small", "Weight is right, but it is short for my palm. Better for smaller hands.", "Lee", "2026-09-25", "Gaming"),
  r("quillon-lite-wireless-mouse", 3, 3, "Receiver range is limited", "Works well when the receiver is close. Use an extension cable if your PC sits under the desk.", "Ana", "2026-10-08", "Gaming"),
  r("oakline-felt-desk-mat", 1, 5, "Keyboard stops sliding", "Covers my whole desk area and the keyboard stays put.", "Jo", "2026-08-29", "Study"),
  r("oakline-felt-desk-mat", 2, 4, "Soft and quiet", "Dampens typing noise noticeably. The edges could be sturdier.", "Ravi", "2026-09-14", "Remote work"),
  r("oakline-felt-desk-mat", 3, 4, "Sand picks up marks", "Looks good but marks show on the lighter colour. Spot cleaning worked.", "Mei", "2026-10-11", "Creative work"),
  r("brightmoor-usb-studio-microphone", 1, 5, "Clear for calls", "Colleagues said my voice was clearer than the laptop microphone. Plug and play.", "Tom", "2026-09-06", "Remote work"),
  r("brightmoor-usb-studio-microphone", 2, 4, "Picks up keyboard noise", "It is sensitive enough to hear typing. Keep it off the desk surface or use an arm.", "Ines", "2026-09-22", "Streaming"),
  r("brightmoor-usb-studio-microphone", 3, 5, "Headphone monitoring helps", "Hearing myself without delay made recording much easier.", "Kofi", "2026-10-05", "Creative work"),
  r("halden-65w-gan-charger", 1, 5, "Replaced two chargers", "Charges my laptop and phone together and is small enough for a backpack.", "Elena", "2026-09-01", "Travel"),
  r("halden-65w-gan-charger", 2, 4, "Warm under load", "It warms up when charging both devices. Cables are sold separately, so check you have one.", "Ben", "2026-09-19", "Remote work"),
  r("halden-65w-gan-charger", 3, 5, "Steady with a USB-C laptop", "My laptop charged at a steady rate throughout the workday.", "Yuki", "2026-10-09", "Study"),
  r("tessel-wireless-controller", 1, 4, "Comfortable grips", "The textured grips feel good. Pairing on PC took a minute.", "Carlos", "2026-09-08", "PC gaming"),
  r("tessel-wireless-controller", 2, 3, "Not for consoles", "Works well on PC, but I assumed it would work on a console. Read the compatibility notes first.", "Hana", "2026-09-27", "Gaming"),
  r("tessel-wireless-controller", 3, 5, "Battery holds up", "Charges quickly over USB-C and lasted through a weekend of play.", "Omar", "2026-10-12", "Android gaming"),
];
