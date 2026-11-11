import axiosInstance from "../../../api/axiosInstance";

export const trainService = {
  searchTrains: async (params) => {
    const queryParams = {
      source: params.src,
      destination: params.dst,
    };

    const response = await axiosInstance.get('/trains/search', { params: queryParams });
    return response.data?.data?.trains || []; 
  }
};