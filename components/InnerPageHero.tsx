import { Container } from "./Container";
import { splitDisplayText } from "@/lib/utils";

/**
 * INNER PAGE HERO — one reusable component for every internal page
 * (Marketplace, Charter, Contact, …). The title changes per page; the
 * treatment stays identical. The image bleeds full-width beyond the content
 * container and carries a dark gradient overlay for legibility.
 */
export function InnerPageHero({
  title,
  subtitle,
  image = "https://images.unsplash.com/photo-1610642372651-fe6e7bc60ba0?auto=format&fit=crop&w=2000&q=80"
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-bleed image */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="hero-photo h-full w-full scale-105 object-cover animate-ken-burns"
        />
        {/* Layered overlays: darker at the bottom for text, brand tint on top */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
        <div className="absolute inset-0 bg-ink/25 mix-blend-multiply" />
      </div>

      <Container className="flex min-h-[52vh] flex-col justify-end pb-16 pt-40 sm:min-h-[58vh] sm:pb-20">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="display text-4xl text-white sm:text-5xl lg:text-6xl">
            {splitDisplayText(title)}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
