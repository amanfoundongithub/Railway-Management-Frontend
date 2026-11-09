import React, { useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { PassengerFormWidget } from '../../../features/passenger-details/ui/PassengerFormWidget';
import { FareSummaryCard } from '../../../features/fare-summary/ui/FareSummaryCard';
import { usePassengerState } from '../../../features/passenger-details/model/usePassengerState';
import { useBooking } from '../../../app/providers/BookingProvider'; // <-- Import Context

export const BookingPage = () => {
  const navigate = useNavigate();
  const { passengers, addPassenger, removePassenger, updatePassenger } = usePassengerState();
  
  // Pull data from Global Context
  const { selectedTrain, selectedClass, setTransactionAmount, setPassengers: setGlobalPassengers } = useBooking();

  // Security Check: If they navigated here directly without picking a train, send them back
  useEffect(() => {
    if (!selectedTrain) {
      navigate('/');
    }
  }, [selectedTrain, navigate]);

  const handlePayment = () => {
    // 1. Validation logic here...
    
    // 2. Save final passenger list and total amount to global memory before paying
    setGlobalPassengers(passengers);
    setTransactionAmount((passengers.length * selectedClass.price) + 35);
    
    // 3. Navigate to Payment
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
            <PassengerFormWidget 
              passengers={passengers} addPassenger={addPassenger} 
              removePassenger={removePassenger} updatePassenger={updatePassenger}
            />
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