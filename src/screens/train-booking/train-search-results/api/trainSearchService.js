import axiosInstance from '../../../../api/axiosInstance';

export const trainSearchService = {
  searchTrains: async (source, destination, date) => {
    const response = await axiosInstance.get('/trains/search', {
      params: { source, destination, date }
    });
    return response.data.data.trains; 
  }
};