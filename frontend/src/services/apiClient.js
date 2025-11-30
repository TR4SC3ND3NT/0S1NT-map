import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore.js';

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
