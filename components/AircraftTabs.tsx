"use client";

import { useState } from "react";
import { Zap, Power, CheckCircle2, Settings, History } from "lucide-react";
import type { Aircraft, SpecGroup, MaintRow } from "@/data/aircraft";
import { specTabs, type SpecTab } from "@/data/aircraft";

export function AircraftTabs({ item }: { item: Aircraft }) {
  const [tab, setTab] = useState<SpecTab>("Overview");

  return (
    <div className="mt-10">
      <div className="grid grid-cols-3 overflow-hidden rounded-card border border-mist bg-white sm:grid-cols-6">
        {specTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 font-sans text-sm font-semibold transition ${
              tab === t
                ? "bg-gold text-white"
                : "text-slate hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {tab === "Overview" && <GroupCards groups={item.overview} />}
        {tab === "Maintenance" && (
          <>
            <MaintenanceSummary items={item.maintenanceSummary} />
            <MaintenanceHistory rows={item.maintenanceHistory} />
          </>
        )}
        {tab === "Features" && <BulletCard title="Features" items={item.features} />}
        {tab === "Avionics" && <BulletCard title="Avionics" items={item.avionics} />}
        {tab === "Interior" && <BulletCard title="Interior" items={item.interior} />}
        {tab === "Exterior" && <BulletCard title="Exterior" items={item.exterior} />}
      </div>
    </div>
  );
}

function GroupCards({ groups }: { groups: SpecGroup[] }) {
  return (
    <>
      {groups.map((g) => (
        <div
          key={g.title}
          className="rounded-card border border-mist/70 bg-white p-6 shadow-card"
        >
          <div className="mb-4 flex items-center gap-2">
            {g.icon === "apu" ? (
              <Power className="h-5 w-5 text-gold" />
            ) : (
              <Zap className="h-5 w-5 text-gold" />
            )}
            <h3 className="display text-lg text-ink">{g.title}</h3>
          </div>
          <dl className="divide-y divide-mist/60">
            {g.rows.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between gap-6 py-2.5 font-sans text-sm"
              >
                <dt className="text-slate">{r.label}:</dt>
                <dd className="text-right font-medium text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </>
  );
}

function MaintenanceSummary({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="rounded-card border border-mist/70 bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <Settings className="h-5 w-5 text-gold" />
        <h3 className="display text-lg text-ink">Maintenance Summary</h3>
      </div>
      <ul className="flex flex-col gap-2.5 font-sans text-sm text-slate">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MaintenanceHistory({ rows }: { rows?: MaintRow[] }) {
  if (!rows || rows.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-card border border-mist/70 bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-mist px-6 py-4">
        <History className="h-5 w-5 text-gold" />
        <h3 className="display text-lg text-ink">Maintenance History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-mist text-xs uppercase tracking-wide text-slate">
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 font-semibold">Event</th>
              <th className="px-6 py-3 font-semibold">Facility</th>
              <th className="px-6 py-3 text-right font-semibold">Airframe Hrs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr 
                key={(r.date ?? "") + (r.event ?? "")} 
                className="border-b border-mist/60 last:border-0"
              >
                <td className="whitespace-nowrap px-6 py-3.5 font-sans text-sm font-semibold text-ink">
                  {r.date}
                </td>
                <td className="px-6 py-3.5 font-sans text-sm text-graphite">{r.event}</td>
                <td className="px-6 py-3.5 font-sans text-sm text-slate">{r.facility}</td>
                <td className="px-6 py-3.5 text-right font-sans text-sm text-ink">{r.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BulletCard({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0)
    return <Empty label={`${title} details available on request.`} />;
  return (
    <div className="rounded-card border border-mist/70 bg-white p-6 shadow-card">
      <h3 className="display mb-4 text-lg text-ink">{title}</h3>
      <ul className="grid grid-cols-1 gap-2 font-sans text-sm text-slate sm:grid-cols-2">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-card border border-mist/70 bg-white p-10 text-center font-sans text-sm text-slate">
      {label}
    </div>
  );
}