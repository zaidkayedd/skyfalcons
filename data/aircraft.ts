/**
 * MARKETPLACE — AIRCRAFT DATA
 * ---------------------------------------------------------------------------
 * Shape and sample values mirror the live skyfalcons.com marketplace + detail
 * page exactly (listing card: passengers / NM range / total hours; detail page:
 * Quick Facts, Key Specifications, Engines, APU, spec tabs).
 * [REPLACE] Swap these entries for the full real inventory before launch — keep
 * the keys, change the values. The "X aircraft found" count is derived from the
 * array length, so it will read the real total automatically.
 * ---------------------------------------------------------------------------
 */

export type AircraftStatus = "Available" | "Sale Pending" | "Sold";

export type AircraftCategory =
  | "Light"
  | "Midsize"
  | "Super Midsize"
  | "Heavy"
  | "Ultra Long Range";

export type SpecRow = { label: string; value: string };
export type MaintRow = {
  date: string;
  event: string;
  facility: string;
  hours: string;
};
export type SpecGroup = { title: string; icon: SpecIcon; rows: SpecRow[] };
export type SpecIcon = "engine" | "apu" | "gauge" | "shield" | "sparkles" | "plane";

export type Aircraft = {
  id: string;
  aircraftId: string; // e.g. "Aircraft-skvyld"
  year: number;
  make: string;
  model: string;
  name: string; // "2010 Gulfstream G550"
  category: AircraftCategory;
  status: AircraftStatus;
  passengers: number;
  rangeNm: number;
  knots: number;
  totalHours: number;
  airframeCycles: number;
  price: string;
  image: string; // "" => falcon watermark placeholder
  gallery?: string[]; // detail-page image slider (first = main)
  // Spec tabs. overview is required; others optional.
  overview: SpecGroup[];
  maintenance?: string[];
  maintenanceSummary?: string[];
  maintenanceHistory?: MaintRow[];
  features?: string[];
  avionics?: string[];
  interior?: string[];
  exterior?: string[];
};

export const aircraftCategories: AircraftCategory[] = [
  "Light",
  "Midsize",
  "Super Midsize",
  "Heavy",
  "Ultra Long Range"
];

export const aircraftStatuses: AircraftStatus[] = [
  "Available",
  "Sale Pending",
  "Sold"
];

export const aircraftManufacturers = [
  "Gulfstream",
  "Bombardier",
  "Dassault",
  "Airbus",
  "Embraer",
  "Cessna"
];

export const sortOptions = [
  "Newest First",
  "Oldest First",
  "Price: Low to High",
  "Price: High to Low"
] as const;

export const perPageOptions = [6, 9, 12] as const;

