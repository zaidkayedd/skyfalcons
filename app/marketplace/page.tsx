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
        eyebrow="Marketplace"
        title="Aircraft, Sourced &"
        accent="Vetted"
        subtitle="Browse a curated selection of business jets — each represented, inspected and ready for its next owner."
      />
      <MarketplaceExplorer />
      <GlobalCTA />
    </>
  );
}
