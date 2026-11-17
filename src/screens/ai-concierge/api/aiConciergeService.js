import axiosInstance from '../../../utils/axiosInstance';

export const aiConciergeService = {
  sendMessage: async (messages, pnr = '') => {
    const response = await axiosInstance.post('/ai-concierge/chat', {
      messages,
      pnr,
    });
    return response.data.data;
  },
};