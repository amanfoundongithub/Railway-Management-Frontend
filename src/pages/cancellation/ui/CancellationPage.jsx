import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { CancelPassengerSelect } from '../../../features/ticket-cancellation/ui/CancelPassengerSelect';
import { RefundSummaryCard } from '../../../features/ticket-cancellation/ui/RefundSummaryCard';

export const CancellationPage = () => {
  const navigate = useNavigate();
  
  // Mock Data: In reality, fetch this via a PNR passed in the URL (e.g., /cancel/:pnr)
  const ticketData = {
    pnr: '847362910',
    trainName: 'Mumbai Rajdhani Exp (12951)',
    baseFarePerPassenger: 2450,
    passengers: [
      { id: 101, name: 'Aman Raj', age: 26, gender: 'Male', coach: 'B1', seat: 45, status: 'CONFIRMED' },
      { id: 102, name: 'John Doe', age: 28, gender: 'Male', coach: 'B1', seat: 46, status: 'CONFIRMED' },
      { id: 103, name: 'Jane Smith', age: 25, gender: 'Female', coach: 'B1', seat: 47, status: 'CANCELLED' }, // Example of a previously cancelled passenger
    ]
  };

  const [selectedForCancel, setSelectedForCancel] = useState([]);

  const handleTogglePassenger = (passengerId) => {
    setSelectedForCancel((prev) => 
      prev.includes(passengerId) 
        ? prev.filter(id => id !== passengerId) 
        : [...prev, passengerId]
    );
  };

  const handleConfirmCancel = () => {
    // In production, make a POST request to /api/tickets/cancel with selectedForCancel IDs
    alert(`Successfully cancelled ${selectedForCancel.length} passenger(s). Refund initiated.`);
    navigate('/my-tickets'); // Route them back to their dashboard
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cancel Ticket
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          PNR: {ticketData.pnr} | {ticketData.trainName}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <CancelPassengerSelect 
              passengers={ticketData.passengers}
              selectedForCancel={selectedForCancel}
              onTogglePassenger={handleTogglePassenger}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <RefundSummaryCard 
              cancelCount={selectedForCancel.length}
              baseFarePerPassenger={ticketData.baseFarePerPassenger}
              onConfirmCancel={handleConfirmCancel}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};