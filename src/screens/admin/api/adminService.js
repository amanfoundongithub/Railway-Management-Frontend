import axiosInstance from '../../../utils/axiosInstance';

export const adminService = {

    getDashboardStats: async () => {
        const response = await axiosInstance.get('/admin/dashboard-stats');
        return response.data.data;
    },

    getTrainInventory: async (page = 1, limit = 5, search = '') => {
        const response = await axiosInstance.get('/admin/inventory', {
            params: { page, limit, search }
        });
        return {
            inventory: response.data.data.inventory,
            totalCount: response.data.total
        };
    },

    createTrain: async (trainData) => {
        const response = await axiosInstance.post('/trains', trainData);
        return response.data.data;
    },

    toggleTrainStatus: async (trainId, isActive) => {
        const response = await axiosInstance.patch(`/admin/trains/status/${trainId}`, { isActive });
        return response.data.data;
    }
};