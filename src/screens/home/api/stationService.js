import axiosInstance from "../../../api/axiosInstance";

export const stationService = {
    searchStations : async (query) => {
        if(!query) {
            return [];
        }
        const response = await axiosInstance.get(`/stations/search?query=${query}`);
        return response.data.data.stations;
    }
};