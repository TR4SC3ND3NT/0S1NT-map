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

    // 1. Сначала ищем "чистый" токен (мы будем его дублировать при логине)
    token = localStorage.getItem('token');

    // 2. Если нет, пытаемся достать из Zustand Persist (auth_store)
    if (!token) {
      const authStoreStr = localStorage.getItem('auth_store');
      if (authStoreStr) {
        try {
          const parsed = JSON.parse(authStoreStr);
          // Zustand хранит данные в объекте state
          token = parsed.state?.token;
        } catch (e) {
          console.warn('Error parsing auth_store', e);
        }
      }
    }

    // 3. Если нашли токен — цепляем его к заголовку
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response интерцептор: обработка 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен невалиден или истёк
      localStorage.removeItem('token');
      localStorage.removeItem('auth_store');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { apiClient };