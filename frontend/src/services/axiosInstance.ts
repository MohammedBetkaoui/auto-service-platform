import axios from 'axios';

// Base URL du backend
const BASE_URL = 'http://localhost:3000/api';

// Créer l'instance axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Permet d'envoyer les cookies HTTP-only
});

// Intercepteur pour ajouter le token JWT automatiquement
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs 401 (token expiré)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Essayer de rafraîchir le token
        // Le refresh token est envoyé automatiquement via le cookie HTTP-only
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true });
        const { access_token } = response.data;

        // Stocker le nouvel access token
        localStorage.setItem('access_token', access_token);

        // Réessayer la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Échec du refresh, déconnexion
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('autoserve_user');
        window.location.hash = '#login'; // Rediriger vers login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;