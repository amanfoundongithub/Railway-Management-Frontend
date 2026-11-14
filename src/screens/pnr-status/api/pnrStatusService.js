import axiosInstance from '../../../api/axiosInstance';

export const pnrStatusService = {
  getBookingByPNR: async (pnr) => {
    const response = await axiosInstance.get(`/bookings/pnr/${pnr}`);
    return response.data.data.booking;
  }
};