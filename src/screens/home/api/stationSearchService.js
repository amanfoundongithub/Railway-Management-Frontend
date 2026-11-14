import axiosInstance from "../../../utils/axiosInstance";

export const stationSearchService = {
    searchStations : async (query) => {
        if(!query) {
            return [];
        }
        const response = await axiosInstance.get(`/stations/search?query=${query}`);
        return response.data.data.stations;
    }
};