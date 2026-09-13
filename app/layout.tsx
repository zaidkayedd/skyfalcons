import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { brand } from "@/data/site";

/**
 * SKYFALCONS TYPOGRAPHY — real Blacker Sans Text, bundled via next/font/local
 * (hashed, preloaded, no 404s). Exposed as the CSS variable --font-blacker,
 * which app/globals.css maps onto --font-display / --font-sans / --font-mono.
 * (Klarna Text was not supplied; body uses Blacker Sans Text until it is.)
 */
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
  icons: {
    icon: [
      {
        url: "/Icon.ico",

      }
    ]
  },
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