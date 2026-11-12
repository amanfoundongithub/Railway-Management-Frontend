import axiosInstance from '../../../api/axiosInstance';

export const trainService = {
  searchTrains: async (source, destination, date) => {
    const response = await axiosInstance.get('/trains/search', {
      params: { source, destination, date }
    });
    return response.data.data.trains; 
  },
  checkAvailability: async (trainId, date) => {
    const response = await axiosInstance.get('/journeys/availability', {
      params: { trainId, date }
    });
    return response.data.data;
  },
  createTrain: async (trainData) => {
    const response = await axiosInstance.post('/trains', trainData);
    return response.data.data.train;
  },
  createJourney: async (journeyData) => {
    const response = await axiosInstance.post('/journeys', journeyData);
    return response.data.data.journey;
  },
  getLiveStatus: async (trainNo, date) => {
    const response = await axiosInstance.get('/trains/live-status', {
      params: { trainNo, date }
    });
    return response.data.data;
  },
};