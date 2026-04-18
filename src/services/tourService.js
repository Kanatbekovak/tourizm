import api from "../api/axios";


export const tourService = {
  // Получить все туры для маркетплейса
  getAllTours: async () => {
    const response = await api.get('tours/');
    return response.data;
  },

  // Создать новый тур (для Партнера)
  createTour: async (tourData) => {
    const response = await api.post('tours/', tourData);
    return response.data;
  },

  // Отправить сообщение в ИИ-чат
  sendChatMessage: async (tourId, message) => {
    const response = await api.post('chat/', { tour_id: tourId, text: message });
    return response.data;
  }
};