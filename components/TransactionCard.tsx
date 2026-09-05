import type { Transaction } from "@/data/transactions";

/**
 * HISTORICAL TRANSACTION CARD — uses the same visual language and dimensions
 * as the Marketplace two-column AircraftCard for site-wide consistency.
 */
export function TransactionCard({ item }: { item: Transaction }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-mist bg-white shadow-card transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.aircraft}
          className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-pill bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink backdrop-blur">
          {item.role}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display text-2xl text-ink">{item.aircraft}</h3>
          <span className="whitespace-nowrap text-sm font-semibold text-gold">
            {item.year}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate">{item.region}</p>
        <p className="mt-5 text-sm leading-relaxed text-slate">{item.summary}</p>
      </div>
    </article>
  );
}
