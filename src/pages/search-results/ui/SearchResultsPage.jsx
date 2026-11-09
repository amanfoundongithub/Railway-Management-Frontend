import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { TrainCard } from '../../../features/train-booking/ui/TrainCard';

// MOCK DATA: Represents the response from your backend Search API
const mockTrains = [
  {
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani Exp',
    source: 'BCT',
    destination: 'NDLS',
    departureTime: '17:00',
    arrivalTime: '08:32',
    duration: '15h 32m',
    runsOn: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    availability: [
      { className: '3A', price: 2450, status: 'AVAILABLE', seatsLabel: 'AVL 42' },
      { className: '2A', price: 3400, status: 'WAITLIST', seatsLabel: 'WL 12' },
      { className: '1A', price: 5200, status: 'AVAILABLE', seatsLabel: 'AVL 4' }
    ]
  },
  {
    trainNumber: '12903',
    trainName: 'Golden Temple Mail',
    source: 'BCT',
    destination: 'NDLS',
    departureTime: '18:45',
    arrivalTime: '11:45',
    duration: '17h 00m',
    runsOn: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    availability: [
      { className: 'SL', price: 650, status: 'WAITLIST', seatsLabel: 'WL 89' },
      { className: '3A', price: 1750, status: 'AVAILABLE', seatsLabel: 'AVL 15' },
      { className: '2A', price: 2450, status: 'AVAILABLE', seatsLabel: 'AVL 2' }
    ]
  }
];

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  
  // Extract params from URL
  const src = searchParams.get('src') || 'Unknown';
  const dst = searchParams.get('dst') || 'Unknown';
  const date = searchParams.get('date') || 'Unknown Date';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      {/* Sticky Top Header showing the active search query */}
      <Paper 
        square 
        elevation={1} 
        sx={{ bgcolor: 'primary.dark', color: 'white', py: 2, position: 'sticky', top: 64, zIndex: 5 }}
      >
        <Container maxWidth="lg">
          <Typography variant="h6">
            {src} to {dst}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Journey Date: {date} | Quota: General
          </Typography>
        </Container>
      </Paper>

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          
          {/* Left Sidebar: Filters (Placeholder for later) */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: 280 }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Filters</Typography>
              <Typography variant="body2" color="text.secondary">
                Departure Time, Train Type, Class, etc. will go here.
              </Typography>
            </Paper>
          </Box>

          {/* Right Main Area: Train List */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              {mockTrains.length} Trains Found
            </Typography>
            
            {mockTrains.map((train) => (
              <TrainCard key={train.trainNumber} train={train} />
            ))}
          </Box>

        </Box>
      </Container>
    </Box>
  );
};