import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GlobalCTA } from "@/components/GlobalCTA";
import { CharterExplorer } from "@/sections/charter/CharterExplorer";

export const metadata: Metadata = {
  title: "Charter — SkyFalcons Aviation Brokerage",
  description:
    "Global on-demand charter — request a quote or book exclusive empty-leg flights, 24/7."
};

export default function CharterPage() {
  return (
    <>
      <PageHero
        eyebrow="Charter"
        title="Private Charter,"
        accent="On Demand"
        subtitle="Request a tailored quote or book exclusive empty-leg flights — anywhere in the world, around the clock."
      />
      <CharterExplorer />
     <GlobalCTA 
  heading="Ready to Book Your Next" 
  subheadingHighlight="Private Flight?" 
  body="Experience seamless 24/7 global charter access tailored to your schedule. Contact our aviation experts to arrange your itinerary today."
  buttonLabel="Request a Charter"
  buttonHref="/contact"
/>
    </>
  );
}
