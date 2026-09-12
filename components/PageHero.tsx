import { Container } from "@/components/Container";

/**
 * PAGE HERO — a restrained, editorial hero for a discerning audience.
 * Centered typography with a refined kicker rule, a large Blacker headline
 * (a single word in gold), a measured subtitle, understated house credentials,
 * and a very faint brand emblem. Generous whitespace, no gimmicks.
 * Shared across Marketplace, Charter and Contact; only the copy differs.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  subtitle
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-mist bg-porcelain pt-40 pb-24 text-center sm:pt-48 sm:pb-32">
      {/* very faint brand emblem */}
      <div className="pointer-events-none absolute left-[65%] top-1/2 w-[520px] max-w-[80%] -translate-x-1/2 -translate-y-1/2 opacity-[0.1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img src="/logos/goldIcon.png" alt="" className="h-auto w-full" /> */}
      </div>
      {/* whisper of warmth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(190,152,90,0.05),transparent_60%)]" />

      <Container className="relative">
        <div className="animate-fade-up text-center lg:grid lg:grid-cols-2 lg:items-end lg:gap-16 lg:text-left">
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.42em] text-slate">
              {eyebrow}
            </span>

            <h1 className="display mt-7 text-5xl leading-[1.06] text-ink sm:text-6xl lg:text-7xl">
              {title}
              {accent && (
                <>
                  {" "}
                  <span className="italic text-gold">{accent}</span>
                </>
              )}
            </h1>
          </div>

          <div className="mx-auto mt-10 max-w-xl lg:mx-0 lg:mt-0 lg:pb-1">
            {subtitle && (
              <p className="text-lg font-light leading-relaxed text-slate">
                {subtitle}
              </p>
            )}

            {/* understated house credentials */}
            <div className="mt-11 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-sans text-[11px] uppercase tracking-[0.28em] text-slate/70 lg:justify-start">
              <span>Founded 2019</span>
              <span className="hidden h-3 w-px bg-gold sm:block" />
              <span>Global Reach</span>
              <span className="hidden h-3 w-px bg-gold sm:block" />
              <span>Discreet &amp; Bespoke</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
