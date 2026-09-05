# SkyFalcons — Website (Next.js + TypeScript + Tailwind)

A frontend-only recreation of the Sky Falcons website with the specified UI/UX
redesign applied. Built with the Next.js App Router, TypeScript and Tailwind CSS.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> Requires internet on first build to load the two web fonts. All page data is
> local (no backend, no API).

## Structure

```
app/                 Routes: / (Home), /marketplace, /charter, /contact
components/           Reusable UI (Navbar, Footer, heroes, cards, filters, modal, CTA…)
sections/            Page-composition sections (home / marketplace / charter / contact)
data/                Centralized content — the single source of truth for all copy & data
lib/                 Small helpers
public/              Static assets (images, video, logos)
tailwind.config.ts   Brand theme: colors, fonts, radius, shadows
```

## Editing content

**All swappable content lives in `data/`.** See **`DATA_TO_REPLACE.md`** for a
field-by-field map of what to paste from the live site and where. Brand colors
and fonts live in `tailwind.config.ts` / `app/globals.css`.

## What's in this build

- **Home:** cinematic video hero (poster fallback), service pillars, redesigned
  Who We Are (editorial), Turn Key Solution (preserved), Historical Transactions
  as **2 boxes** matching Marketplace card dimensions, redesigned Global Network
  logo grid, reusable Global CTA.
- **Marketplace:** **2-column** grid of wider cards; stat row shows only
  **Passengers | Range**; integrated **More Info**; redesigned filters — a clean
  desktop panel and an elegant mobile drawer (all options preserved).
- **Charter:** Request-a-Quote box, search and table all share one width;
  redesigned modern search; redesigned responsive table (cards on mobile);
  redesigned **Book This Flight** modal (all fields preserved).
- **Contact:** Send Us a Message form at table width; the three info boxes moved
  **under** the form; redesigned Strategic Alliance section around an interactive
  map; Global Network; Global CTA.
- One reusable `InnerPageHero` across every internal page (dynamic title).
- Responsive from 320px up, keyboard focus states, reduced-motion respected.

## Notes

- `skyfalcons.com` is a client-rendered SPA, so exact runtime data (aircraft
  specs/prices, charter rows, contact details, logos, precise hex colors) could
  not be scraped. Realistic, clearly-flagged placeholders are in `data/` — swap
  them per `DATA_TO_REPLACE.md` before launch.
- Forms are frontend stubs (no backend), matching the brief.
