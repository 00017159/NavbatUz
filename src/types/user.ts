export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  bloodType?: string;
  weight?: number;
  heartRate?: number;
  avatarUrl?: string;
  telegramChatId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface OtpSendResponse {
  message: string;
  userId?: string;
}

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}
