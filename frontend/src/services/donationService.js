import api from './api';

export const donationService = {
  createDonation: (data) => api.post('/donations', data),
  getAllDonations: () => api.get('/donations'),
  getMyDonations: () => api.get('/donations/my-donations'),
  assignVolunteer: (data) => api.post('/donations/assign-volunteer', data),
  updateDonationStatus: (id, status) =>
    api.put(`/donations/${id}/status`, { status }),};
