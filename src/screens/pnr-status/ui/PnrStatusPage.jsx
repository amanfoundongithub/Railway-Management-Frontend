import React, { useState } from 'react';
import { Box, Container, Alert, CircularProgress, Typography } from '@mui/material';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { PnrSearchForm } from './components/PnrSearchForm';
import { PnrDetailsCard } from './components/PnrDetailsCard';
import { pnrStatusService } from '../api/pnrStatusService';

export const PnrStatusPage = () => {
  const [pnrData, setPnrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePnrSearch = async (pnr) => {
    setLoading(true);
    setError('');
    setPnrData(null);

    try {
      const data = await pnrStatusService.getBookingByPNR(pnr);
      setPnrData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch PNR status. Please check the PNR and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        
        <PnrSearchForm onSearch={handlePnrSearch} loading={loading} />

        {error && (
          <Alert severity="error" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" py={5}>
            <CircularProgress size={40} mb={2} />
            <Typography mt={2} color="text.secondary">Fetching status...</Typography>
          </Box>
        )}
        
        {!loading && pnrData && <PnrDetailsCard pnrData={pnrData} />}

      </Container>
    </Box>
  );
};