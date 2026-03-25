import api from './api';
import { AuthResponse, LoginCredentials, OtpSendResponse, RegisterData } from '../types/user';

export const authService = {
  register: async (data: RegisterData): Promise<OtpSendResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<OtpSendResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  verifyOtp: async (phone: string, code: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/otp/verify', { phone, code });
    return response.data;
  },

  sendOtp: async (phone: string): Promise<OtpSendResponse> => {
    const response = await api.post('/auth/otp/send', { phone });
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  linkTelegram: async (chatId: string): Promise<void> => {
    await api.post('/auth/telegram/link', { chatId });
  },
};
