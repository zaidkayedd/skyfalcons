"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ShoppingCart,
  TrendingUp,
  FileText,
  Wrench,
  Palette,
  Megaphone,
  ArrowRight,
  X,
  type LucideIcon
} from "lucide-react";
import { turnKey } from "@/data/home";

const ICONS: Record<string, LucideIcon> = {
  sales: ShoppingCart,
  acquisitions: TrendingUp,
  appraisals: FileText,
  maintenance: Wrench,
  completions: Palette,
  marketing: Megaphone
};

const CTA: Record<string, string> = {
  sales: "List Your Aircraft",
  acquisitions: "Find Your Aircraft",
  appraisals: "Request an Appraisal",
  maintenance: "Speak to Our Team",
  completions: "Explore Completions",
  marketing: "Start a Campaign"
};

const services = turnKey.services;

// Fixed angular slot per service on the ring — degrees CLOCKWISE from top.
// top / upper-right / lower-right / bottom / lower-left / upper-left.
const BASE = [0, 60, 120, 180, 240, 300];
const RADIUS = 0.41; // fraction of container width
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SPIN_MS = 760;

export function TurnKeySolution() {
  const [active, setActive] = useState<number | null>(null);
  const [lastActive, setLastActive] = useState(0);
  const [modal, setModal] = useState<number | null>(null);
  const [rot, setRot] = useState(0); // ring rotation (deg) — single source of truth

  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(640);
  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize(el.clientWidth));
    ro.observe(el);
    setSize(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const isActive = active !== null;
  const isModal = modal !== null;
  const shown = active ?? lastActive;
  const R = size * RADIUS;

  const select = (i: number) => {
    if (active === i) {
      setActive(null); // deselect — ring stays where it is
      return;
    }
    // rotate the whole ring the SHORTEST way to bring slot i to the top (0deg)
    const target = -BASE[i];
    const delta = (((target - rot + 180) % 360) + 360) % 360 - 180;
    setRot(rot + delta);
    setLastActive(i);
    setActive(i);
  };

  return (
    <section
      className="overflow-hidden border-y border-mist bg-white py-20 sm:py-28"
      onClick={() => setActive(null)}
    >
      <Container>
        <SectionHeading
          align="center"
          title={
            <>
              Turn Key <span className="text-gold">Solution</span>
            </>
          }
          subtitle={turnKey.subtitle}
        />

        <div
          ref={boxRef}
          className="relative mx-auto mt-16 aspect-square w-full max-w-[670px]"
        >
          {/* subtle radial disc */}
          <div className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle_at_center,rgba(190,152,90,0.10),rgba(190,152,90,0)_66%)]" />
          <div className="absolute inset-[12%] rounded-full border border-mist/40" />

          {/* central aircraft — fixed & anchored (outside the rotating ring) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative h-[70%] w-[70%]"
              style={{
                transition: `filter 600ms ${EASE}, transform 600ms ${EASE}, opacity 600ms ${EASE}`,
                filter: isModal ? "blur(7px)" : isActive ? "blur(3px)" : "none",
                transform: isActive ? "scale(0.95)" : "scale(1)",
                opacity: isModal ? 0.7 : 1
              }}
            >
              <Image
                src={turnKey.aircraft}
                alt="Business jet, top-down view"
                fill
                sizes="400px"
                className="object-contain drop-shadow-[0_30px_55px_rgba(6,15,28,0.16)]"
                priority
              />
            </div>
          </div>

          {/* connector line */}
          <div
            className="pointer-events-none absolute left-1/2 top-[13%] z-[25] w-px -translate-x-1/2 bg-gradient-to-b from-gold/70 to-gold/0"
            style={{
              height: "7%",
              opacity: isActive && !isModal ? 1 : 0,
              transition: `opacity 400ms ${EASE} ${isActive ? "260ms" : "0ms"}`
            }}
          />

          {/* active service card */}
          <div
            className="absolute left-1/2 top-[20%] z-30 w-[78%] max-w-sm rounded-card border border-mist/70 bg-white/95 p-7 text-center shadow-modal backdrop-blur-sm"
            onClick={(event) => event.stopPropagation()}
            style={{
              transform: `translateX(-50%) translateY(${isActive ? "0px" : "12px"}) scale(${isActive ? 1 : 0.98})`,
              opacity: isActive ? (isModal ? 0.25 : 1) : 0,
              pointerEvents: isActive && !isModal ? "auto" : "none",
              transition: `opacity 450ms ${EASE} ${isActive ? "260ms" : "0ms"}, transform 600ms ${EASE} ${isActive ? "260ms" : "0ms"}`
            }}
          >
            <div key={shown} style={{ animation: `tk-content 380ms ${EASE}` }}>
              <h3 className="display text-2xl text-ink">{services[shown].label}</h3>
              <p className="mx-auto mt-3 max-w-xs font-sans text-sm leading-relaxed text-slate">
                {services[shown].description}
              </p>
              <div className="mx-auto my-5 h-px w-full bg-mist" />
              <Link
                href="/contact"
                className="flex w-full items-center justify-between gap-2 rounded-card bg-gold px-5 py-3 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
              >
                {CTA[services[shown].icon] ?? "Learn More"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ROTATING ORBITAL RING — one transform drives all six nodes */}
          <div
            className="absolute inset-0 z-20"
            style={{
              transform: `rotate(${rot}deg)`,
              transformOrigin: "center",
              transition: `transform ${SPIN_MS}ms ${EASE}`
            }}
          >
            {services.map((s, i) => {
              const Icon = ICONS[s.icon] ?? ShoppingCart;
              const activeThis = active === i;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    select(i);
                  }}
                  className="absolute left-1/2 top-1/2 whitespace-nowrap"
                  style={{
                    // place at fixed slot on the ring (upright within the ring frame)
                    transform: `translate(-50%, -50%) rotate(${BASE[i]}deg) translateY(${-R}px) rotate(${-BASE[i]}deg)`,
                    zIndex: activeThis ? 5 : 1
                  }}
                >
                  {/* counter-rotate so the label stays upright while the ring spins */}
                  <div
                    style={{
                      transform: `rotate(${-rot}deg)`,
                      transition: `transform ${SPIN_MS}ms ${EASE}`
                    }}
                  >
                    <span
                      className="flex items-center gap-2 rounded-pill border"
                      style={{
                        transition: `background-color 520ms ${EASE}, color 520ms ${EASE}, border-color 520ms ${EASE}, padding 560ms ${EASE}, box-shadow 520ms ${EASE}`,
                        backgroundColor: activeThis ? "#BE985A" : "#ffffff",
                        borderColor: activeThis ? "transparent" : "rgba(230,230,230,0.6)",
                        color: activeThis ? "#ffffff" : "#323232",
                        padding: activeThis ? "12px 24px" : "10px 20px",
                        boxShadow: activeThis
                          ? "0 18px 40px -12px rgba(190,152,90,0.55)"
                          : "0 8px 20px -12px rgba(0,0,0,0.18)"
                      }}
                    >
                      <Icon
                        className="h-4 w-4"
                        strokeWidth={2}
                        style={{
                          color: activeThis ? "#ffffff" : "#BE985A",
                          transition: `color 520ms ${EASE}`
                        }}
                      />
                      <span
                        style={{
                          fontSize: activeThis ? 14 : 13,
                          fontWeight: activeThis ? 600 : 500,
                          transition: `font-size 520ms ${EASE}`
                        }}
                      >
                        {s.label}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* expanded detail modal */}
          {isModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setModal(null)}
                className="absolute inset-0 cursor-default bg-white/40 backdrop-blur-md"
              />
              <div
                className="relative z-10 w-[86%] max-w-md rounded-card border border-mist/70 bg-white p-9 text-center shadow-modal"
                style={{ animation: `tk-modal-in 300ms ${EASE} both` }}
              >
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 text-slate transition hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/12 text-gold">
                  {(() => {
                    const Icon = ICONS[services[modal].icon] ?? ShoppingCart;
                    return <Icon className="h-6 w-6" strokeWidth={2} />;
                  })()}
                </span>
                <h3 className="display mt-5 text-3xl text-ink">
                  {services[modal].label}
                </h3>
                <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-slate">
                  {services[modal].description}
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>

      <style jsx>{`
        @keyframes tk-content {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes tk-modal-in {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
