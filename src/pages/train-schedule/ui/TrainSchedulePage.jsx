import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { ScheduleSearchForm } from '../../../features/schedule-search/ui/ScheduleSearchForm';
import { RouteTableWidget } from '../../../widgets/schedule-viewer/ui/RouteTableWidget';

export const TrainSchedulePage = () => {
  const [scheduleData, setScheduleData] = useState(null);

  const handleSearch = (query) => {
    // MOCK API LOGIC: Simulating a fetch based on the train number
    const mockResponse = {
      trainNumber: query,
      trainName: 'Mumbai Rajdhani Express',
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      hasPantry: true,
      route: [
        { stationName: 'Mumbai Central', stationCode: 'BCT', arrivalTime: '--:--', departureTime: '17:00', haltTime: 'Source', distance: 0, day: 1 },
        { stationName: 'Borivali', stationCode: 'BVI', arrivalTime: '17:22', departureTime: '17:24', haltTime: 2, distance: 30, day: 1 },
        { stationName: 'Surat', stationCode: 'ST', arrivalTime: '19:43', departureTime: '19:48', haltTime: 5, distance: 263, day: 1 },
        { stationName: 'Vadodara Jn', stationCode: 'BRC', arrivalTime: '21:03', departureTime: '21:13', haltTime: 10, distance: 392, day: 1 },
        { stationName: 'Ratlam Jn', stationCode: 'RTM', arrivalTime: '00:25', departureTime: '00:28', haltTime: 3, distance: 653, day: 2 },
        { stationName: 'Kota Jn', stationCode: 'KOTA', arrivalTime: '03:15', departureTime: '03:20', haltTime: 5, distance: 919, day: 2 },
        { stationName: 'New Delhi', stationCode: 'NDLS', arrivalTime: '08:32', departureTime: '--:--', haltTime: 'Destination', distance: 1384, day: 2 },
      ]
    };
    setScheduleData(mockResponse);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <ScheduleSearchForm onSearch={handleSearch} />
        <RouteTableWidget scheduleData={scheduleData} />
      </Container>
    </Box>
  );
};