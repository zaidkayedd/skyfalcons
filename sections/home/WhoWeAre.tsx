import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Radar, Store, Network, Quote, type LucideIcon } from "lucide-react";
import { whoWeAre } from "@/data/home";

/**
 * WHO WE ARE — editorial layout: centered intro, a Founded-2019 / lead split,
 * a large pull-quote, and three differentiator pillars (AvHub · Marketplace ·
 * Partner Network) with a closing outcome line.
 */
const ICONS: Record<string, LucideIcon> = {
  radar: Radar,
  store: Store,
  network: Network
};

export function WhoWeAre() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        {/* Intro */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-gold">
            {whoWeAre.eyebrow}
          </span>
          <h2 className="display mt-4 text-3xl text-ink sm:text-4xl lg:text-5xl">
            {whoWeAre.headingLead}{" "}
            <span className="text-gold">{whoWeAre.headingAccent}</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate">{whoWeAre.lead}</p>
        </Reveal>

        {/* Founded / body split */}
        <Reveal
          delay={80}
          className="mt-14 grid items-center gap-8 rounded-[24px] border border-mist bg-white/70 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-14"
        >
          <div className="flex items-baseline gap-3">
            <span className="display text-6xl leading-none text-gold sm:text-7xl">
              {whoWeAre.founded}
            </span>
            <span className="font-sans text-xs uppercase tracking-eyebrow text-slate">
              Founded
            </span>
          </div>
          <p className="leading-relaxed text-slate lg:border-l lg:border-mist lg:pl-14">
            {whoWeAre.body}
          </p>
        </Reveal>

        {/* Pull quote */}
        <Reveal delay={120} className="mx-auto mt-16 max-w-4xl text-center">
          <Quote className="mx-auto h-8 w-8 text-gold/70" aria-hidden />
          <blockquote className="display mt-5 text-2xl leading-snug text-ink sm:text-[2rem]">
            {whoWeAre.quote}
          </blockquote>
        </Reveal>

        {/* Pillars */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {whoWeAre.pillars.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Radar;
            return (
              <Reveal
                key={p.title}
                delay={i * 100}
                className="group rounded-[20px] border border-mist bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/12 text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="display mt-5 text-xl text-ink">{p.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-slate">
                  {p.desc}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mx-auto mt-10 max-w-2xl text-center">
          <p className="font-sans text-sm leading-relaxed text-slate">
            {whoWeAre.outcome}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
