import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Users,
  Globe,
  Gauge,
  Clock
} from "lucide-react";
import { Container } from "@/components/Container";
import { AircraftTabs } from "@/components/AircraftTabs";
import { InquiryActions } from "@/components/InquiryActions";
import { AircraftGallery } from "@/components/AircraftGallery";
import { GlobalCTA } from "@/components/GlobalCTA";
import { aircraft, getAircraft } from "@/data/aircraft";

export function generateStaticParams() {
  return aircraft.map((a) => ({ id: a.id }));
}

export function generateMetadata({
  params
}: {
  params: { id: string };
}): Metadata {
  const item = getAircraft(params.id);
  return {
    title: item ? `${item.name} — SkyFalcons` : "Aircraft — SkyFalcons"
  };
}

export default function AircraftDetailPage({
  params
}: {
  params: { id: string };
}) {
  const item = getAircraft(params.id);
  if (!item) notFound();

  return (
    <>
      <section className="bg-porcelain pt-20 pb-10 sm:pt-28 sm:pb-20">
        <Container>
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-pill border border-mist bg-white px-4 py-2 font-sans text-sm font-semibold text-ink shadow-card transition hover:border-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Link>
            <span className="rounded-pill bg-ink px-4 py-1.5 font-sans text-xs font-semibold text-white">
              {item.status}
            </span>
          </div>

    
          <div className="max-w-3xl">
            <h1 className="display text-4xl text-ink sm:text-5xl lg:text-6xl">
              {item.name}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <MetaPill>{item.make}</MetaPill>
              <MetaPill>{item.category}</MetaPill>
              <MetaPill>{item.year}</MetaPill>
              <MetaPill>ID {item.aircraftId}</MetaPill>
            </div>
          </div>

        
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
            <AircraftGallery
              images={item.gallery ?? (item.image ? [item.image] : [])}
              name={item.name}
            />

            <div className="self-start lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-card border border-mist/70 bg-white shadow-card">
         
                <div className="grid grid-cols-2 gap-px bg-mist/70">
                  <SpecCell icon={<Users className="h-5 w-5" />} value={`${item.passengers}`} label="Passengers" />
                  <SpecCell icon={<Globe className="h-5 w-5" />} value={item.rangeNm.toLocaleString()} label="NM Range" />
                  <SpecCell icon={<Gauge className="h-5 w-5" />} value={`${item.knots}`} label="Knots" />
                  <SpecCell icon={<Clock className="h-5 w-5" />} value={item.totalHours.toLocaleString()} label="Total Hours" />
                </div>

               
                <div className="border-t border-mist/70 p-6">
                  <h2 className="display text-xl text-ink">Inquiry</h2>
                  <p className="mb-4 mt-1 font-sans text-sm text-slate">
                    Speak with our team about the {item.model} ({item.year}).
                  </p>
                  <InquiryActions aircraftLabel={`${item.model} (${item.year})`} />
                </div>
              </div>
            </div>
          </div>

      
          <div className="mt-10 rounded-card border border-mist/70 bg-white p-6 shadow-card sm:p-8">
            <h2 className="display mb-6 text-2xl text-ink">Quick Facts</h2>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-8">
              <FactItem k="Make" v={item.make} />
              <FactItem k="Model" v={item.model} />
                   {item.serialNumber && (
                <FactItem k="Serial Number" v={item.serialNumber} />
              )}
              <FactItem k="Year" v={`${item.year}`} />
              <FactItem k="Status" v={item.status} />
              <FactItem k="Category" v={item.category} />
              <FactItem k="Airframe Hours" v={item.totalHours.toLocaleString()} />
              <FactItem k="Airframe Cycles" v={item.airframeCycles.toLocaleString()} />
         
            </dl>
          </div>

        
          <AircraftTabs item={item} />
        </Container>
      </section>

      <GlobalCTA />
    </>
  );
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-pill border border-mist bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-graphite">
      {children}
    </span>
  );
}

function SpecCell({
  icon,
  value,
  label
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 bg-white px-4 py-6 text-center">
      <span className="text-gold">{icon}</span>
      <span className="display text-2xl text-ink">{value}</span>
      <span className="font-sans text-xs text-slate">{label}</span>
    </div>
  );
}

function FactItem({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-sans text-[11px] uppercase tracking-wide text-slate">{k}</dt>
      <dd className="mt-1 font-sans text-sm font-semibold text-ink">{v}</dd>
    </div>
  );
}