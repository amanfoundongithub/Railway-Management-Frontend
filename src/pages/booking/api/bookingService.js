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
  }
}