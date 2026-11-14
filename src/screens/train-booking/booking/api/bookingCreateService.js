import axiosInstance from "../../../../api/axiosInstance";

export const bookingCreateService = {
    createBooking : async (bookingData) => {
        const response = await axiosInstance.post('/bookings', bookingData);
        return response.data.data;
    }
};