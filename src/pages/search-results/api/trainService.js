import axiosInstance from '../../../api/axiosInstance';

export const trainService = {
  // ==========================================
  // PUBLIC ENDPOINTS (Passengers)
  // ==========================================

  /**
   * Search for trains between two stations on a specific date.
   * Hits: GET /api/trains/search?source=X&destination=Y&date=Z
   */
  searchTrains: async (source, destination, date) => {
    const response = await axiosInstance.get('/trains/search', {
      params: { source, destination, date }
    });
    // Returns the array of available journeys bundled with train details
    return response.data.data.trains; 
  },

  /**
   * Check live seat availability for a specific train and date.
   * Hits: GET /api/journeys/availability?trainId=X&date=Y
   */
  checkAvailability: async (trainId, date) => {
    const response = await axiosInstance.get('/journeys/availability', {
      params: { trainId, date }
    });
    // Returns { trainName, trainNumber, journeyDate, availability: [...] }
    return response.data.data;
  },

  // ==========================================
  // PROTECTED ENDPOINTS (Admin Only)
  // ==========================================

  /**
   * Add a new master train configuration to the system.
   * Hits: POST /api/trains
   */
  createTrain: async (trainData) => {
    const response = await axiosInstance.post('/trains', trainData);
    return response.data.data.train;
  },

  /**
   * Initialize a live journey (populates seat inventory for a specific date).
   * Hits: POST /api/journeys
   */
  createJourney: async (journeyData) => {
    // journeyData expects { trainId, journeyDate }
    const response = await axiosInstance.post('/journeys', journeyData);
    return response.data.data.journey;
  },

  getLiveStatus: async (trainNo, date) => {
    const response = await axiosInstance.get('/trains/live-status', {
      params: { trainNo, date }
    });
    // Expected to return { name, number, startDate, totalDelay, route: [...] }
    return response.data.data;
  },
};