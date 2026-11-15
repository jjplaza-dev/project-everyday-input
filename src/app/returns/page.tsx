import type { Metadata } from "next";
import { PolicyPage } from "@/components/shared/ContentPage";

export const metadata: Metadata = { title: "Returns and refunds" };

export default function ReturnsPage() {
  return <PolicyPage slug="returns" />;
}
