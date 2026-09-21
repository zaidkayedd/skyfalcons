import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Radar, Store, Network, Quote, type LucideIcon } from "lucide-react";
import { whoWeAre } from "@/data/home";

const ICONS: Record<string, LucideIcon> = {
  radar: Radar,
  store: Store,
  network: Network
};


export function WhoWeAre() {
  return (
    <section className="py-20 sm:py-28">
      <Container>

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

   
        <Reveal delay={120} className="mx-auto mt-16 max-w-4xl text-center">
          <Quote className="mx-auto h-8 w-8 text-gold/70" aria-hidden />
          <blockquote className="display mt-5 text-2xl leading-snug text-ink sm:text-[2rem]">
            {whoWeAre.quote}
          </blockquote>
        </Reveal>


        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-0">
          {whoWeAre.pillars.map((p, i) => {
            const isImage = p.icon.startsWith("/");

            return (
              <Reveal
                key={p.desc}
                delay={i * 100}
                className={`group p-7 md:px-8 ${i < whoWeAre.pillars.length - 1 ? "md:border-r md:border-r-gold/35" : ""}`}
              >
                <div className="flex items-center gap-3">
                  {isImage ? (
                    <img
                      src={p.icon}
                      alt={p.title || "AvHub"}
                      className="h-9 w-auto max-w-[110px] shrink-0 object-contain object-left"
                    />
                  ) : (() => {
                      const Icon = ICONS[p.icon] ?? Radar;
                      return <Icon className="h-7 w-7 shrink-0 text-gold" strokeWidth={1.8} aria-hidden />;
                    })()}
                  {p.title && (
                    <h3 className="display text-xl text-ink">{p.title}</h3>
                  )}
                </div>
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