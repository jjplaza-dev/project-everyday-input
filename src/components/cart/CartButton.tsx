"use client";

import gsap from "gsap";
import { ShoppingBag } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { MOTION_OK } from "@/lib/motion";

export function CartButton() {
  const { count, ready, setDrawerOpen } = useCart();
  const badge = useRef<HTMLSpanElement>(null);
  const previous = useRef(0);

  useEffect(() => {
    if (ready && count > previous.current && badge.current) {
      const el = badge.current;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => { gsap.fromTo(el, { scale: 1.4 }, { scale: 1, duration: 0.25, ease: "power2.out" }); });
      previous.current = count;
      return () => mm.revert();
    }
    previous.current = count;
  }, [count, ready]);

  return (
    <button
      type="button"
      onClick={() => setDrawerOpen(true)}
      aria-haspopup="dialog"
      className="relative inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-primary hover:bg-secondary"
    >
      <ShoppingBag className="size-5" strokeWidth={1.5} aria-hidden="true" />
      <span>Cart</span>
      {ready && count > 0 && (
        <span ref={badge} className="inline-flex min-w-5 items-center justify-center rounded-md bg-signal px-1 text-xs font-bold text-on-signal">
          {count}<span className="sr-only"> items in cart</span>
        </span>
      )}
    </button>
  );
}
