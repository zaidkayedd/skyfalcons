import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GlobalCTA } from "@/components/GlobalCTA";
import { MarketplaceExplorer } from "@/sections/marketplace/MarketplaceExplorer";

export const metadata: Metadata = {
  title: "Marketplace — SkyFalcons Aviation Brokerage",
  description:
    "Browse aircraft for sale — sourced, vetted and represented by SkyFalcons."
};

export default function MarketplacePage() {
  return (
    <>
      <PageHero
        line1="GLOBAL MARKETPLACE"
        image="/hero.jpg"
      />
      <MarketplaceExplorer />
      <GlobalCTA
        heading="Looking for something specific?"
        body="Tell us your mission and budget — our acquisition team will source the right aircraft, on or off market."
      />
    </>
  );
}
