"use client";

import { useState } from "react";
import { Globe, CalendarDays, ArrowRight } from "lucide-react";
import { Dropdown } from "@/components/Dropdown";
import { DatePicker } from "@/components/DatePicker";
import { AirportSelect } from "@/components/AirportSelect";
import { tripTypes, charterCategories, charterQuote } from "@/data/charter";
import type { RequestCharterQuoteForm } from "@/types/forms";
import { postForm } from "@/lib/api";

export function CharterQuote() {
  const [showAll, setShowAll] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const returnMin = (() => {
    if (!form.departureDate) return today;
    const [y, m, d] = form.departureDate.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() + 1);
    return dt;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAll) {
      setShowAll(true);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await postForm("/api/v1/charter/", form);
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to request a quote.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <div className="rounded-card border border-mist bg-white p-10 text-center shadow-card">Your charter quote request has been sent.</div>;
  }

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

      {/* Always visible: First 3 inputs */}
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

   
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          showAll
            ? "max-h-[1600px] opacity-100 mt-6 overflow-visible"
            : "max-h-0 opacity-0 mt-0 overflow-hidden"
        }`}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Departure Airport">
            <AirportSelect
              value={form.departureAirport}
              onChange={(v) => set({ departureAirport: v })}
              placeholder="Search departure airport..."
            />
          </Field>
          <Field label="Destination Airport">
            <AirportSelect
              value={form.destinationAirport}
              onChange={(v) => set({ destinationAirport: v })}
              placeholder="Search destination airport..."
            />
          </Field>
          <Field label="Departure Date">
            <DatePicker
              value={form.departureDate}
              onChange={(v) =>
                set({
                  departureDate: v,
                  ...(form.returnDate && form.returnDate <= v
                    ? { returnDate: "" }
                    : {})
                })
              }
              placeholder="Select date"
              min={today}
            />
          </Field>
          {form.tripType === "Round Trip" && (
            <Field label="Return Date">
              <DatePicker
                value={form.returnDate}
                onChange={(v) => set({ returnDate: v })}
                placeholder="Select date"
                min={returnMin}
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
        type={showAll ? "submit" : "button"}
        onClick={() => {
          if (!showAll) setShowAll(true);
        }}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-card bg-gold px-5 py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
        disabled={submitting}
      >
        {submitting ? "Sending..." : showAll ? "Request a quote" : "Additional Information"}
        <ArrowRight className="h-4 w-4" />
      </button>
      {error && <p className="mt-3 text-sm text-red-700" role="alert">{error}</p>}
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
    <div className="flex flex-col gap-2">
      <span className="font-sans text-sm font-semibold text-ink">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </div>
  );
}