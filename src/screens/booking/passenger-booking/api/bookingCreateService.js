import axiosInstance from "../../../../utils/axiosInstance";

export const bookingCreateService = {
    createBooking : async (bookingData) => {
        const response = await axiosInstance.post('/bookings', bookingData);
        return response.data.data;
    }
};