import React from 'react';
import { Card, CardContent, Typography, Box, Button, Divider, CircularProgress } from '@mui/material';
import { useBooking } from '../../../app/providers/BookingProvider';

export const FareSummaryCard = ({ passengerCount, basePrice = 0, onProceed, loading = false }) => {
  const { mealTotal = 0 } = useBooking();
  
  const totalBaseFare = passengerCount * basePrice;
  const convenienceFee = 35; // Standard IRCTC-style convenience fee
  const grandTotal = totalBaseFare + convenienceFee + mealTotal;

  return (
    <Card elevation={3} sx={{ borderRadius: 2, position: 'sticky', top: 80 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Fare Summary
        </Typography>
        
        <Box display="flex" justifyContent="space-between" mb={1} mt={2}>
          <Typography variant="body2">Ticket Fare ({passengerCount} x ₹{basePrice})</Typography>
          <Typography variant="body2">₹ {totalBaseFare}</Typography>
        </Box>

        {mealTotal > 0 && (
          <Box display="flex" justifyContent="space-between" mb={1} color="secondary.main">
            <Typography variant="body2">Food & Catering</Typography>
            <Typography variant="body2">₹ {mealTotal}</Typography>
          </Box>
        )}
        
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2">Convenience Fee</Typography>
          <Typography variant="body2">₹ {convenienceFee}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">Total Amount</Typography>
          <Typography variant="h6" fontWeight="bold" color="secondary.main">
            ₹ {grandTotal}
          </Typography>
        </Box>

        <Button 
          fullWidth 
          variant="contained" 
          color="secondary" 
          size="large"
          onClick={onProceed}
          disabled={loading}
          sx={{ py: 1.2 }}
        >
          {loading ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={20} color="inherit" />
              <span>Reserving Seats...</span>
            </Box>
          ) : (
            'Proceed to Payment'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};