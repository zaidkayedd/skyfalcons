"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Home has a full-bleed hero, so the bar starts transparent there.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const atTop = currentScrollY <= 24;

      setHiddenOnScroll(!atTop && currentScrollY > lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !overHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
        !open && hiddenOnScroll
          ? "-translate-y-[calc(100%+1rem)]"
          : "translate-y-0",
        // Changed from md: to lg: so iPads and tablets use mobile view:
        "lg:top-4 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:max-w-6xl lg:w-[calc(100%-3rem)] lg:rounded-full",
        solid
          ? "bg-porcelain/90 backdrop-blur-md border-b lg:border border-mist shadow-lg shadow-black/5"
          : "bg-porcelain/90 backdrop-blur-md border-b border-white/10 lg:border lg:border-white/15 lg:bg-porcelain/80"
      )}
    >
      <nav className="mx-auto flex h-[72px] max-w-content items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            src="/logos/goldIcon.png"
            alt="Sky Falcons"
            width={108}
            height={29}
            priority
            className="h-12 w-auto translate-y-0"
          />
        </Link>

        {/* Desktop links (now lg:) */}
        <ul className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    solid ? "text-graphite" : "text-graphite",
                    "hover:text-gold",
                    active && "text-gold"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle (now lg:hidden) */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex h-10 w-10 items-center justify-center lg:hidden",
            solid ? "text-ink" : "text-ink"
          )}
        >
          <div className="relative h-4 w-6">
            <span
              className={cn(
                "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
                open ? "top-1.5 rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 h-0.5 w-6 bg-current transition-all duration-300",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
                open ? "top-1.5 -rotate-45" : "top-3"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile drawer (now lg:hidden) */}
      <div
        className={cn(
          "lg:hidden overflow-hidden bg-porcelain transition-[max-height] duration-500 ease-premium rounded-b-2xl",
          open ? "max-h-96 border-b border-mist" : "max-h-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-card px-3 py-3 text-base font-medium",
                  pathname === item.href
                    ? "bg-ink/5 text-gold"
                    : "text-graphite hover:bg-ink/5"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/contact"
              className="block rounded-card bg-gold px-3 py-3 text-center text-base font-semibold text-ink"
            >
              Get in touch
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}