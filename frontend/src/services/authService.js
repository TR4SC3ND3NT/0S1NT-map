import api from './apiClient.js';

export async function register(email, password, name) {
  const r = await api.post('/auth/register', { email, password, name });
  if (r.data.token) localStorage.setItem('token', r.data.token);
  return r.data.user;
}

export async function login(email, password) {
  const r = await api.post('/auth/login', { email, password });
  if (r.data.token) localStorage.setItem('token', r.data.token);
  return r.data.user;
}

export function logout() {
  localStorage.removeItem('token');
}
