import axiosInstance from "../../../api/axiosInstance";
import { cookieService } from "../../../utils/cookieService";

export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    cookieService.removeToken();
    localStorage.removeItem('user');
  },

  getMe: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data.data.user;
  },

  updateMasterList: async (action, passenger) => {
    const response = await axiosInstance.put('/auth/master-list', { 
      action, 
      passenger 
    });
    return response.data.data.masterList;
  }
};