export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  doctor?: import('./doctor').Doctor;
  patient?: import('./user').User;
}

export interface BookAppointmentData {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}

export interface Review {
  id: string;
  patientId: string;
  doctorId: string;
  rating: number;
  comment: string;
  createdAt: string;
  patient?: import('./user').User;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  title: string;
  fileUrl: string;
  type: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}
