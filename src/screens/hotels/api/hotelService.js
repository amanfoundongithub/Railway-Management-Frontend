import axiosInstance from "../../../utils/axiosInstance";

export const hotelService = {
  getStationsWithHotels: async (trainId) => {
    const response = await axiosInstance.get(`/hotels/trains/${trainId}/vendors`);
    return response.data.data;
  },

  bookHotel: async (hotelPayload) => {
    const response = await axiosInstance.post('/hotels/book', hotelPayload);
    return response.data;
  }
};