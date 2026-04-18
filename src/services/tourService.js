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
    // endpoint for list is not present yet, fallback to create-known flows on UI
    // keep this function for future compatibility
    return [];
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