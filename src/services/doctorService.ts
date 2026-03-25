import api from './api';
import { Doctor, TimeSlot } from '../types/doctor';
import { DoctorSearchFilters, PaginatedResponse } from '../types/api';

export const doctorService = {
  search: async (filters: DoctorSearchFilters): Promise<PaginatedResponse<Doctor>> => {
    const response = await api.get('/doctors', { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<Doctor> => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  getSpecialties: async (): Promise<string[]> => {
    const response = await api.get('/doctors/specialties');
    return response.data;
  },

  getSlots: async (doctorId: string, date: string): Promise<TimeSlot[]> => {
    const response = await api.get(`/doctors/${doctorId}/slots`, {
      params: { date },
    });
    return response.data;
  },

  getTopRated: async (limit: number = 5): Promise<Doctor[]> => {
    const response = await api.get('/doctors', {
      params: { sortBy: 'rating', sortOrder: 'desc', limit },
    });
    return response.data.data;
  },
};
