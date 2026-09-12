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
        className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[1.18] contrast-[1.02]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={homeHero.videoSrc} type="video/mp4" />
      </video>

      {/* lighter overlays — keep just enough contrast for the copy */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/65 via-night/15 to-night/15" />
      {/* subtle white wash */}
      <div className="absolute inset-0 -z-10 bg-white/10" />

      <Container className="pt-24">
        <div className="max-w-4xl animate-fade-up">
          <h1 className="display tracking-tight text-white leading-[1.03] text-[clamp(2rem,8vw,4.5rem)] lg:text-[6rem] lg:leading-[0.92]">
            <span className="block">{homeHero.line1}</span>
            <span className="block">
              <span className="text-gold">{homeHero.line2Gold}</span>{" "}
              {homeHero.line2Rest}
            </span>
            <span className="block">{homeHero.line3}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-8 sm:text-lg lg:text-xl">
            {homeHero.body}
          </p>
        </div>
      </Container>

      {/* Service line */}
   <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-pill border border-white/40 p-1">
          <div className="mx-auto h-2 w-1 animate-bounce rounded-pill bg-white/70" />
        </div>
      </div>
    </section>
  );
}
