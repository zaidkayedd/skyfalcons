"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { MultiSelect } from "./MultiSelect";
import { alertManufacturers, alertMakes, alertModels } from "@/data/alerts";
import type { marketplaceFormData } from "@/types/forms";
import { postForm } from "@/lib/api";

const input =
  "w-full rounded-card border border-mist bg-white px-4 py-2.5 font-sans text-sm text-ink placeholder:text-slate/60 outline-none transition focus:border-gold focus:outline-none";

export function MarketplaceAlertsModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [f, setF] = useState<marketplaceFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    preferredManufacturers: [],
    preferredMakes: [],
    preferredModels: [],
    minYear: 0,
    maxYear: 0,
    notes: ""
  });
  const set = (p: Partial<marketplaceFormData>) => setF((s) => ({ ...s, ...p }));
  if (!open) return null;

  const close = () => {
    onClose();
    setTimeout(() => setDone(false), 200);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default bg-night/40 backdrop-blur-sm"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-card border border-mist bg-white p-6 shadow-modal sm:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate transition hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-pill bg-gold/15 text-2xl text-gold">
              ✓
            </div>
            <h3 className="display mt-5 text-2xl text-ink">You're subscribed</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate">
              We'll alert you the moment new listings match your criteria.
            </p>
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");
              setSubmitting(true);
              try {
                await postForm("/api/v1/marketplace/", f);
                setDone(true);
              } catch (submissionError) {
                setError(submissionError instanceof Error ? submissionError.message : "Unable to subscribe to alerts.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <h3 className="display text-2xl text-ink">Subscribe to Marketplace Alerts</h3>
            <p className="mt-1 text-sm text-slate">
              Get notified instantly when new aircraft listings match your investment criteria.
            </p>

            <h4 className="display mt-7 text-lg text-ink">Personal Information</h4>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Label t="Full Name" req>
                <input required value={f.fullName} onChange={(e) => set({ fullName: e.target.value })} placeholder="Your full name" className={input} />
              </Label>
              <Label t="Email Address" req>
                <input required type="email" value={f.email} onChange={(e) => set({ email: e.target.value })} placeholder="your.email@example.com" className={input} />
              </Label>
              <Label t="Phone Number" req>
                <input required value={f.phoneNumber} onChange={(e) => set({ phoneNumber: e.target.value })} placeholder="+XXX (XXX) XXX XXX" className={input} />
              </Label>
            </div>

            <h4 className="display mt-7 text-lg text-ink">Preferred Manufacturers <span className="text-gold">*</span></h4>
            <p className="mb-2 mt-1 text-xs text-slate">Select at least one manufacturer you're interested in.</p>
            <MultiSelect value={f.preferredManufacturers} onChange={(v) => set({ preferredManufacturers: v })} options={alertManufacturers} placeholder="Select manufacturers" noun="manufacturers selected" inline />

            <h4 className="display mt-6 text-lg text-ink">Preferred Models <span className="text-gold">*</span></h4>
            <p className="mb-2 mt-1 text-xs text-slate">Select at least one model you're interested in.</p>
            <MultiSelect value={f.preferredModels} onChange={(v) => set({ preferredModels: v })} options={alertModels} placeholder="Select models" noun="models selected" inline />

            <h4 className="display mt-6 text-lg text-ink">Preferred Make</h4>
            <p className="mb-2 mt-1 text-xs text-slate">Select the aircraft make(s) you're interested in.</p>
            <MultiSelect value={f.preferredMakes} onChange={(v) => set({ preferredMakes: v })} options={alertMakes} placeholder="Select makes" noun="makes selected" inline />

            <h4 className="display mt-7 text-lg text-ink">Age Criteria</h4>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Label t="Minimum Year"><input type="number" value={f.minYear || ""} onChange={(e) => set({ minYear: Number(e.target.value) })} placeholder="e.g., 2015" className={input} /></Label>
              <Label t="Maximum Year"><input type="number" value={f.maxYear || ""} onChange={(e) => set({ maxYear: Number(e.target.value) })} placeholder="e.g., 2024" className={input} /></Label>
            </div>

            <h4 className="display mt-7 text-lg text-ink">Additional Notes</h4>
            <textarea rows={3} value={f.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="e.g., Prefer aircraft with updated avionics, specific maintenance programs, etc." className={`${input} mt-3 resize-none`} />

            <div className="mt-8 flex items-center justify-end gap-3">
              <button type="button" onClick={close} className="rounded-card border border-mist px-6 py-2.5 font-sans text-sm font-semibold text-ink transition hover:bg-porcelain">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="rounded-card bg-gold px-6 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep">
                {submitting ? "Submitting..." : "Subscribe to Alerts"}
              </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-700" role="alert">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

function Label({ t, req, children }: { t: string; req?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-sm font-semibold text-ink">
        {t} {req && <span className="text-gold">*</span>}
      </span>
      {children}
    </div>
  );
}