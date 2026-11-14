import axiosInstance from '../../../utils/axiosInstance';

export const getTrainScheduleService = {
  getTrainSchedule: async (query) => {
    const response = await axiosInstance.get(`/trains/schedule/${query}`);
    return response.data.data.train;
  }
}