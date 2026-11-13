import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { CancelPassengerSelect } from '../../../features/ticket-cancellation/ui/CancelPassengerSelect';
import { RefundSummaryCard } from '../../../features/ticket-cancellation/ui/RefundSummaryCard';
import { bookingService } from '../../booking/api/bookingService';

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
        const data = await bookingService.getBookingByPNR(pnr);
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
      // Pass the booking DB ID and the array of selected passenger DB IDs
      await bookingService.cancelBooking(booking._id, selectedForCancel);
      
      // Navigate to digital ticket or dashboard on success
      navigate(`/ticket/confirmation?pnr=${pnr}`, { state: { message: 'Cancellation Successful' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process cancellation.');
      setCancelling(false);
    }
  };

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

  if (!booking) return null;

  // Calculate base fare per passenger for the refund UI
  const totalPassengers = booking.passengers.length;
  const baseFarePerPassenger = totalPassengers > 0 ? booking.totalFare / totalPassengers : 0;
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cancel Ticket
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4} sx = {{ fontWeight : "bold"}}>
          PNR: {booking.pnr} | {booking.train.trainName} ({booking.train.trainNumber})
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <CancelPassengerSelect 
              passengers={booking.passengers.map( (p, index)=> ({
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