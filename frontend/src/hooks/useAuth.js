import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout, updateCredits } = useAuthStore();
  
  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    updateCredits,
    role: user?.role,
  };
};
