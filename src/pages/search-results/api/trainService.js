import axiosInstance from "../../../api/axiosInstance";

export const trainService = {
  searchTrains: async (params) => {
    const queryParams = {
      source: params.src,
      destination: params.dst,
      date: params.date,
    };

    const response = await axiosInstance.get('/trains/search', { params: queryParams });
    console.log(response.data);
    return response.data?.data?.trains || []; 
  }
};