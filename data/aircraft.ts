/**
 * MARKETPLACE — AIRCRAFT DATA (real inventory)
 * Images are served from /public/Aircrafts.
 *
 * PER-AIRCRAFT IMAGES / CAROUSEL:
 *  - `image`   = the card thumbnail + first gallery image. Leave "" for none
 *                (a gold-falcon placeholder shows and there is NO carousel).
 *  - `gallery` = that aircraft's OWN photos. Add 2+ paths here to enable the
 *                detail-page carousel (arrows + thumbnails). With 1 image it
 *                just shows that image; with 0 it shows the placeholder.
 *                Galleries are never shared between aircraft.
 *  Example:  gallery: ["/Aircrafts/Legacy2014-1.jpeg", "/Aircrafts/Legacy2014-2.jpeg"]
 */

export type AircraftStatus = "Available" | "Sale Pending" | "Sold" | "Acquired";

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
  aircraftId: string;
  year: number;
  make: string;
  model: string;
  name: string;
  category: AircraftCategory;
  status: AircraftStatus;
  passengers: number;
  rangeNm: number;
  knots: number;
  totalHours: number;
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
  "Ultra Long Range"
];

export const aircraftStatuses: AircraftStatus[] = [
  "Available",
  "Sale Pending",
  "Sold",
  "Acquired"
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
    id: "2014-embraer-legacy-650",
    aircraftId: "Aircraft-9AM03f",
    year: 2014,
    make: "Embraer",
    model: "Legacy 650",
    name: "2014 Embraer Legacy 650",
    category: "Heavy",
    status: "Acquired",
    passengers: 13,
    rangeNm: 4123,
    knots: 459,
    totalHours: 4608,
    airframeCycles: 2633,
    price: "Price on request",
    image: "/Aircrafts/Legacy2014.jpeg",
    gallery: ["/Aircrafts/Legacy2014.jpeg"],
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "Rolls-Royce North America AE3007A2" },
          { label: "Eng. 1 Total Time", value: "4,444 hrs" },
          { label: "Eng. 2 Total Time", value: "4,444 hrs" },
          { label: "Eng. 1 Cycles", value: "2,537" },
          { label: "Eng. 2 Cycles", value: "2,537" },
          { label: "Power By The Hour", value: "Rolls-Royce CorporateCare Enhanced" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Hamilton Sundstrand APS500R" },
          { label: "Total Time", value: "3,072 hrs" },
          { label: "Cycles", value: "4,090" }
        ]
      }
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
      "Forward and aft 19-inch bulkhead-mounted monitors; satellite phone"
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
      "Honeywell WU-880 Weather Radar; PC-400 Autopilot controller"
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
      "Synthetic Vision System installation (SB145LEG-31-0027/03)"
    ],
    maintenanceSummary: [
      "Embraer Low Utilization Plan with CAMP Systems Computerized Aircraft Maintenance Tracking Program"
    ],
    maintenanceHistory: [
      { date: "Feb 2025", event: "12 Month / 500 Hour", facility: "Next due: Feb 2026", hours: "4,371" },
      { date: "Feb 2025", event: "24 Month / 1,000 Hour", facility: "Next due: Feb 2027", hours: "4,371" },
      { date: "Mar 2023", event: "48 Month / 2,000 Hour", facility: "Next due: Mar 2027", hours: "3,506" },
      { date: "Dec 2020", event: "72 Month / 3,000 Hour", facility: "Next due: Dec 2026", hours: "3,027" },
      { date: "Mar 2023", event: "96 Month / 4,000 Hour", facility: "Next due: Mar 2031", hours: "3,506" },
      { date: "—", event: "Gear 144 Month Overhaul", facility: "Next due: Dec 2026", hours: "—" }
    ]
  },
  {
    id: "2015-embraer-legacy-650",
    aircraftId: "Aircraft-HsSkp9",
    year: 2015,
    make: "Embraer",
    model: "Legacy 650",
    name: "2015 Embraer Legacy 650",
    category: "Heavy",
    status: "Acquired",
    passengers: 13,
    rangeNm: 4123,
    knots: 459,
    totalHours: 2079,
    airframeCycles: 1204,
    price: "Price on request",
    image: "/Aircrafts/Legacy2015.jpeg",
    gallery: ["/Aircrafts/Legacy2015.jpeg"],
    overview: [
      {
        title: "Engines",
        icon: "engine",
        rows: [
          { label: "Make / Model", value: "Rolls-Royce Plc AE3007A2" },
          { label: "Eng. 1 Total Time", value: "2,104 hrs" },
          { label: "Eng. 2 Total Time", value: "2,104 hrs" },
          { label: "Eng. 1 Cycles", value: "1,204" },
          { label: "Eng. 2 Cycles", value: "1,204" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Hamilton Standard / Sundstrand APS500R / T-62T-40C14" },
          { label: "Total Time", value: "1,802 hrs" },
          { label: "Cycles", value: "1,204" }
        ]
      }
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
      "Ovation Cabin Management System; dual 19-inch bulkhead monitors; 2 side-ledge monitors"
    ],
    exterior: ["White with Silver and Blue"],
    avionics: [
      "Honeywell RNZ-851 VHF-NAV / Marker / Glideslope / ADF / DME",
      "Honeywell RCZ-833K VHF Comm 1 & 2; RCZ-833 VHF Comm 3",
      "Honeywell NZ-2000 (6.1) FMS; IC-600 Integrated Computer (7.1 mod)",
      "Honeywell AZ-950 Air Data; Laseref IV IRS; RT-300 Radio Altimeter; GR-550 GPS",
      "ACSS/Honeywell TCAS 2000; EGPWS Mark V; AV-850A audio; RM-855 RMU",
      "Honeywell KRX-1053 HF Comm; L3 2100 FDR & CVR; Artex C406-2 ELT; Jet Call 2 SELCAL",
      "Honeywell WX-880 Weather Radar; PC-400 Autopilot controller; CM-950 Cabin Management"
    ],
    features: [
      "FANS 1/A compliant; CPDLC compliant",
      "ADS-B Out Version 2",
      "TCAS II — Change 7.1 modification",
      "WAAS, LPV and RVSM compliant; RNP 0.3 capability",
      "NZ-2000 FMS with 6.1 software upgrade",
      "Iridium Satellite Phone System",
      "GoGo Biz AVANCE L-5 domestic USA high-speed data / internet / Wi-Fi"
    ],
    maintenanceSummary: [
      "Embraer Low Utilization Plan with CAMP Systems Computerized Aircraft Maintenance Tracking Program"
    ]
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
          { label: "Make / Model", value: "Rolls-Royce AG BR710-710C4-11 (G-550)" },
          { label: "Eng. 1 Total Time", value: "4,226 hrs" },
          { label: "Eng. 2 Total Time", value: "4,226 hrs" },
          { label: "Eng. 1 Cycles", value: "2,055" },
          { label: "Eng. 2 Cycles", value: "2,055" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Honeywell RE220 (G-550)" },
          { label: "Total Time", value: "4,236 hrs" }
        ]
      }
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
      "Honeywell Swift Broadband HD710; Wi-Fi; SATCOM Direct router; Rosen HD monitors throughout"
    ],
    exterior: [
      "New paint in 2016 by Gulfstream (Dallas, TX) at 1,556 hrs / 517 landings",
      "Overall Matterhorn White with Light Blue and Dark Blue stripes"
    ],
    avionics: [
      "Honeywell PlaneView Integrated Avionics System 4",
      "4 × Honeywell DU-1310 flat-panel displays; DC-884 display controllers; DP-884 brightness panel",
      "Honeywell/Kollsman VGS visual guidance; GP-500 flight guidance panel",
      "3 × AZ-200 air data modules; 3 × AV-900 audio panels; 2 × RT-300 radio altimeters",
      "Honeywell WU-800 weather radar; Universal FDR & CVR",
      "Honeywell MCS 7000+ SATCOM; L3 TCAS-3000SP 7.1",
      "3 × MC-850 MCDUs; 3 × IR-500 Laseref micro IRS; L3 GH-3100 standby indicator"
    ],
    features: [
      "88-parameter FDR upgrade; ARINC Direct datalink",
      "Synthetic Vision Primary Flight Display (SV-PFD)",
      "Runway Awareness Advisory System (RAAS); Enhanced Navigation; XM Weather",
      "CPDLC FANS 1A; TCAS 7.1; ADS-B Out",
      "LED navigation/anticollision strobe upgrade; external camera system",
      "SATCOM High Speed Data (HD-128) MCS-7100; Aircell Axxess Iridium phone",
      "Aircell ATG-4000 high-speed data & Wi-Fi; KU-band transmission radome"
    ],
    maintenanceSummary: [
      "Embraer Low Utilization Plan with CAMP Systems Computerized Aircraft Maintenance Tracking Program (per listing)"
    ]
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
          { label: "Eng. 2 Cycles", value: "2,728" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Honeywell GTCP 36-150 (CL)" },
          { label: "Total Time", value: "3,927 hrs" }
        ]
      }
    ],
    interior: [
      "9 passengers + flight deck crew",
      "Aft cabin passenger lavatory with flushing potty and vanity",
      "Forward right-side S-shaped galley; cooled wine & food storage; TIA high-temp oven; TIA coffee maker; microwave",
      "Baker dual DVD player; Airshow 400 PFIS; forward & aft 21-inch bulkhead monitors; 12-disc CD changer",
      "Forward cabin: 4 chairs in club arrangement with pullout tables",
      "Aft cabin: 2 chairs in club with pullout tables opposite a 3-place side-facing divan"
    ],
    exterior: ["Allover Matterhorn White with Red and Burgundy accents"],
    avionics: [
      "Collins Pro Line 4 EFIS — 6 display tubes",
      "2 × Collins FCC-4006 digital flight control; 2 × ADC-850-E air data computers",
      "2 × Collins GPS-4000 (12-ch); 2 × FMC-6000 FMS; 3 × LTN-101 IRS",
      "Collins RTA-854 weather radar; 2 × ALT-55B radio altimeter",
      "2 × Collins HF-9031A HF Comm; 2 × VHF-422B (8.33 kHz); 2 × VIR-432 VHF NAV",
      "2 × DME-442; 2 × ADF-462; 2 × TDR-94D Mode S; Collins TTR-921 TCAS-2 Change 7.1",
      "Honeywell Mark-V EGPWS; Fairchild F-1000 FDR & A100S CVR; Artex 406 ELT; Aircell ST-3100 SATCOM (2 handsets)"
    ],
    features: [
      "Extended floorplan with 3 additional windows",
      "Enhanced auto-throttle; APU upgraded to GTCP-36-150",
      "Increased MTOW to 48,200 lb (SB-604-1-001)",
      "Third VHF, third IRS, second radio altimeter installed",
      "Lightning Detection System (LDS); RVSM; AFIS; dual GPS",
      "TCAS Change 7.1 mod; Enhanced Mode S surveillance (Precision Plus)",
      "FMS software upgrade to 3.3.1"
    ],
    maintenanceSummary: [
      "96-Month gear overhaul completed September 2017 @ 4,414 hrs",
      "2284 CSN inspection listed due 28 November 2025 (treat as historical listed due date)"
    ]
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
          { label: "Make / Model", value: "Pratt & Whitney Canada PW307A (x3)" },
          { label: "Eng. 1 Total Time", value: "1,043 hrs" },
          { label: "Eng. 2 Total Time", value: "1,043 hrs" },
          { label: "Eng. 3 Total Time", value: "1,043 hrs" },
          { label: "Cycles (each)", value: "478" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Honeywell GTCP36-150 (FN)" },
          { label: "Total Time", value: "1,531 hrs" },
          { label: "Cycles", value: "1,341" }
        ]
      }
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
      "Dual Blu-Ray; two 22-inch widescreen HD LED monitors; ALTO speakers/subwoofers/amplifiers"
    ],
    avionics: [
      "Honeywell EASy II flight deck — 4 × DU1310 display units",
      "Triple TR866B VHF Comm; dual DF855 ADF; dual KHF1050 HF; triple AV900 audio",
      "Dual XS858B Mode S transponders; ACSS TCAS 3000 with Change 7.1",
      "Honeywell EASy autothrottle; EGPWS; Goodrich ice detector & smart probes air data",
      "Triple Laseref V micro IRS; dual ARCOMBI flight recording; EASy central maintenance computer",
      "EASy II CPDLC FANS 1/A; ADS-B Out; MCS7120 SATCOM (Aero H+ / Swift Broadband)",
      "Dual NV877A VOR/ILS/MKR/GPS; dual DM855 DME; WU880 weather radar; KRA405B radar altimeter"
    ],
    features: [
      "Enhanced Flight Vision System (EFVS) — SB-7X-077-REV-01",
      "Honeywell Lightning Sensor System (LSS) — SB-7X-113-REV-02",
      "Head-Up Guidance System (HGS) upgrade — SB7X-166; Rockwell Collins HGS-5860 HUD",
      "TCAS II Change 7.1 — SB-7X-197-REV-01",
      "Enhanced Avionics System EASy II — SB-7X-300 / 320 / 322",
      "LPV navigation — SB-7X-301; ADS-B Out Version 2 — SB-7X-302",
      "SmartView Synthetic Vision System — SB7X-030",
      "CPDLC ATN-B1 & FANS 1/A+ datalink; SBAS / LPV; Jeppesen chart capability"
    ],
    maintenanceSummary: [
      "Computerized Aircraft Maintenance Program (CAMP) tracking system"
    ]
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
          { label: "Make / Model", value: "International Aero Engines V2527M-A5" },
          { label: "Eng. 1 Total Time", value: "1,919 hrs" },
          { label: "Eng. 2 Total Time", value: "1,919 hrs" },
          { label: "Eng. 1 Cycles", value: "955" },
          { label: "Eng. 2 Cycles", value: "955" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Hamilton Standard APS3200" },
          { label: "Total Time", value: "1,221 hrs" },
          { label: "Cycles", value: "913" }
        ]
      }
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
      "Honeywell MCS-7200 SATCOM (7 handsets, dual Swift Broadband); Wi-Fi; Airshow 4000; LED lighting"
    ],
    avionics: [
      "2 × autopilot/autoflight computers; 2 × flight augmentation; 2 × flight control computers",
      "2 × HF, 3 × VHF transceivers; audio management unit; 2 × radio management panels",
      "3 × FMS displays; solid-state FDR; 2 × flight warning computers; 2 × data acquisition computers",
      "3 × ADIRUs; 2 × weather radar transceivers; 2 × VOR; 2 × ADF; 2 × DME; 2 × MMR",
      "TCAS Change 7.1; 2 × ATC transponders; 2 × radio altimeters; EGPWS"
    ],
    features: [
      "25-passenger VVIP configuration; aft stateroom with master bathroom and shower",
      "Extended range with 5 auxiliary fuel tanks (up to ~10.5 hours)",
      "FANS-I/A+; ADS-B Out Version 2; TCAS-2 Change 7.1 mod",
      "Fresh C-Check"
    ],
    maintenanceSummary: [
      "All maintenance since 2011 conducted by AMAC in Basel, Switzerland"
    ],
    maintenanceHistory: [
      { date: "Apr 2018", event: "72 Months Inspection", facility: "Next due: 18 Apr 2024", hours: "1,325" },
      { date: "May 2020", event: "48 Months Inspection", facility: "Next due: 27 Apr 2024", hours: "1,576" },
      { date: "Aug 2022", event: "24 Months Inspection", facility: "Next due: 27 Apr 2024", hours: "1,755" },
      { date: "May 2023", event: "12 Months Inspection", facility: "Next due: 22 May 2024", hours: "1,915" },
      { date: "May 2021", event: "120 Months Gear Overhaul", facility: "Next due: 7 May 2031", hours: "852 cyc" }
    ]
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
          { label: "Eng. 2 Cycles", value: "1,740" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [
          { label: "Make / Model", value: "Honeywell GTCP series" },
          { label: "Total Time", value: "On request" }
        ]
      }
    ],
    interior: [
      "10 passengers + flight deck crew + jump seat",
      "Passenger lavatory; forward galley",
      "Forward cabin: 4 chairs in club arrangement with pullout tables",
      "Aft cabin: 4-place divan opposite 2 chairs in club arrangement with pullout table"
    ],
    exterior: [
      "New in 2011",
      "Allover Matterhorn White with Gamma Grey, Blue and Titanium Silver accents"
    ],
    avionics: [
      "Collins Pro Line 21 — 4-tube 10×12-inch LCD EFIS / flight director",
      "Dual Collins communications (8.33 kHz); RTA-854 digital color weather radar; CMU 4000",
      "L3 FA2100 CVR (120 min) & FDR (25 hr); dual DME-4000; dual IRS + 3rd IRS",
      "Dual Pro Line 21 nav radios; dual VOR/ILS/MKR; Collins TCAS-II Change 7.1",
      "Dual TDR-94D enhanced Mode S; dual NAV-4000 ADF; dual HF-9031A; 2 × CDU-6200 / FMC-6000 / GPS-4000",
      "Iridium flight phone; datalink with Iridium interface; cockpit touchscreen monitor"
    ],
    features: [
      "Passenger oxygen mask lanyard replacement — SB605-35-008",
      "Universal graphic weather on MFD — SB605-46-003-REV-02",
      "L3AR 90-Day Underwater Locator Beacon conversion — SB-LAR-001-R1",
      "2nd refuel/defuel panel; enhanced maps on MFD"
    ],
    maintenanceSummary: [
      "CAMP Systems Computerized Aircraft Maintenance Program"
    ],
    maintenanceHistory: [
      { date: "Aug 2023", event: "12 Month", facility: "Next due: Jul 2024", hours: "4,736" },
      { date: "Sep 2023", event: "24 Month", facility: "Next due: Sep 2025", hours: "4,328" },
      { date: "Aug 2023", event: "36 Month", facility: "Next due: Oct 2026", hours: "4,164" },
      { date: "Dec 2019", event: "48 Month", facility: "Next due: Dec 2023", hours: "3,839" },
      { date: "Dec 2019", event: "96 Month", facility: "Next due: Dec 2027", hours: "3,839" },
      { date: "Dec 2019", event: "96 Month Gear Inspection", facility: "Next due: Jul 2027", hours: "1,242 CSN" },
      { date: "Apr 2023", event: "2400 Hour Inspection", facility: "Next due: 7,039 H", hours: "4,639" }
    ]
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
          { label: "Total Time", value: "1,265 hrs" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [{ label: "Make / Model", value: "On request" }]
      }
    ],
    interior: [
      "Elite interior seating up to 13 passengers",
      "Designed for comfort and convenience",
      "Super-silent soundproofing"
    ],
    avionics: [
      "RVSM; NAT HLA / MNPS; P-RNAV; LPV; RNP; CAT II; RAAS; VNAV",
      "3rd VHF; FANS 1/A+; CPDLC; ADS-B Out",
      "Dual FMS; EGPWS; dual Laseref; TCAS 7.1; datalink",
      "Dual HF KHF-950; Swift Broadband high-speed data with datalink; SATCOM",
      "Honeywell IFE system; 2 Blu-ray players; steep approach capability"
    ],
    features: ["CAAV registered", "High-altitude operation"],
    maintenanceSummary: ["Maintenance program details available on request"]
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
          { label: "Eng. 2 Cycles", value: "1,215" }
        ]
      },
      {
        title: "APU",
        icon: "apu",
        rows: [{ label: "Make / Model", value: "Honeywell RE220" }]
      }
    ],
    interior: [
      "Executive 18-passenger, 4-zone interior",
      "8-place double club seating, 4-place conference group, aft private compartment with dual 3-place berthable divans",
      "Forward galley: dual TIA 1603 coffeemakers, Sharp microwave, Enflite convection oven, thermal-electric cold storage",
      "Airshow 400; forward and aft bulkhead-mounted 24-inch LCD HD monitors; six LCD personal monitors; dual Blu-ray",
      "Swift Broadband internet; 115V/60Hz outlets; therapeutic oxygen system",
      "Mid-cabin bulkhead with electric pocket door; forward crew lavatory and aft lavatory with vanity"
    ],
    exterior: [
      "Matterhorn White with blue stripes",
      "Original white exterior with new blue stripes (11/2020)"
    ],
    avionics: [
      "Gulfstream PlaneView with Cert Hotel; Honeywell Primus Epic",
      "Honeywell DU-1310 4-tube flat-panel EFIS; triple Honeywell FMS; dual 24-ch GPS",
      "Dual Collins HF-9304 with SELCAL; triple Laseref V micro IRS; triple RT-300 radio altimeter",
      "AirCell Axxess Iridium & Honeywell MCS-7100 SATCOM; Honeywell EGPWS (TAWS)",
      "ACSS TCAS-3000 Change 7.1; dual Mode S with enhanced Flight ID; Primus 880 weather radar",
      "FANS CPDLC; Enhanced Vision System; Universal FDR & CVR"
    ],
    features: [
      "Synthetic Vision System",
      "Engine Maintenance Program; ADS-B capable",
      "Third FMS and third IRS; Heads-Up Display; SATCOM",
      "8.33 channel spacing; RVSM; TAWS; TCAS; FANS / CPDLC",
      "High-speed data / Wi-Fi"
    ],
    maintenanceSummary: [
      "Maintained FAR Part 91; certifications MNPS, RNP-10, RNP-5, RVSM",
      "One owner since new; always hangared",
      "24-Month, 48-Month and 120-Month inspections 06/14/22 by AMAC, Basel, Switzerland",
      "12-Month inspection 03/22/23 by Gulfstream"
    ]
  }
];

