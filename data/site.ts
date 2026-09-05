/**
 * SITE-WIDE DATA
 * Brand strings, navigation, contact details and shared CTA copy.
 * Values confirmed from the live site metadata are marked [CONFIRMED].
 * Values marked [REPLACE] are placeholders — swap with the live site's exact text.
 */

export const brand = {
  name: "SkyFalcons",              // [CONFIRMED] SkyFalcons Aviation Brokerage
  fullName: "SkyFalcons Aviation Brokerage",
  tagline: "Aviation Brokerage, Perfected.", // [CONFIRMED] og:description
  twitter: "@SkyFalcons_ltd",      // [CONFIRMED]
  description:
    "SkyFalcons offers premium aviation brokerage services including aircraft sales, acquisitions, global charter, and strategic consultation for discerning clients worldwide." // [CONFIRMED] meta description
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Charter", href: "/charter" },
  { label: "Contact", href: "/contact" }
];

/** [REPLACE] — use the real contact details shown on skyfalcons.com/contact */
export const contact = {
  email: "info@skyfalcons.com",       // [CONFIRMED] live footer
  phone: "+962 (795) 127 353",        // [CONFIRMED] live footer
  address: "Amman, Jordan",           // [CONFIRMED] live footer
  hours: "24/7 Charter Desk",
  socials: [
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "X", href: "https://x.com/SkyFalcons_ltd", icon: "x" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Facebook", href: "#", icon: "facebook" }
  ]
};

/** Three service pillars — [CONFIRMED] from og:description. */
export const pillars = [
  {
    title: "Sales & Acquisition",
    body: "End-to-end representation for buyers and sellers, from valuation and sourcing to closing and delivery."
  },
  {
    title: "Global Charter",
    body: "On-demand access across a worldwide network — round trips, single and empty legs, and block charter."
  },
  {
    title: "Strategic Consultation",
    body: "Advisory for owners and operators on fleet strategy, positioning and long-term aviation planning."
  }
];

/**
 * GLOBAL CTA — reused verbatim on every page via <GlobalCTA />.
 * Only the eyebrow/heading/body change per page if the original requires it;
 * everything else (layout, button, image) stays identical site-wide.
 */
export const cta = {
  eyebrow: "Aviation Brokerage, Perfected",
  heading: "Ready when you are.",
  body: "Speak with a Sky Falcons broker about acquisition, sale, or your next charter — anywhere in the world, at any hour.",
  primary: { label: "Request a Consultation", href: "/contact" },
  secondary: { label: "Explore the Marketplace", href: "/marketplace" }
};
