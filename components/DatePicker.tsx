"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function parse(value?: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function fmtValue(d: Date) {
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
function fmtLabel(d: Date) {
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * Custom, brand-styled date picker (no native input, no deps).
 */
export function DatePicker({
  value,
  onChange,
  placeholder = "Select a date",
  min
}: {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: Date;
}) {
  const selected = parse(value);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(() => selected ?? new Date());
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

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const minDay = min ? new Date(min.getFullYear(), min.getMonth(), min.getDate()) : null;

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-3 rounded-card border bg-white px-4 py-3 text-left font-sans text-sm outline-none transition ${
          open ? "border-gold" : "border-mist hover:border-gold/60"
        } ${selected ? "text-ink" : "text-slate/70"}`}
      >
        <span>{selected ? fmtLabel(selected) : placeholder}</span>
        <Calendar className="h-4 w-4 shrink-0 text-gold" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-[300px] rounded-card border border-mist bg-white p-4 shadow-modal">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => setView(new Date(year, month - 1, 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-graphite transition hover:bg-porcelain hover:text-ink"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-sans text-sm font-semibold text-ink">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setView(new Date(year, month + 1, 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-graphite transition hover:bg-porcelain hover:text-ink"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((w) => (
              <div
                key={w}
                className="flex h-8 items-center justify-center font-sans text-[11px] font-semibold uppercase text-slate"
              >
                {w}
              </div>
            ))}
            {cells.map((d, i) => {
              if (!d) return <div key={`e${i}`} />;
              const isSel = selected && sameDay(d, selected);
              const isToday = sameDay(d, today);
              const disabled = minDay && d < minDay;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!!disabled}
                  onClick={() => {
                    onChange(fmtValue(d));
                    setOpen(false);
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full font-sans text-sm transition ${
                    isSel
                      ? "bg-gold font-semibold text-white"
                      : disabled
                        ? "cursor-not-allowed text-slate/30"
                        : "text-graphite hover:bg-porcelain hover:text-ink"
                  } ${isToday && !isSel ? "ring-1 ring-gold/50" : ""}`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
