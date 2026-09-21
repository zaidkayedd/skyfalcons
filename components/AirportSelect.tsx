"use client";

import { useEffect, useRef, useState } from "react";
import { Plane, Search, ChevronsUpDown } from "lucide-react";
import { airports } from "@/data/airports";

export function AirportSelect({
  value,
  onChange,
  placeholder = "Search airports...",
  inline = false
}: {
  value?: string;
  onChange: (code: string) => void;
  placeholder?: string;
  inline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const selected = airports.find((a) => a.code === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const s = q.toLowerCase();
  const filtered = airports
    .filter(
      (a) =>
        !s ||
        a.code.toLowerCase().includes(s) ||
        a.name.toLowerCase().includes(s) ||
        a.city.toLowerCase().includes(s)
    )
    .slice(0, 60);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-2 rounded-card border bg-white px-4 py-2.5 text-left font-sans text-sm outline-none transition ${
          open ? "border-gold" : "border-mist hover:border-gold/60"
        } ${selected ? "text-ink" : "text-slate/70"}`}
      >
        <span className="flex items-center gap-2 truncate">
          <Plane className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
          {selected ? `${selected.code} — ${selected.name}` : placeholder}
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate" />
      </button>

      {open && (
        <div className={`${inline ? "relative" : "absolute z-[90]"} mt-2 w-full min-w-[280px] overflow-hidden rounded-card border border-mist bg-white shadow-modal`}>
          <div className="flex items-center gap-2 border-b border-mist px-3 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-slate" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search airports..."
              className="w-full bg-transparent font-sans text-sm text-ink placeholder:text-slate/60 outline-none"
            />
          </div>
          <div className="max-h-64 overflow-y-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filtered.length === 0 && (
              <div className="px-4 py-3 font-sans text-sm text-slate">No airports found</div>
            )}
            {filtered.map((a) => {
              const sel = a.code === value;
              return (
                <button
                  key={a.code}
                  type="button"
                  onClick={() => {
                    onChange(a.code);
                    setOpen(false);
                    setQ("");
                  }}
                  className={`flex w-full flex-col items-start px-4 py-2 text-left transition ${
                    sel ? "bg-gold text-white" : "hover:bg-porcelain"
                  }`}
                >
                  <span className="font-sans text-sm">
                    <span className="font-semibold">{a.code}</span>{" "}
                    <span className={sel ? "text-white" : "text-graphite"}>{a.name}</span>
                  </span>
                  <span className={`font-sans text-xs ${sel ? "text-white/80" : "text-slate"}`}>
                    {a.city}, {a.country}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}