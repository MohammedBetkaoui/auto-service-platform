import axiosInstance from '../services/axiosInstance';

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  role: 'client' | 'provider';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    role: string;
    avatar_url?: string;
    phone?: string;
    status: string;
  };
}

export interface RefreshData {
  refresh_token: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
}

export const authApi = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },

  refresh: async (): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/refresh');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await axiosInstance.get(`/auth/verify?token=${token}`);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordData): Promise<{ message: string }> => {
    const response = await axiosInstance.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    const response = await axiosInstance.post('/auth/reset-password', data);
    return response.data;
  },
};