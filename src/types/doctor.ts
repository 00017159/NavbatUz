export interface Doctor {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  specialty: Specialty;
  experience: number;
  rating: number;
  reviewCount: number;
  pricePerVisit: number;
  clinicName: string;
  clinicAddress: string;
  avatarUrl?: string;
  isAvailable: boolean;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export type Specialty =
  | 'CARDIOLOGY'
  | 'NEUROLOGY'
  | 'ORTHOPEDIC'
  | 'OPHTHALMOLOGY'
  | 'GENERAL'
  | 'DERMATOLOGY'
  | 'PEDIATRICS'
  | 'PSYCHIATRY';

export interface TimeSlot {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}