const baseAircraft: Aircraft[] = [
  {
    id: "2010-gulfstream-g550",
    aircraftId: "Aircraft-skvyld",
    year: 2010,
    make: "Gulfstream",
    model: "G550",
    name: "2010 Gulfstream G550",
    category: "Heavy",
    status: "Available",
    passengers: 19,
    rangeNm: 6954,
    knots: 476,
    totalHours: 4127,
    airframeCycles: 2055,
    price: "Price on request",
    image: "/Aircrafts/Aircraft1.png",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make Model", value: "Rolls-Royce AG Model: BR710-710C4-11 (G-550)" },
          { label: "Eng. 1 Total Time", value: "4226" },
          { label: "Eng. 2 Total Time", value: "4226" },
          { label: "Eng. 1 Cycles", value: "2055" },
          { label: "Eng. 2 Cycles", value: "2055" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make Model", value: "Honeywell Model: RE220 (G-550)" },
          { label: "Total Time", value: "4236" }
        ]
      }
    ]
  },
  {
    id: "2004-gulfstream-g550",
    aircraftId: "Aircraft-gv2004",
    year: 2004,
    make: "Gulfstream",
    model: "G550",
    name: "2004 Gulfstream G550",
    category: "Heavy",
    status: "Available",
    passengers: 14,
    rangeNm: 6954,
    knots: 488,
    totalHours: 3655,
    airframeCycles: 1620,
    price: "Price on request",
    image: "/Aircrafts/Aircraft2.png",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make Model", value: "Rolls-Royce BR710 (G-550)" },
          { label: "Eng. 1 Total Time", value: "3655" },
          { label: "Eng. 2 Total Time", value: "3655" }
        ]
      }
    ]
  },
  {
    id: "2001-challenger-604",
    aircraftId: "Aircraft-ch604x",
    year: 2001,
    make: "Bombardier",
    model: "Challenger 604",
    name: "2001 Challenger 604",
    category: "Super Midsize",
    status: "Available",
    passengers: 9,
    rangeNm: 4119,
    knots: 470,
    totalHours: 4963,
    airframeCycles: 3110,
    price: "Price on request",
    image: "/Aircrafts/Aircraft3.webp",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make Model", value: "General Electric CF34-3B" },
          { label: "Eng. 1 Total Time", value: "4963" },
          { label: "Eng. 2 Total Time", value: "4963" }
        ]
      }
    ]
  },
  {
    id: "2017-falcon-7x",
    aircraftId: "Aircraft-f7x017",
    year: 2017,
    make: "Dassault",
    model: "Falcon 7X",
    name: "2017 Falcon 7X",
    category: "Heavy",
    status: "Sale Pending",
    passengers: 14,
    rangeNm: 5795,
    knots: 488,
    totalHours: 1048,
    airframeCycles: 520,
    price: "Price on request",
    image: "/Aircrafts/Aircraft4.webp",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make Model", value: "Pratt & Whitney Canada PW307A (x3)" },
          { label: "Total Time", value: "1048" }
        ]
      }
    ]
  },
  {
    id: "2011-airbus-acj319",
    aircraftId: "Aircraft-acj319",
    year: 2011,
    make: "Airbus",
    model: "ACJ319",
    name: "2011 Airbus ACJ319",
    category: "Ultra Long Range",
    status: "Sale Pending",
    passengers: 25,
    rangeNm: 6000,
    knots: 470,
    totalHours: 1984,
    airframeCycles: 900,
    price: "Price on request",
    image: "/Aircrafts/Aircraft5.png",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make Model", value: "CFM56-5B" },
          { label: "Total Time", value: "1984" }
        ]
      }
    ]
  },
  {
    id: "2010-challenger-605",
    aircraftId: "Aircraft-ch605s",
    year: 2010,
    make: "Bombardier",
    model: "Challenger 605",
    name: "2010 Challenger 605",
    category: "Super Midsize",
    status: "Sold",
    passengers: 10,
    rangeNm: 4123,
    knots: 470,
    totalHours: 4780,
    airframeCycles: 2980,
    price: "Price on request",
    image: "/Aircrafts/Aircraft6.png",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make Model", value: "General Electric CF34-3B" },
          { label: "Total Time", value: "4780" }
        ]
      }
    ]
  }
];

/* ---------------------------------------------------------------------------
 * ADDITIONAL LISTINGS — [REPLACE] with real inventory. Images left blank so the
 * gold falcon watermark renders; drop files in /public/Aircrafts and set image.
 * ------------------------------------------------------------------------- */
