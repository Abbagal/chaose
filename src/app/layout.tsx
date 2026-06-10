import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Chaos — Defence AI Research & Decision Intelligence",
  description:
    "Chaos builds sovereign AI systems for military, homeland security, intelligence, critical infrastructure, and strategic operations. Flagship platform: SANJAY.",
  keywords:
    "defence AI, decision intelligence, military AI, SANJAY platform, sovereign AI, sensor fusion, battlefield intelligence",
  openGraph: {
    title: "Chaos — Defence AI Research",
    description: "Sovereign AI systems for national security operations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full bg-[#05070A] text-white antialiased overflow-x-hidden">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
