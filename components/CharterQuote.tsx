"use client";

import { useState } from "react";
import { Globe, CalendarDays, ArrowRight } from "lucide-react";
import { Dropdown } from "@/components/Dropdown";
import { DatePicker } from "@/components/DatePicker";
import { tripTypes, charterCategories, charterQuote } from "@/data/charter";
import type { RequestCharterQuoteForm } from "@/types/forms";

/**
 * Request Charter Quote card — controlled form backed by RequestCharterQuoteForm.
 */
export function CharterQuote() {
  const [form, setForm] = useState<RequestCharterQuoteForm>({
    tripType: tripTypes[0],
    passengers: 0,
    aircraftCategory: charterCategories[0],
    departureAirport: "",
    destinationAirport: "",
    departureDate: "",
    returnDate: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    notes: ""
  });
  const set = (patch: Partial<RequestCharterQuoteForm>) =>
    setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // form holds the full RequestCharterQuoteForm object
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
          <Dropdown
            value={form.tripType}
            onChange={(v) => set({ tripType: v })}
            options={[...tripTypes]}
          />
        </Field>
        <Field label="Passengers" required>
          <input
            type="number"
            min={1}
            value={form.passengers || ""}
            onChange={(e) => set({ passengers: Number(e.target.value) || 0 })}
            placeholder="Number of passengers"
            className="w-full rounded-card border border-mist bg-white px-4 py-2.5 font-sans text-sm text-ink placeholder:text-slate/60 outline-none focus:outline-none focus:rounded-card focus:ring-0"
          />
        </Field>
        <Field label="Aircraft Category">
          <Dropdown
            value={form.aircraftCategory}
            onChange={(v) => set({ aircraftCategory: v })}
            options={[...charterCategories]}
          />
        </Field>
      </div>

      {/* Additional information — Always Visible */}
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Departure Airport">
            <input
              value={form.departureAirport}
              onChange={(e) => set({ departureAirport: e.target.value })}
              placeholder="e.g., KTEB, Teterboro"
              className={inputCls}
            />
          </Field>
          <Field label="Destination Airport">
            <input
              value={form.destinationAirport}
              onChange={(e) => set({ destinationAirport: e.target.value })}
              placeholder="e.g., KBOS, Boston"
              className={inputCls}
            />
          </Field>
          <Field label="Departure Date">
            <DatePicker
              value={form.departureDate}
              onChange={(v) => set({ departureDate: v })}
              placeholder="Select date"
            />
          </Field>
          {form.tripType === "Round Trip" && (
            <Field label="Return Date">
              <DatePicker
                value={form.returnDate}
                onChange={(v) => set({ returnDate: v })}
                placeholder="Select date"
              />
            </Field>
          )}
          <Field label="Full Name">
            <input
              value={form.fullName}
              onChange={(e) => set({ fullName: e.target.value })}
              placeholder="Your name"
              className={inputCls}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => set({ email: e.target.value })}
              placeholder="you@example.com"
              className={inputCls}
            />
          </Field>
          <Field label="Phone">
            <input
              value={form.phoneNumber}
              onChange={(e) => set({ phoneNumber: e.target.value })}
              placeholder="Phone number"
              className={inputCls}
            />
          </Field>
          <Field label="Notes">
            <input
              value={form.notes}
              onChange={(e) => set({ notes: e.target.value })}
              placeholder="Anything else we should know?"
              className={inputCls}
            />
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
