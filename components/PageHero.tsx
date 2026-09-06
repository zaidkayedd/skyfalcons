import { Container } from "@/components/Container";

/**
 * PAGE HERO — clean, image-free hero for the Marketplace, Charter and Contact
 * pages. One shared component/design; only the copy differs per page. Light,
 * editorial layout with an eyebrow, a two-tone Blacker headline, a subtitle, a
 * drifting gold falcon watermark and floating gold particles for a live feel.
 */
const PARTICLES = [
  { top: "24%", left: "18%", size: 6, anim: "hero-float", dur: "7s", delay: "0s", op: 0.5 },
  { top: "62%", left: "30%", size: 4, anim: "hero-float-slow", dur: "9s", delay: "0.8s", op: 0.4 },
  { top: "38%", left: "54%", size: 8, anim: "hero-float", dur: "8.5s", delay: "0.3s", op: 0.35 },
  { top: "72%", left: "62%", size: 5, anim: "hero-float-slow", dur: "10s", delay: "1.2s", op: 0.45 },
  { top: "20%", left: "72%", size: 7, anim: "hero-float", dur: "9.5s", delay: "0.5s", op: 0.4 },
  { top: "50%", left: "84%", size: 5, anim: "hero-pulse", dur: "6s", delay: "0.2s", op: 0.5 },
  { top: "82%", left: "44%", size: 4, anim: "hero-pulse", dur: "7.5s", delay: "1s", op: 0.4 }
];

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
    <section className="relative overflow-hidden border-b border-mist bg-porcelain pt-36 pb-16 sm:pt-44 sm:pb-20">
      {/* drifting falcon watermark */}
      <div
        className="hero-anim pointer-events-none absolute right-[-3%] top-1/2 hidden w-[44%] max-w-[560px] opacity-[0.06] md:block"
        style={{ animation: "hero-drift 11s ease-in-out infinite" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/goldIcon.png" alt="" className="h-auto w-full" />
      </div>

      {/* soft gold wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_35%,rgba(190,152,90,0.10),transparent_55%)]" />

      {/* floating gold particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hero-anim absolute rounded-full bg-gold"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.op,
              boxShadow: "0 0 12px rgba(190,152,90,0.6)",
              animation: `${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`
            }}
          />
        ))}
      </div>

      <Container className="relative">
        <div className="max-w-3xl animate-fade-up">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            {eyebrow}
          </span>
          <h1 className="display mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-gold">{accent}</span>
              </>
            )}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
              {subtitle}
            </p>
          )}
          <div className="mt-8 h-px w-16 bg-gold/60" />
        </div>
      </Container>
    </section>
  );
}
