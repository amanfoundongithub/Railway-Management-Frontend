import axiosInstance from '../../../api/axiosInstance';


export const bookingService = {
    createBooking : async (bookingData) => {
        const response = await axiosInstance.post('/bookings', bookingData);
        return response.data.data;
    },
    verifyPaymentWebhook: async ({ transactionId, paymentStatus }) => {
    const response = await axiosInstance.post('/bookings/payment-webhook', {
      transactionId,
      paymentStatus,
    });
    return response.data.data; // Returns { pnr, bookingStatus }
  },

  getBookingByPNR: async (pnr) => {
    const response = await axiosInstance.get(`/bookings/pnr/${pnr}`);
    return response.data.data.booking;
  },
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