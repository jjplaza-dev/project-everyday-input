"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { MOTION_OK } from "@/lib/motion";

/** Fades the hero's two columns and the first column's children in with a short stagger. Content is visible by default. */
export function HeroEntrance({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const targets = root.querySelectorAll(":scope > div:first-child > *, :scope > div:last-child");
      gsap.from(targets, { opacity: 0, y: 16, duration: 0.4, stagger: 0.08, ease: "power2.out", clearProps: "opacity,transform" });
    });
    return () => mm.revert();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
