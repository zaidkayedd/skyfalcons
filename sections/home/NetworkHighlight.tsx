import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { partners } from "@/data/network";
import { ArrowRight } from "lucide-react";
import { AnimatedNetworkGrid } from "@/components/AnimatedNetworkGrid";

/**
 * NETWORK HIGHLIGHT (home, before the CTA) — headline, inline stats, 
 * separate clean sections with the map placed first, followed by partners.
 */
const stats = [
  { value: `${partners.length}+`, label: "Global partners" },
  { value: "6", label: "Continents" },
  { value: "24/7", label: "Charter desk" }
];

export function NetworkHighlight() {
  const rowOnePartners = partners.slice(0, 6);
  const rowTwoPartners = partners.slice(6, 12);

  return (
    <section className="border-t border-mist bg-white py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            align="center"
            title={
              <>
                A World‑Class <span className="text-gold">Network</span>
              </>
            }
            subtitle="A comprehensive global reach and trusted partnerships across every major market."
          />
        </div>

        {/* inline stats — thin dividers, no boxes */}
        <div className="mx-auto mt-10 flex max-w-3xl items-stretch justify-center divide-x divide-mist text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex-1 px-4">
              <div className="display text-4xl text-ink sm:text-5xl">{s.value}</div>
              <div className="mt-1.5 font-sans text-xs uppercase tracking-wide text-slate">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Section 1: Explore Our Global Hubs (Now First) */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h3 className="font-display text-2xl text-ink">Explore Our Global Hubs</h3>
              <p className="mt-1 text-sm text-slate">Active operational regions and international coverage map.</p>
            </div>
            <Button href="/network/map" variant="outline">
              View Interactive Map
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          {/* Embedded Animated Map Component without outer container box */}
          <div className="w-full overflow-hidden py-4">
            <AnimatedNetworkGrid />
          </div>
        </div>

        {/* Section 2: Meet Our Partners (Now Second, with two rows) */}
        <div className="mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h3 className="font-display text-2xl text-ink">Meet Our Partners</h3>
              <p className="mt-1 text-sm text-slate">Operators, manufacturers, brokers, and service providers.</p>
            </div>
        
          </div>

          <div className="overflow-hidden rounded-[2rem] border bg-gradient-to-b from-white/80 via-white/40 to-white/20 p-6 shadow-[0_20px_50px_rgba(212,175,55,0.06),inset_0_1px_2px_rgba(255,255,255,1),inset_0_0_20px_rgba(255,255,255,0.5)] backdrop-blur-2xl sm:p-8">
            <div className="grid grid-cols-2 items-center gap-x-3 gap-y-1 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-2 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-3">
              {rowOnePartners.map((p, i) => (
                <div key={`${p.id}-${i}`} className="flex h-16 items-center justify-center sm:h-20">
                  {p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.logo}
                      alt={p.name}
                      loading="lazy"
                      className="h-10 max-w-full object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12"
                    />
                  ) : (
                    <span className="text-center font-display text-base text-slate">{p.name}</span>
                  )}
                </div>
              ))}

              {rowTwoPartners.map((p, i) => (
                <div key={`${p.id}-faded-${i}`} className="flex h-16 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-90 sm:h-20">
                  {p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.logo}
                      alt={p.name}
                      loading="lazy"
                      className="h-10 max-w-full object-contain opacity-40 grayscale transition-opacity duration-300 hover:opacity-80 sm:h-12"
                    />
                  ) : (
                    <span className="text-center font-display text-sm text-slate/70">{p.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global CTA button */}
        <div className="mt-5 flex justify-center">
          <Button href="/contact" variant="primary">
            Partner With Us
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}