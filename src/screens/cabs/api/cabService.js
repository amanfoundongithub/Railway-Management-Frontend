import axiosInstance from "../../../utils/axiosInstance";

export const cabService = {
  getStationsWithCabs: async (trainId) => {
    const response = await axiosInstance.get(`/cabs/trains/${trainId}/vendors`);
    return response.data.data;
  },

  bookCab: async (cabPayload) => {
    const response = await axiosInstance.post('/cabs/book', cabPayload);
    return response.data;
  }
};