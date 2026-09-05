import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AircraftCard } from "@/components/AircraftCard";
import { Button } from "@/components/Button";
import { aircraft } from "@/data/aircraft";
import { ArrowRight } from "lucide-react";

/**
 * HISTORICAL TRANSACTIONS — three cards held inside a bordered container panel.
 */
export function HistoricalTransactions() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          title={
            <>
              Historical <span className="text-gold">Transactions</span>
            </>
          }
          align="center"
        />
        <div className="mt-12 rounded-[26px] border border-mist bg-white/70 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.05)] sm:p-10">
          <div className="grid gap-6 md:grid-cols-3">
            {aircraft.slice(0, 3).map((item, index) => (
              <Reveal key={item.id} delay={index * 120} className="h-full">
                <AircraftCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/marketplace">
            Explore Marketplace
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}
