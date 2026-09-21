export type AircraftStatus = "Available" | "Sale Pending" | "Sold" | "Acquired";

export type AircraftCategory =
  | "Light"
  | "Midsize"
  | "Super Midsize"
  | "Heavy"
  | "Ultra Long Range";

export type SpecRow = { label: string; value: string };
export type MaintRow = {
  title?: string;
  lastDone?: string;
  lastDoneTSN?: string;
  nextDue?: string;
  nextDueTSN?: string;
  date?: string;
  event?: string;
  facility?: string;
  hours?: string;
};
export type SpecGroup = { title: string; icon: SpecIcon; rows: SpecRow[] };
export type SpecIcon =
  | "engine"
  | "apu"
  | "gauge"
  | "shield"
  | "sparkles"
  | "plane";

export type Aircraft = {
  id: string;
  aircraftId: string;
  year: number;
  make: string;
  model: string;
  name: string;
  category: AircraftCategory;
  serialNumber?: string;
  title?: string;
  registration?: string;
  status: AircraftStatus;
  passengers: number;
  rangeNm: number;
  knots: number;
  totalHours: number;
  airframeHours?: number;
  airframeCycles: number;
  price: string;
  image: string;
  gallery?: string[];
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
  "Ultra Long Range",
];

export const aircraftStatuses: AircraftStatus[] = [
  "Available",
  "Sale Pending",
  "Sold",
  "Acquired",
];

export const aircraftManufacturers = [
  "Gulfstream",
  "Bombardier",
  "Dassault",
  "Airbus",
  "Embraer",
  "Cessna",
];

export const sortOptions = [
  "Newest First",
  "Oldest First",
  "Price: Low to High",
  "Price: High to Low",
] as const;

export const perPageOptions = [6, 9, 12] as const;

