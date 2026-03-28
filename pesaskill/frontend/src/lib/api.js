import axios from 'axios';

// In production: VITE_API_URL = https://pesaskill-api.vercel.app/api
// In dev: falls back to localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
