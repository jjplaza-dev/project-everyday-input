/** Flat desk-top illustration: desk mat, keyboard, mouse, laptop on a stand, phone stand. Placeholder art, not photography. */
export function DeskScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label="Illustration of a desk with a laptop on a stand, a mechanical keyboard, a mouse on a desk mat, and a phone stand"
      className={className}
    >
      <defs>
        <pattern id="keys" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" fill="#ffffff" stroke="#DAD6CA" />
        </pattern>
      </defs>
      <rect x="0" y="236" width="480" height="84" fill="#E4DFD2" />
      <rect x="40" y="226" width="400" height="14" rx="4" fill="#C9C3B2" />
      {/* laptop on stand */}
      <path d="M150 226 L170 170 H310 L330 226 Z" fill="#8A949C" />
      <rect x="140" y="52" width="200" height="126" rx="8" fill="#223C4A" />
      <rect x="150" y="62" width="180" height="106" rx="3" fill="#F3F1EB" />
      <rect x="164" y="78" width="70" height="8" rx="2" fill="#223C4A" />
      <rect x="164" y="94" width="120" height="6" rx="2" fill="#8A949C" />
      <rect x="164" y="108" width="96" height="6" rx="2" fill="#8A949C" />
      <rect x="164" y="132" width="40" height="22" rx="4" fill="#D96B3B" />
      {/* desk mat */}
      <rect x="70" y="238" width="340" height="62" rx="8" fill="#223C4A" />
      {/* keyboard */}
      <rect x="100" y="248" width="176" height="42" rx="6" fill="#F3F1EB" />
      <rect x="106" y="254" width="164" height="30" rx="3" fill="url(#keys)" />
      {/* mouse */}
      <rect x="318" y="250" width="32" height="42" rx="14" fill="#F3F1EB" />
      <rect x="333" y="254" width="2" height="12" rx="1" fill="#8A949C" />
      {/* phone stand */}
      <path d="M382 300 L392 262 H410 L418 300 Z" fill="#D96B3B" />
      <rect x="388" y="236" width="22" height="40" rx="4" fill="#161B21" transform="rotate(8 399 256)" />
    </svg>
  );
}
