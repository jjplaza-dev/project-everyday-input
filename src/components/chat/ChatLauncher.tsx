import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getSupportChannels } from "@/data/selectors/content";

/** Static preview. Real chat (Crisp) and a Messenger link are connected in a later phase. */
export function ChatLauncher() {
  return (
    <details className="group fixed bottom-4 right-4 z-30">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-float [&::-webkit-details-marker]:hidden">
        <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden="true" />
        Chat
      </summary>
      <div className="absolute bottom-14 right-0 w-72 rounded-xl border bg-white p-4 shadow-float">
        <h2 className="font-semibold text-primary">Chat with the store</h2>
        <p className="mt-1 text-sm text-muted-foreground">Chat is a preview in this prototype and is not connected yet.</p>
        <ul className="mt-3 space-y-2 text-sm">
          {getSupportChannels().map((c) => (
            <li key={c.id} className="rounded-lg bg-secondary px-3 py-2">
              <span className="font-medium text-primary">{c.label}</span>
              <span className="block text-muted-foreground">{c.availabilityNote}</span>
            </li>
          ))}
        </ul>
        <Link href="/faq" className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">Read the FAQ instead</Link>
      </div>
    </details>
  );
}
