"use client";

import { useState } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Globe } from "./ui/globe";
import { ArrowRight } from "lucide-react";
import { cta } from "@/data/site";
import { splitDisplayText } from "@/lib/utils";
import { MarketplaceAlertsModal } from "./MarketplaceAlertsModal (1)";
import { EmptyLegAlertsModal } from "./EmptyLegAlertsModal (1)";

interface GlobalCTAProps {
  heading?: string;
  subheadingHighlight?: string;
  body?: string;
  buttonLabel?: string;
  /** Which subscribe modal the button opens. */
  modalVariant?: "marketplace" | "emptyleg";
}

export function GlobalCTA({
  heading = cta.heading,
  subheadingHighlight = "Marketplace Listing",
  body = cta.body,
  buttonLabel = cta.primary.label,
  modalVariant = "marketplace"
}: GlobalCTAProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal
          className="
            relative isolate overflow-hidden rounded-[26px] border border-ink/10
            bg-[#F8F8F6] shadow-[0_12px_36px_rgba(0,0,0,0.07)]
            pb-[1rem] sm:pb-[2rem] pt-[20rem] sm:pt-[2rem]
          "
        >
          <div
            className="
              pointer-events-none absolute z-0 -right-[240px] -bottom-[-120px]
              h-[650px] w-[600px] opacity-100
              sm:-right-[80px] sm:-bottom-[100px] sm:h-[500px] sm:w-[500px]
              lg:right-[-180px] lg:top-[95%] lg:bottom-auto lg:h-[820px] lg:w-[820px]
              lg:-translate-y-1/2 lg:pointer-events-auto
            "
          >
            <Globe />
          </div>

          <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-[60px] lg:py-12">
            <div className="max-w-[650px]">
              <h2 className="display text-[26px] leading-[1.2] text-ink sm:text-[34px] lg:text-[36px]">
                {splitDisplayText(heading)}{" "}
                <span className="text-gold block sm:inline">{subheadingHighlight}</span>
              </h2>

              <p className="mt-3 max-w-[500px] font-sans text-[15px] leading-[1.5] text-graphite/75 sm:text-[17px] sm:leading-[1.45]">
                {body}
              </p>

              <div className="mt-6 sm:mt-5">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="
                    inline-flex w-full items-center justify-center gap-2 sm:w-auto
                    rounded-pill bg-gold py-3 px-6 font-sans text-sm font-semibold text-white
                    shadow-[0_4px_12px_rgba(190,152,90,0.18)] transition-all
                    hover:-translate-y-0.5 hover:bg-gold-deep hover:shadow-[0_7px_16px_rgba(190,152,90,0.24)]
                  "
                >
                  {buttonLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_52%_100%,rgba(0,0,0,0.10),rgba(255,255,255,0)_40%)]" />
        </Reveal>
      </Container>

      {modalVariant === "emptyleg" ? (
        <EmptyLegAlertsModal open={open} onClose={() => setOpen(false)} />
      ) : (
        <MarketplaceAlertsModal open={open} onClose={() => setOpen(false)} />
      )}
    </section>
  );
}
