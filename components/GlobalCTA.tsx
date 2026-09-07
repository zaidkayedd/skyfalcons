import { Container } from "./Container";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Globe } from "./ui/globe";
import { ArrowRight } from "lucide-react";
import { cta } from "@/data/site";
import { splitDisplayText } from "@/lib/utils";

export function GlobalCTA({
  heading = cta.heading,
  body = cta.body,
}: {
  heading?: string;
  body?: string;
  image?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal
          className="
            relative
            isolate
            h-[285px]
            overflow-hidden
            rounded-[26px]
            border
            border-ink/10
            bg-[#F8F8F6]
            shadow-[0_12px_36px_rgba(0,0,0,0.07)]
          "
        >
          {/* ============================
              GLOBE
          ============================ */}

          <div
            className="
              pointer-events-auto
              absolute
              z-0

              right-[-40px]
              top-[125%]

              h-[680px]
              w-[680px]

              -translate-y-1/2

              sm:right-[-30px]
              sm:top-[125%]
              sm:h-[720px]
              sm:w-[720px]

              lg:right-[-180px]
              lg:top-[95%]
              lg:h-[820px]
              lg:w-[820px]
            "
          >
            <Globe />
          </div>

          {/* ============================
              CONTENT
          ============================ */}

          <div
            className="
              relative
              z-10
              flex
              h-full
              items-center

              px-8
              py-8

              sm:px-14
              lg:px-[60px]
            "
          >
            <div className="max-w-[520px]">
              <h2
                className="
                  display
                  text-[27px]
                  leading-[1.15]
                  text-ink

                  sm:text-[28px]
                  lg:text-[27px]
                "
              >
                {splitDisplayText(heading)}{" "}
                <span className="text-gold">
                  Marketplace Listing
                </span>
              </h2>

              <p
                className="
                  mt-2
                  max-w-[500px]

                  font-sans
                  text-[17px]
                  leading-[1.45]
                  text-graphite/75

                  lg:text-[17px]
                  lg:leading-[1.45]
                "
              >
                {body}
              </p>

              <div className="mt-5">
                <Button
                  href={cta.primary.href}
                  variant="gold"
                  className="
                    w-[300px]
                    rounded-pill
                    py-2.5
                    text-sm
                    text-white

                    shadow-[0_4px_12px_rgba(190,152,90,0.18)]
                    transition-all

                    hover:-translate-y-0.5
                    hover:bg-gold-deep
                    hover:shadow-[0_7px_16px_rgba(190,152,90,0.24)]
                  "
                >
                  {cta.primary.label}

                  <ArrowRight
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* ============================
              DEPTH EFFECT
          ============================ */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-[2]

              bg-[radial-gradient(
                circle_at_52%_100%,
                rgba(0,0,0,0.10),
                rgba(255,255,255,0)_40%
              )]
            "
          />
        </Reveal>
      </Container>
    </section>
  );
}