import type { Config } from "tailwindcss";

/**
 * SKY FALCONS — CENTRAL BRAND THEME
 * ---------------------------------
 * Every color, font and radius used across the site resolves to a token here.
 * To match the live site exactly, replace the hex values below with the real
 * Sky Falcons palette (see DATA_TO_REPLACE.md). Nothing else needs to change.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Core dark tones (brand neutral greys — no navy)
        ink: "#1A1A1A",      // primary heading text (near Black 3C)
        night: "#000000",    // Black — hero overlays, footer
        // Accent — Sand Gold, Pantone 7407 C
        gold: "#BE985A",     // Sand Gold (R190 G152 B90)
        "gold-soft": "#D8BE8E",
        "gold-deep": "#9E7B40",
        // Neutrals (PMS Cool Grey scale)
        porcelain: "#F5F5F5", // page background
        mist: "#E6E6E6",      // Cool Grey 1C — light borders / dividers
        slate: "#7D7D7D",     // Cool Grey 7C — muted body text
        graphite: "#323232"   // Cool Grey 10C — secondary dark text
      },
      fontFamily: {
        // Brand: Blacker Sans Text (headings + body/UI).
        // Loaded via @font-face in app/globals.css
        display: ["var(--font-display)", "Blacker Sans Text", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        // Brand aliases — both currently map to the real Blacker Sans Text.
        // Repoint `klarna` to var(--font-sans) once Klarna Text files exist.
        blacker: ["var(--font-display)", "Blacker Sans Text", "serif"],
        klarna: ["var(--font-sans)", "Blacker Sans Text", "sans-serif"]
      },
      borderRadius: {
        card: "14px",  // soft rounded corners site-wide (no sharp edges)
        pill: "999px"
      },
      boxShadow: {
        card: "0 1px 2px rgba(6,15,28,0.04), 0 12px 30px -18px rgba(6,15,28,0.25)",
        "card-hover": "0 2px 4px rgba(6,15,28,0.06), 0 26px 50px -20px rgba(6,15,28,0.35)",
        modal: "0 40px 120px -30px rgba(6,15,28,0.55)"
      },
      letterSpacing: {
        eyebrow: "0.22em"
      },
      maxWidth: {
        content: "1240px" // shared container width — the site-wide width system
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "ken-burns": {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 1s ease both",
        "ken-burns": "ken-burns 12s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
