import { Container } from "./Container";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { GlobeCanvas } from "./GlobeCanvas";
import { ArrowRight } from "lucide-react";
import { cta } from "@/data/site";
import { splitDisplayText } from "@/lib/utils";

/**
 * GLOBAL CTA — the exact same component on Home, Marketplace, Charter, Contact.
 * Only the text can differ per page (via props); width, spacing, buttons,
 * background and layout are locked so it reads identically everywhere.
 */
export function GlobalCTA({
  heading = cta.heading,
  body = cta.body
}: {
  heading?: string;
  body?: string;
  image?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[26px] border border-ink/10 bg-[#F8F8F6] shadow-[0_12px_36px_rgba(0,0,0,0.07)]">
          {/* Animated dotted Earth, cropped to the right. */}
          <div className="absolute inset-0 -z-10">
            <GlobeCanvas className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F8F6] via-[#F8F8F6]/95 to-transparent" />
          </div>

          <div className="flex min-h-[340px] items-center px-8 py-12 sm:px-16 lg:py-10">
            <div className="max-w-[540px]">
              <h2 className="display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[30px]">
                {splitDisplayText(heading)}
              </h2>
              <p className="mt-5 max-w-[520px] font-sans text-base leading-7 text-graphite/75 lg:text-[18px] lg:leading-7">
                {body}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href={cta.primary.href}
                  variant="gold"
                  className="w-full rounded-pill py-2.5 text-white shadow-[0_4px_12px_rgba(190,152,90,0.18)] hover:-translate-y-0.5 hover:bg-gold-deep hover:shadow-[0_7px_16px_rgba(190,152,90,0.24)] sm:w-[275px]"
                >
                  {cta.primary.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  href={cta.secondary.href}
                  variant="outline"
                  className="w-full rounded-pill border-ink/20 bg-white/25 hover:bg-transparent hover:text-black py-2.5 text-ink hover:border-ink/35 sm:w-auto"
                >
                  {cta.secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
