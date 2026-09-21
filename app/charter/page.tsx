import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GlobalCTA } from "@/components/GlobalCTA";
import { CharterExplorer } from "@/sections/charter/CharterExplorer";
import { CompanyTimeline } from "@/sections/charter/CompanyTimeline";
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
      <CompanyTimeline/>
      <GlobalCTA
        heading="Stay Updated on "
        subheadingHighlight="Empty Leg Flights"
        body="Subscribe to empty leg notifications and save on luxury private jet flights. Set your preferred routes and get alerts when opportunities match your travel plans."
        buttonLabel="Subscribe to Empty Leg Alerts"
        modalVariant="emptyleg"
      />
    </>
  );
}
