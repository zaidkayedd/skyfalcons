"use client";

import { useEffect, useRef } from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { homeHero } from "@/data/home";
import { splitDisplayText } from "@/lib/utils";

/**
 * HOME HERO — cinematic full-width autoplaying video (no poster).
 * The video is small + fast-start and playback is forced via a ref, so it
 * comes up right away over the dark background.
 */
export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; // ensure muted so autoplay is allowed
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
      {/* Video */}
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

      {/* Overlays for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/50 to-night/40" />
      <div className="absolute inset-0 -z-10 bg-ink/20 mix-blend-multiply" />

      <Container className="pt-24">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="display text-5xl text-white sm:text-6xl lg:text-7xl">
            {splitDisplayText(homeHero.eyebrow)}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            {homeHero.body}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={homeHero.primary.href} variant="gold">
              {homeHero.primary.label}
            </Button>
            <Button
              href={homeHero.secondary.href}
              variant="outline"
              className="border-white/40 text-white hover:border-white hover:bg-transparent hover:text-ink"
            >
              {homeHero.secondary.label}
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-pill border border-white/40 p-1">
          <div className="mx-auto h-2 w-1 animate-bounce rounded-pill bg-white/70" />
        </div>
      </div>
    </section>
  );
}
