import React from 'react';
import { Card, CardContent, Typography, Box, Button, Divider } from '@mui/material';

export const FareSummaryCard = ({ passengerCount, basePrice, onProceed }) => {
  const totalBaseFare = passengerCount * basePrice;
  const convenienceFee = 35; // Standard mock fee
  const grandTotal = totalBaseFare + convenienceFee;

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
        >
          Proceed to Payment
        </Button>
      </CardContent>
    </Card>
  );
};