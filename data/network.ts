/**
 * GLOBAL NETWORK + STRATEGIC ALLIANCE
 * [REPLACE] Keep every real logo and location from the live site. The logo
 * files below point to /public/logos/*.svg — drop the real partner logos there
 * (or set remote URLs). Do not remove or replace partners.
 */

export type Partner = {
  id: string;
  name: string;
  logo: string; // /logos/<file> in public, or remote URL
};

export type AlliancePoint = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
};

// Placeholder logo tiles render the partner name until real SVGs are added.
export const partners: Partner[] = [
  { id: "p1", name: "Aegle", logo: "/network/aegle-new.png" },
  { id: "p2", name: "Airbus", logo: "/network/airbus-new.png" },
  {
    id: "p3",
    name: "Aircraft Marketing",
    logo: "/network/aircraft-marketing-new.png",
  },
  { id: "p4", name: "Apex", logo: "/network/apex-new.png" },
  { id: "p5", name: "Arab Wings", logo: "/network/arabwings.png" },
  { id: "p6", name: "Ariyax", logo: "/network/ariyax-new.png" },
  { id: "p7", name: "AvHub", logo: "/network/avhub-new.png" },
  { id: "p8", name: "BAS", logo: "/network/bas-new.png" },
  { id: "p9", name: "Boeing", logo: "/network/boeing-new.png" },
  { id: "p10", name: "Bombardier", logo: "/network/bombardier-new.png" },
  {
    id: "p11",
    name: "Capital Aviation",
    logo: "/network/capital-aviation-new.png",
  },
  { id: "p12", name: "Cessna", logo: "/network/cessna-new.png" },
  { id: "p13", name: "Creativology", logo: "/network/creativology-new.png" },
  { id: "p14", name: "Dassault", logo: "/network/dassault-new.png" },
  { id: "p15", name: "Duncan", logo: "/network/duncan-new.png" },
  { id: "p16", name: "Embraer", logo: "/network/embraer-new.png" },
  { id: "p17", name: "Gulfstream", logo: "/network/gulfstream-new.png" },
  { id: "p18", name: "Hangar7", logo: "/network/hangar7-new.png" },
  { id: "p19", name: "Jetlings", logo: "/network/jetlings-new.png" },
  { id: "p20", name: "JMore", logo: "/network/jmore-new.png" },
  { id: "p21", name: "McAfee Taft", logo: "/network/mcafee-taft-new.png" },
  { id: "p22", name: "MD Aviation", logo: "/network/md-aviation-new.png" },
  { id: "p23", name: "Pinnacle", logo: "/network/pinnacle-new.png" },
  { id: "p24", name: "Polaris", logo: "/network/polaris-new.png" },
  { id: "p25", name: "Sino Jet", logo: "/network/sino-jet-new.png" },
  { id: "p26", name: "TVPX", logo: "/network/tvpx-new.png" },
  { id: "p27", name: "Weststar", logo: "/network/weststar-new.png" },
  { id: "p28", name: "Global Jet Sales", logo: "/network/globalJetSales.png" },
];

// [REPLACE] Real strategic-alliance locations from the live Contact map.
export const alliancePoints: AlliancePoint[] = [
  {
    id: "a1",
    city: "London",
    country: "United Kingdom",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: "a2",
    city: "Geneva",
    country: "Switzerland",
    lat: 46.2044,
    lng: 6.1432,
  },
  { id: "a3", city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  {
    id: "a4",
    city: "Riyadh",
    country: "Saudi Arabia",
    lat: 24.7136,
    lng: 46.6753,
  },
  {
    id: "a5",
    city: "New York",
    country: "United States",
    lat: 40.7128,
    lng: -74.006,
  },
  { id: "a6", city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
];
