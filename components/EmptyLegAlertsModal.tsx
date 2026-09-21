"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { AirportSelect } from "./AirportSelect";

const input =
  "w-full rounded-card border border-mist bg-white px-4 py-2.5 font-sans text-sm text-ink placeholder:text-slate/60 outline-none transition focus:border-gold focus:outline-none";

export function EmptyLegAlertsModal({
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
    homeAirport: "",
    routes: [] as string[]
  });
  const [routeDraft, setRouteDraft] = useState("");
  const set = (p: Partial<typeof f>) => setF((s) => ({ ...s, ...p }));
  if (!open) return null;

  const close = () => {
    onClose();
    setTimeout(() => setDone(false), 200);
  };
  const addRoute = () => {
    if (routeDraft && !f.routes.includes(routeDraft)) {
      set({ routes: [...f.routes, routeDraft] });
      setRouteDraft("");
    }
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
              We'll alert you when empty-leg flights match your preferred routes.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <h3 className="display text-2xl text-ink">Subscribe to Empty Leg Alerts</h3>
            <p className="mt-1 text-sm text-slate">
              Get notified instantly when empty leg flights become available on your preferred routes.
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
              <Label t="Home Base Airport" req>
                <AirportSelect value={f.homeAirport} onChange={(v) => set({ homeAirport: v })} placeholder="Select your home airport" />
              </Label>
            </div>

            <h4 className="display mt-7 text-lg text-ink">Preferred Routes</h4>
            <p className="mb-3 mt-1 text-xs text-slate">
              Add airports or destinations you frequently travel to. We'll notify you when empty legs are available on these routes.
            </p>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <AirportSelect value={routeDraft} onChange={setRouteDraft} placeholder="Add destination airport" />
              </div>
              <button
                type="button"
                onClick={addRoute}
                className="shrink-0 rounded-card border border-mist px-5 py-2.5 font-sans text-sm font-semibold text-ink transition hover:border-gold hover:bg-porcelain"
              >
                Add Route
              </button>
            </div>

            {f.routes.length > 0 && (
              <div className="mt-4">
                <p className="font-sans text-sm font-semibold text-ink">Selected Routes:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {f.routes.map((r) => (
                    <span key={r} className="inline-flex items-center gap-1.5 rounded-pill bg-ink px-3 py-1 font-sans text-xs font-semibold text-white">
                      <ArrowRight className="h-3 w-3" /> {r}
                      <button type="button" onClick={() => set({ routes: f.routes.filter((x) => x !== r) })} aria-label={`Remove ${r}`}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

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