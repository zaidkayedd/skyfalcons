"use client";

import { useEffect, useRef, useState } from "react";
import map from "@/data/worldmap.json";

type City = {
  name: string;
  x: number;
  y: number;
  hub?: boolean;
  side?: "above" | "below" | "left" | "right";
  dx?: number;
  dy?: number;
};

const [VBW, VBH] = map.viewBox as [number, number];
const cities = map.cities as City[];
const dots = map.dots as [number, number][];

const R = 1.6;
const DOTS_PATH = dots
  .map(
    ([x, y]) =>
      `M${x} ${(y - R).toFixed(1)}a${R} ${R} 0 1 0 0 ${(R * 2).toFixed(1)}a${R} ${R} 0 1 0 0 ${(-R * 2).toFixed(1)}`
  )
  .join("");

export function AnimatedNetworkGrid() {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl transition-all duration-700 transform">
      <svg
        viewBox={`0 0 ${VBW} ${VBH}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Strategic alliance world map with glowing city nodes"
      >

        <path fill="currentColor" className="text-slate/30" d={DOTS_PATH} />

 
      </svg>
    </div>
  );
}

function CityMarker({ city, drawn }: { city: City; drawn: boolean }) {
  const w = Math.max(city.name.length * 6.4 + 16, 40);
  const h = 18;
  const gap = 10;
  const side = city.side ?? "below";
  const dx = city.dx ?? 0;
  const dy = city.dy ?? 0;

  let lx = city.x - w / 2 + dx;
  let ly = city.y + gap + dy;
  if (side === "above") ly = city.y - gap - h + dy;
  if (side === "left") {
    lx = city.x - w - gap + dx;
    ly = city.y - h / 2 + dy;
  }
  if (side === "right") {
    lx = city.x + gap + dx;
    ly = city.y - h / 2 + dy;
  }

  return (
    <g
      style={{
        opacity: drawn ? 1 : 0,
        transform: drawn ? "scale(1)" : "scale(0.8)",
        transition: "opacity 500ms ease 300ms, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 300ms"
      }}
    >
      {city.hub && (
        <circle cx={city.x} cy={city.y} r={5} className="fill-gold">
          <animate
            attributeName="r"
            values="5;16;5"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <circle
        cx={city.x}
        cy={city.y}
        r={city.hub ? 5 : 3.5}
        className="fill-gold shadow-sm"
      />
      <g transform={`translate(${lx}, ${ly})`}>
        <rect
          width={w}
          height={h}
          rx={4}
          className="fill-white stroke-mist shadow-sm"
          strokeWidth={0.8}
        />
        <text
          x={w / 2}
          y={13}
          textAnchor="middle"
          className="fill-ink"
          style={{ fontSize: 10, fontWeight: 600, fontFamily: "var(--font-sans)" }}
        >
          {city.name}
        </text>
      </g>
    </g>
  );
}