import axiosInstance from '../../../utils/axiosInstance';

export const liveMapService = {
  getLiveStatus: async (trainNo, date) => {
    const response = await axiosInstance.get('/trains/live-status', {
      params: { trainNo, date }
    });
    return response.data.data;
  }
};