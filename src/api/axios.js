import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Согласно твоему гайду
  headers: {
    'Content-Type': 'application/json',
  },
});

// Глобальный перехватчик ошибок для уведомлений
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.detail || "Произошла ошибка соединения";
    message.error(msg);
    return Promise.reject(error);
  }
);

export default api;