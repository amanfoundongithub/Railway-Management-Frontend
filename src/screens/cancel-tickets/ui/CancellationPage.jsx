import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { CancelPassengerSelect } from './components/CancelPassengerSelect';
import { RefundSummaryCard } from './components/RefundSummaryCard';
import { pnrStatusService } from '../../pnr-status/api/pnrStatusService';
import { ticketCancellationService } from '../api/ticketCancellationService';

export const CancellationPage = () => {
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const pnr = searchParams.get('pnr');
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState('');
  const [selectedForCancel, setSelectedForCancel] = useState([]);

  useEffect(() => {
    if (!pnr) {
      navigate('/');
      return;
    }

    const fetchBooking = async () => {
      try {
        const data = await pnrStatusService.getBookingByPNR(pnr);
        console.log(data);
        setBooking(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch booking details.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooking();
  }, [pnr, navigate]);

  const handleTogglePassenger = (passengerId) => {
    setSelectedForCancel((prev) => 
      prev.includes(passengerId) 
        ? prev.filter(id => id !== passengerId) 
        : [...prev, passengerId]
    );
  };

  const handleConfirmCancel = async () => {
    setCancelling(true);
    setError('');
    
    try {
      await ticketCancellationService.cancelBooking(booking._id, selectedForCancel);
      navigate(`/ticket/confirmation?pnr=${pnr}`, { state: { message: 'Cancellation Successful' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process cancellation.');
      setCancelling(false);
    }
  };

  // 1. Handle the loading state FIRST
  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Navbar />
        <Box display="flex" justifyContent="center" alignItems="center" py={10}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // 2. Handle the error state if the API fails and booking is null
  if (!booking) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Alert severity="error">{error || 'Booking not found.'}</Alert>
        </Container>
      </Box>
    );
  }

  // 3. NOW it is safe to calculate these values because booking is guaranteed to exist
  const passengers = Array.isArray(booking.passengers) ? booking.passengers : [];
  const totalPassengers = passengers.length;
  const totalFare = Number(booking.totalFare) || 0;
  const baseFarePerPassenger = totalPassengers > 0 ? totalFare / totalPassengers : 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cancel Ticket
        </Typography>
        
        {/* Added safe checks for nested properties just in case */}
        <Typography variant="subtitle1" color="text.secondary" mb={4} sx={{ fontWeight: "bold" }}>
          PNR: {booking.pnr} | {booking.train?.trainName} ({booking.train?.trainNumber})
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <CancelPassengerSelect 
              passengers={passengers.map((p, index) => ({
                id: p._id || `pax-${index}`, 
                name: p.name,
                age: p.age,
                gender: p.gender,
                coach: p.seatNumber ? p.seatNumber.split('-')[0] : 'N/A',
                seat: p.seatNumber ? p.seatNumber.split('-')[1] || p.seatNumber : 'N/A',
                status: p.status
              }))}
              selectedForCancel={selectedForCancel}
              onTogglePassenger={handleTogglePassenger}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <RefundSummaryCard 
              cancelCount={selectedForCancel.length}
              baseFarePerPassenger={baseFarePerPassenger}
              onConfirmCancel={handleConfirmCancel}
              loading={cancelling}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};