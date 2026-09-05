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

        <div className="mt-8 grid grid-cols-2 gap-x-2 gap-y-0.5 sm:grid-cols-3 sm:gap-x-3 sm:gap-y-1 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-1">
          {partners.map((p, i) => {
            const isLastPartner = i === partners.length - 1;
            const logoContent = (
              <Reveal
                key={p.id}
                delay={i * 60}
                className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                  isLastPartner ? "h-12 mt-4" : "h-20"
                }`}
              >
                {p.logo ? (
              
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className={`w-full max-w-[100%] object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 ${
                      isLastPartner ? "h-8" : "h-14"
                    }`}
                  />
                ) : (
                  <span className="font-display text-lg text-slate transition-colors duration-300 hover:text-ink">
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
      </Container>
    </section>
  );
}
