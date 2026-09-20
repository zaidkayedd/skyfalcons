"use client";

import { useState } from "react";
import { Globe, CalendarDays, ArrowRight } from "lucide-react";
import { Dropdown } from "@/components/Dropdown";
import { DatePicker } from "@/components/DatePicker";
import { tripTypes, charterCategories, charterQuote } from "@/data/charter";

/**
 * Request Charter Quote card — matches the live charter page:
 * Trip Details (Trip Type / Passengers / Aircraft Category) with all
 * route, dates, and contact fields permanently expanded.
 */
export function CharterQuote() {
  const [tripType, setTripType] = useState<string>(tripTypes[0]);
  const [passengers, setPassengers] = useState("");
  const [category, setCategory] = useState<string>(charterCategories[0]);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-card border border-mist/70 bg-white p-7 shadow-card sm:p-9">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-gold" strokeWidth={2} />
        <h2 className="display text-2xl text-ink">{charterQuote.title}</h2>
      </div>
      <div className="my-4 h-px w-full bg-mist/70" />
      <p className="text-sm leading-relaxed text-slate">{charterQuote.subtitle}</p>

      <div className="mt-6 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-gold" strokeWidth={2} />
        <h3 className="display text-xl text-ink">Trip Details</h3>
      </div>
      <div className="my-4 h-px w-full bg-mist/70" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Field label="Trip Type" required>
          <Dropdown value={tripType} onChange={setTripType} options={[...tripTypes]} />
        </Field>
        <Field label="Passengers" required>
          <input
            type="number"
            min={1}
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            placeholder="Number of passengers"
            className="w-full rounded-card border border-mist bg-white px-4 py-2.5 font-sans text-sm text-ink placeholder:text-slate/60 outline-none focus:outline-none focus:rounded-card focus:ring-0"
          />
        </Field>
        <Field label="Aircraft Category">
          <Dropdown value={category} onChange={setCategory} options={[...charterCategories]} />
        </Field>
      </div>

      {/* Additional information — Always Visible */}
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Departure Airport">
            <input placeholder="e.g., KTEB, Teterboro" className={inputCls} />
          </Field>
          <Field label="Destination Airport">
            <input placeholder="e.g., KBOS, Boston" className={inputCls} />
          </Field>
          <Field label="Departure Date">
            <DatePicker value={departDate} onChange={setDepartDate} placeholder="Select date" />
          </Field>
          {tripType === "Round Trip" && (
            <Field label="Return Date">
              <DatePicker value={returnDate} onChange={setReturnDate} placeholder="Select date" />
            </Field>
          )}
          <Field label="Full Name">
            <input placeholder="Your name" className={inputCls} />
          </Field>
          <Field label="Email">
            <input type="email" placeholder="you@example.com" className={inputCls} />
          </Field>
          <Field label="Phone">
            <input placeholder="Phone number" className={inputCls} />
          </Field>
          <Field label="Notes">
            <input placeholder="Anything else we should know?" className={inputCls} />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-card bg-gold px-5 py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
      >
        Request Quote
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-card border border-mist bg-white px-4 py-2.5 font-sans text-sm text-ink placeholder:text-slate/60 outline-none focus:outline-none focus:rounded-card focus:ring-0";

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