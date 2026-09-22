

export interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  company: string;
  purposeOfInquiry: string;
  preferredContactMethod: string;
  message: string;
}

export interface RequestCharterQuoteForm {
  tripType: string;
  passengers: number;
  aircraftCategory: string;
  departureAirport: string;
  destinationAirport: string;
  legs: { from: string; to: string }[];
  departureDate: string;
  returnDate: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  notes: string;
}

export interface marketplaceFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredManufacturers: string[];
  preferredMakes: string[];
  preferredModels: string[];
  minYear: number;
  maxYear: number;
  notes: string;
}
export interface EmptyLegAlertsFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  homeAirport: string;
  preferredRoutes: string[];
}/** Shared form data shapes. */

export interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  company: string;
  purposeOfInquiry: string;
  preferredContactMethod: string;
  message: string;
}

export interface RequestCharterQuoteForm {
  tripType: string;
  passengers: number;
  aircraftCategory: string;
  departureAirport: string;
  destinationAirport: string;
  legs: { from: string; to: string }[];
  departureDate: string;
  returnDate: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  notes: string;
}

export interface marketplaceFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredManufacturers: string[];
  preferredMakes: string[];
  preferredModels: string[];
  minYear: number;
  maxYear: number;
  notes: string;
}
export interface EmptyLegAlertsFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  homeAirport: string;
  preferredRoutes: string[];
}