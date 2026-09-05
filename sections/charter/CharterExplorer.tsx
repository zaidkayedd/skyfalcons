import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CharterQuote } from "@/components/CharterQuote";
import { EmptyLegFlights } from "@/components/EmptyLegFlights";

/**
 * CHARTER — split into two clearly separated sections:
 *  1. Request a Quote (on the page background)
 *  2. Empty Leg Flights (on a distinct porcelain band)
 */
export function CharterExplorer() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container className="max-w-5xl">
          <SectionHeading
            align="center"
            title={
              <>
                Request a <span className="text-gold">Charter</span>
              </>
            }
            subtitle="Tell us your route and dates — our charter desk responds around the clock with a tailored quote."
          />
          <div className="mt-12">
            <CharterQuote />
          </div>
        </Container>
      </section>

      <section className="border-t border-mist bg-porcelain py-16 sm:py-24">
        <Container className="max-w-6xl">
          <SectionHeading
            align="center"
            title={
              <>
                Empty Leg <span className="text-gold">Flights</span>
              </>
            }
            subtitle="Save up to 75% on repositioning flights — luxury travel at a fraction of the cost."
          />
          <div className="mt-12">
            <EmptyLegFlights hideHeading />
          </div>
        </Container>
      </section>
    </>
  );
}