const moreAircraft: Aircraft[] = [
  { id: "2015-embraer-legacy-500", aircraftId: "Aircraft-lg500a", year: 2015, make: "Embraer", model: "Legacy 500", name: "2015 Embraer Legacy 500", category: "Midsize", status: "Available", passengers: 12, rangeNm: 3125, knots: 466, totalHours: 2980, airframeCycles: 1420, price: "Price on request",     image: "",
    overview: [{ title: "Engines", icon: "engine", rows: [{ label: "Make Model", value: "Honeywell HTF7500E" }, { label: "Total Time", value: "2980" }] }] },
  { id: "2019-bombardier-challenger-350", aircraftId: "Aircraft-ch350a", year: 2019, make: "Bombardier", model: "Challenger 350", name: "2019 Bombardier Challenger 350", category: "Super Midsize", status: "Available", passengers: 10, rangeNm: 3200, knots: 470, totalHours: 1650, airframeCycles: 900, price: "Price on request", image: "/Aircrafts/Aircraft1.png",
    overview: [{ title: "Engines", icon: "engine", rows: [{ label: "Make Model", value: "Honeywell HTF7350" }, { label: "Total Time", value: "1650" }] }] },
  { id: "2013-gulfstream-g650", aircraftId: "Aircraft-g650a", year: 2013, make: "Gulfstream", model: "G650", name: "2013 Gulfstream G650", category: "Ultra Long Range", status: "Sale Pending", passengers: 18, rangeNm: 7000, knots: 516, totalHours: 3890, airframeCycles: 1510, price: "Price on request", image: "",
    overview: [{ title: "Engines", icon: "engine", rows: [{ label: "Make Model", value: "Rolls-Royce BR725" }, { label: "Total Time", value: "3890" }] }] },
  { id: "2008-dassault-falcon-900", aircraftId: "Aircraft-f900ex", year: 2008, make: "Dassault", model: "Falcon 900EX", name: "2008 Dassault Falcon 900EX", category: "Heavy", status: "Available", passengers: 14, rangeNm: 4750, knots: 459, totalHours: 5120, airframeCycles: 2670, price: "Price on request", image: "",
    overview: [{ title: "Engines", icon: "engine", rows: [{ label: "Make Model", value: "Honeywell TFE731-60" }, { label: "Total Time", value: "5120" }] }] },
  { id: "2016-cessna-citation-latitude", aircraftId: "Aircraft-latd16", year: 2016, make: "Cessna", model: "Citation Latitude", name: "2016 Cessna Citation Latitude", category: "Midsize", status: "Available", passengers: 9, rangeNm: 2700, knots: 446, totalHours: 2210, airframeCycles: 1330, price: "Price on request", image: "/Aircrafts/Aircraft2.png",
    overview: [{ title: "Engines", icon: "engine", rows: [{ label: "Make Model", value: "Pratt & Whitney PW306D1" }, { label: "Total Time", value: "2210" }] }] },
  { id: "2012-airbus-acj318", aircraftId: "Aircraft-acj318", year: 2012, make: "Airbus", model: "ACJ318", name: "2012 Airbus ACJ318", category: "Ultra Long Range", status: "Sold", passengers: 19, rangeNm: 4200, knots: 470, totalHours: 6040, airframeCycles: 2450, price: "Price on request", image: "",
    overview: [{ title: "Engines", icon: "engine", rows: [{ label: "Make Model", value: "CFM56-5B" }, { label: "Total Time", value: "6040" }] }] },
  { id: "2011-bombardier-global-xrs", aircraftId: "Aircraft-gxrs11", year: 2011, make: "Bombardier", model: "Global XRS", name: "2011 Bombardier Global XRS", category: "Ultra Long Range", status: "Available", passengers: 16, rangeNm: 6150, knots: 488, totalHours: 4460, airframeCycles: 1890, price: "Price on request", image: "",
    overview: [{ title: "Engines", icon: "engine", rows: [{ label: "Make Model", value: "Rolls-Royce BR710" }, { label: "Total Time", value: "4460" }] }] },
  { id: "2018-embraer-praetor-600", aircraftId: "Aircraft-pra600", year: 2018, make: "Embraer", model: "Praetor 600", name: "2018 Embraer Praetor 600", category: "Super Midsize", status: "Available", passengers: 12, rangeNm: 4018, knots: 466, totalHours: 1290, airframeCycles: 610, price: "Price on request", image: "/Aircrafts/Aircraft3.webp",
    overview: [{ title: "Engines", icon: "engine", rows: [{ label: "Make Model", value: "Honeywell HTF7500E" }, { label: "Total Time", value: "1290" }] }] }
];

/* Rich detail-tab data generated per aircraft (Maintenance / Features /
 * Avionics / Interior / Exterior). [REPLACE] with each aircraft's real records. */
function code(m: string) {
  return m.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 6);
}
// Pool of available aircraft photos — used to seed the detail-page gallery.
// [REPLACE] each aircraft's `gallery` with its own real multi-angle photos.
const PHOTO_POOL = [
  "/Aircrafts/Aircraft1.png",
  "/Aircrafts/Aircraft2.png",
  "/Aircrafts/Aircraft3.webp",
  "/Aircrafts/Aircraft4.webp",
  "/Aircrafts/Aircraft5.png",
  "/Aircrafts/Aircraft6.png"
];

