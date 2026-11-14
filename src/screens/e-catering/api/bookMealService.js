import axiosInstance from '../../../utils/axiosInstance';

export const bookMealService = {
  addMealToBooking: async (pnr, mealData) => {
    const response = await axiosInstance.post(`/bookings/${pnr}/meals`, mealData);
    return response.data;
  },
};