import axiosInstance from "../../../utils/axiosInstance";

export const cateringService = {
  getStationsWithVendors: async (trainId) => {
    const response = await axiosInstance.get(`/catering/trains/${trainId}/vendors`);
    return response.data;
  },

  getVendorMenu: async (vendorId) => {
    const response = await axiosInstance.get(`/catering/vendors/${vendorId}/menu`);
    return response.data;
  },

  placeOrder: async (orderPayload) => {
    const response = await axiosInstance.post('/catering/order', orderPayload);
    return response.data;
  }
};