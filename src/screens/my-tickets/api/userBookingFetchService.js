import axiosInstance from '../../../api/axiosInstance';

export const userBookingFetchService = {
  getUserBookings: async () => {
    const response = await axiosInstance.get('/bookings/my-bookings');
    return response.data.data.bookings;
  }
};