"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

// SkyFalcons brand colours: light globe + gold markers.
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [190 / 255, 152 / 255, 90 / 255], // brand gold
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 }
  ]
};

export function Globe({
  className,
  config = GLOBE_CONFIG
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a FRESH <canvas> for every mount. React StrictMode (dev) mounts →
    // cleans up (cobe loses the WebGL context) → re-mounts on the same node;
    // reusing that poisoned canvas is what makes getContext() return null.
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 0.5s";
    canvas.style.cursor = "grab";
    (canvas.style as unknown as { contain: string }).contain = "layout paint size";
    container.appendChild(canvas);

    let phi = 0;
    let r = 0;
    let width = 0;
    let pointerInteracting: number | null = null;
    let pointerMovement = 0;

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const onDown = (e: PointerEvent) => {
      pointerInteracting = e.clientX - pointerMovement;
      canvas.style.cursor = "grabbing";
    };
    const onUp = () => {
      pointerInteracting = null;
      canvas.style.cursor = "grab";
    };
    const onMove = (e: PointerEvent) => {
      if (pointerInteracting !== null) {
        const delta = e.clientX - pointerInteracting;
        pointerMovement = delta;
        r = delta / 200;
      }
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0] && pointerInteracting !== null) {
        const delta = e.touches[0].clientX - pointerInteracting;
        pointerMovement = delta;
        r = delta / 200;
      }
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerout", onUp);
    canvas.addEventListener("mousemove", onMove as EventListener);
    canvas.addEventListener("touchmove", onTouch as EventListener);

    let globe: ReturnType<typeof createGlobe> | null = null;
    const size = (width || 500) * 2; // never 0

    try {
      globe = createGlobe(canvas, {
        ...config,
        width: size,
        height: size,
        onRender: (state) => {
          if (!pointerInteracting) phi += 0.005;
          state.phi = phi + r;
          state.width = (width || 500) * 2;
          state.height = (width || 500) * 2;
        }
      });
      requestAnimationFrame(() => {
        canvas.style.opacity = "1";
      });
    } catch (err) {
      // WebGL unavailable — fail gracefully (blank) instead of throwing.
      // eslint-disable-next-line no-console
      console.error("Globe: WebGL init failed", err);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerout", onUp);
      canvas.removeEventListener("mousemove", onMove as EventListener);
      canvas.removeEventListener("touchmove", onTouch as EventListener);
      if (globe) globe.destroy();
      canvas.remove(); // discard the (now context-lost) canvas
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    />
  );
}
