import { apiClient } from './apiClient.js';

export async function fetchGraph() {
  const { data } = await apiClient.get('/map');
  return data.data;
}
