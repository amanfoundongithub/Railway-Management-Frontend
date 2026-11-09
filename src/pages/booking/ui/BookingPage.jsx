import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { PassengerFormWidget } from '../../../features/passenger-details/ui/PassengerFormWidget';
import { FareSummaryCard } from '../../../features/fare-summary/ui/FareSummaryCard';
import { CoachLayoutWidget } from '../../../features/seat-selection/ui/CoachLayoutWidget'; // <-- NEW
import { usePassengerState } from '../../../features/passenger-details/model/usePassengerState';
import { useNavigate } from 'react-router-dom';

export const BookingPage = () => {
  const { passengers, addPassenger, removePassenger, updatePassenger } = usePassengerState();
  
  // NEW: State to track visually selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  const navigate = useNavigate();

  const trainDetails = {
    name: 'Mumbai Rajdhani Exp (12951)',
    class: '3A',
    date: '10 Nov 2026',
    baseFare: 2450
  };

  const handlePayment = () => {
    const isValid = passengers.every(p => p.name.trim() !== '' && p.age !== '');
    if (!isValid) {
      alert('Please fill out all passenger names and ages.');
      return;
    }
    if (selectedSeats.length !== passengers.length) {
      alert(`Please select ${passengers.length} seats from the coach layout.`);
      return;
    }
    
    // Route to the payment gateway
    navigate('/payment');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Review Booking
        </Typography>
        
        <Grid container spacing={4}>
          
          {/* Left Column: Forms & Seat Map */}
          <Grid item xs={12} md={8}>
            <PassengerFormWidget 
              passengers={passengers}
              addPassenger={addPassenger}
              removePassenger={removePassenger}
              updatePassenger={updatePassenger}
            />
            
            {/* NEW: Interactive Seat Map */}
            <CoachLayoutWidget 
              selectedSeats={selectedSeats}
              maxSelectable={passengers.length}
              onSeatToggle={setSelectedSeats}
            />
          </Grid>

          {/* Right Column: Fare Summary */}
          <Grid item xs={12} md={4}>
            <FareSummaryCard 
              passengerCount={passengers.length}
              basePrice={trainDetails.baseFare}
              onProceed={handlePayment}
            />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};