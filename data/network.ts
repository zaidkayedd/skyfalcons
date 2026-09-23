export type Partner = {
  id: string;
  name: string;
  logo: string;
};

export type AlliancePoint = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
};

export const partners: Partner[] = [
  { id: "p1", name: "Airbus", logo: "/network/airbus-new.webp" },
  {
    id: "p2",
    name: "Aircraft Marketing",
    logo: "/network/aircraft-marketing-new.webp",
  },
  { id: "p3", name: "Apex", logo: "/network/apex-new.webp" },
  { id: "p4", name: "Arab Wings", logo: "/network/arabwings.webp" },
  { id: "p5", name: "Ariyax", logo: "/network/ariyax-new.webp" },
  { id: "p6", name: "AvHub", logo: "/network/avhub-new.webp" },
  { id: "p7", name: "AvHub", logo: "/avhub_Logo_DB.png" },
  { id: "p8", name: "Boeing", logo: "/network/boeing-new.webp" },
  { id: "p9", name: "Bombardier", logo: "/network/bombardier-new.webp" },
  {
    id: "p10",
    name: "Capital Aviation",
    logo: "/network/capital-aviation-new.webp",
  },
  { id: "p11", name: "Cessna", logo: "/network/cessna-new.webp" },
  { id: "p12", name: "Creativology", logo: "/network/creativology-new.webp" },
  { id: "p13", name: "Dassault", logo: "/network/dassault-new.webp" },
  { id: "p14", name: "Duncan", logo: "/network/duncan-new.webp" },
  { id: "p15", name: "Embraer", logo: "/network/embraer-new.webp" },
  { id: "p16", name: "Global Jet Sales", logo: "/network/globalJetSales.webp" },
  { id: "p17", name: "Hangar7", logo: "/network/hangar7-new.webp" },
  { id: "p18", name: "Jetlings", logo: "/network/jetlings-new.webp" },
  { id: "p19", name: "JMore", logo: "/network/jmore-new.webp" },
  { id: "p20", name: "McAfee Taft", logo: "/network/mcafee-taft-new.webp" },
  { id: "p21", name: "MD Aviation", logo: "/network/md-aviation-new.webp" },
  { id: "p22", name: "Pinnacle", logo: "/network/pinnacle-new.webp" },
  { id: "p23", name: "Polaris", logo: "/network/polaris-new.webp" },
  { id: "p24", name: "Sino Jet", logo: "/network/sino-jet-new.webp" },
  { id: "p25", name: "TVPX", logo: "/network/tvpx-new.webp" },
  { id: "p26", name: "Weststar", logo: "/network/weststar-new.webp" },
    { id: "p27", name: "Weststar", logo: "/network/weststar-new.png" },
  { id: "p28", name: "Gulfstream", logo: "/network/gulfstream-new.webp" },
];

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