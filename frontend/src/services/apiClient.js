import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

apiClient.interceptors.request.use(
  (config) => {
    let token = null;

    token = localStorage.getItem('token');

    if (!token) {
      const authStoreStr = localStorage.getItem('auth_store');
      if (authStoreStr) {
        try {
          const parsed = JSON.parse(authStoreStr);
          token = parsed.state?.token;
        } catch (e) {
          console.warn('Error parsing auth_store', e);
        }
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('auth_store');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { apiClient };
