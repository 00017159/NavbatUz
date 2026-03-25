import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    isOtpPending,
    login,
    register,
    verifyOtp,
    logout,
    loadStoredAuth,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    isOtpPending,
    login,
    register,
    verifyOtp,
    logout,
    loadStoredAuth,
  };
};
