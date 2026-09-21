"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
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

const BASE = [0, 60, 120, 180, 240, 300];
const RADIUS = 0.41;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SPIN_MS = 760;

export function TurnKeySolution() {
  const [active, setActive] = useState<number | null>(null);
  const [lastActive, setLastActive] = useState(0);
  const [modal, setModal] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const [rot, setRot] = useState(0);

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


  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen !== null) {
        setMobileOpen(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  const isActive = active !== null;
  const isModal = modal !== null;
  const shown = active ?? lastActive;
  const R = size * RADIUS;

  const select = (i: number) => {
    if (active === i) {
      setActive(null);
      return;
    }
    const target = -BASE[i];
    const delta = (((target - rot + 180) % 360) + 360) % 360 - 180;
    setRot(rot + delta);
    setLastActive(i);
    setActive(i);
  };

  return (
    <section
      className="overflow-hidden border-y border-mist bg-white py-24 sm:py-28"
      onClick={() => {
        setActive(null);
        setMobileOpen(null);
      }}
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
          className="relative mx-auto mt-16 hidden aspect-square w-full max-w-[670px] translate-x-3 sm:translate-x-0 lg:block"
        >
          <div className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle_at_center,rgba(190,152,90,0.10),rgba(190,152,90,0)_66%)]" />
          <div className="absolute inset-[12%] rounded-full border border-mist/40 shadow-[0_10px_30px_-18px_rgba(26,26,26,0.18)]" />

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

          <div
            className="pointer-events-none absolute left-1/2 top-[13%] z-[25] w-px -translate-x-1/2 bg-gradient-to-b from-gold/70 to-gold/0"
            style={{
              height: "7%",
              opacity: isActive && !isModal ? 1 : 0,
              transition: `opacity 400ms ${EASE} ${isActive ? "260ms" : "0ms"}`
            }}
          />

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
                    transform: `translate(-50%, -50%) rotate(${BASE[i]}deg) translateY(${-R}px) rotate(${-BASE[i]}deg)`,
                    zIndex: activeThis ? 5 : 1
                  }}
                >
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
        </div>


        <div 
          className="relative mt-20 lg:hidden h-[400px]"
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="pointer-events-none absolute -right-[16.25rem] top-[55%] h-[680px] w-[480px] max-w-none -translate-y-1/2">
            <Image
              src={turnKey.aircraft}
              alt="Business jet, top-down view"
              fill
              sizes="440px"
              className="object-contain object-right drop-shadow-[0_24px_44px_rgba(6,15,28,0.16)]"
            />
          </div>

          <div className="relative z-10 flex w-[72%] max-w-md flex-col gap-2 translate-y-6">
            {services.map((s, i) => {
              const Icon = ICONS[s.icon] ?? ShoppingCart;
              const open = mobileOpen === i;
              const compact = mobileOpen !== null && !open;
              const pad = compact ? "py-1.5" : "py-3";
              return (
                <div key={s.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileOpen(open ? null : i);
                    }}
                    className={`flex w-full items-center gap-3 overflow-hidden rounded-pill border px-5 transition-all duration-300 ${pad} ${
                      open
                        ? "border-gold bg-gold text-white shadow-md"
                        : "border-mist bg-white text-graphite shadow-card hover:border-gold/60"
                    }`}
                  >
                    <Icon
                      className={`shrink-0 transition-all duration-300 ${
                        compact ? "h-3.5 w-3.5" : "h-4 w-4"
                      } ${open ? "text-white" : "text-gold"}`}
                      strokeWidth={2}
                    />
                    <span
                      className={`min-w-0 truncate font-sans font-medium transition-all duration-300 ${
                        compact ? "text-xs" : "text-sm"
                      } ${open ? "font-semibold text-white" : "text-graphite"}`}
                    >
                      {s.label}
                    </span>
                  </button>

                  {open && (
                    <div
                      className="mt-2 w-[130%] sm:w-[140%] max-w-lg rounded-card border border-mist/70 bg-white p-5 text-left shadow-modal"
                      style={{ animation: `tk-expand 360ms ${EASE} both` }}
                    >
                      <p className="font-sans text-sm leading-relaxed text-slate">
                        {s.description}
                      </p>
                      <div className="my-4 h-px w-full bg-mist" />
                      <Link
                        href="/contact"
                        className="flex w-full items-center justify-between gap-2 rounded-card bg-gold px-4 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
                      >
                        {CTA[s.icon] ?? "Learn More"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {modal !== null && (
          <div className="fixed inset-0 z-[60] hidden items-center justify-center p-4 lg:flex">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setModal(null)}
              className="absolute inset-0 cursor-default bg-night/40 backdrop-blur-md"
            />
            <div
              className="relative z-10 w-full max-w-md rounded-card border border-mist/70 bg-white p-9 text-center shadow-modal"
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
              <h3 className="display mt-5 text-3xl text-ink">
                {services[modal].label}
              </h3>
              <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-slate">
                {services[modal].description}
              </p>
              <div className="mx-auto my-5 h-px w-full bg-mist" />
              <Link
                href="/contact"
                className="flex w-full items-center justify-between gap-2 rounded-card bg-gold px-5 py-3 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
              >
                {CTA[services[modal].icon] ?? "Learn More"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
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
        @keyframes tk-expand {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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