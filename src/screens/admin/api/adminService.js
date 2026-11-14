import axiosInstance from '../../../utils/axiosInstance';

export const adminService = {

  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard-stats');
    return response.data.data;
  },

  getTrainInventory: async () => {
    const response = await axiosInstance.get('/admin/inventory');
    return response.data.data.inventory;
  },

  createTrain: async (trainData) => {
    const response = await axiosInstance.post('/trains', trainData);
    return response.data.data;
  },

  toggleTrainStatus: async (trainId, isActive) => {
    const response = await axiosInstance.patch(`/trains/${trainId}/status`, { isActive });
    return response.data.data;
  }
};