import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GlobalCTA } from "@/components/GlobalCTA";
import { GlobalNetwork } from "@/components/GlobalNetwork";
import { ContactSection } from "@/sections/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact — SkyFalcons Aviation Brokerage",
  description:
    "Speak with SkyFalcons about acquisition, sale or charter — anywhere in the world, at any hour."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Talk"
        accent="Aviation"
        accentBlock
        subtitle="Speak with a Sky Falcons broker about acquisition, sale or your next charter — we respond within 24 hours."
      />
      <ContactSection />
      <GlobalNetwork />
      <GlobalCTA />
    </>
  );
}
