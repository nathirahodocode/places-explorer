import apiClient from './client';

export const favoritesApi = {
  add: (payload) => apiClient.post('/favorites', payload).then((r) => r.data),
  getAll: (page = 0, size = 20) =>
    apiClient
      .get('/favorites', { params: { page, size } })
      .then((r) => r.data),
  remove: (id) => apiClient.delete(`/favorites/${id}`).then((r) => r.data),
};