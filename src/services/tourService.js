import api from "../api/axios";


export const tourService = {
  getMarketplaceTours: async (params = {}) => {
    const response = await api.get('/marketplace/tours', { params });
    return response.data;
  },

  getPartners: async () => {
    const response = await api.get('/partners/');
    return response.data;
  },

  getCategories: async () => {
    return [];
  },

  createCategory: async (payload) => {
    const response = await api.post('/categories/', payload);
    return response.data;
  },

  createTour: async (tourData) => {
    const response = await api.post('/marketplace/tours', tourData);
    return response.data;
  },

  purchaseTour: async (payload) => {
    const response = await api.post('/marketplace/purchase', payload);
    return response.data;
  },

  sendChatMessage: async (message, userId = null) => {
    const response = await api.post('/ai/consult', {
      user_id: userId,
      messages: [{ role: 'user', content: message }],
    });
    return response.data;
  },
};