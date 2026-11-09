import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { DigitalTicketCard } from '../../../features/digital-ticket/ui/DigitalTicketCard';
import { TicketActions } from '../../../features/digital-ticket/ui/TicketActions';

export const TicketConfirmationPage = () => {
  
  // Mock Data: In reality, you'd fetch this using the PNR from the URL (e.g., /ticket/847362910)
  const mockBookingData = {
    pnr: '847362910',
    trainName: 'Mumbai Rajdhani Exp (12951)',
    source: 'Mumbai Central (BCT)',
    dest: 'New Delhi (NDLS)',
    date: '10 Nov 2026',
    passengers: [
      { name: 'Aman Raj', age: 26, gender: 'Male', coach: 'B1', seat: 45, berth: 'Lower' },
      { name: 'John Doe', age: 28, gender: 'Male', coach: 'B1', seat: 46, berth: 'Middle' }
    ]
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      <Container maxWidth="md" sx={{ py: 6 }}>
        
        {/* Success Header */}
        <Box textAlign="center" mb={5}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 1 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Your ticket has been booked and sent to your email.
          </Typography>
        </Box>

        {/* The Digital Ticket */}
        <DigitalTicketCard {...mockBookingData} />

        {/* Action Buttons */}
        <TicketActions />

      </Container>
    </Box>
  );
};