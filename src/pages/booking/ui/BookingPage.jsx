import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { PassengerFormWidget } from '../../../features/passenger-details/ui/PassengerFormWidget';
import { FareSummaryCard } from '../../../features/fare-summary/ui/FareSummaryCard';
import { usePassengerState } from '../../../features/passenger-details/model/usePassengerState';
import { useBooking } from '../../../app/providers/BookingProvider';
import { MealSelectionWidget } from '../../../features/e-catering/ui/MealSelectionWidget';
import { LoginForm }  from '../../../features/authentication/ui/LoginForm'; // Adjust import path to your login component
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

    // If user is not logged in, trigger the login modal instead of redirecting away
    if (!checkAuth()) {
      setIsAuthModalOpen(true);
    }
  }, [selectedTrain, selectedClass, navigate]);

  // Callback triggered when login inside the modal succeeds
  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
  };

  const handlePayment = () => {
    // Basic validation
    const isValid = passengers.every(p => p.name.trim() !== '' && p.age !== '');
    if (!isValid) {
      alert('Please fill out all passenger names and ages.');
      return;
    }

    // Save final passenger list to global memory
    setGlobalPassengers(passengers);
    
    // 3. Calculate total amount using live baseFare
    const ticketTotal = passengers.length * (selectedClass.baseFare || 0);
    setTransactionAmount(ticketTotal + (mealTotal || 0) + 35);
    
    // Navigate to Payment
    navigate('/payment');
  };

  if (!selectedTrain || !selectedClass) return null; // Prevent rendering while redirecting

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        
        <Typography variant="h4" fontWeight="bold" gutterBottom>Review Booking</Typography>
        
        {/* Render dynamic data using live properties */}
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          {selectedTrain.trainName} ({selectedTrain.trainNumber}) | Class: {selectedClass.classType}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <PassengerFormWidget 
              passengers={passengers} 
              addPassenger={addPassenger} 
              removePassenger={removePassenger} 
              updatePassenger={updatePassenger}
              importFromMasterList={importFromMasterList}
            />
            
            <MealSelectionWidget />
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
          
          {/* Render your existing Login component and pass success callback */}
          <LoginForm onSuccess={handleLoginSuccess} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};