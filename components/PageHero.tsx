import { splitDisplayText } from "@/lib/utils";

/**
 * PAGE HERO — the centered "GLOBAL … / BEYOND LIMITS" hero used on the
 * Charter, Marketplace and Contact pages. The image is shown clean (no
 * overlays, filters or fades); text keeps a soft shadow only for legibility.
 */
export function PageHero({
  line1,
  line2 = "BEYOND LIMITS",
  image
}: {
  line1: string;
  line2?: string;
  image: string;
}) {
  return (
    <section className="relative isolate flex min-h-[46vh] items-center justify-center overflow-hidden sm:min-h-[52vh]">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="h-full w-full scale-105 object-cover animate-ken-burns"
        />
        {/* Black fade from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="px-6 pt-24 text-center animate-fade-up">
        <h1 className="display text-4xl leading-none text-gold drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">
          {splitDisplayText(line1)}
        </h1>
        <p className="display mt-2 text-3xl leading-none text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">
          {splitDisplayText(line2)}
        </p>
      </div>
    </section>
  );
}
