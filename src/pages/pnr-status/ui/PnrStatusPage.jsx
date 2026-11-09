import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { PnrSearchForm } from '../../../features/pnr-enquiry/ui/PnrSearchForm';
import { PnrDetailsCard } from '../../../features/pnr-enquiry/ui/PnrDetailsCard';

export const PnrStatusPage = () => {
  const [pnrData, setPnrData] = useState(null);

  const handlePnrSearch = (pnr) => {
    // MOCK API CALL: Simulating backend response based on the PNR
    const mockResponse = {
      pnrNumber: pnr,
      trainNumber: '12951',
      trainName: 'Mumbai Rajdhani',
      date: '10 Nov 2026',
      source: 'BCT',
      destination: 'NDLS',
      class: '3A',
      quota: 'GN',
      passengers: [
        { bookingStatus: 'WL/12', currentStatus: 'CNF / B1 / 45' },
        { bookingStatus: 'WL/13', currentStatus: 'CNF / B1 / 46' }
      ]
    };
    setPnrData(mockResponse);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        
        <PnrSearchForm onSearch={handlePnrSearch} />
        
        {pnrData && <PnrDetailsCard pnrData={pnrData} />}

      </Container>
    </Box>
  );
};