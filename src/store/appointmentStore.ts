import { create } from 'zustand';
import { Appointment } from '../types/appointment';

interface AppointmentState {
  appointments: Appointment[];
  upcoming: Appointment[];
  past: Appointment[];
  selectedAppointment: Appointment | null;
  isLoading: boolean;
  setAppointments: (appointments: Appointment[]) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  upcoming: [],
  past: [],
  selectedAppointment: null,
  isLoading: false,

  setAppointments: (appointments: Appointment[]) => {
    const now = new Date();
    set({
      appointments,
      upcoming: appointments.filter(
        (a) => new Date(a.date) >= now && a.status !== 'CANCELLED'
      ),
      past: appointments.filter(
        (a) => new Date(a.date) < now || a.status === 'COMPLETED'
      ),
    });
  },

  setSelectedAppointment: (appointment) =>
    set({ selectedAppointment: appointment }),

  setLoading: (isLoading) => set({ isLoading }),
}));
