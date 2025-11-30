import { useAuthStore } from '../store/useAuthStore.js';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clear = useAuthStore((s) => s.clear);
  const isAuthenticated = Boolean(token);
  return { user, token, setAuth, clear, isAuthenticated };
}
