import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Dialog, DialogContent, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { PassengerFormWidget } from '../../../features/passenger-details/ui/PassengerFormWidget';
import { FareSummaryCard } from '../../../features/fare-summary/ui/FareSummaryCard';
import { usePassengerState } from '../../../features/passenger-details/model/usePassengerState';
import { useBooking } from '../../../app/providers/BookingProvider';
import { MealSelectionWidget } from '../../../features/e-catering/ui/MealSelectionWidget';
import { LoginForm } from '../../../features/authentication/ui/LoginForm'; 
import { cookieService } from '../../../utils/cookieService';

export const BookingPage = () => {
  const navigate = useNavigate();
  
  // Modal state for authentication intercept
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 1. Pull passenger state handlers
  const { 
    passengers, 
    addPassenger, 
    removePassenger, 
    updatePassenger, 
    importFromMasterList 
  } = usePassengerState();
  
  // 2. Pull data from Global Context
  const { 
    selectedTrain, 
    selectedClass, 
    setTransactionAmount, 
    setPassengers: setGlobalPassengers,
    mealTotal 
  } = useBooking();

  // Helper to check if user has a valid auth token stored
  const checkAuth = () => {
    return !!cookieService.getToken();
  };

  // Security Check on Mount
  useEffect(() => {
    if (!selectedTrain || !selectedClass) {
      navigate('/');
      return;
    }

    if (!checkAuth()) {
      setIsAuthModalOpen(true);
    }
  }, [selectedTrain, selectedClass, navigate]);

  // Callback triggered when login inside the modal succeeds
  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
  };

  if (!selectedTrain || !selectedClass) return null;

  // Extract precise station details from the route array using selectedTrain.source & destination
  const sourceStop = selectedTrain.route?.find(s => s.stationCode === selectedTrain.source);
  const destStop = selectedTrain.route?.find(s => s.stationCode === selectedTrain.destination);

  // Format the journey date cleanly (e.g., Nov 13, 2026)
  const formattedJourneyDate = selectedTrain.journeyDate 
    ? new Date(selectedTrain.journeyDate).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'N/A';

  const handlePayment = () => {
    // Basic validation
    const isValid = passengers.every(p => p.name.trim() !== '' && p.age !== '');
    if (!isValid) {
      alert('Please fill out all passenger names and ages.');
      return;
    }

    // Save final passenger list to global memory
    setGlobalPassengers(passengers);
    
    // Calculate total amount using live baseFare
    const ticketTotal = passengers.length * (selectedClass.baseFare || 0);
    setTransactionAmount(ticketTotal + (mealTotal || 0) + 35);
    
    // Note: selectedTrain._id is your live Journey ID, which you'll use in your booking backend call
    console.log('Booking Journey ID:', selectedTrain._id);
    
    // Navigate to Payment
    navigate('/payment');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        
        <Typography variant="h4" fontWeight="bold" gutterBottom>Review Booking</Typography>

        {/* Detailed Journey Summary Banner */}
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
            <PassengerFormWidget 
              passengers={passengers} 
              addPassenger={addPassenger} 
              removePassenger={removePassenger} 
              updatePassenger={updatePassenger}
              importFromMasterList={importFromMasterList}
            />
            
            <Box sx={{ mt: 3 }}>
              <MealSelectionWidget />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FareSummaryCard 
              passengerCount={passengers.length}
              basePrice={selectedClass.baseFare} 
              onProceed={handlePayment}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Authentication Modal Dialog */}
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