import { apiClient } from './apiClient.js';

export async function createNote(payload) {
  const { data } = await apiClient.post('/notes', payload);
  return data.data;
}

export async function fetchNotes(entityId) {
  const { data } = await apiClient.get(`/notes/entity/${entityId}`);
  return data.data;
}

export async function updateNote(id, content) {
  const { data } = await apiClient.put(`/notes/${id}`, { content });
  return data.data;
}

export async function deleteNote(id) {
  await apiClient.delete(`/notes/${id}`);
}
