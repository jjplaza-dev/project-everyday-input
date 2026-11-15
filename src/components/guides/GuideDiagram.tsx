import { DeskScene } from "@/components/art/DeskScene";

function EyeLevel() {
  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="Diagram: the top edge of the screen sits at or just below eye level, with the laptop raised on a stand" className="h-auto w-full">
      <rect x="0" y="170" width="360" height="30" fill="#E4DFD2" />
      <circle cx="60" cy="70" r="20" fill="#223C4A" />
      <rect x="44" y="92" width="32" height="78" rx="10" fill="#223C4A" />
      <line x1="80" y1="68" x2="300" y2="68" stroke="#D96B3B" strokeWidth="2" strokeDasharray="6 5" />
      <rect x="230" y="70" width="70" height="52" rx="4" fill="#223C4A" />
      <rect x="236" y="76" width="58" height="40" rx="2" fill="#F3F1EB" />
      <path d="M236 170 L252 124 H282 L298 170 Z" fill="#8A949C" />
      <text x="150" y="58" fontSize="12" fill="#223C4A">Eye level</text>
    </svg>
  );
}

const diagrams: Record<string, () => React.ReactNode> = {
  "desk-scene": () => <DeskScene className="h-auto w-full" />,
  "eye-level": () => <EyeLevel />,
};

export function GuideDiagram({ diagramKey }: { diagramKey: string }) {
  const render = diagrams[diagramKey];
  if (!render) return null;
  return <div className="mt-4 max-w-md rounded-xl border bg-secondary p-4">{render()}</div>;
}
