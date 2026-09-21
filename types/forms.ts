/** Shared form data shapes. */

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
  departureDate: string;
  returnDate: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  notes: string;
}
