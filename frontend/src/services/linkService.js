import { apiClient } from './apiClient.js';

export async function createLink(payload) {
  const { data } = await apiClient.post('/links', payload);
  return data.data;
}
