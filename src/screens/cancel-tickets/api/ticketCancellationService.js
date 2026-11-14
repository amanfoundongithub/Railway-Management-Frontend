import axiosInstance from '../../../api/axiosInstance';

export const ticketCancellationService = {
  cancelBooking: async (bookingId, passengerIds) => {
    const response = await axiosInstance.patch(`/bookings/cancel/${bookingId}`, {
      passengerIds
    });
    return response.data;
  }
}