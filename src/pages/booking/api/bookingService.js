import axiosInstance from '../../../api/axiosInstance';


export const bookingService = {
    createBooking : async (bookingData) => {
        const response = await axiosInstance.post('/bookings', bookingData);
        return response.data.data;
    }
}