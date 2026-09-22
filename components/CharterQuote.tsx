"use client";

import { useState } from "react";
import { Globe, CalendarDays, ArrowRight, Plus, X } from "lucide-react";
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
  
  const [currentLegFrom, setCurrentLegFrom] = useState("");
  const [currentLegTo, setCurrentLegTo] = useState("");
  const [currentLegDate, setCurrentLegDate] = useState("");

  const [form, setForm] = useState<RequestCharterQuoteForm>({
    tripType: tripTypes[0],
    passengers: 0,
    aircraftCategory: charterCategories[0],
    departureAirport: "",
    destinationAirport: "",
    legs: [],
    departureDate: "",
    returnDate: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    notes: ""
  });

  const set = (patch: Partial<RequestCharterQuoteForm>) =>
    setForm((f) => ({ ...f, ...patch }));

  const isMulti = form.tripType === "Multi-Leg";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentLegMinDate = (() => {
    if (form.legs.length > 0) {
      const lastLeg = form.legs[form.legs.length - 1];
      if (!lastLeg.date) return today;
      const [y, m, d] = lastLeg.date.split("-").map(Number);
      const dt = new Date(y, m - 1, d);
      dt.setDate(dt.getDate() + 1); // Day after previous leg
      return dt;
    }
    return today;
  })();

  const addLeg = () => {
    if (currentLegFrom && currentLegTo && currentLegDate) {
      set({
        legs: [
          ...form.legs,
          { from: currentLegFrom, to: currentLegTo, date: currentLegDate }
        ]
      });
      setCurrentLegFrom(currentLegTo);
      setCurrentLegTo("");
      setCurrentLegDate("");
    }
  };

  const removeLeg = (i: number) => {
    const updatedLegs = form.legs.filter((_, idx) => idx !== i);
    set({ legs: updatedLegs });
    if (updatedLegs.length > 0) {
      const lastLeg = updatedLegs[updatedLegs.length - 1];
      if (currentLegDate && currentLegDate < lastLeg.date) {
        setCurrentLegDate("");
      }
    } else {
      setCurrentLegFrom("");
    }
  };

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
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to request a quote."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card border border-mist bg-white p-10 text-center shadow-card">
        Your charter quote request has been sent.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-mist/70 bg-white p-7 shadow-card sm:p-9"
    >
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
            onChange={(v) => {
              set({ tripType: v, legs: [] });
              setCurrentLegFrom("");
              setCurrentLegTo("");
              setCurrentLegDate("");
            }}
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
            className={inputCls}
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

      {!isMulti && (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Departure Airport" required>
            <AirportSelect
              value={form.departureAirport}
              onChange={(v) => set({ departureAirport: v })}
              placeholder="Search departure airport..."
            />
          </Field>
          <Field label="Destination Airport" required>
            <AirportSelect
              value={form.destinationAirport}
              onChange={(v) => set({ destinationAirport: v })}
              placeholder="Search destination airport..."
            />
          </Field>
        </div>
      )}

      {isMulti && (
        <div className="mt-5 rounded-card border border-mist/70 bg-porcelain/20 p-5">
          <h4 className="font-sans text-sm font-semibold text-ink mb-3">
            {form.legs.length === 0 ? "Add Leg 1" : `Add Leg ${form.legs.length + 1}`}
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="From" required>
              <AirportSelect
                value={currentLegFrom}
                onChange={setCurrentLegFrom}
                placeholder="From..."
              />
            </Field>
            <Field label="To" required>
              <AirportSelect
                value={currentLegTo}
                onChange={setCurrentLegTo}
                placeholder="To..."
              />
            </Field>
            <Field label="Departure Date" required>
              <DatePicker
                value={currentLegDate}
                onChange={setCurrentLegDate}
                placeholder="Select date"
                min={currentLegMinDate}
              />
            </Field>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={addLeg}
              disabled={!currentLegFrom || !currentLegTo || !currentLegDate}
              className="inline-flex items-center gap-2 rounded-card border border-mist px-5 py-2.5 font-sans text-sm font-semibold text-ink transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              Add Leg to Itinerary
            </button>
          </div>

          {form.legs.length > 0 && (
            <div className="mt-4">
              <p className="font-sans text-sm font-semibold text-ink">Configured Legs:</p>
              <div className="mt-2 flex flex-col gap-2">
                {form.legs.map((leg, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-card border border-mist bg-white px-4 py-2.5 shadow-sm"
                  >
                    <span className="flex items-center gap-3 font-sans text-sm text-ink">
                      <span className="text-slate font-medium">{i + 1}.</span>
                      <span className="font-semibold">{leg.from}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-gold" />
                      <span className="font-semibold">{leg.to}</span>
                      <span className="text-xs text-slate bg-porcelain px-2 py-1 rounded">
                        {leg.date}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLeg(i)}
                      aria-label={`Remove leg ${i + 1}`}
                      className="text-slate transition hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          showAll
            ? "max-h-[1600px] opacity-100 mt-6 overflow-visible"
            : "max-h-0 opacity-0 mt-0 overflow-hidden"
        }`}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {!isMulti && (
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
          )}
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
      {error && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
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