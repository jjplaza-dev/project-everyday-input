import type { Guide } from "@/types";

const ids = (...slugs: string[]) => slugs.map((s) => `prod-${s}`);

export const guides: Guide[] = [
  {
    id: "guide-gaming", slug: "gaming-setup", audience: "gaming",
    title: "Build a gaming setup",
    summary: "Choose input devices that fit your hands and your desk, then check that everything connects to your PC or console.",
    relatedProductIds: ids("halden-75-hot-swap-keyboard", "quillon-lite-wireless-mouse", "verrin-cloth-mousepad-large", "tessel-usb-headset", "tessel-wireless-controller"),
    relatedGuideIds: ["guide-creator-keyboard", "guide-remote"],
    steps: [
      { id: "inputs", heading: "Pick a keyboard and mouse that fit your desk", body: "A compact keyboard leaves more room for mouse movement. Choose a mouse shape that matches how you grip it: palm, claw or fingertip.", diagramKey: "desk-scene" },
      { id: "surface", heading: "Give the mouse room to move", body: "A pad that covers your full mouse sweep keeps movement consistent. Measure the space between your keyboard and the desk edge first.", calloutVariant: "tip" },
      { id: "connections", heading: "Check the connections", body: "Wireless receivers can sit in a hard-to-reach port. A short USB extension cable moves the receiver closer to the mouse.", calloutVariant: "check" },
      { id: "audio", heading: "Add audio and a controller if you need them", body: "A headset with a boom microphone covers voice chat. Check which platforms a controller supports before buying.", calloutVariant: "note" },
    ],
  },
  {
    id: "guide-remote", slug: "remote-work-setup", audience: "remote-work",
    title: "Set up a comfortable remote work desk",
    summary: "Raise the screen, choose quiet and comfortable input devices, and add the ports a laptop is missing.",
    relatedProductIds: ids("oakline-aluminium-laptop-stand", "tessel-tkl-tactile-keyboard", "brightmoor-vertical-ergo-mouse", "tessel-7-in-1-usb-c-hub", "tessel-usb-headset"),
    relatedGuideIds: ["guide-study", "guide-gaming"],
    steps: [
      { id: "screen", heading: "Raise the screen to eye level", body: "Looking slightly down at the screen's top edge is easier on the neck. A laptop stand lifts the screen, so use a separate keyboard and mouse with it.", diagramKey: "eye-level" },
      { id: "inputs", heading: "Choose comfortable input devices", body: "A tenkeyless keyboard keeps the mouse closer to your body. A vertical mouse keeps the wrist in a handshake position.", calloutVariant: "tip" },
      { id: "ports", heading: "Add the ports you are missing", body: "A USB-C hub adds HDMI, USB-A and card slots. Check that your laptop's USB-C port supports video output before relying on HDMI.", calloutVariant: "check" },
      { id: "calls", heading: "Sort out calls", body: "A headset with a boom microphone keeps your voice clear without extra setup.", calloutVariant: "note" },
    ],
  },
  {
    id: "guide-study", slug: "study-desk-setup", audience: "study",
    title: "Set up a study desk",
    summary: "Keep the desk quiet, tidy and charged, with gear that works with a laptop or a phone.",
    relatedProductIds: ids("oakline-silent-office-mouse", "oakline-felt-desk-mat", "quillon-wired-earphones", "halden-bamboo-monitor-riser", "verrin-wireless-charging-pad"),
    relatedGuideIds: ["guide-remote"],
    steps: [
      { id: "quiet", heading: "Choose quiet gear", body: "Quiet-click mice and a felt desk mat reduce noise in shared rooms or late at night." },
      { id: "layout", heading: "Make a clear work area", body: "A riser lifts the screen and leaves space underneath for a keyboard or notebook.", diagramKey: "desk-scene", calloutVariant: "tip" },
      { id: "charging", heading: "Keep devices charged", body: "A wireless charging pad keeps a phone within reach. Check that your phone supports Qi charging first.", calloutVariant: "check" },
    ],
  },
  {
    id: "guide-creator-keyboard", slug: "creator-and-keyboard-setup", audience: "creative",
    title: "Set up a creator and keyboard desk",
    summary: "Add a microphone and monitor arm for recording and editing, and customise your keyboard to your taste.",
    relatedProductIds: ids("brightmoor-usb-studio-microphone", "verrin-dual-monitor-arm", "halden-75-hot-swap-keyboard", "verrin-pbt-keycap-set", "oakline-felt-desk-mat"),
    relatedGuideIds: ["guide-gaming"],
    steps: [
      { id: "mic", heading: "Place the microphone close to your voice", body: "A USB microphone close to your mouth picks up less room noise. Keep it off the desk surface to avoid picking up keyboard sounds.", calloutVariant: "tip" },
      { id: "arm", heading: "Free up desk space with a monitor arm", body: "An arm holds monitors off the desk. Check that your monitors have VESA mounting holes.", calloutVariant: "check" },
      { id: "keyboard", heading: "Customise the keyboard", body: "A hot-swap board lets you change switches without soldering, and a keycap set changes the look and sound. Confirm that keycaps match your switch type.", diagramKey: "desk-scene" },
    ],
  },
];
