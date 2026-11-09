import React, { useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { PassengerFormWidget } from '../../../features/passenger-details/ui/PassengerFormWidget';
import { FareSummaryCard } from '../../../features/fare-summary/ui/FareSummaryCard';
import { usePassengerState } from '../../../features/passenger-details/model/usePassengerState';
import { useBooking } from '../../../app/providers/BookingProvider';
import { MealSelectionWidget } from '../../../features/e-catering/ui/MealSelectionWidget';

export const BookingPage = () => {
  const navigate = useNavigate();
  
  // 1. Pull importFromMasterList along with other state handlers from the custom hook
  const { 
    passengers, 
    addPassenger, 
    removePassenger, 
    updatePassenger, 
    importFromMasterList 
  } = usePassengerState();
  
  // 2. Pull data from Global Context, now including mealTotal
  const { 
    selectedTrain, 
    selectedClass, 
    setTransactionAmount, 
    setPassengers: setGlobalPassengers,
    mealTotal 
  } = useBooking();

  // Security Check: If they navigated here directly without picking a train, send them back
  useEffect(() => {
    if (!selectedTrain) {
      navigate('/');
    }
  }, [selectedTrain, navigate]);

  const handlePayment = () => {
    // Basic validation
    const isValid = passengers.every(p => p.name.trim() !== '' && p.age !== '');
    if (!isValid) {
      alert('Please fill out all passenger names and ages.');
      return;
    }

    // Save final passenger list and total amount to global memory before paying
    setGlobalPassengers(passengers);
    
    // 3. Include mealTotal in the final transaction calculation
    setTransactionAmount((passengers.length * selectedClass.price) + mealTotal + 35);
    
    // Navigate to Payment
    navigate('/payment');
  };

  if (!selectedTrain) return null; // Prevent rendering while redirecting

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        
        <Typography variant="h4" fontWeight="bold" gutterBottom>Review Booking</Typography>
        
        {/* Render dynamic data from the Context */}
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          {selectedTrain.trainName} ({selectedTrain.trainNumber}) | Class: {selectedClass.className}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Pass importFromMasterList down into the PassengerFormWidget */}
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
            {/* Pass the dynamic price to the Fare Summary */}
            <FareSummaryCard 
              passengerCount={passengers.length}
              basePrice={selectedClass.price} 
              onProceed={handlePayment}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};