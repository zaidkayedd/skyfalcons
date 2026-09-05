"use client";

import { useEffect, useRef } from "react";
import map from "@/data/worldmap.json";

/**
 * GLOBE CANVAS — a 3D dotted Earth rendered on a 2D canvas (no WebGL deps).
 * Continent dots come from data/worldmap.json (equirectangular), projected onto
 * a rotating sphere with orthographic projection + depth-based opacity. A faint
 * full-sphere dot lattice adds density; gold location points sit on the real
 * coordinates, and multiple animated gold routes travel along great-circle
 * paths between them, fading on the far side of the globe.
 */

type Vec3 = [number, number, number];

const [VBW, VBH] = map.viewBox as [number, number];
const RAW_DOTS = map.dots as [number, number][];
const CITIES = map.cities as { name: string; x: number; y: number; hub?: boolean }[];

const GOLD = "190,152,90";

function toVec(x: number, y: number): Vec3 {
  const lon = ((x / VBW) * 360 - 180) * (Math.PI / 180);
  const lat = (90 - (y / VBH) * 180) * (Math.PI / 180);
  return [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
}
function fromLatLon(latDeg: number, lonDeg: number): Vec3 {
  const lat = latDeg * (Math.PI / 180);
  const lon = lonDeg * (Math.PI / 180);
  return [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
}

// Continent dots + a denser full-sphere lattice (more dots overall).
const DOTS: Vec3[] = RAW_DOTS.map(([x, y]) => toVec(x, y));
const LATTICE: Vec3[] = (() => {
  const out: Vec3[] = [];
  for (let lat = -84; lat <= 84; lat += 6) {
    // keep roughly even spacing by scaling lon step with latitude
    const step = Math.max(6, 6 / Math.max(0.18, Math.cos((lat * Math.PI) / 180)));
    for (let lon = -180; lon < 180; lon += step) out.push(fromLatLon(lat, lon));
  }
  return out;
})();
const CITY_VECS: Vec3[] = CITIES.map((c) => toVec(c.x, c.y));

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  let dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  dot = Math.max(-1, Math.min(1, dot));
  const omega = Math.acos(dot);
  const so = Math.sin(omega);
  if (so < 1e-4) return a;
  const k0 = Math.sin((1 - t) * omega) / so;
  const k1 = Math.sin(t * omega) / so;
  return [a[0] * k0 + b[0] * k1, a[1] * k0 + b[1] * k1, a[2] * k0 + b[2] * k1];
}

// Build a rich edge set: hub → every city (spokes) + a ring of neighbours.
const HUB = Math.max(0, CITIES.findIndex((c) => c.hub) );
const HUB_I = HUB < 0 ? 0 : HUB;
const ORDER = CITIES.map((_, i) => i).sort((a, b) => CITIES[a].x - CITIES[b].x);
const EDGES: [number, number][] = (() => {
  const set = new Set<string>();
  const e: [number, number][] = [];
  const add = (i: number, j: number) => {
    if (i === j) return;
    const key = i < j ? `${i}-${j}` : `${j}-${i}`;
    if (set.has(key)) return;
    set.add(key);
    e.push([i, j]);
  };
  CITIES.forEach((_, i) => add(HUB_I, i)); // spokes from the hub
  for (let k = 0; k < ORDER.length; k++) add(ORDER[k], ORDER[(k + 1) % ORDER.length]); // ring
  return e;
})();
const ESAMP = 72;
const EDGE_PTS: Vec3[][] = EDGES.map(([i, j]) =>
  Array.from({ length: ESAMP + 1 }, (_, k) => slerp(CITY_VECS[i], CITY_VECS[j], k / ESAMP))
);

export function GlobeCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0,
      H = 0,
      dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0.01
    });
    io.observe(canvas);

    let rot = -0.6;
    let t = 0; // global animation clock (seconds)
    let raf = 0;
    let last = performance.now();

    const rotY = (v: Vec3, c: number, s: number): Vec3 => [
      v[0] * c + v[2] * s,
      v[1],
      -v[0] * s + v[2] * c
    ];

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduce) {
        rot += dt * 0.12;
        t += dt;
      }
      raf = requestAnimationFrame(draw);
      if (!visible) return;

      const isCompact = W < 640;
      const R = Math.min(H * (isCompact ? 1.22 : 0.98), W * (isCompact ? 0.5 : 0.52));
      const cx = W * (isCompact ? 1.03 : 0.82);
      const cy = H * 0.52;
      const c = Math.cos(rot),
        s = Math.sin(rot);

      ctx.clearRect(0, 0, W, H);

      // bright sphere
      const grad = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.32, R * 0.06, cx, cy, R);
      grad.addColorStop(0, "rgba(255,255,253,0.99)");
      grad.addColorStop(0.62, "rgba(252,251,247,0.98)");
      grad.addColorStop(0.8, "rgba(238,236,230,0.9)");
      grad.addColorStop(0.94, "rgba(211,208,199,0.66)");
      grad.addColorStop(1, "rgba(190,187,178,0.18)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // faint full-sphere lattice (adds density)
      for (let i = 0; i < LATTICE.length; i++) {
        const v = rotY(LATTICE[i], c, s);
        if (v[2] <= 0.03) continue;
        const px = cx + v[0] * R;
        const py = cy - v[1] * R;
        ctx.beginPath();
        ctx.arc(px, py, 0.7 * v[2] + 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,120,120,${0.05 + v[2] * 0.13})`;
        ctx.fill();
      }

      // continent dots
      for (let i = 0; i < DOTS.length; i++) {
        const v = rotY(DOTS[i], c, s);
        if (v[2] <= 0.02) continue;
        const px = cx + v[0] * R;
        const py = cy - v[1] * R;
        const facing = v[2];
        ctx.beginPath();
        ctx.arc(px, py, 0.5 + 1.3 * facing, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50,50,50,${0.18 + facing * 0.62})`;
        ctx.fill();
      }

      // MULTIPLE animated routes — faint persistent great-circles + travelling pulses
      ctx.lineCap = "round";
      for (let e = 0; e < EDGE_PTS.length; e++) {
        const pts = EDGE_PTS[e];
        const proj: ({ x: number; y: number; f: number } | null)[] = new Array(pts.length);
        for (let k = 0; k < pts.length; k++) {
          const v = rotY(pts[k], c, s);
          proj[k] = v[2] <= 0.02 ? null : { x: cx + v[0] * R, y: cy - v[1] * R, f: v[2] };
        }
        // faint base line
        ctx.lineWidth = 0.9;
        for (let k = 1; k < proj.length; k++) {
          const a = proj[k - 1],
            b = proj[k];
          if (!a || !b) continue;
          ctx.strokeStyle = `rgba(${GOLD},${Math.min(a.f, b.f) * 0.16})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        // travelling pulse (staggered per edge) — one continuous, smooth stroke
        const phase = (t * 0.16 + e * 0.137) % 1;
        const win = 0.2;
        const lo = phase - win;
        ctx.lineWidth = 1.6;
        ctx.lineJoin = "round";
        let started = false;
        for (let k = 0; k < proj.length; k++) {
          const tt = k / ESAMP;
          const inWin = tt >= lo && tt <= phase;
          const p = proj[k];
          if (inWin && p) {
            if (!started) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else if (started) {
            // close the current continuous run with a soft gold stroke
            const gp = proj[Math.min(k, proj.length - 1)];
            const strength = gp ? gp.f : 0.6;
            ctx.strokeStyle = `rgba(${GOLD},${strength * 0.85})`;
            ctx.stroke();
            started = false;
          }
        }
        if (started) {
          ctx.strokeStyle = `rgba(${GOLD},0.85)`;
          ctx.stroke();
        }
        // bright head at the fractional phase position (interpolated → no stepping)
        const fk = phase * ESAMP;
        const k0 = Math.floor(fk);
        const a0 = proj[k0];
        const a1 = proj[Math.min(k0 + 1, proj.length - 1)];
        if (a0 && a1) {
          const fr = fk - k0;
          const hx = a0.x + (a1.x - a0.x) * fr;
          const hy = a0.y + (a1.y - a0.y) * fr;
          const hf = a0.f + (a1.f - a0.f) * fr;
          const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 5.5);
          g.addColorStop(0, `rgba(${GOLD},${hf * 0.85})`);
          g.addColorStop(1, `rgba(${GOLD},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(hx, hy, 5.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // gold location points (above everything)
      for (let i = 0; i < CITY_VECS.length; i++) {
        const v = rotY(CITY_VECS[i], c, s);
        if (v[2] <= -0.05) continue;
        const facing = Math.max(0, v[2]);
        const px = cx + v[0] * R;
        const py = cy - v[1] * R;
        const halo = ctx.createRadialGradient(px, py, 0, px, py, 11);
        halo.addColorStop(0, `rgba(${GOLD},${0.35 * facing})`);
        halo.addColorStop(1, `rgba(${GOLD},0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(px, py, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233,206,156,${0.5 + facing * 0.5})`;
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={className} aria-hidden="true" role="presentation" />
  );
}
