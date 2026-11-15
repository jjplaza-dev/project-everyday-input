import {
  Gamepad2,
  Headphones,
  Keyboard,
  Laptop,
  Mouse,
  RectangleHorizontal,
  Smartphone,
  Usb,
  type LucideProps,
} from "lucide-react";
import type { CategoryIconKey } from "@/types";

const icons: Record<CategoryIconKey, React.ComponentType<LucideProps>> = {
  keyboard: Keyboard,
  mouse: Mouse,
  "desk-mat": RectangleHorizontal,
  headset: Headphones,
  laptop: Laptop,
  usb: Usb,
  smartphone: Smartphone,
  gamepad: Gamepad2,
};

export function CategoryIcon({ iconKey, ...props }: { iconKey: CategoryIconKey } & LucideProps) {
  const Icon = icons[iconKey];
  return <Icon strokeWidth={1.5} size={28} aria-hidden="true" {...props} />;
}
