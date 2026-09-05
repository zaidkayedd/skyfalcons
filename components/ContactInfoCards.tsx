import { contact } from "@/data/site";

/**
 * THREE CONTACT BOXES — moved UNDER the Send Us a Message form.
 * Horizontal row on desktop, stacked on mobile. Content/data unchanged.
 */
const cards = [
  { label: "Email us", value: contact.email, href: `mailto:${contact.email}`, hint: "We reply within one business day" },
  { label: "Call us", value: contact.phone, href: `tel:${contact.phone.replace(/[^+\\d]/g, "")}`, hint: contact.hours },
  { label: "Visit us", value: contact.address, href: undefined, hint: "By appointment" }
];

export function ContactInfoCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c) => {
        const inner = (
          <div className="group h-full rounded-card border border-mist bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold">
              {c.label}
            </p>
            <p className="mt-3 font-display text-lg leading-snug text-ink">
              {c.value}
            </p>
            <p className="mt-2 text-xs text-slate">{c.hint}</p>
          </div>
        );
        return c.href ? (
          <a key={c.label} href={c.href} className="block">
            {inner}
          </a>
        ) : (
          <div key={c.label}>{inner}</div>
        );
      })}
    </div>
  );
}
