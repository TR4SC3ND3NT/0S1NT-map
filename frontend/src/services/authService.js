import apiClient from './apiClient';

const authService = {
  async register(payload) {
    const response = await apiClient.post('/auth/register', payload);
    return response.data?.data || response.data;
  },

  async login(payload) {
    const response = await apiClient.post('/auth/login', payload);
    return response.data?.data || response.data;
  },

  async getProfile() {
    const response = await apiClient.get('/auth/me');
    return response.data?.data || response.data;
  }
};

// Named exports для совместимости
export const register = authService.register;
export const login = authService.login;
export const getProfile = authService.getProfile;

export default authService;
