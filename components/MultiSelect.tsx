"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";

export function MultiSelect({
  value,
  onChange,
  options,
  placeholder = "Select…",
  noun = "selected"
}: {
  value: string[];
  onChange: (v: string[]) => void;
  options: string[];
  placeholder?: string;
  noun?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const toggle = (o: string) =>
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-2 rounded-card border bg-white px-4 py-2.5 text-left font-sans text-sm outline-none transition ${
          open ? "border-gold" : "border-mist hover:border-gold/60"
        } ${value.length ? "text-ink" : "text-slate/70"}`}
      >
        <span className="truncate">
          {value.length ? `${value.length} ${noun}` : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-[90] mt-2 max-h-64 w-full overflow-y-auto rounded-card border border-mist bg-white py-1 shadow-modal [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {options.map((o) => {
            const on = value.includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggle(o)}
                className="flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-porcelain"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    on ? "border-gold bg-gold text-white" : "border-mist"
                  }`}
                >
                  {on && <Check className="h-3 w-3" />}
                </span>
                <span className="font-sans text-sm text-graphite">{o}</span>
              </button>
            );
          })}
        </div>
      )}

      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 rounded-pill bg-ink px-3 py-1 font-sans text-xs font-semibold text-white"
            >
              {v}
              <button type="button" onClick={() => toggle(v)} aria-label={`Remove ${v}`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}