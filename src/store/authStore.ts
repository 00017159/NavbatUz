import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { User, LoginCredentials, RegisterData } from '../types/user';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOtpPending: boolean;
  pendingPhone: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  isOtpPending: false,
  pendingPhone: null,

  login: async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    set({
      isOtpPending: true,
      pendingPhone: credentials.phone || credentials.email || null,
    });
  },

  register: async (data: RegisterData) => {
    const response = await authService.register(data);
    set({
      isOtpPending: true,
      pendingPhone: data.phone,
    });
  },

  verifyOtp: async (code: string) => {
    const { pendingPhone } = get();
    if (!pendingPhone) throw new Error('No pending verification');

    const response = await authService.verifyOtp(pendingPhone, code);
    await SecureStore.setItemAsync('accessToken', response.accessToken);
    await SecureStore.setItemAsync('refreshToken', response.refreshToken);

    set({
      user: response.user,
      token: response.accessToken,
      isAuthenticated: true,
      isOtpPending: false,
      pendingPhone: null,
      isLoading: false,
    });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isOtpPending: false,
      pendingPhone: null,
    });
  },

  loadStoredAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        set({ token, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));
