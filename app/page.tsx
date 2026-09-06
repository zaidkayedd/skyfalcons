import { HomeHero } from "@/components/HomeHero";
import { GlobalCTA } from "@/components/GlobalCTA";
import { Pillars } from "@/sections/home/Pillars";
import { WhoWeAre } from "@/sections/home/WhoWeAre";
import { TurnKeySolution } from "@/sections/home/TurnKeySolution";
import { HistoricalTransactions } from "@/sections/home/HistoricalTransactions";
import { NetworkHighlight } from "@/sections/home/NetworkHighlight";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <main className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/goldIcon.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-[20%] z-10 w-[min(72vw,56rem)] -translate-y-1/2 opacity-[0.1]"
        />
        <WhoWeAre />
        <TurnKeySolution />
        <HistoricalTransactions />
        <NetworkHighlight />
        <GlobalCTA />
      </main>
    </>
  );
}