function withAircraftDetails(a: Aircraft): Aircraft {
  const c = code(a.model);

  // Overview = Engines + APU. Ensure every aircraft has an APU box.
  const hasApu = a.overview.some((g) => g.title.toLowerCase() === "apu");
  const overview: SpecGroup[] = hasApu
    ? a.overview
    : [
        ...a.overview,
        {
          title: "APU",
          icon: "apu",
          rows: [
            { label: "Make Model", value: "Honeywell RE-Series" },
            { label: "Total Time", value: `${Math.round(a.totalHours * 0.9).toLocaleString()} hrs` },
            { label: "Status", value: "Operational" }
          ]
        }
      ];

  // Maintenance Summary (bulleted) — moved out of Overview into the Maintenance tab.
  const maintenanceSummary = [
    "Enrolled on Computerized Aircraft Maintenance Program (CAMP) Tracking System",
    "Enrolled on manufacturer's inspection & reliability program",
    `Airframe: ${a.totalHours.toLocaleString()} hrs / ${a.airframeCycles.toLocaleString()} cycles`,
    "All Airworthiness Directives (ADs) complied with",
    "All mandatory Service Bulletins (SBs) complied with",
    "Fresh inspection status — no deferred maintenance items"
  ];

  // Maintenance History (table)
  const maintenanceHistory: MaintRow[] = [
    { date: `${a.year + 1}`, event: "Aircraft delivery & entry into service", facility: "OEM Delivery Center", hours: "0" },
    { date: `${a.year + 3}`, event: "12-Month / 300-Hour Inspection", facility: "Authorized Service Center", hours: Math.round(a.totalHours * 0.25).toLocaleString() },
    { date: `${a.year + 6}`, event: "24-Month Inspection & Landing Gear Overhaul", facility: "Authorized Service Center", hours: Math.round(a.totalHours * 0.5).toLocaleString() },
    { date: `${a.year + 9}`, event: "Engine Mid-Life Inspection (MPI)", facility: "OEM Engine Facility", hours: Math.round(a.totalHours * 0.72).toLocaleString() },
    { date: `${a.year + 12}`, event: "72-Month Heavy Check (C-Check)", facility: "Authorized Service Center", hours: Math.round(a.totalHours * 0.9).toLocaleString() },
    { date: "Most recent", event: "Avionics update & ADS-B Out compliance", facility: "Authorized Avionics Shop", hours: a.totalHours.toLocaleString() }
  ];

  const maintenance = [
    `Installation of Enhanced Flight Vision System (EFVS) (SB-${c}-077-REV-01)`,
    `Installation of Reinforced Collapsible Towbar (SB-${c}-112-REV-02)`,
    `Installation of Honeywell Lightning Sensor System (LSS) (SB-${c}-113-REV-02)`,
    `Activation of Swift Broadband Capabilities (SB-${c}-156)`,
    `Head-Up Guidance System (HGS) Upgrade (SB-${c}-166)`,
    `TCAS II System Change 7.1 (SB-${c}-197-REV-01)`,
    `Steering Control – Extended Crosswind Capabilities (SB-${c}-198)`,
    `Installation 90-day Underwater Locator Beacon for FDR/CVR (SB-${c}-268-REV-01)`,
    `SATCOM Software Upgrade (SB-${c}-290)`,
    `Maximum Takeoff Weight Operation Limit Indication (SB-${c}-292-REV-02)`,
    `Enhanced Avionics System Upgrade (SB-${c}-300-REV-03)`,
    `Navigation with Localizer Performance Vertical Guidance (LPV) (SB-${c}-301-REV-02)`,
    `ADS-B Out Compliance (SB-${c}-322-REV-02)`,
    `Cabin Management System Refresh (SB-${c}-341)`
  ];
  const features = [
    "Wi-Fi / High-speed connectivity",
    "Iridium satellite phone",
    "Forward & aft lavatories",
    "Full-service galley",
    "Enclosed & externally serviced baggage",
    "Auxiliary Power Unit (APU)",
    "Auto-throttle",
    "Synthetic Vision System (SVS)",
    "Single-point pressure refueling",
    "Dual-zone cabin climate control"
  ];
  const avionics = [
    "Honeywell Primus Epic flight deck",
    "Triple FMS with WAAS/LPV",
    "TCAS II Change 7.1",
    "ADS-B Out (DO-260B)",
    "EGPWS / TAWS",
    "Dual weather radar with turbulence detection",
    "Head-Up Display (HUD)",
    "SATCOM & CPDLC datalink"
  ];
  const interior = [
    `${Math.max(8, a.passengers)}-passenger executive configuration`,
    "Double-club seating with berthable divans",
    "High-definition cabin management system",
    "LED mood lighting throughout",
    "Fully equipped galley with espresso maker",
    "Forward crew rest / jump seat"
  ];
  const exterior = [
    "Fresh exterior paint (Matterhorn White)",
    "Champagne-gold & graphite accent striping",
    "Detailed, polished and corrosion-treated",
    "No known damage history",
    "New windshield seals"
  ];
  // Detail-page gallery: this aircraft's photo first, then a few more as
  // placeholders so the slider is populated. [REPLACE] with real photos.
  const gallery = a.image
    ? [a.image, ...PHOTO_POOL.filter((p) => p !== a.image)].slice(0, 4)
    : [];

  return {
    ...a,
    gallery,
    overview,
    maintenanceSummary,
    maintenanceHistory,
    maintenance,
    features,
    avionics,
    interior,
    exterior
  };
}

export const aircraft: Aircraft[] = [...baseAircraft, ...moreAircraft].map(
  withAircraftDetails
);

export function getAircraft(id: string) {
  return aircraft.find((a) => a.id === id);
}

export const specTabs = [
  "Overview",
  "Maintenance",
  "Features",
  "Avionics",
  "Interior",
  "Exterior"
] as const;
export type SpecTab = (typeof specTabs)[number];
