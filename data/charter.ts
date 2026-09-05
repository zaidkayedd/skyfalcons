/**
 * CHARTER — DATA
 * ---------------------------------------------------------------------------
 * Shapes mirror the live skyfalcons.com/charter page: the Request Charter
 * Quote form + the Empty Leg Flights table. [REPLACE] the flight rows with the
 * real inventory (keys stay the same). Empty-leg listings are typically
 * generated live, so treat these as representative seed data.
 * ---------------------------------------------------------------------------
 */

export const tripTypes = ["One Way", "Round Trip", "Multi-Leg"] as const;
export type TripType = (typeof tripTypes)[number];

export const charterCategories = [
  "Any Category",
  "Light",
  "Midsize",
  "Super Midsize",
  "Heavy",
  "Ultra Long Range"
] as const;

export const charterQuote = {
  title: "Request Charter Quote",
  subtitle:
    "Get an instant quote for your private jet charter with our global fleet access and 24/7 concierge service."
};

export const emptyLegIntro = {
  heading: ["Empty Leg", "Flights"] as const,
  subtitle:
    "Save up to 75% on private jet flights with our exclusive empty leg opportunities. These are repositioning flights where you can enjoy luxury travel at a fraction of the cost."
};

export const emptyLegNote =
  "* Prices are subject to change and availability. Empty leg flights have limited flexibility.";

export type EmptyLegFlight = {
  id: string;
  aircraft: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  date: string; // e.g. "Mon, Aug 24, 2026"
  time: string; // e.g. "03:00 AM"
  price: number;
  currency: "USD" | "CAD" | "EUR" | "GBP";
};

// Representative empty-leg inventory (first five match the live listing).
export const emptyLegFlights: EmptyLegFlight[] = [
  { id: "el-1", aircraft: "Cessna Citation XLS", fromCode: "KELO", fromCity: "Ely", toCode: "KOMA", toCity: "Omaha", date: "Mon, Aug 24, 2026", time: "03:00 AM", price: 5000, currency: "USD" },
  { id: "el-2", aircraft: "Challenger 300", fromCode: "KFOK", fromCity: "Westhampton Beach", toCode: "CYYZ", toCity: "Toronto", date: "Mon, Aug 24, 2026", time: "03:00 AM", price: 12100, currency: "CAD" },
  { id: "el-3", aircraft: "Global 5000", fromCode: "CYQR", fromCity: "Regina", toCode: "KBFI", toCity: "Seattle", date: "Mon, Aug 24, 2026", time: "03:00 AM", price: 25800, currency: "CAD" },
  { id: "el-4", aircraft: "Learjet 45XR", fromCode: "CYYC", fromCity: "Calgary", toCode: "CYWG", toCity: "Winnipeg", date: "Mon, Aug 24, 2026", time: "03:00 AM", price: 10100, currency: "CAD" },
  { id: "el-5", aircraft: "Cessna Citation Ultra", fromCode: "KBTA", fromCity: "Blair", toCode: "KEAR", toCity: "Kearney", date: "Mon, Aug 24, 2026", time: "03:00 AM", price: 1500, currency: "USD" },
  { id: "el-6", aircraft: "Phenom 300", fromCode: "KTEB", fromCity: "Teterboro", toCode: "KPBI", toCity: "West Palm Beach", date: "Tue, Aug 25, 2026", time: "09:30 AM", price: 8200, currency: "USD" },
  { id: "el-7", aircraft: "Gulfstream G450", fromCode: "EGGW", fromCity: "London Luton", toCode: "LFPB", toCity: "Paris Le Bourget", date: "Tue, Aug 25, 2026", time: "11:15 AM", price: 14500, currency: "EUR" },
  { id: "el-8", aircraft: "Citation Sovereign", fromCode: "KDAL", fromCity: "Dallas", toCode: "KASE", toCity: "Aspen", date: "Wed, Aug 26, 2026", time: "07:45 AM", price: 9700, currency: "USD" },
  { id: "el-9", aircraft: "Falcon 2000", fromCode: "LSGG", fromCity: "Geneva", toCode: "LIRA", toCity: "Rome Ciampino", date: "Wed, Aug 26, 2026", time: "02:00 PM", price: 16300, currency: "EUR" },
  { id: "el-10", aircraft: "Hawker 900XP", fromCode: "KVNY", fromCity: "Van Nuys", toCode: "KLAS", toCity: "Las Vegas", date: "Thu, Aug 27, 2026", time: "06:20 AM", price: 4300, currency: "USD" },
  { id: "el-11", aircraft: "Challenger 605", fromCode: "OMDB", fromCity: "Dubai", toCode: "OTHH", toCity: "Doha", date: "Thu, Aug 27, 2026", time: "05:10 PM", price: 11200, currency: "USD" },
  { id: "el-12", aircraft: "Legacy 500", fromCode: "KHPN", fromCity: "White Plains", toCode: "KMVY", toCity: "Martha's Vineyard", date: "Fri, Aug 28, 2026", time: "10:00 AM", price: 6800, currency: "USD" },
  { id: "el-13", aircraft: "Global 6000", fromCode: "RJTT", fromCity: "Tokyo Haneda", toCode: "VHHH", toCity: "Hong Kong", date: "Fri, Aug 28, 2026", time: "08:30 AM", price: 29900, currency: "USD" },
  { id: "el-14", aircraft: "Citation CJ4", fromCode: "KSDL", fromCity: "Scottsdale", toCode: "KSAN", toCity: "San Diego", date: "Sat, Aug 29, 2026", time: "01:45 PM", price: 5400, currency: "USD" },
  { id: "el-15", aircraft: "Praetor 600", fromCode: "LEMD", fromCity: "Madrid", toCode: "LPPT", toCity: "Lisbon", date: "Sat, Aug 29, 2026", time: "04:25 PM", price: 12700, currency: "EUR" },
  { id: "el-16", aircraft: "Learjet 75", fromCode: "KBED", fromCity: "Bedford", toCode: "KDCA", toCity: "Washington", date: "Sun, Aug 30, 2026", time: "07:00 AM", price: 6100, currency: "USD" },
  { id: "el-17", aircraft: "Falcon 7X", fromCode: "EGKB", fromCity: "London Biggin Hill", toCode: "LGAV", toCity: "Athens", date: "Sun, Aug 30, 2026", time: "12:40 PM", price: 21800, currency: "GBP" },
  { id: "el-18", aircraft: "Citation XLS+", fromCode: "CYVR", fromCity: "Vancouver", toCode: "CYYC", toCity: "Calgary", date: "Mon, Aug 31, 2026", time: "09:05 AM", price: 7300, currency: "CAD" },
  { id: "el-19", aircraft: "Gulfstream G280", fromCode: "KMIA", fromCity: "Miami", toCode: "MYNN", toCity: "Nassau", date: "Mon, Aug 31, 2026", time: "03:30 PM", price: 8900, currency: "USD" },
  { id: "el-20", aircraft: "Challenger 350", fromCode: "KAPA", fromCity: "Denver", toCode: "KJAC", toCity: "Jackson Hole", date: "Tue, Sep 1, 2026", time: "08:15 AM", price: 9500, currency: "USD" }
];
