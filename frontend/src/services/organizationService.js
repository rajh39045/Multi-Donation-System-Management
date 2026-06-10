import api from './api';

export const organizationService = {
  createOrganization: (data) => api.post('/organizations', data),
  getOrganization: async (id) => {
    if (id === 'all') {
      return api.get('/organizations/all');
    }

    try {
      return await api.get(`/organizations/${id}`);
    } catch (error) {
      if (error?.response?.status !== 404) {
        throw error;
      }

      const fallback = await api.get('/organizations/all');
      const normalized = Array.isArray(fallback?.data) ? fallback.data : fallback?.data?.data || [];
      const match = normalized.find((item) => {
        const ownerId = item?.ownerId?._id || item?.ownerId;
        return item?.id === id || item?._id === id || ownerId === id;
      });

      if (!match) {
        throw error;
      }

      return { ...fallback, data: match };
    }
  },
  addVolunteer: (data) => api.post('/organizations/add-volunteer', data),
  getAvailableVolunteers: () => api.get('/organizations/available-volunteers'),
  updateOrganization: (id, data) => api.put(`/organizations/${id}`, data),
};
