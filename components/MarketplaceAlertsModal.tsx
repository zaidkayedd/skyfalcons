"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { MultiSelect } from "./MultiSelect";
import { alertManufacturers, alertModels } from "@/data/alerts";

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
  const [f, setF] = useState({
    fullName: "",
    email: "",
    phone: "",
    manufacturers: [] as string[],
    models: [] as string[],
    minYear: "",
    maxYear: "",
    minPax: "",
    maxPax: "",
    maxPrice: "",
    notes: ""
  });
  const set = (p: Partial<typeof f>) => setF((s) => ({ ...s, ...p }));
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
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
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
                <input required value={f.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+XXX (XXX) XXX XXX" className={input} />
              </Label>
            </div>

            <h4 className="display mt-7 text-lg text-ink">Preferred Manufacturers <span className="text-gold">*</span></h4>
            <p className="mb-2 mt-1 text-xs text-slate">Select at least one manufacturer you're interested in.</p>
            <MultiSelect value={f.manufacturers} onChange={(v) => set({ manufacturers: v })} options={alertManufacturers} placeholder="Select manufacturers" noun="manufacturers selected" />

            <h4 className="display mt-6 text-lg text-ink">Preferred Models <span className="text-gold">*</span></h4>
            <p className="mb-2 mt-1 text-xs text-slate">Select at least one model you're interested in.</p>
            <MultiSelect value={f.models} onChange={(v) => set({ models: v })} options={alertModels} placeholder="Select models" noun="models selected" />

            <h4 className="display mt-7 text-lg text-ink">Age Criteria</h4>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Label t="Minimum Year"><input value={f.minYear} onChange={(e) => set({ minYear: e.target.value })} placeholder="e.g., 2015" className={input} /></Label>
              <Label t="Maximum Year"><input value={f.maxYear} onChange={(e) => set({ maxYear: e.target.value })} placeholder="e.g., 2024" className={input} /></Label>
            </div>

            <h4 className="display mt-7 text-lg text-ink">Additional Criteria</h4>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              <Label t="Min Passengers"><input value={f.minPax} onChange={(e) => set({ minPax: e.target.value })} placeholder="e.g., 8" className={input} /></Label>
              <Label t="Max Passengers"><input value={f.maxPax} onChange={(e) => set({ maxPax: e.target.value })} placeholder="e.g., 19" className={input} /></Label>
              <Label t="Max Price (USD)"><input value={f.maxPrice} onChange={(e) => set({ maxPrice: e.target.value })} placeholder="e.g., 50000000" className={input} /></Label>
            </div>

            <h4 className="display mt-7 text-lg text-ink">Additional Notes</h4>
            <textarea rows={3} value={f.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="e.g., Prefer aircraft with updated avionics, specific maintenance programs, etc." className={`${input} mt-3 resize-none`} />

            <div className="mt-8 flex items-center justify-end gap-3">
              <button type="button" onClick={close} className="rounded-card border border-mist px-6 py-2.5 font-sans text-sm font-semibold text-ink transition hover:bg-porcelain">
                Cancel
              </button>
              <button type="submit" className="rounded-card bg-gold px-6 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep">
                Subscribe to Alerts
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Label({ t, req, children }: { t: string; req?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-sm font-semibold text-ink">
        {t} {req && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}