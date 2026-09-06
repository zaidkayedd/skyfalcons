import Link from "next/link";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { partners } from "@/data/network";

/**
 * OUR GLOBAL NETWORK — redesigned logo presentation.
 * Uniform logo containers, balanced grid, subtle grayscale→color hover.
 * Logos are not oversized. Drop real SVGs at /public/logos/* (see data/network).
 */
export function GlobalNetwork() {
  return (
    <section className="border-y border-mist bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          title={
            <>
              Our Global <span className="text-gold">Network</span>
            </>
          }
          align="center"
        />
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate">
          Access to operators, brokers and service providers across every major
          market — the backbone of our 24/7 charter and acquisition capability.
        </p>

        {/* High-end frosted glass container with a smooth gold stroke */}
        <div className="mt-8 relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-b from-white/80 via-white/40 to-white/20 p-6 shadow-[0_20px_50px_rgba(212,175,55,0.06),inset_0_1px_2px_rgba(255,255,255,1),inset_0_0_20px_rgba(255,255,255,0.5)] backdrop-blur-2xl sm:p-8">
          
          {/* Subtle decorative inner glossy highlight sheen with a warm gold touch */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-90" />

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-2 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-3">
            {partners.map((p, i) => {
              const isLastPartner = i === partners.length - 1;
              const totalPartners = partners.length;
              // Check if this item is among the last 4 logos
              const isAmongLastFour = i >= totalPartners - 4;

              const logoContent = (
                <Reveal
                  key={p.id}
                  delay={i * 60}
                  className={`flex items-center justify-center transition-all duration-300 ${
                    isLastPartner ? "h-12 mt-2" : "h-16 sm:h-20"
                  } ${isAmongLastFour ? "lg:translate-x-[190px]" : ""}`}
                >
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className={`w-full max-w-[100%] object-contain opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 ${
                        isLastPartner ? "h-7" : "h-10 sm:h-12"
                      }`}
                    />
                  ) : (
                    <span className="font-display text-base text-slate transition-colors duration-300 hover:text-ink">
                      {p.name}
                    </span>
                  )}
                </Reveal>
              );

              return isLastPartner ? (
                <Link href="/contact" key={p.id}>
                  {logoContent}
                </Link>
              ) : (
                logoContent
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}