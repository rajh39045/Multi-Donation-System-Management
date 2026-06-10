import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('auth-storage');
      },
      updateCredits: (credits) => {
        set((state) => ({
          user: state.user ? { ...state.user, credits } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
