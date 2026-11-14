import axiosInstance from '../../../api/axiosInstance';


export const bookingService = {

  cancelBooking: async (bookingId, passengerIds) => {
    const response = await axiosInstance.patch(`/bookings/cancel/${bookingId}`, {
      passengerIds
    });
    return response.data;
  }
}