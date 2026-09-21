

export type Transaction = {
  id: string;
  aircraft: string;
  role: string;    
  year: string;
  region: string;
  image: string;
  summary: string;
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1583362894567-3d5f26c1a03f?auto=format&fit=crop&w=1600&q=80";

export const transactions: Transaction[] = [
  {
    id: "tx-01",
    aircraft: "Gulfstream G550",
    role: "Buyer Representation",
    year: "2024",
    region: "Europe → Middle East",
    image: PLACEHOLDER,
    summary:
      "Sourced, inspected and closed a low-time G550 on behalf of a private owner, managing delivery across two jurisdictions."
  },
  {
    id: "tx-02",
    aircraft: "Bombardier Challenger 605",
    role: "Seller Representation",
    year: "2023",
    region: "North America",
    image: PLACEHOLDER,
    summary:
      "Marketed and sold a Challenger 605 within the target window, coordinating pre-buy, escrow and export."
  }
];
