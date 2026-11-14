import axiosInstance from "../../../../api/axiosInstance";


export const bookingPaymentService = {
    verifyPaymentWebhook: async ({ transactionId, paymentStatus }) => {
    const response = await axiosInstance.post('/bookings/payment-webhook', {
      transactionId,
      paymentStatus,
    });
    return response.data.data;
  }
}