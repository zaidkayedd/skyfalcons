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
        line1="GLOBAL CHARTER"
        image="/hero.jpg"
      />
      <CharterExplorer />
      <GlobalCTA
        heading="Need to fly soon?"
        body="Our charter desk is available around the clock. Send your route and dates for an immediate quote."
      />
    </>
  );
}
