import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { TrackerSearchWidget } from '../../../widgets/live-status-tracker/ui/TrackerSearchWidget';
import { TrainTimelineWidget } from '../../../widgets/live-status-tracker/ui/TrainTimelineWidget';

// Mock Route Data
const mockTrackingData = {
  name: 'Mumbai Rajdhani Exp',
  number: '12951',
  startDate: '10 Nov 2026',
  totalDelay: 15,
  route: [
    { stationName: 'Mumbai Central', stationCode: 'BCT', arrivalTime: '17:00', status: 'PASSED', delay: 0 },
    { stationName: 'Surat', stationCode: 'ST', arrivalTime: '19:43', status: 'PASSED', delay: 5 },
    { stationName: 'Vadodara Jn', stationCode: 'BRC', arrivalTime: '21:03', status: 'CURRENT', delay: 15 },
    { stationName: 'Ratlam Jn', stationCode: 'RTM', arrivalTime: '00:25', status: 'UPCOMING', delay: 0 },
    { stationName: 'New Delhi', stationCode: 'NDLS', arrivalTime: '08:32', status: 'UPCOMING', delay: 0 },
  ]
};

export const LiveStatusPage = () => {
  const [trackingData, setTrackingData] = useState(null);

  const handleSearch = () => {
    // In reality, this would be an async API call based on the input values
    setTrackingData(mockTrackingData);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Live Train Running Status
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Track your train's exact location, delay, and upcoming stops in real-time.
        </Typography>

        <TrackerSearchWidget onSearch={handleSearch} />

        {/* Will only render if a search has been executed */}
        <TrainTimelineWidget trainData={trackingData} />

      </Container>
    </Box>
  );
};