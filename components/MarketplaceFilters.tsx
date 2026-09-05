"use client";

import { useState } from "react";
import { Filter, RotateCcw, ChevronDown, Search as SearchIcon } from "lucide-react";
import { Dropdown } from "@/components/Dropdown";
import { aircraftManufacturers, aircraftStatuses } from "@/data/aircraft";

export const advancedCategories = [
  "Light",
  "Midsize",
  "Super-Mid",
  "Heavy",
  "Turboprop",
  "Helicopter"
] as const;

export type MarketFilters = {
  manufacturer: string;
  search: string;
  status: string;
  minRange: number;
  minPassengers: number;
  minYear: number;
  minHours: number;
  minPriceM: number;
  categories: string[];
  wifi: boolean;
};

export const emptyFilters: MarketFilters = {
  manufacturer: "",
  search: "",
  status: "",
  minRange: 0,
  minPassengers: 1,
  minYear: 1970,
  minHours: 0,
  minPriceM: 0,
  categories: [],
  wifi: false
};

export function MarketplaceFilters({
  value,
  onChange,
  onReset,
  onSearch
}: {
  value: MarketFilters;
  onChange: (next: MarketFilters) => void;
  onReset: () => void;
  onSearch: () => void;
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const set = (patch: Partial<MarketFilters>) => onChange({ ...value, ...patch });
  const toggleCat = (c: string) =>
    set({
      categories: value.categories.includes(c)
        ? value.categories.filter((x) => x !== c)
        : [...value.categories, c]
    });

  return (
    <aside className="rounded-card border border-mist/70 bg-white p-6 shadow-card lg:sticky lg:top-24">
      <div className="mb-6 flex items-center gap-2">
        <Filter className="h-5 w-5 text-ink" strokeWidth={2} />
        <h2 className="display text-xl text-ink">Filters</h2>
      </div>

      <div className="flex flex-col gap-5">
        <Field label="Manufacturer">
          <Dropdown
            value={value.manufacturer}
            onChange={(v) => set({ manufacturer: v })}
            placeholder="Select manufacturer"
            options={aircraftManufacturers}
          />
        </Field>

        <Field label="Search">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input
              value={value.search}
              onChange={(e) => set({ search: e.target.value })}
              placeholder="Search aircraft..."
              className="w-full rounded-card border border-mist bg-white px-4 py-2.5 pl-10 font-sans text-sm text-ink placeholder:text-slate/60 outline-none transition focus:outline-none focus:ring-0 focus:rounded-card"
            />
          </div>
        </Field>

        <Field label="Status">
          <Dropdown
            value={value.status}
            onChange={(v) => set({ status: v })}
            placeholder="Select status"
            options={[...aircraftStatuses]}
          />
        </Field>

        {/* Advanced Options */}
        <div className="rounded-card border border-mist">
          <button
            type="button"
            onClick={() => setAdvancedOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 font-sans text-sm font-semibold text-ink"
          >
            Advanced Options
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                advancedOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {advancedOpen && (
            <div className="flex flex-col gap-6 border-t border-mist px-4 py-5">
              <RangeSlider
                label="Range (NM)"
                min={0}
                max={15000}
                step={100}
                value={value.minRange}
                onChange={(v) => set({ minRange: v })}
                minLabel="0"
                maxLabel="15k+"
              />
              <RangeSlider
                label="Passenger Load"
                min={1}
                max={30}
                step={1}
                value={value.minPassengers}
                onChange={(v) => set({ minPassengers: v })}
                minLabel="1"
                maxLabel="30"
              />
              <RangeSlider
                label="Year"
                min={1970}
                max={2026}
                step={1}
                value={value.minYear}
                onChange={(v) => set({ minYear: v })}
                minLabel="1970"
                maxLabel="2026"
              />
              <RangeSlider
                label="Total Hours Since New"
                min={0}
                max={15000}
                step={100}
                value={value.minHours}
                onChange={(v) => set({ minHours: v })}
                minLabel="0"
                maxLabel="15k+"
              />
              <RangeSlider
                label="Price (USD)"
                min={0}
                max={100}
                step={1}
                value={value.minPriceM}
                onChange={(v) => set({ minPriceM: v })}
                minLabel="$0M"
                maxLabel="$100M"
              />

              <div>
                <p className="mb-3 font-sans text-sm font-semibold text-ink">Category</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {advancedCategories.map((c) => (
                    <Checkbox
                      key={c}
                      label={c}
                      checked={value.categories.includes(c)}
                      onChange={() => toggleCat(c)}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <Checkbox
                    label="Wi-Fi/Connectivity Required"
                    checked={value.wifi}
                    onChange={() => set({ wifi: !value.wifi })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="mt-1 w-full rounded-card bg-gold px-4 py-3 font-sans text-sm font-semibold text-white transition hover:bg-gold-deep"
        >
          Search Marketplace
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 font-sans text-sm font-semibold text-graphite transition hover:text-ink"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </button>
      </div>
    </aside>
  );
}

function RangeSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  minLabel,
  maxLabel
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  minLabel: string;
  maxLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-sans text-sm font-semibold text-ink">{label}</span>
        {value !== min && (
          <span className="font-sans text-xs font-semibold text-gold">{value.toLocaleString()}</span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-gold"
        style={{
          background: `linear-gradient(#BE985A,#BE985A) 0/${pct}% 100% no-repeat, #E6E6E6`
        }}
      />
      <div className="mt-1.5 flex items-center justify-between font-sans text-xs text-slate">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 font-sans text-sm text-graphite">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-[4px] border transition ${
          checked ? "border-gold bg-gold text-white" : "border-slate/50 bg-white"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            <path d="M2.5 6.2 4.8 8.5 9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
