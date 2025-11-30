import { apiClient } from './apiClient.js';

export async function login(email, password) {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data;
}

export async function register(email, password, name) {
  const { data } = await apiClient.post('/auth/register', { email, password, name });
  return data;
}

export async function forgotPassword(email) {
  await apiClient.post('/auth/forgot-password', { email });
}
