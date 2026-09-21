"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Dropdown } from "@/components/Dropdown";
import type { ContactFormData } from "@/types/forms";
import { postForm } from "@/lib/api";

const inquiryPurposes = [
  "Sales & Acquisition",
  "Charter Services",
  "Aircraft Marketplace Inquiry",
  "General Information"
];
const contactMethods = ["Email", "Phone", "Text Message", "Any Method"];

const emptyContact: ContactFormData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  company: "",
  purposeOfInquiry: "",
  preferredContactMethod: "Email",
  message: ""
};


export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<ContactFormData>(emptyContact);
  const set = (patch: Partial<ContactFormData>) =>
    setForm((f) => ({ ...f, ...patch }));

  if (submitted) {
    return (
      <div className="rounded-card border border-mist bg-white p-10 text-center shadow-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-pill bg-gold/15 text-2xl text-gold">
          ✓
        </div>
        <h3 className="display mt-5 text-2xl text-ink">Message sent</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate">
          Thank you for reaching out. A member of the SkyFalcons team will be in
          touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-mist bg-white p-6 shadow-card sm:p-9">
      <h2 className="display text-3xl text-ink">
        Send Us a <span className="text-gold">Message</span>
      </h2>
      <p className="mt-2 text-sm text-slate sm:text-base">
        Complete the form below and our team will respond within 24 hours with
        personalized assistance.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setSubmitting(true);
          try {
            await postForm("/api/v1/contact/", form);
            setSubmitted(true);
          } catch (submissionError) {
            setError(submissionError instanceof Error ? submissionError.message : "Unable to send your message.");
          } finally {
            setSubmitting(false);
          }
        }}
        className="mt-8 flex flex-col gap-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input
              required
              value={form.fullName}
              onChange={(e) => set({ fullName: e.target.value })}
              className={inputCls}
            />
          </Field>
          <Field label="Phone Number" required>
            <input
              required
              type="tel"
              value={form.phoneNumber}
              onChange={(e) => set({ phoneNumber: e.target.value })}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Email Address" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => set({ email: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Company/Organization">
          <input
            value={form.company}
            onChange={(e) => set({ company: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Purpose of Inquiry" required>
          <Dropdown
            value={form.purposeOfInquiry}
            onChange={(v) => set({ purposeOfInquiry: v })}
            placeholder="Select your inquiry purpose"
            options={inquiryPurposes}
            buttonClassName="py-3"
          />
        </Field>

        <Field label="Preferred Contact Method">
          <Dropdown
            value={form.preferredContactMethod}
            onChange={(v) => set({ preferredContactMethod: v })}
            options={contactMethods}
            buttonClassName="py-3"
          />
        </Field>

        <Field label="Message" required>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => set({ message: e.target.value })}
            placeholder="Please provide details about your requirements, timeline, and any specific questions you have..."
            className="w-full rounded-card border border-mist bg-porcelain/40 px-4 py-3 font-sans text-sm text-ink placeholder:text-slate/60 outline-none transition focus:outline-none focus:ring-0 focus:rounded-card"
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-card bg-gold px-5 py-4 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
        >
          <Send className="h-4 w-4" />
          {submitting ? "Sending..." : "Send Message"}
        </button>
        {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-card border border-mist bg-porcelain/40 px-4 py-3 font-sans text-sm text-ink placeholder:text-slate/60 outline-none transition focus:outline-none focus:ring-0 focus:rounded-card";

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
