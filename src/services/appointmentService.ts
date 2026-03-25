import api from './api';
import { Appointment, BookAppointmentData } from '../types/appointment';

export const appointmentService = {
  book: async (data: BookAppointmentData): Promise<Appointment> => {
    const response = await api.post('/appointments', data);
    return response.data;
  },

  getMyAppointments: async (status?: string): Promise<Appointment[]> => {
    const response = await api.get('/appointments/my', {
      params: status ? { status } : {},
    });
    return response.data;
  },

  getUpcoming: async (): Promise<Appointment[]> => {
    const response = await api.get('/appointments/my', {
      params: { status: 'upcoming' },
    });
    return response.data;
  },

  getById: async (id: string): Promise<Appointment> => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  reschedule: async (id: string, date: string, time: string): Promise<Appointment> => {
    const response = await api.patch(`/appointments/${id}`, { date, time });
    return response.data;
  },

  cancel: async (id: string): Promise<Appointment> => {
    const response = await api.patch(`/appointments/${id}`, { status: 'CANCELLED' });
    return response.data;
  },

  confirm: async (id: string): Promise<Appointment> => {
    const response = await api.post(`/appointments/${id}/confirm`);
    return response.data;
  },
};
