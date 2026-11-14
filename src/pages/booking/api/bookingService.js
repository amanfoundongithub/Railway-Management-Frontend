import axiosInstance from '../../../api/axiosInstance';


export const bookingService = {

  cancelBooking: async (bookingId, passengerIds) => {
    const response = await axiosInstance.patch(`/bookings/cancel/${bookingId}`, {
      passengerIds
    });
    return response.data;
  },
  getUserBookings: async () => {
    const response = await axiosInstance.get('/bookings/my-bookings');
    return response.data.data.bookings;
  }, 
  addMealToBooking: async (pnr, mealData) => {
    const response = await axiosInstance.post(`/bookings/${pnr}/meals`, mealData);
    return response.data;
  },
}