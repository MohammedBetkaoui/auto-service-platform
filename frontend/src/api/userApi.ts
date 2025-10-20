import axiosInstance from '../services/axiosInstance';

export interface UpdateProfileData {
  full_name?: string;
  email?: string;
  phone?: string;
}

export const userApi = {
  updateProfile: async (data: UpdateProfileData): Promise<{ message: string; user: any }> => {
    const response = await axiosInstance.patch('/users/update-profile', data);
    return response.data;
  },
};