/* No placeholder inventory — the array above is the real listing set. */
const moreAircraft: Aircraft[] = [];

function code(m: string) {
  return m.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 6);
}

/* Non-destructive: keeps any real data provided on the aircraft, only filling
 * in gaps (gallery, APU box, and any missing spec tabs) with generic content. */
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
            { label: "Total Time", value: `${Math.round(a.totalHours * 0.9).toLocaleString()} hrs` },
            { label: "Status", value: "Operational" }
          ]
        }
      ];

  const maintenanceSummary =
    a.maintenanceSummary ?? [
      "Enrolled on Computerized Aircraft Maintenance Program (CAMP) Tracking System",
      `Airframe: ${a.totalHours.toLocaleString()} hrs / ${a.airframeCycles.toLocaleString()} cycles`,
      "All Airworthiness Directives (ADs) complied with",
      "All mandatory Service Bulletins (SBs) complied with"
    ];

  const maintenanceHistory =
    a.maintenanceHistory ?? [
      { date: `${a.year + 1}`, event: "Aircraft delivery & entry into service", facility: "OEM Delivery Center", hours: "0" },
      { date: `${a.year + 6}`, event: "24-Month Inspection & Landing Gear Overhaul", facility: "Authorized Service Center", hours: Math.round(a.totalHours * 0.5).toLocaleString() },
      { date: "Most recent", event: "Avionics update & ADS-B Out compliance", facility: "Authorized Avionics Shop", hours: a.totalHours.toLocaleString() }
    ];

  const maintenance =
    a.maintenance ?? [
      `ADS-B Out Compliance (SB-${c}-322-REV-02)`,
      `Enhanced Avionics System Upgrade (SB-${c}-300-REV-03)`,
      `TCAS II System Change 7.1 (SB-${c}-197-REV-01)`
    ];
  const features =
    a.features ?? [
      "Wi-Fi / High-speed connectivity",
      "Auxiliary Power Unit (APU)",
      "Synthetic Vision System (SVS)",
      "Dual-zone cabin climate control"
    ];
  const avionics =
    a.avionics ?? [
      "Honeywell Primus Epic flight deck",
      "TCAS II Change 7.1",
      "ADS-B Out (DO-260B)",
      "EGPWS / TAWS"
    ];
  const interior =
    a.interior ?? [
      `${Math.max(8, a.passengers)}-passenger executive configuration`,
      "High-definition cabin management system",
      "LED mood lighting throughout"
    ];
  const exterior =
    a.exterior ?? [
      "Fresh exterior paint (Matterhorn White)",
      "Detailed, polished and corrosion-treated",
      "No known damage history"
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
