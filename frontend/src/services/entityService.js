import { apiClient } from './apiClient.js';

export async function fetchEntities(params) {
  const { data } = await apiClient.get('/entities', { params });
  return data.data;
}

export async function createEntity(payload) {
  const { data } = await apiClient.post('/entities', payload);
  return data.data;
}

export async function updateEntity(id, payload) {
  const { data } = await apiClient.put(`/entities/${id}`, payload);
  return data.data;
}

export async function deleteEntity(id) {
  await apiClient.delete(`/entities/${id}`);
}

export async function updateEntityPosition(id, x, y) {
  const { data } = await apiClient.patch(`/entities/${id}/position`, { x, y });
  return data.data;
}
