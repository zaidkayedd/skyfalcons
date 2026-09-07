"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { homeHero } from "@/data/home";

/**
 * HOME HERO — full-bleed autoplaying video with a large three-line headline
 * and a centered service line at the bottom.
 */
export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    if (v.readyState >= 2) tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={homeHero.videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/50 to-night/40" />
      <div className="absolute inset-0 -z-10 bg-ink/20 mix-blend-multiply" />

      <Container className="pt-24">
        <div className="max-w-4xl animate-fade-up">
          <h1 className="display leading-[0.92] tracking-tight text-white text-6xl sm:text-7xl lg:text-8xl">
            <span className="block">{homeHero.line1}</span>
            <span className="block">
              <span className="text-gold">{homeHero.line2Gold}</span>{" "}
              {homeHero.line2Rest}
            </span>
            <span className="block">{homeHero.line3}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {homeHero.body}
          </p>
        </div>
      </Container>

      {/* Service line */}
      <div className="hidden lg:flex absolute bottom-9 left-1/2 -translate-x-1/2 px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-sm font-semibold text-white sm:text-base">
          {homeHero.links.map((l, i) => (
            <span key={l.label} className="flex items-center gap-4">
              {i > 0 && <span className="text-gold/70">|</span>}
              <Link href={l.href} className="transition-colors hover:text-gold">
                {l.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
