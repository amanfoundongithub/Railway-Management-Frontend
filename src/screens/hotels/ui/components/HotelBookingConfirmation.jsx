import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';

export const HotelBookingConfirmation = ({ hotel, loading, onBook }) => {
  // Default to today and tomorrow as initial dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [roomsCount, setRoomsCount] = useState(1);

  // Calculate number of nights
  const checkInMs = new Date(checkInDate).getTime();
  const checkOutMs = new Date(checkOutDate).getTime();
  const diffTime = Math.max(checkOutMs - checkInMs, 86400000); // Minimum 1 night
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const totalAmount = hotel.pricePerNight * roomsCount * nights;

  const handleConfirm = () => {
    onBook({
      checkInDate: new Date(checkInDate).toISOString(),
      checkOutDate: new Date(checkOutDate).toISOString(),
      roomsCount: Number(roomsCount),
      totalAmount,
    });
  };

  return (
    <Box mt={1} p={3} bgcolor="#f8faff" borderRadius={3} border="1px solid #e0e4e8" sx = {{
      mt : 1
    }}>
      <Typography variant="subtitle1" fontWeight={800} color="#1a365d" sx = {{ mb : 2}}>
        Booking Details: {hotel.name}
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="date"
            label="Check-in Date"
            InputLabelProps={{ shrink: true }}
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="date"
            label="Check-out Date"
            InputLabelProps={{ shrink: true }}
            value={checkOutDate}
            min={checkInDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            label="Rooms Count"
            inputProps={{ min: 1, max: hotel.availableRooms }}
            value={roomsCount}
            onChange={(e) => setRoomsCount(Math.max(1, Math.min(hotel.availableRooms, Number(e.target.value))))}
            sx={{ bgcolor: 'white', borderRadius: 2 }}
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx = {{
        mt : 1,
        mb : 1
      }}>
        <Typography variant="body2" color="text.secondary">
          Duration: <strong>{nights} {nights === 1 ? 'Night' : 'Nights'}</strong> | Rooms: <strong>{roomsCount}</strong>
        </Typography>
        <Typography variant="h6" fontWeight={800} color="primary.main">
          Total: ₹{totalAmount}
        </Typography>
      </Box>

      <Button 
        fullWidth 
        variant="contained" 
        color="success" 
        size="large"
        onClick={handleConfirm} 
        disabled={loading || hotel.availableRooms <= 0 || roomsCount > hotel.availableRooms}
        sx={{ py: 1.5, fontWeight: 800, borderRadius: 2, fontSize: '1.05rem' }}
      >
        {loading ? 'Confirming...' : `Confirm & Book Room (₹${totalAmount})`}
      </Button>
    </Box>
  );
};