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
            overflow-hidden
            rounded-[26px]
            border
            border-ink/10
            bg-[#F8F8F6]
            shadow-[0_12px_36px_rgba(0,0,0,0.07)]
            pb-[1rem]
            s,:pb-[2rem]
            pt-[20rem]
            sm:pt-[2rem]
           
          "
        >
          {/* ============================
              GLOBE (Modernized positioning)
          ============================ */}
          <div
            className="
              pointer-events-none
              absolute
              z-0
              -right-[240px]
              -bottom-[-120px]
              h-[650px]
              w-[600px]
              opacity-100
              sm:opacity-100
              sm:-right-[80px]
              sm:-bottom-[100px]
              sm:h-[500px]
              sm:w-[500px]
              lg:right-[-180px]
              lg:top-[95%]
              lg:bottom-auto
              lg:h-[820px]
              lg:w-[820px]
              lg:-translate-y-1/2
              lg:opacity-100
              lg:pointer-events-auto
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
              flex-col
              justify-center
              px-6
              py-10
              sm:px-12
              sm:py-14
              lg:px-[60px]
              lg:py-12
            "
          >
            <div className="max-w-[570px]">
              <h2
                className="
                  display
                  text-[26px]
                  leading-[1.2]
                  text-ink
                  sm:text-[34px]
                  lg:text-[36px]
                "
              >
                {splitDisplayText(heading)}{" "}
                <span className="text-gold block sm:inline">
                  Marketplace Listing
                </span>
              </h2>

              <p
                className="
                  mt-3
                  max-w-[500px]
                  font-sans
                  text-[15px]
                  leading-[1.5]
                  text-graphite/75
                  sm:text-[17px]
                  sm:leading-[1.45]
                "
              >
                {body}
              </p>

              <div className="mt-6 sm:mt-5">
                <Button
                  href={cta.primary.href}
                  variant="gold"
                  className="
                    w-full
                    sm:w-auto
                    rounded-pill
                    py-3
                    px-6
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