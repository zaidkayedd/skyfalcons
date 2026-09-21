"use client";

import { useMemo, useState } from "react";
import { DatePicker } from "@/components/DatePicker";
import {
  Search as SearchIcon,
  Plane,
  Check,
  RefreshCw,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  emptyLegFlights,
  emptyLegIntro,
  emptyLegNote,
  type EmptyLegFlight
} from "@/data/charter";

const PER_PAGE = 5;

export function EmptyLegFlights({ hideHeading = false }: { hideHeading?: boolean }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [applied, setApplied] = useState({ from: "", to: "" });
  const [page, setPage] = useState(1);
  const [booking, setBooking] = useState<EmptyLegFlight | null>(null);
  const [nonce, setNonce] = useState(0);

  const results = useMemo(() => {
    return emptyLegFlights.filter((f) => {
      if (
        applied.from &&
        !`${f.fromCode} ${f.fromCity}`.toLowerCase().includes(applied.from.toLowerCase())
      )
        return false;
      if (
        applied.to &&
        !`${f.toCode} ${f.toCity}`.toLowerCase().includes(applied.to.toLowerCase())
      )
        return false;
      return true;
    });
  }, [applied, nonce]);

  const pageCount = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const shown = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const startIdx = results.length === 0 ? 0 : (current - 1) * PER_PAGE + 1;
  const endIdx = Math.min(current * PER_PAGE, results.length);

  return (
    <div>
      {/* heading */}
      {!hideHeading && (
        <div className="text-center">
          <h2 className="display text-3xl text-ink sm:text-4xl">
            <span className="text-gold">{emptyLegIntro.heading[0]}</span>{" "}
            {emptyLegIntro.heading[1]}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">
            {emptyLegIntro.subtitle}
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-start">
        <button
          type="button"
          onClick={() => {
            setNonce((n) => n + 1);
            setPage(1);
          }}
          className="inline-flex items-center gap-2 rounded-card border border-mist bg-white px-4 py-2.5 font-sans text-sm font-semibold text-ink shadow-card transition hover:border-gold"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Available Flights
        </button>
      </div>


      <div className="mt-6 rounded-card border border-mist/70 bg-white p-6 shadow-card sm:p-8">
        <div className="mb-5 flex items-center gap-2">
          <SearchIcon className="h-5 w-5 text-gold" strokeWidth={2} />
          <h3 className="display text-xl text-ink">Search Empty Leg Flights</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
          <Field label="Departure Airport" required>
            <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="e.g., KTEB, Teterboro" className={inputCls} />
          </Field>
          <Field label="Destination Airport" required>
            <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="e.g., KBOS, Boston" className={inputCls} />
          </Field>
          <Field label="Departure Date" required>
            <DatePicker value={date} onChange={setDate} placeholder="Select date" />
          </Field>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setApplied({ from, to });
                setPage(1);
              }}
              className="inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-card bg-gold px-6 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep md:w-auto"
            >
              <SearchIcon className="h-4 w-4" />
              Search Flights
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate">
          <span>* Required fields</span>
          <span>{results.length} flights found</span>
        </div>
      </div>


      <div className="mt-6 overflow-hidden rounded-card border border-mist/70 bg-white shadow-card">
        <div className="table-scroll overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-mist text-xs uppercase tracking-wide text-slate">
                <th className="px-6 py-4 font-semibold">Aircraft</th>
                <th className="px-6 py-4 font-semibold">Route</th>
                <th className="px-6 py-4 font-semibold">Date &amp; Time</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((f) => (
                <tr key={f.id} className="border-b border-mist/60 last:border-0">
                  <td className="px-6 py-5 font-sans text-sm font-medium text-ink">
                    {f.aircraft}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3 text-sm">
                      <div>
                        <div className="font-semibold text-ink">{f.fromCode}</div>
                        <div className="text-xs text-slate">{f.fromCity}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate" />
                      <div>
                        <div className="font-semibold text-ink">{f.toCode}</div>
                        <div className="text-xs text-slate">{f.toCity}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <div className="font-semibold text-ink">{f.date}</div>
                    <div className="text-xs text-slate">{f.time}</div>
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <div className="font-semibold text-gold">
                      ${f.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate">{f.currency}</div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() => setBooking(f)}
                      className="inline-flex items-center gap-2 rounded-card bg-ink px-4 py-2.5 font-sans text-xs font-semibold text-white transition hover:bg-gold"
                    >
                      Book This Flight
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-slate">
        Showing {startIdx} to {endIdx} of {results.length} results
      </p>


      {pageCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <PageBtn disabled={current === 1} onClick={() => setPage(current - 1)}>
            <ChevronLeft className="h-4 w-4" /> Previous
          </PageBtn>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-card font-sans text-sm transition ${
                current === i + 1
                  ? "bg-gold text-white"
                  : "border border-mist bg-white text-graphite hover:border-gold"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <PageBtn disabled={current === pageCount} onClick={() => setPage(current + 1)}>
            Next <ChevronRight className="h-4 w-4" />
          </PageBtn>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-slate">{emptyLegNote}</p>

      {booking && (
        <ConfirmBookingModal flight={booking} onClose={() => setBooking(null)} />
      )}
    </div>
  );
}

function ConfirmBookingModal({
  flight,
  onClose
}: {
  flight: EmptyLegFlight;
  onClose: () => void;
}) {
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-night/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-card bg-white shadow-modal">
    
        <div className="relative flex items-center gap-3 border-b border-mist bg-porcelain px-7 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Plane className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="display text-xl text-ink">Confirm Empty Leg Booking</h3>
            <p className="font-sans text-xs text-slate">
              Repositioning flight · limited availability
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 text-slate transition hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="px-7 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Check className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <h4 className="display mt-5 text-2xl text-ink">Booking request sent</h4>
            <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-slate">
              Our charter desk will confirm availability for the{" "}
              {flight.aircraft} on {flight.fromCode} → {flight.toCode} and reach
              out shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-card bg-gold px-6 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="px-7 py-6">
    
            <div className="flex items-center justify-between rounded-card border border-mist bg-porcelain/50 px-6 py-5">
              <div className="text-center">
                <div className="display text-2xl text-ink">{flight.fromCode}</div>
                <div className="font-sans text-xs text-slate">{flight.fromCity}</div>
              </div>
              <div className="mx-4 flex flex-1 items-center">
                <span className="h-px flex-1 bg-mist" />
                <Plane className="mx-2 h-4 w-4 text-gold" />
                <span className="h-px flex-1 bg-mist" />
              </div>
              <div className="text-center">
                <div className="display text-2xl text-ink">{flight.toCode}</div>
                <div className="font-sans text-xs text-slate">{flight.toCity}</div>
              </div>
            </div>


            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <Row k="Aircraft" v={flight.aircraft} />
              <Row k="Departure" v={`${flight.date} · ${flight.time}`} />
              <div className="sm:col-span-2 flex items-end justify-between rounded-card bg-gold/8  py-4">
                <dt className="font-sans text-sm text-slate">Estimated Price</dt>
                <dd className="display text-2xl text-gold px-12">
                  ${flight.price.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-slate">
                    {flight.currency}
                  </span>
                </dd>
              </div>
            </dl>

            <label className="mt-6 flex items-start gap-2.5 font-sans text-sm text-graphite">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#BE985A]"
              />
              <span>
                I agree to the{" "}
                <span className="font-semibold text-gold">Terms and Conditions</span>{" "}
                and <span className="font-semibold text-gold">Privacy Policy</span>.
              </span>
            </label>

            <div className="mt-7 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-card border border-mist bg-white px-5 py-2.5 font-sans text-sm font-semibold text-ink transition hover:border-gold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!agree}
                onClick={() => setDone(true)}
                className="rounded-card bg-gold px-6 py-2.5 font-sans text-sm font-semibold text-white transition enabled:hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-sans text-xs uppercase tracking-wide text-slate">{k}</dt>
      <dd className="mt-1 font-sans text-sm font-semibold text-ink">{v}</dd>
    </div>
  );
}

function PageBtn({
  children,
  onClick,
  disabled
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1 rounded-card border border-mist bg-white px-3 py-2 font-sans text-sm text-graphite transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

const inputCls =
  "w-full rounded-card border border-mist bg-white px-4 py-2.5 font-sans text-sm text-ink placeholder:text-slate/60 outline-none transition focus:outline-none focus:ring-0 focus:rounded-card";

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-sm font-semibold text-ink">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
