// types/booking.ts
export interface FirstStepData {
  name: string;
  number: string;
  movingDate: Date;
  email?: string;
  pickupLocation: string;
  dropoffLocation: string;
}

export interface SecondStepData {
  movingType: 'family' | 'office' | 'bachelor';
  bedroomCount: '1' | '2' | '3' | '4-6';
  floorOut: number; // 1-10
  floorIn: number;  // 1-10
  notes?: string;
}

export interface CompleteBookingData {
  firstStep: FirstStepData | null;
  secondStep: SecondStepData | null;
}