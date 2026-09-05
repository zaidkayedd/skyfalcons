"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/Container";
import { aircraft, sortOptions, perPageOptions } from "@/data/aircraft";
import { AircraftCard } from "@/components/AircraftCard";
import { Dropdown } from "@/components/Dropdown";
import {
  MarketplaceFilters,
  emptyFilters,
  type MarketFilters
} from "@/components/MarketplaceFilters";

const CATEGORY_MAP: Record<string, string> = {
  "Super-Mid": "Super Midsize"
};

export function MarketplaceExplorer() {
  const [draft, setDraft] = useState<MarketFilters>(emptyFilters);
  const [applied, setApplied] = useState<MarketFilters>(emptyFilters);
  const [sort, setSort] = useState<string>("Newest First");
  const [perPage, setPerPage] = useState<number>(perPageOptions[0]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = aircraft.filter((a) => {
      if (applied.manufacturer && a.make !== applied.manufacturer) return false;
      if (applied.status && a.status !== applied.status) return false;
      if (
        applied.search &&
        !`${a.name} ${a.make} ${a.model}`
          .toLowerCase()
          .includes(applied.search.toLowerCase())
      )
        return false;
      if (a.rangeNm < applied.minRange) return false;
      if (a.passengers < applied.minPassengers) return false;
      if (a.year < applied.minYear) return false;
      if (a.totalHours < applied.minHours) return false;
      if (applied.categories.length > 0) {
        const mapped = applied.categories.map((c) => CATEGORY_MAP[c] ?? c);
        if (!mapped.includes(a.category)) return false;
      }
      // price / wifi filters are no-ops until listings carry those fields
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "Oldest First":
          return a.year - b.year;
        case "Newest First":
          return b.year - a.year;
        default:
          return 0;
      }
    });
    return list;
  }, [applied, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * perPage, current * perPage);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] lg:gap-10">
          <div>
            <MarketplaceFilters
              value={draft}
              onChange={setDraft}
              onReset={() => {
                setDraft(emptyFilters);
                setApplied(emptyFilters);
                setPage(1);
              }}
              onSearch={() => {
                setApplied(draft);
                setPage(1);
              }}
            />
          </div>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans text-sm text-slate">
                <span className="font-semibold text-ink">
                  {filtered.length.toLocaleString()}
                </span>{" "}
                aircraft found
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Dropdown
                  className="w-44"
                  value={sort}
                  onChange={setSort}
                  options={[...sortOptions]}
                />
                <Dropdown
                  className="w-36"
                  value={`${perPage}`}
                  onChange={(v) => {
                    setPerPage(parseInt(v));
                    setPage(1);
                  }}
                  options={perPageOptions.map((n) => ({
                    value: `${n}`,
                    label: `${n} per page`
                  }))}
                />
                <div className="flex overflow-hidden rounded-card border border-mist">
                  <ViewToggle active={view === "grid"} onClick={() => setView("grid")}>
                    <LayoutGrid className="h-4 w-4" />
                  </ViewToggle>
                  <ViewToggle active={view === "list"} onClick={() => setView("list")}>
                    <List className="h-4 w-4" />
                  </ViewToggle>
                </div>
              </div>
            </div>

            {shown.length === 0 ? (
              <div className="rounded-card border border-dashed border-mist bg-white py-20 text-center">
                <p className="display text-2xl text-ink">
                  No aircraft match your filters
                </p>
                <button
                  onClick={() => {
                    setDraft(emptyFilters);
                    setApplied(emptyFilters);
                  }}
                  className="mt-4 text-sm font-semibold text-gold underline-offset-4 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-2"
                    : "flex flex-col gap-6"
                }
              >
                {shown.map((a) => (
                  <AircraftCard key={a.id} item={a} />
                ))}
              </div>
            )}

            {pageCount > 1 && (
              <div className="mt-10 flex flex-col items-center gap-4">
                <p className="font-sans text-sm text-slate">
                  Showing {(current - 1) * perPage + 1} to{" "}
                  {Math.min(current * perPage, filtered.length)} of{" "}
                  {filtered.length} results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage(current - 1)}
                    disabled={current === 1}
                    className="inline-flex items-center gap-1 rounded-pill border border-mist bg-white px-4 py-2 font-sans text-sm text-graphite shadow-card transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-mist"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-10 w-10 rounded-pill font-sans text-sm shadow-card transition ${
                        current === i + 1
                          ? "bg-gold text-white"
                          : "border border-mist bg-white text-graphite hover:border-gold"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPage(current + 1)}
                    disabled={current === pageCount}
                    className="inline-flex items-center gap-1 rounded-pill border border-mist bg-white px-4 py-2 font-sans text-sm text-graphite shadow-card transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-mist"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ViewToggle({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center transition ${
        active ? "bg-gold text-white" : "bg-white text-graphite hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
