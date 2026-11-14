import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Dialog, DialogContent, IconButton, Paper, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../../header/ui/Navbar';
import { PassengerFormComponent } from './components/PassengerFormComponent';
import { FareSummaryCard } from './components/FareSummaryCard';
import { usePassengerState } from '../context/usePassengerState';
import { useBooking } from '../../common/BookingProvider';
import { MealSelectionComponent } from './components/MealSelectionComponent';
import { LoginForm } from "../../../auth/ui/components/LoginForm"; 
import { cookieService } from '../../../../utils/cookieService';
import { bookingCreateService } from "../api/bookingCreateService";

const genderMap = {
  Male: 'M',
  Female: 'F',
  Transgender: 'T',
};

export const BookingPage = () => {
  const navigate = useNavigate();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const { 
    passengers, 
    addPassenger, 
    removePassenger, 
    updatePassenger, 
    importFromMasterList,
    appendPassengers
  } = usePassengerState();
  
  const { 
    selectedTrain, 
    selectedClass, 
    setTransactionAmount,
    setTransactionId, 
    setPassengers: setGlobalPassengers,
    mealTotal
  } = useBooking();

  const checkAuth = () => {
    return !!cookieService.getToken();
  };

  useEffect(() => {
    if (!selectedTrain || !selectedClass) {
      navigate('/');
      return;
    }

    if (!checkAuth()) {
      setIsAuthModalOpen(true);
    }
  }, [selectedTrain, selectedClass, navigate]);

  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
  };

  if (!selectedTrain || !selectedClass) return null;

  const sourceStop = selectedTrain.route?.find(s => s.stationCode === selectedTrain.source);
  const destStop = selectedTrain.route?.find(s => s.stationCode === selectedTrain.destination);

  const formattedJourneyDate = selectedTrain.journeyDate 
    ? new Date(selectedTrain.journeyDate).toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'N/A';

  const handlePayment = async () => {
    setBookingError('');
    const isValid = passengers.every(p => p.name.trim() !== '' && p.age !== '');
    if (!isValid) {
      setBookingError('Please fill out all passenger names and ages.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedDateForApi = selectedTrain.journeyDate.includes('T')
        ? selectedTrain.journeyDate.split('T')[0]
        : selectedTrain.journeyDate;

      const payload = {
        trainId: selectedTrain.trainId || selectedTrain._id,
        journeyDate: formattedDateForApi,
        sourceStation: selectedTrain.source,
        destinationStation: selectedTrain.destination,
        coachClass: selectedClass.classType,
        passengers: passengers.map(p => ({
          name: p.name.trim(),
          age: Number(p.age),
          gender: genderMap[p.gender] || p.gender,
          berthPreference: p.berth
        }))
      };

      const result = await bookingCreateService.createBooking(payload);

      setGlobalPassengers(passengers);
      setTransactionId(result.transactionId);
      setTransactionAmount(result.totalFare + (mealTotal || 0) + 35);

      navigate('/payment');
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      if (Array.isArray(apiErrors) && apiErrors.length > 0) {
        setBookingError(apiErrors.map(e => `${e.field}: ${e.message}`).join(' | '));
      } else {
        setBookingError(err.response?.data?.message || 'Failed to reserve seats. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        
        <Typography variant="h4" fontWeight="bold" gutterBottom>Review Booking</Typography>

        {bookingError && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setBookingError('')}>
            {bookingError}
          </Alert>
        )}

        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                <DirectionsRailwayIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  {selectedTrain.trainName} ({selectedTrain.trainNumber})
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Route: <strong>{sourceStop?.stationName || selectedTrain.source}</strong> ({sourceStop?.departureTime}) → <strong>{destStop?.stationName || selectedTrain.destination}</strong> ({destStop?.arrivalTime})
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }} gap={3} flexWrap="wrap">
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarMonthIcon color="action" fontSize="small" />
                  <Typography variant="body2" fontWeight="medium">
                    {formattedJourneyDate}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <EventSeatIcon color="action" fontSize="small" />
                  <Typography variant="body2" fontWeight="medium">
                    Class: {selectedClass.classType}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <PassengerFormComponent 
              passengers={passengers} 
              addPassenger={addPassenger} 
              removePassenger={removePassenger} 
              updatePassenger={updatePassenger}
              importFromMasterList={importFromMasterList}
              appendPassengers={appendPassengers}
            />
            
            <Box sx={{ mt: 3 }}>
              <MealSelectionComponent />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FareSummaryCard 
              passengerCount={passengers.length}
              basePrice={selectedClass.baseFare} 
              onProceed={handlePayment}
              loading={isSubmitting}
            />
          </Grid>
        </Grid>
      </Container>

      <Dialog 
        open={isAuthModalOpen} 
        maxWidth="xs" 
        fullWidth
        disableEscapeKeyDown
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', pb: 0 }}>
          <IconButton onClick={() => navigate('/')} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ px: 3, pb: 4, pt: 0 }}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Sign In Required</Typography>
            <Typography variant="body2" color="text.secondary">
              Please sign in to continue with your ticket reservation.
            </Typography>
          </Box>
          
          <LoginForm onSuccess={handleLoginSuccess} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};