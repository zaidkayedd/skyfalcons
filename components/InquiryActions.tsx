"use client";

import { useState } from "react";
import { Phone, Download, Calendar, X, Check } from "lucide-react";

type ModalKind = "viewing" | "spec" | null;

/**
 * Inquiry rail actions for the aircraft detail page.
 * "Contact Sales" links to /contact; "Download Spec Sheet" and
 * "Schedule Viewing" open pre-filled request modals.
 */
export function InquiryActions({
  aircraftLabel
}: {
  aircraftLabel: string; // e.g. "Falcon 7X (2017)"
}) {
  const [modal, setModal] = useState<ModalKind>(null);

  return (
    <>
      <div className="flex flex-col gap-3">
        <a
          href="/contact"
          className="flex items-center justify-center gap-2 rounded-card bg-gold px-4 py-3 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
        >
          <Phone className="h-4 w-4" />
          Contact Sales
        </a>
        <button
          onClick={() => setModal("spec")}
          className="flex items-center justify-center gap-2 rounded-card border border-mist bg-white px-4 py-3 font-sans text-sm font-semibold text-ink transition hover:border-gold"
        >
          <Download className="h-4 w-4" />
          Download Spec Sheet
        </button>
        <button
          onClick={() => setModal("viewing")}
          className="flex items-center justify-center gap-2 rounded-card border border-mist bg-white px-4 py-3 font-sans text-sm font-semibold text-ink transition hover:border-gold"
        >
          <Calendar className="h-4 w-4" />
          Schedule Viewing
        </button>
      </div>

      {modal === "viewing" && (
        <InquiryModal
          title="Schedule Viewing"
          defaultMessage={`I would like to schedule a viewing of the ${aircraftLabel}. Please contact me to arrange a convenient time.`}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "spec" && (
        <InquiryModal
          title="Download Spec Sheet"
          defaultMessage={`I would like to receive the specification sheet for the ${aircraftLabel}.`}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}

function InquiryModal({
  title,
  defaultMessage,
  onClose
}: {
  title: string;
  defaultMessage: string;
  onClose: () => void;
}) {
  const [message, setMessage] = useState(defaultMessage);
  const [done, setDone] = useState(false);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-night/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-card bg-white shadow-modal">
        <div className="flex items-center justify-between border-b border-mist px-7 py-5">
          <h3 className="display text-2xl text-ink">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-slate transition hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="px-7 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Check className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <h4 className="display mt-5 text-2xl text-ink">Request received</h4>
            <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-slate">
              A member of the SkyFalcons team will follow up shortly.
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="max-h-[70vh] overflow-y-auto px-7 py-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First Name" required>
                <input required className={inputCls} autoFocus />
              </Field>
              <Field label="Last Name" required>
                <input required className={inputCls} />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Email" required>
                <input required type="email" className={inputCls} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Phone Number">
                <input type="tel" className={inputCls} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Company">
                <input className={inputCls} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Message">
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-card border border-mist bg-white px-4 py-3 font-sans text-sm text-ink outline-none transition focus:outline-none focus:ring-0 focus:rounded-card"
                />
              </Field>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-card border border-mist bg-white px-5 py-2.5 font-sans text-sm font-semibold text-ink transition hover:border-gold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-card bg-gold px-6 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-card border border-mist bg-white px-4 py-3 font-sans text-sm text-ink outline-none transition focus:outline-none focus:ring-0 focus:rounded-card";

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
    <label className="block">
      <span className="mb-2 block font-sans text-sm font-semibold text-ink">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