const baseAircraft: Aircraft[] = [
  {
    id: "2014-embraer-legacy-650",
    aircraftId: "Aircraft-9AM03f",
    year: 2014,
    make: "Embraer",
    model: "Legacy 650",
    name: "2014 Embraer Legacy 650",
    category: "Heavy",
    serialNumber: "14501194",
    status: "Acquired",
    passengers: 13,
    rangeNm: 4123,
    knots: 459,
    totalHours: 4608,
    airframeCycles: 2633,
    price: "Price on request",
    image: "/Aircrafts/2014Legacy.jpeg",
    gallery: ["/Aircrafts/2014Legacy.jpeg"],
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          {
            label: "Make / Model",
            value: "Rolls-Royce North America AE3007A2",
          },
          { label: "Eng. 1 Total Time", value: "4,444 hrs" },
          { label: "Eng. 2 Total Time", value: "4,444 hrs" },
          { label: "Eng. 1 Cycles", value: "2,537" },
          { label: "Eng. 2 Cycles", value: "2,537" },
          {
            label: "Power By The Hour",
            value: "Rolls-Royce CorporateCare Enhanced",
          },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Hamilton Sundstrand APS500R" },
          { label: "Total Time", value: "3,072 hrs" },
          { label: "Cycles", value: "4,090" },
        ],
      },
    ],
    interior: [
      "13 passengers + 2 crew configuration",
      "Observer seat with intercom handset; forward flight-attendant seat with intercom",
      "Forward crew lavatory and aft passenger lavatory",
      "LED vanity light installation",
      "Forward galley: convection oven, microwave, 2 standard food containers, coffee maker",
      "Forward cabin: 4 chairs in club arrangement with pullout tables",
      "Mid cabin: 4-place conference dining group opposite a credenza",
      "Mid-to-aft cabin: partition/divider with curtain",
      "Aft cabin: 3-place berthable divan and 2 chairs in club arrangement with pullout table",
      "Aircell GoGo Biz ATG-5000 domestic USA high-speed data / Wi-Fi",
      "Airshow 4000 Passenger Flight Information System",
      "Dual Blu-Ray players; Ovation Cabin Management System with iPad control",
      "Forward and aft 19-inch bulkhead-mounted monitors; satellite phone",
    ],
    exterior: ["Allover White with Silver and Blue accents"],
    avionics: [
      "Honeywell IC-600 Integrated Computer with NZ-2000 v6.0 FMS",
      "Honeywell RNZ-851 VHF-NAV / Marker / Glideslope / ADF / DME",
      "Honeywell RCZ-833K VHF Comm 1 & 2 (Mode S transponder RCZ-833K)",
      "Honeywell KRX-1053 HF Comm; ICG ICS-220A SATCOM voice; Honeywell high-speed data SATCOM",
      "ACSS TCAS 3000-SP Change 7.11; Honeywell EGPWS Mark V with Windshear",
      "Honeywell AZ-950 Air Data; Laseref IV IRS; RT-300 Radio Altimeter; GR-550 GPS",
      "Honeywell CM-950 Cabin Management; RM-855 Radio Management Unit; AV-850A audio",
      "L3 2100 FDR & CVR; Artex/Honeywell C406-2 ELT; Trimble Jet Call 2 SELCAL",
      "Honeywell WU-880 Weather Radar; PC-400 Autopilot controller",
    ],
    features: [
      "FANS 1/A+ and CPDLC",
      "Synthetic Vision System",
      "TCAS II with Change 7.1 modification",
      "WAAS / LPV; RVSM; RNP",
      "ADS-B Out",
      "CAT II approach capability (SB145LEG-31-0003/02)",
      "Second HF system installed (SB145LEG-23-0011/02)",
      "Mode S Enhanced Surveillance transponder",
      "Electronic Flight Bag installation; Steep Approach system",
      "SmartLanding / SmartRunway activation",
      "Synthetic Vision System installation (SB145LEG-31-0027/03)",
    ],
    maintenanceSummary: [
      "Embraer Low Utilization Plan with CAMP Systems Computerized Aircraft Maintenance Tracking Program",
    ],
    maintenanceHistory: [
      {
        date: "Feb 2025",
        event: "12 Month / 500 Hour",
        facility: "Next due: Feb 2026",
        hours: "4,371",
      },
      {
        date: "Feb 2025",
        event: "24 Month / 1,000 Hour",
        facility: "Next due: Feb 2027",
        hours: "4,371",
      },
      {
        date: "Mar 2023",
        event: "48 Month / 2,000 Hour",
        facility: "Next due: Mar 2027",
        hours: "3,506",
      },
      {
        date: "Dec 2020",
        event: "72 Month / 3,000 Hour",
        facility: "Next due: Dec 2026",
        hours: "3,027",
      },
      {
        date: "Mar 2023",
        event: "96 Month / 4,000 Hour",
        facility: "Next due: Mar 2031",
        hours: "3,506",
      },
      {
        date: "—",
        event: "Gear 144 Month Overhaul",
        facility: "Next due: Dec 2026",
        hours: "—",
      },
    ],
  },
  {
    id: "2015-embraer-legacy-650",
    aircraftId: "Aircraft-HsSkp9",
    year: 2015,
    make: "Embraer",
    model: "Legacy 650",
    name: "2015 Embraer Legacy 650",
    category: "Heavy",
    serialNumber: "14501198",

    status: "Acquired",
    passengers: 13,
    rangeNm: 4123,
    knots: 459,
    totalHours: 2079,
    airframeCycles: 1204,
    price: "Price on request",
    image: "/Aircrafts/Legacy2015.jpg",
    gallery: ["/Aircrafts/Legacy2015.jpg"],
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "Rolls-Royce Plc AE3007A2" },
          { label: "Eng. 1 Total Time", value: "2,104 hrs" },
          { label: "Eng. 2 Total Time", value: "2,104 hrs" },
          { label: "Eng. 1 Cycles", value: "1,204" },
          { label: "Eng. 2 Cycles", value: "1,204" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          {
            label: "Make / Model",
            value: "Hamilton Standard / Sundstrand APS500R / T-62T-40C14",
          },
          { label: "Total Time", value: "1,802 hrs" },
          { label: "Cycles", value: "1,204" },
        ],
      },
    ],
    interior: [
      "13-passenger configuration with crew configuration and observer seat",
      "Intercom handset; forward crew and aft passenger lavatories; forward galley",
      "Forward cabin: 4 chairs in club arrangement with pullout tables",
      "Mid cabin: 4-place conference dining group opposite a credenza",
      "Mid-to-aft cabin: partition with curtain",
      "Aft cabin: 3-place divan and 2 chairs in club arrangement with pullout table",
      "GoGo Biz AVANCE L-5 domestic USA high-speed data / internet / Wi-Fi",
      "Airshow 4000 Passenger Flight Information System; dual Blu-Ray players",
      "Ovation Cabin Management System; dual 19-inch bulkhead monitors; 2 side-ledge monitors",
    ],
    exterior: ["White with Silver and Blue"],
    avionics: [
      "Honeywell RNZ-851 VHF-NAV / Marker / Glideslope / ADF / DME",
      "Honeywell RCZ-833K VHF Comm 1 & 2; RCZ-833 VHF Comm 3",
      "Honeywell NZ-2000 (6.1) FMS; IC-600 Integrated Computer (7.1 mod)",
      "Honeywell AZ-950 Air Data; Laseref IV IRS; RT-300 Radio Altimeter; GR-550 GPS",
      "ACSS/Honeywell TCAS 2000; EGPWS Mark V; AV-850A audio; RM-855 RMU",
      "Honeywell KRX-1053 HF Comm; L3 2100 FDR & CVR; Artex C406-2 ELT; Jet Call 2 SELCAL",
      "Honeywell WX-880 Weather Radar; PC-400 Autopilot controller; CM-950 Cabin Management",
    ],
    features: [
      "FANS 1/A compliant; CPDLC compliant",
      "ADS-B Out Version 2",
      "TCAS II — Change 7.1 modification",
      "WAAS, LPV and RVSM compliant; RNP 0.3 capability",
      "NZ-2000 FMS with 6.1 software upgrade",
      "Iridium Satellite Phone System",
      "GoGo Biz AVANCE L-5 domestic USA high-speed data / internet / Wi-Fi",
    ],
    maintenanceSummary: [
      "Embraer Low Utilization Plan with CAMP Systems Computerized Aircraft Maintenance Tracking Program",
    ],
  },
  {
    id: "2005-bombardier-challenger-604",
    aircraftId: "Aircraft-vYSA0h",
    year: 2005,
    make: "Bombardier",
    model: "Challenger 604",
    name: "2005 Challenger 604",
    category: "Heavy",
    serialNumber: "5639",
    status: "Sold",
    passengers: 9,
    rangeNm: 4119,
    knots: 459,
    totalHours: 4133,
    airframeCycles: 2052,
    price: "Price on request",
    image: "/Aircrafts/Challenger2005.jpg",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "General Electric Model: CF34-3B" },
          { label: "Eng. 1 Total Time", value: "3,989 hrs" },
          { label: "Eng. 2 Total Time", value: "3,989 hrs" },
          { label: "Eng. 1 Cycles", value: "1,952" },
          { label: "Eng. 2 Cycles", value: "1,952" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          {
            label: "Make / Model",
            value: "Honeywell upgraded to Model: GTCP 36-150 (E)",
          },
          { label: "Total Time", value: "3,260 hrs" },
        ],
      },
    ],
    maintenanceSummary: [],
    maintenanceHistory: [],
    maintenance: [],
    features: [],
    avionics: [],
    interior: [],
    exterior: [],
  },

  {
    id: "2001-boeing-bbj",
    aircraftId: "Aircraft-33036",
    year: 2001,
    make: "Boeing",
    model: "BBJ",
    name: "2001 Boeing BBJ",
    category: "Heavy",
    status: "Sold",
    serialNumber: "33036",
    registration: "N7777Q",
    passengers: 9,
    rangeNm: 6000,
    knots: 484,
    totalHours: 1942,
    airframeHours: 1942,
    airframeCycles: 518,

    price: "Price on request",
    image: "/Aircrafts/2001Boeing.png",

    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          {
            label: "Make / Model",
            value: "CFM56-7B26/B1",
          },
          {
            label: "Eng. 1 Total Time",
            value: "1,194 hrs",
          },
          {
            label: "Eng. 2 Total Time",
            value: "1,146 hrs",
          },
          {
            label: "Eng. 1 Cycles",
            value: "353",
          },
          {
            label: "Eng. 2 Cycles",
            value: "338",
          },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          {
            label: "Make / Model",
            value: "Honeywell 131-9B",
          },
          {
            label: "Total Time",
            value: "1,522 hrs",
          },
          {
            label: "Serial",
            value: "P6178",
          },
        ],
      },
    ],

    interior: [
      "Features 9 passengers configuration including the belted lavatory with 8-seat double club configuration",
      "Forward refreshment center galley with ice storage and bottle storage",
      "Cabin entertainment with GoGo Biz ATG-5000 domestic USA high-speed data and internet",
      "Maximum passengers: 9",
    ],

    exterior: [
      "Overall Matterhorn White, with Ming Blue Mica, Toreador Red and Starlight Silver Pearl accents.",
    ],

    avionics: [
      "Pro Line FUSION Flight Deck with Synthetic Vision System",
      "Dual Rockwell Collins FGC-3000 Flight Guidance",
      "GoGo ATG-5000 Connectivity",
      "Synthetic Vision System",
      "Dual Collins NAV-4000/NAV-4500 Navs",
      "Dual Collins FMS w/WAAS/LPV Approach",
      "Dual Collins TDR-94 X/P's Mode-S/Flight ID/ADS-B",
      "Collins TRA-4112 Multiscan Doppler Radar",
      "Dual Rockwell Collins AHC-3000 AHRS",
      "ACSS TAWS+ Displayed on PFD or MFD",
      "Rockwell Collins DME-4000 Distance Measure",
      "ESIS L3 GH-3900 Electronic Standby Instrument System",
      "Rockwell Collins ALT-4000 Radio Altimeter",
      "TCAS-4000 TCAS-II with Change 7.1 Mod",
      "Rockwell Collins GPS-4000S Global Positioning Sensor",
      "WX Weather System",
      "Dual Rockwell Collins ADC-3000",
      "AirText Moving Maps System",
      "Whelen Parmetheus LED Lights",
    ],

    features: [
      "Pro Line FUSION Flight Deck with Synthetic Vision System",
      "9 Passenger Configuration with 8 Seat Double Club",
      "Belted Lavatory",
      "Forward Refreshment Center Galley with Ice and Bottle Storage",
      "GoGo Biz ATG-5000 High Speed Data and Internet",
      "AirText Moving Maps System",
      "No Damage History",
      "2 USA Based Operators Since New",
      "CAMP Maintenance Tracking Program",
      "Textron Pro-Parts Airframe Plan",
      "Pratt & Whitney ESP Gold Lite Engine Plan",
      "Propeller Overhaul Completed March 2023",
      "Landing Gear Overhaul Completed March 2023",
      "ADS-B Out Compliant",
      "WAAS / LPV Approach Capable",
      "TCAS-II with Change 7.1",
      "ACSS TAWS+",
      "Whelen Parmetheus LED Lights",
    ],

    maintenanceSummary: [
      "No damage history.",
      "2 USA based operators since new.",
      "CAMP System maintenance tracking program.",
      "Airframe Textron Pro-Parts Plan (2025 rate $252 per flight hour).",
      "Phase inspections #1, #2 and #8 completed January 2026 at 1,739 hours.",
      "Propeller 3,000 hour / 60 month overhaul completed March 2023, next due March 2028.",
      "Landing gear overhaul and brake hoses completed March 2023.",
    ],

    maintenanceHistory: [
      {
        title: "800 Hours / 48 Months",
        lastDone: "January 2026",
        lastDoneTSN: "1739 H",
        nextDue: "January 2030",
        nextDueTSN: "2539 H",
      },
      {
        title: "800 Hours / 48 Months",
        lastDone: "January 2026",
        lastDoneTSN: "1739 H",
        nextDue: "January 2030",
        nextDueTSN: "2539 H",
      },
      {
        title: "800 Hours / 48 Months",
        lastDone: "March 2023",
        lastDoneTSN: "1342 H",
        nextDue: "January 2028",
        nextDueTSN: "1939 H",
      },
      {
        title: "800 Hours / 48 Months",
        lastDone: "June 2024",
        lastDoneTSN: "1533 H",
        nextDue: "January 2028",
        nextDueTSN: "2139 H",
      },
      {
        title: "12 Months",
        lastDone: "January 2026",
        lastDoneTSN: "1739 H",
        nextDue: "January 2027",
        nextDueTSN: "-",
      },
      {
        title: "1200 Hours",
        lastDone: "October 2022",
        lastDoneTSN: "1191 H",
        nextDue: "-",
        nextDueTSN: "2400 H",
      },
      {
        title: "1000 Landings",
        lastDone: "July 2022",
        lastDoneTSN: "984 Landings CSN",
        nextDue: "-",
        nextDueTSN: "2000 Landings CSN",
      },
      {
        title: "2400 Hours / 30 Months",
        lastDone: "April 2025",
        lastDoneTSN: "1627 H",
        nextDue: "October 2027",
        nextDueTSN: "4027 H",
      },
      {
        title: "3000 Landings / 36 Months",
        lastDone: "March 2024",
        lastDoneTSN: "1307 Landings CSN",
        nextDue: "March 2027",
        nextDueTSN: "4307 Landings CSN",
      },
      {
        title: "60 Months",
        lastDone: "March 2023",
        lastDoneTSN: "1342 H",
        nextDue: "March 2028",
        nextDueTSN: "-",
      },
      {
        title: "5000 Landings",
        lastDone: "-",
        lastDoneTSN: "-",
        nextDue: "-",
        nextDueTSN: "5000 Landings CSN",
      },
      {
        title: "5000 Hours",
        lastDone: "-",
        lastDoneTSN: "-",
        nextDue: "-",
        nextDueTSN: "5000 H",
      },
      {
        title: "8000 Cycles / 72 Months",
        lastDone: "June 2024",
        lastDoneTSN: "1338 Landings CSN",
        nextDue: "June 2030",
        nextDueTSN: "9338 Landings CSN",
      },
      {
        title: "1200 Hours",
        lastDone: "July 2023",
        lastDoneTSN: "1421 H",
        nextDue: "-",
        nextDueTSN: "2621 H",
      },
      {
        title: "2500 Landing Cycles",
        lastDone: "-",
        lastDoneTSN: "-",
        nextDue: "-",
        nextDueTSN: "2500 Landings CSN",
      },
      {
        title: "2000 Hours / 48 Months",
        lastDone: "March 2023",
        lastDoneTSN: "1342 H",
        nextDue: "March 2027",
        nextDueTSN: "3342 H",
      },
      {
        title: "60 Months Brake Hoses",
        lastDone: "March 2023",
        lastDoneTSN: "1342 H",
        nextDue: "March 2027",
        nextDueTSN: "-",
      },
      {
        title: "Landing Gear Overhaul & Brake Hoses",
        lastDone: "March 2023",
        lastDoneTSN: "1338 Cycles CSN",
        nextDue: "-",
        nextDueTSN: "-",
      },
      {
        title: "3000 Hours / 60 Months Propeller Overhaul",
        lastDone: "March 2023",
        lastDoneTSN: "1342 H",
        nextDue: "March 2028",
        nextDueTSN: "4342 H",
      },
    ],
  },

  {
    id: "2018-beechcraft-king-air-350i",
    aircraftId: "Aircraft-FL1147",
    year: 2018,
    make: "Beechcraft",
    model: "King Air 350i",
    name: "2018 Beechcraft King Air 350i",
    category: "Heavy",
    status: "Sold",
    serialNumber: "FL-1147",
    registration: "N32FB",

    passengers: 9,
    rangeNm: 1806,
    knots: 484,
    totalHours: 1742,
    airframeHours: 1742,
    airframeCycles: 1492,

    price: "Price on request",
    image: "/Aircrafts/2018beechcraft.jpeg",

    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          {
            label: "Make / Model",
            value: "Pratt & Whitney Canada PT6A-60A",
          },
          {
            label: "Eng. 1 Total Time",
            value: "1,742 hrs",
          },
          {
            label: "Eng. 2 Total Time",
            value: "1,741 hrs",
          },
          {
            label: "Eng. 1 Cycles",
            value: "1,492",
          },
          {
            label: "Eng. 2 Cycles",
            value: "1,492",
          },
          {
            label: "Power By The Hour Plan",
            value:
              "Pratt & Whitney ESP Gold Lite Plan — 2025 rate $192 per engine per hour",
          },
        ],
      },
    ],

    interior: [],

    exterior: [],

    avionics: [],

    features: [],

    maintenanceSummary: [],

    maintenanceHistory: [],
  },
  {
    id: "2010-gulfstream-g550",
    aircraftId: "Aircraft-sky1d",
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
    image: "",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          {
            label: "Make / Model",
            value: "Rolls-Royce AG BR710-710C4-11 (G-550)",
          },
          { label: "Eng. 1 Total Time", value: "4,226 hrs" },
          { label: "Eng. 2 Total Time", value: "4,226 hrs" },
          { label: "Eng. 1 Cycles", value: "2,055" },
          { label: "Eng. 2 Cycles", value: "2,055" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Honeywell RE220 (G-550)" },
          { label: "Total Time", value: "4,236 hrs" },
        ],
      },
    ],
    interior: [
      "New in 2009 by Gulfstream; refurbished & upgraded by Gulfstream (Dallas, TX) — completed March 2016 at 1,556 hrs / 517 landings",
      "19 passengers + flight deck crew; observer jump seat; 4-zone configuration",
      "Forward crew lavatory and aft cabin VIP lavatory",
      "Forward galley: microwave, high-temp oven, dual coffee maker, refrigerator, ample storage",
      "Forward cabin: 4 chairs in club arrangement with pullout tables",
      "Mid cabin: 2 chairs in club with pullout tables, 4-place divan, 4-place dining/conference group opposite credenza",
      "Aft cabin: 2 opposing divans, a 2-place divan and a 3-place divan; privacy divider",
      "Rockwell Collins Venue CMS; Honeywell AIS-2000 satellite TV; Quasar II full-spectrum mood lighting",
      "Aircell GoGo Biz ATG-4000 high-speed data; XM Radio; Aircell Axxess satellite phone",
      "Honeywell Swift Broadband HD710; Wi-Fi; SATCOM Direct router; Rosen HD monitors throughout",
    ],
    exterior: [
      "New paint in 2016 by Gulfstream (Dallas, TX) at 1,556 hrs / 517 landings",
      "Overall Matterhorn White with Light Blue and Dark Blue stripes",
    ],
    avionics: [
      "Honeywell PlaneView Integrated Avionics System 4",
      "4 × Honeywell DU-1310 flat-panel displays; DC-884 display controllers; DP-884 brightness panel",
      "Honeywell/Kollsman VGS visual guidance; GP-500 flight guidance panel",
      "3 × AZ-200 air data modules; 3 × AV-900 audio panels; 2 × RT-300 radio altimeters",
      "Honeywell WU-800 weather radar; Universal FDR & CVR",
      "Honeywell MCS 7000+ SATCOM; L3 TCAS-3000SP 7.1",
      "3 × MC-850 MCDUs; 3 × IR-500 Laseref micro IRS; L3 GH-3100 standby indicator",
    ],
    features: [
      "88-parameter FDR upgrade; ARINC Direct datalink",
      "Synthetic Vision Primary Flight Display (SV-PFD)",
      "Runway Awareness Advisory System (RAAS); Enhanced Navigation; XM Weather",
      "CPDLC FANS 1A; TCAS 7.1; ADS-B Out",
      "LED navigation/anticollision strobe upgrade; external camera system",
      "SATCOM High Speed Data (HD-128) MCS-7100; Aircell Axxess Iridium phone",
      "Aircell ATG-4000 high-speed data & Wi-Fi; KU-band transmission radome",
    ],
    maintenanceSummary: [
      "Embraer Low Utilization Plan with CAMP Systems Computerized Aircraft Maintenance Tracking Program (per listing)",
    ],
  },
  {
    id: "2004-gulfstream-g550",
    aircraftId: "Aircraft-hosFnt",
    year: 2004,
    make: "Gulfstream",
    model: "G550",
    name: "2004 Gulfstream G550",
    category: "Heavy",
    status: "Available",
    passengers: 9,
    rangeNm: 4119,
    knots: 459,
    totalHours: 3655,
    airframeCycles: 1547,
    price: "Price on request",
    image: "/Aircrafts/Gulfstream2004.jpg",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "General Electric Model: CF34-3B" },
          { label: "Eng. 1 Total Time", value: "3,989 hrs" },
          { label: "Eng. 2 Total Time", value: "3,989 hrs" },
          { label: "Eng. 1 Cycles", value: "1,952" },
          { label: "Eng. 2 Cycles", value: "1,952" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          {
            label: "Make / Model",
            value: "Honeywell upgraded to Model: GTCP 36-150 (E)",
          },
          { label: "Total Time", value: "3,260 hrs" },
        ],
      },
    ],
    interior: [
      "Refurbished in October 2018",
      "9 passengers + flight deck crew + flight attendant seat configuration with aft lavatory",
      "Forward galley with microwave oven and LED upgrade in the cabin and galley",
      "Cabin entertainment system with Airshow Passenger Flight Information Display System, dual DVD player, forward and aft bulkhead monitors",
      "Iridium satellite phone system",
      "Honeywell ASPIRE 200 In-Flight Satellite Communication System (Global Internet) with Satcom Direct Router and activation of cabin Wi-Fi system",
      "Forward cabin: 4 chairs in club arrangement with pullout tables",
      "Aft cabin: 3-place divan opposite 2 chairs in club arrangement with pullout table",
      "Maximum passengers: 9",
    ],
    exterior: [
      "New in September 2014",
      "Allover White with Gray & Black and Red Accents",
    ],
    avionics: [
      "Collins Pro Line 4 / Precision Plus with (6) EFIS Display Tubes; Precision Plus Upgrade",
      "(2) Collins FCC-4006 Digital Flight Control",
      "(2) Collins ADC-850-E Digital Air Data Computers",
      "(2) Collins GPS-4000 GPS with WAAS",
      "(2) Collins FMC-6000 FMS",
      "(3) Litton LTN-101 Inertial Reference Units",
      "(2) Collins RTU-4000 Radio Tuning Units",
      "(1) Collins RTA-854 Weather Radar",
      "(2) Collins ALT-55B Radio Altimeters",
      "(2) Collins HF-9000 High Frequency Comm",
      "(1) Avtech Selcal Decoder",
      "(2) Collins VHF-422D Comm Transceivers",
      "(2) Collins VIR-432 VHF Nav Receivers",
      "(2) Collins DME-442 DME",
      "(2) Collins ADF-462 Automatic Direction Finders",
      "(2) Collins TDR-94D TXP (ADS-B Out V2 Mod)",
      "(1) Collins TTR-921 TCAS-2 with Change 7.1",
      "(1) Honeywell Mark-V EGPWS",
      "(1) L-3 F-1000 Flight Data Recorder (FDR)",
      "(1) L-3 A100S Cockpit Voice Recorder",
      "(1) Artex 110-406 ELT (406 MHz)",
      "(1) Aircell Axxess II Iridium Satcom",
      "(1) Collins DBU-5000 Data Base Unit",
    ],
    features: [
      "Entry Area Heater Installation Mod",
      "Installation Pulsating Light System",
      "Installation Dual Weather Radar Control Panel",
      "Installation Future Air Navigation System (FANS)",
      "ICS-220A Iridium Satellite Communication",
      "Installation of Expanded Flight Data Recorder (FDR) System",
      "MOD OF AFCS (Flight Control Computer) To Decrease T/O Pitch Angle",
      "Replace Lower Tail Navigation Light and Anti-Collision Light",
      "Installation Second Radio Altimeter System",
      "Installation Lightning Detection System",
      "Installation Metric Altitude Switch",
      "Reduced Vertical Separation Minimum (RVSM) to 1000 Feet Aircraft Qualification",
      "Installation AFIS",
      "Modification for Ground Proximity Warning System (GPWS)",
      "TCAS Installation",
      "Introduction of Enhanced GPWS",
      "Introduction of New V-Speed Data Bases in the FMS",
      "Introduction of FMS Software Version 3.3.1",
      "Install Wide Area Augmentation System (WAAS) Capable GPS",
      "ATC Automatic Dependent Surveillance Broadcast (ADS-B) Out Capability",
      "TCAS II Upgrade Change 7.1",
      "ATC Transponder with ADS-B Out Version 2 Capability",
      "36-150(CL) Auxiliary Power Unit (APU) Stainless Steel Exhaust Shield",
      "Additional Cabin Windows Modification",
    ],
    maintenanceSummary: [
      "Computerized Aircraft Maintenance Program (CAMP)",
      "Bombardier Smart Parts Plan, 2022 Rate US$586.00 Per Flight Hour",
      "96 Month Gear OH Done February 2023 @ 3996 Hours 1961 CSN; Next Due @ 24 February 2031",
    ],
    maintenanceHistory: [
      {
        date: "May 2023",
        event: "100 Hour Inspection",
        facility: "Next due: N/A",
        hours: "4054 H; Next Due TSN 4154 H",
      },
      {
        date: "May 2023",
        event: "400 Hour Inspection",
        facility: "Next due: N/A",
        hours: "4054 H; Next Due TSN 4454 H",
      },
      {
        date: "April 2020",
        event: "800 Hour Inspection",
        facility: "Next due: N/A",
        hours: "3672 H; Next Due TSN 4472 H",
      },
      {
        date: "December 2018",
        event: "1200 Hour Inspection",
        facility: "Next due: N/A",
        hours: "3308 H; Next Due TSN 4506 H",
      },
      {
        date: "April 2018",
        event: "1600 Hour Inspection",
        facility: "Next due: N/A",
        hours: "3154 H; Next Due TSN 4754 H",
      },
      {
        date: "September 2014",
        event: "2400 Hours Inspection",
        facility: "Next due: N/A",
        hours: "2109 H; Next Due TSN 4509 H",
      },
      {
        date: "April 2018",
        event: "3200 Hour Inspection",
        facility: "Next due: N/A",
        hours: "3154 H; Next Due TSN 6354 H",
      },
      {
        date: "N/A",
        event: "4800 Hour Inspection",
        facility: "Next due: N/A",
        hours: "N/A; Next Due TSN 4800 H",
      },
      {
        date: "N/A",
        event: "6400 Hour Inspection",
        facility: "Next due: N/A",
        hours: "N/A; Next Due TSN 6400 H",
      },
      {
        date: "May 2023",
        event: "6 Month Inspection",
        facility: "Next due: 21 October 2023",
        hours: "4054 H",
      },
      {
        date: "February 2023",
        event: "12 Month Inspection",
        facility: "Next due: 21 December 2023",
        hours: "3996 H",
      },
      {
        date: "February 2023",
        event: "24 Month Inspection",
        facility: "Next due: 09 November 2024",
        hours: "3996 H",
      },
      {
        date: "January 2022",
        event: "36 Month Inspection",
        facility: "Next due: 28 November 2024",
        hours: "3939 H",
      },
      {
        date: "February 2023",
        event: "48 Month Inspection",
        facility: "Next due: 09 September 2026",
        hours: "3996 H",
      },
      {
        date: "February 2023",
        event: "96 Month Inspection",
        facility: "Next due: 09 September 2030",
        hours: "3996 H",
      },
      {
        date: "February 2023",
        event: "192 Month Inspection",
        facility: "Next due: 31 December 2038",
        hours: "3996 H",
      },
    ],
  },
  {
    id: "2004-dassault-falcon-900c",
    aircraftId: "Aircraft-EXGM4N",
    year: 2004,
    make: "Dassault",
    model: "Falcon 900C",
    name: "2004 Falcon 900C",
    category: "Heavy",
    status: "Sold",
    passengers: 12,
    rangeNm: 4080,
    knots: 466,
    totalHours: 5278,
    airframeCycles: 1860,
    price: "Price on request",
    image: "/Aircrafts/Falcon2004.jpg",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "Honeywell Aerospace TFE731-5BR-1C" },
          { label: "Eng. 1 Total Time", value: "5,278 hrs" },
          { label: "Eng. 2 Total Time", value: "5,278 hrs" },
          { label: "Eng. 1 Cycles", value: "1,860" },
          { label: "Eng. 2 Cycles", value: "1,860" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Honeywell GTCP 36-150(F)" },
          { label: "Total Time", value: "4,338 hrs" },
        ],
      },
    ],
    interior: [
      "New complete designer interior in late 2020",
      "13 passenger + 2 crew + 1 observer jump seat configuration",
      "Forward crew lavatory and aft cabin VIP lavatory",
      "Forward galley equipped with refrigerator, warming oven, hot cup, microwave oven, ice and storage drawers",
      "Forward cabin: 4 single chairs in club arrangement with 2 side-ledge pullout tables",
      "Mid-cabin: 4-place conference-dining group opposite a credenza",
      "Mid-to-aft cabin divider",
      "Aft cabin: 2 seats in club arrangement with side-ledge pullout table opposite a 3-place side-facing berthing divan",
      "Airshow 400 Passenger Flight Display Information System",
      "Dual DVD players",
      "20-inch forward bulkhead-mounted monitor",
      "15-inch aft bulkhead-mounted monitor",
      "10-inch side-ledge plug-in monitors",
      "GoGo ATG-5000 domestic USA high-speed data system with Wi-Fi",
      "Satcom system",
      "Maximum passengers: 12",
    ],
    exterior: [
      "New in 2021",
      "Allover Black with Off White, Metallic Saturn Brown & Khaki Accents",
    ],
    avionics: [
      "Honeywell Primus 2000 Integrated Avionics Suite",
      "Dual Honeywell AZ-810 Air Data Computers",
      "Dual Collins ADF-462",
      "Dual Honeywell SPZ-8000 Autopilot",
      "Honeywell Cockpit Voice Recorder",
      "Dual Collins VHF-422C (8.33 Spacing)",
      "Honeywell Flight Data Recorder (SSFDR)",
      "Dual Collins DME-442",
      "Artex C406-1 ELT",
      "Honeywell EGPWS",
      "Dual Honeywell GNSSU GPS Units",
      "Triple Honeywell NZ-2010 FMS (NZ 6.1.1)",
      "Dual Collins HF-9000 High Frequency",
      "Triple Honeywell Laseref IV Inertial Reference Systems",
      "Dual Collins VIR-32 (FM Immunity)",
      "Honeywell Primus 880 Weather Radar with Dual Controllers",
      "Single Honeywell RT-300 Radio Altimeter",
      "Coltech 714 SELCAL",
      "TCAS 2: TCAS 4000 with Change 7.1",
      "Dual Collins TDR-94D Mode S (ADS-B-Out V.2)",
      "Dual Davtron Digital Clocks",
      "Improved Microphone for CVR (SBF900-343)",
      "ATC with Enhanced Surveillance (SBF900-354)",
      "Installation Improved Pilot & Co-Pilot Seat (SBF900-429-REV02)",
    ],
    features: [
      "FANS 1/A+ Compliant with CPDLC",
      "FMS CDU, FMS 6.1.1 Upgrade",
      "GPS/WAAS, ADS-B Out Version 2, TCAS II with Change 7.1 Mod",
      "Real Time Aircraft Weight Calculation (SBF900-002)",
      "Airbrake Actuator Installation Drainage Seal (SBF900-004)",
      "Improved Side Engine Power Controls Cables (SBF900-0-05)",
      "Reduced Vertical Separation Minimum (RVSM) Capability (SB-900-186-REV-3)",
      "Digital Battery Temperature Indicator (SBF900-229)",
      "Install Three-Frequency ELT with Circulator (SB-F900-230-REV-01)",
      "Install Flight Data Recorder (FDR)",
      "CTS Quick Access Recorder (QAR) (SBF900-247)",
      "Install Dual Wing Navigation Inspection Lights (SBF900-257-REV-01)",
      "Install Securaplane Battery (SBF9000-269-REV-04)",
      "Improved Microphone for CVR (SBF900-343)",
      "ATC with Enhanced Surveillance (SBF900-354)",
      "Installation Improved Pilot & Co-Pilot Seat (SBF900-429-REV02)",
    ],
    maintenanceSummary: [
      "CAMP Systems Computerized Aircraft Maintenance Tracking Maintenance Program",
      "Last C-Check done by Duncan Aviation, Lincoln Nebraska, USA.",
    ],
    maintenanceHistory: [
      {
        date: "July 2023",
        event: "12 Month / 0800 H",
        facility: "Next due: 21 June 2024",
        hours: "Last Done TSN 5278; Next Due TSN 6078",
      },
      {
        date: "June 2023",
        event: "24 Month / 1600 H",
        facility: "Next due: 21 June 2024",
        hours: "Last Done TSN 5026; Next Due TSN 6626",
      },
      {
        date: "June 2022",
        event: "36 Month / 2400 H",
        facility: "Next due: 21 June 2025",
        hours: "Last Done TSN 5026; Next Due TSN 7426",
      },
      {
        date: "June 2022",
        event: "1B 1600 H",
        facility: "Next due: N/A",
        hours: "Last Done TSN 5026; Next Due TSN 6626",
      },
      {
        date: "September 2011",
        event: "2B 3200 H",
        facility: "Next due: N/A",
        hours: "Last Done TSN 2936; Next Due TSN 6126",
      },
      {
        date: "April 2018",
        event: "3B 4800 H",
        facility: "Next due: N/A",
        hours: "Last Done TSN 4738; Next Due TSN 9538",
      },
      {
        date: "June 2022",
        event: "1C 72 Month / 3750 Cycles",
        facility: "Next due: 21 June 2028",
        hours: "Last Done 5026 CSN; Next Due 1785 CSN",
      },
      {
        date: "June 2016",
        event: "2C 144 Month / 7500 Cycles",
        facility: "Next due: 4 June 2028",
        hours: "Last Done 1491; Next Due CSN",
      },
      {
        date: "June 2022",
        event: "3C 216 Month / 11250 Cycles",
        facility: "Next due: 21 June 2040",
        hours: "Last Done 1785 CSN; Next Due CSN",
      },
      {
        date: "December 2015",
        event: "Gear 144-Month 6000 Cycle OH",
        facility: "Next due: 7 December 2027",
        hours: "Last Done 1491 CSN; Next Due 7491 CSN",
      },
    ],
  },
  {
    id: "2001-bombardier-challenger-604",
    aircraftId: "Aircraft-eufnVR",
    year: 2001,
    make: "Bombardier",
    model: "Challenger 604",
    name: "2001 Bombardier Challenger 604",
    category: "Heavy",
    status: "Available",
    passengers: 9,
    rangeNm: 4119,
    knots: 459,
    totalHours: 4963,
    airframeCycles: 2714,
    price: "Price on request",
    image: "",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "General Electric CF34-3B" },
          { label: "Eng. 1 Total Time", value: "4,963 hrs" },
          { label: "Eng. 2 Total Time", value: "4,963 hrs" },
          { label: "Eng. 1 Cycles", value: "2,728" },
          { label: "Eng. 2 Cycles", value: "2,728" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Honeywell GTCP 36-150 (CL)" },
          { label: "Total Time", value: "3,927 hrs" },
        ],
      },
    ],
    interior: [
      "9 passengers + flight deck crew",
      "Aft cabin passenger lavatory with flushing potty and vanity",
      "Forward right-side S-shaped galley; cooled wine & food storage; TIA high-temp oven; TIA coffee maker; microwave",
      "Baker dual DVD player; Airshow 400 PFIS; forward & aft 21-inch bulkhead monitors; 12-disc CD changer",
      "Forward cabin: 4 chairs in club arrangement with pullout tables",
      "Aft cabin: 2 chairs in club with pullout tables opposite a 3-place side-facing divan",
    ],
    exterior: ["Allover Matterhorn White with Red and Burgundy accents"],
    avionics: [
      "Collins Pro Line 4 EFIS — 6 display tubes",
      "2 × Collins FCC-4006 digital flight control; 2 × ADC-850-E air data computers",
      "2 × Collins GPS-4000 (12-ch); 2 × FMC-6000 FMS; 3 × LTN-101 IRS",
      "Collins RTA-854 weather radar; 2 × ALT-55B radio altimeter",
      "2 × Collins HF-9031A HF Comm; 2 × VHF-422B (8.33 kHz); 2 × VIR-432 VHF NAV",
      "2 × DME-442; 2 × ADF-462; 2 × TDR-94D Mode S; Collins TTR-921 TCAS-2 Change 7.1",
      "Honeywell Mark-V EGPWS; Fairchild F-1000 FDR & A100S CVR; Artex 406 ELT; Aircell ST-3100 SATCOM (2 handsets)",
    ],
    features: [
      "Extended floorplan with 3 additional windows",
      "Enhanced auto-throttle; APU upgraded to GTCP-36-150",
      "Increased MTOW to 48,200 lb (SB-604-1-001)",
      "Third VHF, third IRS, second radio altimeter installed",
      "Lightning Detection System (LDS); RVSM; AFIS; dual GPS",
      "TCAS Change 7.1 mod; Enhanced Mode S surveillance (Precision Plus)",
      "FMS software upgrade to 3.3.1",
    ],
    maintenanceSummary: [
      "96-Month gear overhaul completed September 2017 @ 4,414 hrs",
      "2284 CSN inspection listed due 28 November 2025 (treat as historical listed due date)",
    ],
  },
  {
    id: "2017-dassault-falcon-7x",
    aircraftId: "Aircraft-QCW231",
    year: 2017,
    make: "Dassault",
    model: "Falcon 7X",
    name: "2017 Falcon 7X",
    category: "Heavy",
    status: "Sale Pending",
    passengers: 14,
    rangeNm: 5795,
    knots: 459,
    totalHours: 1048,
    airframeCycles: 478,
    price: "Price on request",
    image: "",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          {
            label: "Make / Model",
            value: "Pratt & Whitney Canada PW307A (x3)",
          },
          { label: "Eng. 1 Total Time", value: "1,043 hrs" },
          { label: "Eng. 2 Total Time", value: "1,043 hrs" },
          { label: "Eng. 3 Total Time", value: "1,043 hrs" },
          { label: "Cycles (each)", value: "478" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Honeywell GTCP36-150 (FN)" },
          { label: "Total Time", value: "1,531 hrs" },
          { label: "Cycles", value: "1,341" },
        ],
      },
    ],
    interior: [
      "14 passengers + 2 flight deck crew + crew jump seat; interior new in 2017 by Dassault Aviation",
      "Forward 30-inch crew lavatory with fixed sink; aft cabin VIP lavatory with vanity cabinet",
      "Forward 38-inch galley annex; entryway closet and entertainment cabinet",
      "Upper galley: TIA Wavejet microwave, Enflite high-temp oven, DeLonghi Nespresso machine",
      "Forward cabin: 4 chairs in club with 2 pullout tables",
      "Mid cabin: 4-place conference/dining group with electric Hi-Lo table opposite credenza",
      "Aft cabin: two 3-place opposing 60-inch 16G divans (manual & electric berthing)",
      "Honeywell MCS-7120 Inmarsat SATCOM; Rockwell Collins Falcon Cabin HD+ with 3D moving map",
      "Dual Blu-Ray; two 22-inch widescreen HD LED monitors; ALTO speakers/subwoofers/amplifiers",
    ],
    avionics: [
      "Honeywell EASy II flight deck — 4 × DU1310 display units",
      "Triple TR866B VHF Comm; dual DF855 ADF; dual KHF1050 HF; triple AV900 audio",
      "Dual XS858B Mode S transponders; ACSS TCAS 3000 with Change 7.1",
      "Honeywell EASy autothrottle; EGPWS; Goodrich ice detector & smart probes air data",
      "Triple Laseref V micro IRS; dual ARCOMBI flight recording; EASy central maintenance computer",
      "EASy II CPDLC FANS 1/A; ADS-B Out; MCS7120 SATCOM (Aero H+ / Swift Broadband)",
      "Dual NV877A VOR/ILS/MKR/GPS; dual DM855 DME; WU880 weather radar; KRA405B radar altimeter",
    ],
    features: [
      "Enhanced Flight Vision System (EFVS) — SB-7X-077-REV-01",
      "Honeywell Lightning Sensor System (LSS) — SB-7X-113-REV-02",
      "Head-Up Guidance System (HGS) upgrade — SB7X-166; Rockwell Collins HGS-5860 HUD",
      "TCAS II Change 7.1 — SB-7X-197-REV-01",
      "Enhanced Avionics System EASy II — SB-7X-300 / 320 / 322",
      "LPV navigation — SB-7X-301; ADS-B Out Version 2 — SB-7X-302",
      "SmartView Synthetic Vision System — SB7X-030",
      "CPDLC ATN-B1 & FANS 1/A+ datalink; SBAS / LPV; Jeppesen chart capability",
    ],
    maintenanceSummary: [
      "Computerized Aircraft Maintenance Program (CAMP) tracking system",
    ],
  },
  {
    id: "2011-airbus-acj319",
    aircraftId: "Aircraft-t4ASbQ",
    year: 2011,
    make: "Airbus",
    model: "ACJ319",
    name: "2011 Airbus ACJ319",
    category: "Ultra Long Range",
    status: "Sale Pending",
    passengers: 25,
    rangeNm: 6000,
    knots: 447,
    totalHours: 1984,
    airframeCycles: 1023,
    price: "Price on request",
    image: "",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          {
            label: "Make / Model",
            value: "International Aero Engines V2527M-A5",
          },
          { label: "Eng. 1 Total Time", value: "1,919 hrs" },
          { label: "Eng. 2 Total Time", value: "1,919 hrs" },
          { label: "Eng. 1 Cycles", value: "955" },
          { label: "Eng. 2 Cycles", value: "955" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Hamilton Standard APS3200" },
          { label: "Total Time", value: "1,221 hrs" },
          { label: "Cycles", value: "913" },
        ],
      },
    ],
    interior: [
      "Custom 25-passenger VVIP configuration by BizJet, Oklahoma, USA",
      "Forward airstairs entry; 2 folding main-entry attendant seats",
      "Aft master bedroom with shower; original completion August 2011 (Associated Air Center, Dallas)",
      "Interior certified under FAA and EASA; 16G dynamic-load conformity for seats and divans",
      "Forward main galley: 2 MGS induction ovens, Aerolux Nespresso, freezer, water heater, air chiller",
      "Forward cabin: 6 forward-facing club seats with plug-in monitors and in-arm pull-out tables",
      "Mid cabin: 4-place conference group opposite 3-place divan; right-side 4-place conference group",
      "Aft mid-cabin: U-shaped dining for 4, credenza, automatic 50-inch monitor, guest lavatory",
      "Aft master suite: VVIP lavatory, shower, aft-facing queen bed, Chairman club seat, 42-inch monitor",
      "Honeywell MCS-7200 SATCOM (7 handsets, dual Swift Broadband); Wi-Fi; Airshow 4000; LED lighting",
    ],
    avionics: [
      "2 × autopilot/autoflight computers; 2 × flight augmentation; 2 × flight control computers",
      "2 × HF, 3 × VHF transceivers; audio management unit; 2 × radio management panels",
      "3 × FMS displays; solid-state FDR; 2 × flight warning computers; 2 × data acquisition computers",
      "3 × ADIRUs; 2 × weather radar transceivers; 2 × VOR; 2 × ADF; 2 × DME; 2 × MMR",
      "TCAS Change 7.1; 2 × ATC transponders; 2 × radio altimeters; EGPWS",
    ],
    features: [
      "25-passenger VVIP configuration; aft stateroom with master bathroom and shower",
      "Extended range with 5 auxiliary fuel tanks (up to ~10.5 hours)",
      "FANS-I/A+; ADS-B Out Version 2; TCAS-2 Change 7.1 mod",
      "Fresh C-Check",
    ],
    maintenanceSummary: [
      "All maintenance since 2011 conducted by AMAC in Basel, Switzerland",
    ],
    maintenanceHistory: [
      {
        date: "Apr 2018",
        event: "72 Months Inspection",
        facility: "Next due: 18 Apr 2024",
        hours: "1,325",
      },
      {
        date: "May 2020",
        event: "48 Months Inspection",
        facility: "Next due: 27 Apr 2024",
        hours: "1,576",
      },
      {
        date: "Aug 2022",
        event: "24 Months Inspection",
        facility: "Next due: 27 Apr 2024",
        hours: "1,755",
      },
      {
        date: "May 2023",
        event: "12 Months Inspection",
        facility: "Next due: 22 May 2024",
        hours: "1,915",
      },
      {
        date: "May 2021",
        event: "120 Months Gear Overhaul",
        facility: "Next due: 7 May 2031",
        hours: "852 cyc",
      },
    ],
  },
  {
    id: "2010-bombardier-challenger-605",
    aircraftId: "Aircraft-qpcSmF",
    year: 2010,
    make: "Bombardier",
    model: "Challenger 605",
    name: "2010 Bombardier Challenger 605",
    category: "Heavy",
    status: "Sold",
    passengers: 10,
    rangeNm: 4123,
    knots: 459,
    totalHours: 4780,
    airframeCycles: 1740,
    price: "Price on request",
    image: "",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "General Electric CF34-3B" },
          { label: "Eng. 1 Total Time", value: "4,780 hrs" },
          { label: "Eng. 2 Total Time", value: "4,780 hrs" },
          { label: "Eng. 1 Cycles", value: "1,740" },
          { label: "Eng. 2 Cycles", value: "1,740" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Honeywell GTCP series" },
          { label: "Total Time", value: "On request" },
        ],
      },
    ],
    interior: [
      "10 passengers + flight deck crew + jump seat",
      "Passenger lavatory; forward galley",
      "Forward cabin: 4 chairs in club arrangement with pullout tables",
      "Aft cabin: 4-place divan opposite 2 chairs in club arrangement with pullout table",
    ],
    exterior: [
      "New in 2011",
      "Allover Matterhorn White with Gamma Grey, Blue and Titanium Silver accents",
    ],
    avionics: [
      "Collins Pro Line 21 — 4-tube 10×12-inch LCD EFIS / flight director",
      "Dual Collins communications (8.33 kHz); RTA-854 digital color weather radar; CMU 4000",
      "L3 FA2100 CVR (120 min) & FDR (25 hr); dual DME-4000; dual IRS + 3rd IRS",
      "Dual Pro Line 21 nav radios; dual VOR/ILS/MKR; Collins TCAS-II Change 7.1",
      "Dual TDR-94D enhanced Mode S; dual NAV-4000 ADF; dual HF-9031A; 2 × CDU-6200 / FMC-6000 / GPS-4000",
      "Iridium flight phone; datalink with Iridium interface; cockpit touchscreen monitor",
    ],
    features: [
      "Passenger oxygen mask lanyard replacement — SB605-35-008",
      "Universal graphic weather on MFD — SB605-46-003-REV-02",
      "L3AR 90-Day Underwater Locator Beacon conversion — SB-LAR-001-R1",
      "2nd refuel/defuel panel; enhanced maps on MFD",
    ],
    maintenanceSummary: [
      "CAMP Systems Computerized Aircraft Maintenance Program",
    ],
    maintenanceHistory: [
      {
        date: "Aug 2023",
        event: "12 Month",
        facility: "Next due: Jul 2024",
        hours: "4,736",
      },
      {
        date: "Sep 2023",
        event: "24 Month",
        facility: "Next due: Sep 2025",
        hours: "4,328",
      },
      {
        date: "Aug 2023",
        event: "36 Month",
        facility: "Next due: Oct 2026",
        hours: "4,164",
      },
      {
        date: "Dec 2019",
        event: "48 Month",
        facility: "Next due: Dec 2023",
        hours: "3,839",
      },
      {
        date: "Dec 2019",
        event: "96 Month",
        facility: "Next due: Dec 2027",
        hours: "3,839",
      },
      {
        date: "Dec 2019",
        event: "96 Month Gear Inspection",
        facility: "Next due: Jul 2027",
        hours: "1,242 CSN",
      },
      {
        date: "Apr 2023",
        event: "2400 Hour Inspection",
        facility: "Next due: 7,039 H",
        hours: "4,639",
      },
    ],
  },
  {
    id: "2016-embraer-legacy-650",
    aircraftId: "Aircraft-YV7Dmk",
    year: 2016,
    make: "Embraer",
    model: "Legacy 650",
    name: "2016 Embraer Legacy 650",
    category: "Heavy",
    status: "Available",
    passengers: 13,
    rangeNm: 4123,
    knots: 459,
    totalHours: 1265,
    airframeCycles: 694,
    price: "Price on request",
    image: "",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "Rolls-Royce" },
          { label: "Total Time", value: "1,265 hrs" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [{ label: "Make / Model", value: "On request" }],
      },
    ],
    interior: [
      "Elite interior seating up to 13 passengers",
      "Designed for comfort and convenience",
      "Super-silent soundproofing",
    ],
    avionics: [
      "RVSM; NAT HLA / MNPS; P-RNAV; LPV; RNP; CAT II; RAAS; VNAV",
      "3rd VHF; FANS 1/A+; CPDLC; ADS-B Out",
      "Dual FMS; EGPWS; dual Laseref; TCAS 7.1; datalink",
      "Dual HF KHF-950; Swift Broadband high-speed data with datalink; SATCOM",
      "Honeywell IFE system; 2 Blu-ray players; steep approach capability",
    ],
    features: ["CAAV registered", "High-altitude operation"],
    maintenanceSummary: ["Maintenance program details available on request"],
  },
  {
    id: "2012-gulfstream-g550",
    aircraftId: "Aircraft-yNFKER",
    year: 2012,
    make: "Gulfstream",
    model: "G550",
    name: "2012 Gulfstream G550",
    category: "Heavy",
    status: "Available",
    passengers: 18,
    rangeNm: 6954,
    knots: 476,
    totalHours: 3288,
    airframeCycles: 1222,
    price: "Price on request",
    image: "",
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "Rolls-Royce BR710 (G-550)" },
          { label: "Eng. 1 Total Time", value: "3,284 hrs" },
          { label: "Eng. 2 Total Time", value: "3,272 hrs" },
          { label: "Eng. 1 Cycles", value: "1,219" },
          { label: "Eng. 2 Cycles", value: "1,215" },
        ],
      },
      {
        title: "APU",
        icon: "apu",
        rows: [{ label: "Make / Model", value: "Honeywell RE220" }],
      },
    ],
    interior: [
      "Executive 18-passenger, 4-zone interior",
      "8-place double club seating, 4-place conference group, aft private compartment with dual 3-place berthable divans",
      "Forward galley: dual TIA 1603 coffeemakers, Sharp microwave, Enflite convection oven, thermal-electric cold storage",
      "Airshow 400; forward and aft bulkhead-mounted 24-inch LCD HD monitors; six LCD personal monitors; dual Blu-ray",
      "Swift Broadband internet; 115V/60Hz outlets; therapeutic oxygen system",
      "Mid-cabin bulkhead with electric pocket door; forward crew lavatory and aft lavatory with vanity",
    ],
    exterior: [
      "Matterhorn White with blue stripes",
      "Original white exterior with new blue stripes (11/2020)",
    ],
    avionics: [
      "Gulfstream PlaneView with Cert Hotel; Honeywell Primus Epic",
      "Honeywell DU-1310 4-tube flat-panel EFIS; triple Honeywell FMS; dual 24-ch GPS",
      "Dual Collins HF-9304 with SELCAL; triple Laseref V micro IRS; triple RT-300 radio altimeter",
      "AirCell Axxess Iridium & Honeywell MCS-7100 SATCOM; Honeywell EGPWS (TAWS)",
      "ACSS TCAS-3000 Change 7.1; dual Mode S with enhanced Flight ID; Primus 880 weather radar",
      "FANS CPDLC; Enhanced Vision System; Universal FDR & CVR",
    ],
    features: [
      "Synthetic Vision System",
      "Engine Maintenance Program; ADS-B capable",
      "Third FMS and third IRS; Heads-Up Display; SATCOM",
      "8.33 channel spacing; RVSM; TAWS; TCAS; FANS / CPDLC",
      "High-speed data / Wi-Fi",
    ],
    maintenanceSummary: [
      "Maintained FAR Part 91; certifications MNPS, RNP-10, RNP-5, RVSM",
      "One owner since new; always hangared",
      "24-Month, 48-Month and 120-Month inspections 06/14/22 by AMAC, Basel, Switzerland",
      "12-Month inspection 03/22/23 by Gulfstream",
    ],
  },
];

