import api from './api';

export const creditService = {
  getCredits: () => api.get('/credits'),
  getCreditHistory: () => api.get('/credits/history'),
  getRewards: () => api.get('/credits/rewards'),
  claimReward: (rewardId) => api.post(`/credits/rewards/${rewardId}/claim`),
};
