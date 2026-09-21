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
  
        <WhoWeAre />
        <TurnKeySolution />
        <HistoricalTransactions />
   
        <GlobalCTA />
      </main>
    </>
  );
}
