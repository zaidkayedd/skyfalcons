"use client";

import { useEffect, useRef, useState } from "react";
import map from "@/data/worldmap.json";

/**
 * STRATEGIC ALLIANCE MAP — faithful recreation of the live skyfalcons.com
 * "Strategic Alliance Landscape" section: a dotted world map (real country
 * geometry rasterized to a dot grid) with animated gold flight-path arcs
 * radiating from the Amman hub to partner cities, each with a label.
 * City list & coordinates: data/worldmap.json ([REPLACE] to match exactly).
 */

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
const hub = cities.find((c) => c.hub)!;
const spokes = cities.filter((c) => !c.hub);

// Precompute all continent dots as ONE SVG path (tiny filled circles) so the
// map renders a single DOM node instead of 3k+ <circle> elements.
const R = 1.6;
const DOTS_PATH = dots
  .map(
    ([x, y]) =>
      `M${x} ${(y - R).toFixed(1)}a${R} ${R} 0 1 0 0 ${(R * 2).toFixed(1)}a${R} ${R} 0 1 0 0 ${(-R * 2).toFixed(1)}`
  )
  .join("");

function arcPath(from: City, to: City) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  // lift control point perpendicular to the chord for a gentle curve
  const lift = Math.min(dist * 0.28, 90);
  const nx = -dy / (dist || 1);
  const ny = dx / (dist || 1);
  const cx = mx + nx * lift;
  const cy = my + ny * lift - 6;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

export function StrategicAllianceMap() {
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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <svg
        viewBox={`0 0 ${VBW} ${VBH}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Strategic alliance world map"
      >
        {/* dotted continents — a single path node (3k+ dots) for performance */}
        <path fill="currentColor" className="text-mist" d={DOTS_PATH} />

        {/* arcs from hub — draw out (start→end) then retract (end→start), looping */}
        <g fill="none" strokeLinecap="round" className="text-gold">
          {spokes.map((c, i) => {
            const d = arcPath(hub, c);
            return (
              <path
                key={c.name}
                d={d}
                stroke="currentColor"
                strokeWidth={1.7}
                pathLength={1}
                className="arc-draw"
                style={{
                  strokeDasharray: 1,
                  animationDelay: "0s",
                  opacity: drawn ? 1 : 0,
                  transition: "opacity 500ms ease"
                }}
              />
            );
          })}
        </g>

        {/* city points + labels */}
        <g>
          {cities.map((c) => (
            <CityMarker key={c.name} city={c} drawn={drawn} />
          ))}
        </g>
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

  // top-left of the label pill relative to the point
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
        transition: "opacity 600ms ease 400ms"
      }}
    >
      {city.hub && (
        <circle cx={city.x} cy={city.y} r={5} className="fill-gold">
          <animate
            attributeName="r"
            values="5;13;5"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.45;0;0.45"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <circle
        cx={city.x}
        cy={city.y}
        r={city.hub ? 5 : 3.5}
        className="fill-gold"
      />
      <g transform={`translate(${lx}, ${ly})`}>
        <rect
          width={w}
          height={h}
          rx={4}
          className="fill-white stroke-mist"
          strokeWidth={0.6}
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
