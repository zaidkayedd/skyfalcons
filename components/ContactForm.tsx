"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Dropdown } from "@/components/Dropdown";

const inquiryPurposes = [
  "Sales & Acquisition",
  "Charter Services",
  "Aircraft Marketplace Inquiry",
  "General Information"
];
const contactMethods = ["Email", "Phone", "Text Message", "Any Method"];

/**
 * SEND US A MESSAGE — matches the live contact form:
 * Full Name / Phone Number · Email Address · Company/Organization ·
 * Purpose of Inquiry (custom dropdown) · Preferred Contact Method
 * (custom dropdown) · Message · Send Message.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [method, setMethod] = useState("Email");

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
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="mt-8 flex flex-col gap-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input required className={inputCls} placeholder="" />
          </Field>
          <Field label="Phone Number" required>
            <input required type="tel" className={inputCls} placeholder="" />
          </Field>
        </div>

        <Field label="Email Address" required>
          <input required type="email" className={inputCls} placeholder="" />
        </Field>

        <Field label="Company/Organization">
          <input className={inputCls} placeholder="" />
        </Field>

        <Field label="Purpose of Inquiry" required>
          <Dropdown
            value={purpose}
            onChange={setPurpose}
            placeholder="Select your inquiry purpose"
            options={inquiryPurposes}
            buttonClassName="py-3"
          />
        </Field>

        <Field label="Preferred Contact Method">
          <Dropdown
            value={method}
            onChange={setMethod}
            options={contactMethods}
            buttonClassName="py-3"
          />
        </Field>

        <Field label="Message" required>
          <textarea
            required
            rows={5}
            placeholder="Please provide details about your requirements, timeline, and any specific questions you have..."
            className="w-full rounded-card border border-mist bg-porcelain/40 px-4 py-3 font-sans text-sm text-ink placeholder:text-slate/60 outline-none transition focus:outline-none focus:ring-0 focus:rounded-card"
          />
        </Field>

        <button
          type="submit"
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-card bg-gold px-5 py-4 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
        >
          <Send className="h-4 w-4" />
          Send Message
        </button>
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
