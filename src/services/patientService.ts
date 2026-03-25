import api from './api';
import { User } from '../types/user';

export const patientService = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch('/profile', data);
    return response.data;
  },

  uploadAvatar: async (formData: FormData): Promise<{ avatarUrl: string }> => {
    const response = await api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateHealthStats: async (data: {
    bloodType?: string;
    weight?: number;
    heartRate?: number;
  }): Promise<User> => {
    const response = await api.put('/profile/health-stats', data);
    return response.data;
  },
};
