import type { Metadata } from "next";
import { PolicyPage } from "@/components/shared/ContentPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <PolicyPage slug="privacy" />;
}
