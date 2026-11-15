import type { Metadata } from "next";
import { PolicyPage } from "@/components/shared/ContentPage";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return <PolicyPage slug="terms" />;
}
