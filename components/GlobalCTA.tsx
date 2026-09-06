import { Container } from "./Container";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Globe } from "./ui/globe";
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
          {/* Interactive 3D globe (cobe) — fixed-size container so it always renders. */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-[26px]">
            <div className="absolute right-[-6%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 sm:right-[-9%] sm:h-[660px] sm:w-[660px]">
              <Globe className="!max-w-none" />
            </div>
            {/* left fade for text legibility (doesn't hide the globe) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F8F8F6] via-[#F8F8F6]/85 to-transparent" />
          </div>

          <div className="flex min-h-[340px] items-center px-8 py-12 sm:px-16 lg:py-10">
            <div className="max-w-[540px]">
              <h2 className="display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[30px]">
                {splitDisplayText(heading)} <span className=" text-gold">Marketplace Listing</span>
              </h2>
              <p className="mt-5 max-w-[520px] font-sans text-base leading-7 text-graphite/75 lg:text-[18px] lg:leading-7">
                {body}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href={cta.primary.href}
                  variant="gold"
                  className="w-full rounded-pill py-2.5 text-white shadow-[0_4px_12px_rgba(190,152,90,0.18)] hover:-translate-y-0.5 hover:bg-gold-deep hover:shadow-[0_7px_16px_rgba(190,152,90,0.24)] sm:w-[300px]"
                >
                  {cta.primary.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>

              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
