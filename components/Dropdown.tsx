"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export type Option = { value: string; label: string };

export function Dropdown({
  value,
  onChange,
  options,
  placeholder = "Select…",
  className = "",
  buttonClassName = "",
  align = "start"
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[] | string[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  align?: "start" | "end";
}) {
  const opts: Option[] = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = opts.find((o) => o.value === value);

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

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-3 rounded-card border bg-white px-4 py-2.5 text-left font-sans text-sm outline-none transition ${
          open ? "border-gold" : "border-mist hover:border-gold/60"
        } ${selected ? "text-ink" : "text-slate/70"} ${buttonClassName}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute z-50 mt-2 max-h-64 w-full min-w-[12rem] overflow-auto rounded-card border border-mist bg-white p-1.5 shadow-modal [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          {opts.map((o) => {
            const active = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-2 text-left font-sans text-sm transition ${
                    active
                      ? "bg-gold/12 text-ink"
                      : "text-graphite hover:bg-porcelain hover:text-ink"
                  }`}
                >
                  <span className="truncate">{o.label}</span>
                  {active && <Check className="h-4 w-4 shrink-0 text-gold" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}