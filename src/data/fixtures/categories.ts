import type { Category, FacetDefinition } from "@/types";

const connection: FacetDefinition = {
  id: "connection",
  label: "Connection",
  type: "checkbox",
  field: "compatibility.connections",
  options: [
    { value: "usb-c", label: "USB-C" },
    { value: "usb-a", label: "USB-A" },
    { value: "bluetooth", label: "Bluetooth" },
    { value: "wireless-dongle", label: "Wireless dongle" },
  ],
};

export const categories: Category[] = [
  {
    id: "cat-keyboards",
    slug: "keyboards-keycaps",
    name: "Mechanical keyboards and keycaps",
    description: "Hot-swap boards, tactile and linear switches, and keycap sets for work and play.",
    iconKey: "keyboard",
    buyingGuide: "Layout size and switch feel matter most: pick the smallest layout you will still use every day.",
    filterSchema: [
      connection,
      { id: "layout", label: "Layout", type: "checkbox", field: "attributes.layout", options: [{ value: "60", label: "60%" }, { value: "75", label: "75%" }, { value: "tkl", label: "Tenkeyless" }, { value: "full", label: "Full size" }] },
      { id: "switch", label: "Switch type", type: "checkbox", field: "attributes.switch", options: [{ value: "linear", label: "Linear" }, { value: "tactile", label: "Tactile" }, { value: "clicky", label: "Clicky" }] },
    ],
  },
  {
    id: "cat-mice",
    slug: "mice",
    name: "Gaming and productivity mice",
    description: "Lightweight sensors for aiming, and ergonomic shapes for long workdays.",
    iconKey: "mouse",
    buyingGuide: "Match the shape to your grip first, then look at weight and battery life.",
    filterSchema: [
      connection,
      { id: "grip", label: "Grip style", type: "checkbox", field: "attributes.grip", options: [{ value: "palm", label: "Palm" }, { value: "claw", label: "Claw" }, { value: "fingertip", label: "Fingertip" }] },
    ],
  },
  {
    id: "cat-mousepads",
    slug: "mousepads-desk-mats",
    name: "Mousepads and desk mats",
    description: "Cloth and hard surfaces, from compact pads to full-desk mats.",
    iconKey: "desk-mat",
    buyingGuide: "Measure your desk before choosing: the mat should hold both keyboard and mouse.",
    filterSchema: [
      { id: "size", label: "Size", type: "checkbox", field: "attributes.size", options: [{ value: "small", label: "Small" }, { value: "large", label: "Large" }, { value: "desk", label: "Full desk" }] },
      { id: "surface", label: "Surface", type: "checkbox", field: "attributes.surface", options: [{ value: "cloth", label: "Cloth" }, { value: "hard", label: "Hard" }] },
    ],
  },
  {
    id: "cat-audio",
    slug: "audio",
    name: "Headsets, earphones and microphones",
    description: "Headsets for calls and games, wired earphones, and USB microphones.",
    iconKey: "headset",
    buyingGuide: "Check the connector and the microphone type before sound quality; both decide where it works.",
    filterSchema: [
      connection,
      { id: "mic", label: "Microphone", type: "toggle", field: "attributes.hasMic" },
    ],
  },
  {
    id: "cat-stands",
    slug: "laptop-stands-monitor-accessories",
    name: "Laptop stands and monitor accessories",
    description: "Stands, risers and arms that bring the screen up to eye level.",
    iconKey: "laptop",
    buyingGuide: "Check the supported screen size and weight against the stand's stated limits.",
    filterSchema: [
      { id: "adjustable", label: "Height adjustable", type: "toggle", field: "attributes.adjustable" },
    ],
  },
  {
    id: "cat-usb",
    slug: "usb-hubs-cables",
    name: "USB hubs, cables and connectivity",
    description: "Hubs and cables for adding ports and connecting displays.",
    iconKey: "usb",
    buyingGuide: "Count the ports you need now and add two; check that your device's port supports video output.",
    filterSchema: [connection],
  },
  {
    id: "cat-phone",
    slug: "phone-accessories",
    name: "Phone stands, chargers and mobile accessories",
    description: "Desk stands, wall chargers and wireless charging for everyday use.",
    iconKey: "smartphone",
    buyingGuide: "Match the charger's output to your phone's fast-charging standard.",
    filterSchema: [
      { id: "wireless", label: "Wireless charging", type: "toggle", field: "attributes.wireless" },
    ],
  },
  {
    id: "cat-controllers",
    slug: "controllers-gaming-accessories",
    name: "Controllers and gaming accessories",
    description: "Controllers, grips and charging docks for console and PC.",
    iconKey: "gamepad",
    buyingGuide: "Confirm the platform first: not every controller works on every console.",
    filterSchema: [connection],
  },
];
