import React, { useState } from 'react';
import { Box, Container, Typography, Alert, CircularProgress } from '@mui/material';
import { Navbar } from '../../../header/ui/Navbar';
import { TrackerSearchWidget } from './components/TrackerSearchWidget';
import { TrainTimelineWidget } from './components/TrainTimelineWidget';
import { liveMapService } from '../api/liveMapService';

export const LiveStatusPage = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (trainNo, date) => {
    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const data = await liveMapService.getLiveStatus(trainNo, date);
      setTrackingData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch live status. Please check the train number.');
    } finally {
      setLoading(false);
    }
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

        <TrackerSearchWidget onSearch={handleSearch} loading={loading} />

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" py={5}>
            <CircularProgress size={40} mb={2} />
            <Typography mt={2} color="text.secondary">Locating train...</Typography>
          </Box>
        )}

        {/* Render timeline only when data is successfully fetched */}
        {!loading && trackingData && (
          <TrainTimelineWidget trainData={trackingData} />
        )}

      </Container>
    </Box>
  );
};