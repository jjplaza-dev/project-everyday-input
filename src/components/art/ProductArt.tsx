import type { CategoryIconKey } from "@/types";

const NAVY = "#223C4A";
const CREAM = "#F3F1EB";
const GREY = "#8A949C";
const ORANGE = "#D96B3B";

const shapes: Record<CategoryIconKey, React.ReactNode> = {
  keyboard: (<><rect x="14" y="54" width="132" height="52" rx="8" fill={NAVY} /><rect x="22" y="62" width="116" height="36" rx="4" fill={CREAM} /><rect x="30" y="70" width="100" height="6" rx="2" fill={GREY} /><rect x="30" y="82" width="100" height="6" rx="2" fill={GREY} /><rect x="56" y="92" width="48" height="4" rx="2" fill={ORANGE} /></>),
  mouse: (<><rect x="52" y="30" width="56" height="100" rx="28" fill={NAVY} /><rect x="78" y="40" width="4" height="26" rx="2" fill={CREAM} /><rect x="52" y="74" width="56" height="3" fill={CREAM} opacity=".5" /></>),
  "desk-mat": (<><rect x="14" y="46" width="132" height="68" rx="8" fill={NAVY} /><rect x="22" y="54" width="116" height="52" rx="4" fill="none" stroke={CREAM} strokeOpacity=".4" /><rect x="118" y="96" width="16" height="6" rx="2" fill={ORANGE} /></>),
  headset: (<><path d="M36 92 V76 a44 44 0 0 1 88 0 V92" fill="none" stroke={NAVY} strokeWidth="8" /><rect x="26" y="82" width="22" height="38" rx="8" fill={NAVY} /><rect x="112" y="82" width="22" height="38" rx="8" fill={NAVY} /><path d="M48 112 q8 14 28 14" fill="none" stroke={ORANGE} strokeWidth="4" /></>),
  laptop: (<><rect x="32" y="30" width="96" height="64" rx="6" fill={NAVY} /><rect x="38" y="36" width="84" height="52" rx="2" fill={CREAM} /><path d="M18 118 L44 94 H116 L142 118 Z" fill={GREY} /><rect x="64" y="46" width="32" height="8" rx="2" fill={ORANGE} /></>),
  usb: (<><rect x="30" y="62" width="100" height="36" rx="8" fill={NAVY} /><rect x="40" y="72" width="16" height="10" rx="2" fill={CREAM} /><rect x="64" y="72" width="16" height="10" rx="2" fill={CREAM} /><rect x="88" y="72" width="16" height="10" rx="2" fill={ORANGE} /><rect x="10" y="74" width="20" height="12" fill={GREY} /></>),
  smartphone: (<><rect x="50" y="22" width="60" height="100" rx="10" fill={NAVY} /><rect x="56" y="32" width="48" height="76" rx="3" fill={CREAM} /><rect x="64" y="42" width="32" height="8" rx="2" fill={ORANGE} /></>),
  gamepad: (<><path d="M30 100 q-8-34 16-48 h68 q24 14 16 48 q-4 14-18 6 l-10-12 H58 l-10 12 q-14 8-18-6z" fill={NAVY} /><circle cx="56" cy="76" r="8" fill={CREAM} /><circle cx="104" cy="76" r="8" fill={CREAM} /><circle cx="118" cy="64" r="4" fill={ORANGE} /></>),
};

export function ProductArt({ iconKey, className }: { iconKey: CategoryIconKey; className?: string }) {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" className={className}>
      {shapes[iconKey]}
    </svg>
  );
}
