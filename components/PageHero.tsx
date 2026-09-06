import { Container } from "@/components/Container";

/**
 * PAGE HERO — a clean, image-free hero for the Marketplace, Charter and Contact
 * pages. One shared component/design; only the copy differs per page. Light,
 * editorial layout with an eyebrow, a two-tone Blacker headline, a subtitle and
 * a faint falcon watermark for depth (no photography).
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
    <section className="relative overflow-hidden border-b border-mist bg-porcelain pt-36 pb-16 sm:pt-44 sm:pb-20">
      {/* faint falcon watermark */}
      <div className="pointer-events-none absolute right-[-3%] top-1/2 hidden w-[44%] max-w-[560px] -translate-y-1/2 opacity-[0.05] md:block">
        <img src="/logos/goldIcon.png" alt="" className="h-auto w-full" />
      </div>
      {/* soft gold wash */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_88%_35%,rgba(190,152,90,0.10),transparent_55%)]" />

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