const moreAircraft: Aircraft[] = [];

function code(m: string) {
  return m
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 6);
}

function withAircraftDetails(a: Aircraft): Aircraft {
  const c = code(a.model);

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
            {
              label: "Total Time",
              value: `${Math.round(a.totalHours * 0.9).toLocaleString()} hrs`,
            },
            { label: "Status", value: "Operational" },
          ],
        },
      ];

  const maintenanceSummary = a.maintenanceSummary ?? [
    "Enrolled on Computerized Aircraft Maintenance Program (CAMP) Tracking System",
    `Airframe: ${a.totalHours.toLocaleString()} hrs / ${a.airframeCycles.toLocaleString()} cycles`,
    "All Airworthiness Directives (ADs) complied with",
    "All mandatory Service Bulletins (SBs) complied with",
  ];

  const maintenanceHistory = a.maintenanceHistory ?? [
    {
      date: `${a.year + 1}`,
      event: "Aircraft delivery & entry into service",
      facility: "OEM Delivery Center",
      hours: "0",
    },
    {
      date: `${a.year + 6}`,
      event: "24-Month Inspection & Landing Gear Overhaul",
      facility: "Authorized Service Center",
      hours: Math.round(a.totalHours * 0.5).toLocaleString(),
    },
    {
      date: "Most recent",
      event: "Avionics update & ADS-B Out compliance",
      facility: "Authorized Avionics Shop",
      hours: a.totalHours.toLocaleString(),
    },
  ];

  const maintenance = a.maintenance ?? [
    `ADS-B Out Compliance (SB-${c}-322-REV-02)`,
    `Enhanced Avionics System Upgrade (SB-${c}-300-REV-03)`,
    `TCAS II System Change 7.1 (SB-${c}-197-REV-01)`,
  ];
  const features = a.features ?? [
    "Wi-Fi / High-speed connectivity",
    "Auxiliary Power Unit (APU)",
    "Synthetic Vision System (SVS)",
    "Dual-zone cabin climate control",
  ];
  const avionics = a.avionics ?? [
    "Honeywell Primus Epic flight deck",
    "TCAS II Change 7.1",
    "ADS-B Out (DO-260B)",
    "EGPWS / TAWS",
  ];
  const interior = a.interior ?? [
    `${Math.max(8, a.passengers)}-passenger executive configuration`,
    "High-definition cabin management system",
    "LED mood lighting throughout",
  ];
  const exterior = a.exterior ?? [
    "Fresh exterior paint (Matterhorn White)",
    "Detailed, polished and corrosion-treated",
    "No known damage history",
  ];

  const gallery =
    a.gallery && a.gallery.length ? a.gallery : a.image ? [a.image] : [];

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
    exterior,
  };
}

export const aircraft: Aircraft[] = [...baseAircraft, ...moreAircraft].map(
  withAircraftDetails,
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
  "Exterior",
] as const;
export type SpecTab = (typeof specTabs)[number];
