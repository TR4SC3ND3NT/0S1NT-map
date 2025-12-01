import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth(user, token) {
        set({ user, token });
      },
      logout() {
        set({ user: null, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('auth_store');
      },
    }),
    {
      name: 'auth_store',
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);
