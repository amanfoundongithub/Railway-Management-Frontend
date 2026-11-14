import axiosInstance from '../../../api/axiosInstance';


export const bookingService = {

  cancelBooking: async (bookingId, passengerIds) => {
    const response = await axiosInstance.patch(`/bookings/cancel/${bookingId}`, {
      passengerIds
    });
    return response.data;
  },
  addMealToBooking: async (pnr, mealData) => {
    const response = await axiosInstance.post(`/bookings/${pnr}/meals`, mealData);
    return response.data;
  },
}