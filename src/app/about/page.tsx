import type { Metadata } from "next";
import { PolicyPage } from "@/components/shared/ContentPage";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <PolicyPage slug="about" />;
}
