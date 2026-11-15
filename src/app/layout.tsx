import type { Metadata } from "next";
import { Barlow_Semi_Condensed, DM_Sans } from "next/font/google";
import { AnnouncementBar, Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Everyday Input", template: "%s | Everyday Input" },
  description: "Computer and phone accessories for gaming, remote work, study and creative setups. Prototype storefront with sample data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
