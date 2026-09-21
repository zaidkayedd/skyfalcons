"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";


export function AircraftGallery({
  images,
  name
}: {
  images: string[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const hasImages = images.length > 0;
  const count = images.length;

  const go = (dir: number) =>
    setSelected((s) => (s + dir + count) % count);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);

  }, [lightbox, count]);

  return (
    <div className="flex flex-col gap-4">

      <div className="rounded-card border border-mist/70 bg-white overflow-hidden">
 
        <div className="group relative aspect-[16/10] overflow-hidden">
          {hasImages ? (
            <>
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="absolute inset-0 cursor-zoom-in"
                aria-label="View larger"
              >
                <Image
                  src={images[selected]}
                  alt={name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-contain p-4"
                  priority
                />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 shadow-card backdrop-blur transition group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </button>

     
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition hover:bg-gold hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

   
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition hover:bg-gold hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-porcelain">
              <img src="/logos/goldIcon.png" alt={name} className="w-1/3 opacity-90" />
            </div>
          )}
        </div>

        {count > 1 && (
          <div className="border-t border-mist/70 px-4 py-3 flex gap-2 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setSelected(i)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-[8px] border bg-white transition ${
                  i === selected
                    ? "border-gold ring-2 ring-gold/40"
                    : "border-mist hover:border-gold/60"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`${name} view ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1.5"
                />
              </button>
            ))}
          </div>
        )}
      </div>

  
      {lightbox && hasImages && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-night/90 p-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(false)}
            className="absolute inset-0 cursor-zoom-out"
          />
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous"
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next"
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative h-[78vh] w-[86vw]">
            <Image
              src={images[selected]}
              alt={name}
              fill
              sizes="86vw"
              className="object-contain"
            />
          </div>

          {count > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-sm text-white/70">
              {selected + 1} / {count}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
