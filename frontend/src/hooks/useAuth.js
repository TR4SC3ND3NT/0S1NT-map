import { useMemo } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  const isAuthenticated = useMemo(() => Boolean(token), [token]);

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout,
  };
}
