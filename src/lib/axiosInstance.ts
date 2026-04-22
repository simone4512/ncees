/// <reference types="vite/client" />
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Attach token from localStorage on every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear token so the app knows the session expired
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
