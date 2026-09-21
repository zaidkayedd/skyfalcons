import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { brand } from "@/data/site";


const blacker = localFont({
  src: [
    { path: "./fonts/Blacker-Sans-Text-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Blacker-Sans-Text-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Blacker-Sans-Text-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Blacker-Sans-Text-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Blacker-Sans-Text-Heavy.woff2", weight: "800", style: "normal" }
  ],
  variable: "--font-blacker",
  display: "swap",
  fallback: ["Georgia", "serif"]
});

export const metadata: Metadata = {
  title: `${brand.fullName} — Premium Aircraft Sales & Charter`,
  description: brand.description,
  keywords: [
    "aircraft sales",
    "private jet charter",
    "aviation brokerage",
    "aircraft acquisition",
    "luxury aviation"
  ],
  openGraph: {
    title: `${brand.fullName} — Premium Aircraft Sales & Charter`,
    description: brand.tagline,
    type: "website"
  },
  twitter: { card: "summary_large_image", site: brand.twitter }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={blacker.variable}>
      <head />
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
