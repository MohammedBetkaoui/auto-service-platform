import axios from 'axios';

// Axios instance used for auth requests. baseURL points to the backend API.
export const api = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true, // allow cookies if backend sets them
});

// Helper functions for the auth API
export const registerUser = (data: Record<string, unknown>) =>
  api.post('/auth/register', data);

export const loginUser = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const logoutUser = () => api.post('/auth/logout');

export const getProfile = (token?: string | null) =>
  api.get('/auth/profile', token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined);

export default api;
