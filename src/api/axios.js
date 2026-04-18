import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail = error?.response?.data?.detail;
    error.message = Array.isArray(detail) ? detail.map((d) => d.msg).join(', ') : (detail || error.message);
    return Promise.reject(error);
  }
);

export default api;