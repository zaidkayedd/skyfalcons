import Link from "next/link";
import Image from "next/image";
import type { Aircraft } from "@/data/aircraft";

/**
 * AIRCRAFT CARD — 2-column wide marketplace card.
 * The whole card links to the aircraft detail page, and the "More info"
 * affordance navigates there too (opens the new page, per request).
 * Listings without a photo show the gold falcon watermark.
 */
export function AircraftCard({ item }: { item: Aircraft }) {
  return (
    <Link
      href={`/aircraft/${item.id}`}
      className="group relative flex flex-col h-full overflow-hidden rounded-card border border-mist bg-white shadow-card transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-porcelain">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 1280px) 100vw, 50vw"
            className="object-contain p-6 transition-transform duration-700 ease-premium group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/logos/goldIcon.png"
              alt="Sky Falcons"
              width={160}
              height={160}
              className="h-auto w-2/5 opacity-70"
            />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-pill bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink backdrop-blur">
          {item.status}
        </span>
        <span className="absolute right-4 top-4 rounded-pill bg-ink/80 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="display text-2xl text-ink transition-colors group-hover:text-gold">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-slate">
              {item.year} · {item.make}
            </p>
          </div>
          <p className="whitespace-nowrap text-right text-sm font-semibold text-gold">
            {item.price}
          </p>
        </div>

        {/* Two-metric stat row: Passengers | Range */}
        <div className="mt-6 grid grid-cols-2 divide-x divide-mist rounded-card border border-mist">
          <Stat label="Passengers" value={String(item.passengers)} />
          <Stat label="Range" value={`${item.rangeNm.toLocaleString()} nm`} />
        </div>

        <div className="mt-auto pt-6">
          <span className="group/link inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-gold">
            More info
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-slate">
        {label}
      </p>
      <p className="mt-1 display text-xl text-ink">{value}</p>
    </div>
  );
}
