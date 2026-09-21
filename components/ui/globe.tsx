"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 2500,
  height: 2500,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.15,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 12000,
  mapBrightness: 1,
  scale: 1.05,
  baseColor: [1, 1, 1],
  markerColor: [190 / 255, 152 / 255, 90 / 255],
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const rRef = useRef(0);
  const pointer = useRef<number | null>(null);
  const pointerMove = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement ?? canvas;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let visible = false;

    const resize = () => {
      widthRef.current = canvas.offsetWidth;
    };
    window.addEventListener("resize", resize);

    const create = () => {
      if (globe) return;
      resize();
      globe = createGlobe(canvas, {
        ...config,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        onRender: (state) => {
          if (pointer.current === null) phiRef.current += 0.003;
          state.phi = phiRef.current + rRef.current;
          state.width = widthRef.current * 2;
          state.height = widthRef.current * 2;
        }
      });
      requestAnimationFrame(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = "1";
      });
    };
    const destroy = () => {
      if (globe) {
        globe.destroy();
        globe = null;
      }
      if (canvasRef.current) canvasRef.current.style.opacity = "0";
    };

    // Only run the WebGL globe while it's actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) create();
        else destroy();
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    return () => {
      window.removeEventListener("resize", resize);
      io.disconnect();
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("absolute inset-0 h-full w-full", className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        onPointerDown={(e) => {
          pointer.current = e.clientX - pointerMove.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointer.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerLeave={() => {
          pointer.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerMove={(e) => {
          if (pointer.current !== null) {
            const delta = e.clientX - pointer.current;
            pointerMove.current = delta;
            rRef.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (e.touches[0] && pointer.current !== null) {
            const delta = e.touches[0].clientX - pointer.current;
            pointerMove.current = delta;
            rRef.current = delta / 200;
          }
        }}
      />
    </div>
  );
}
