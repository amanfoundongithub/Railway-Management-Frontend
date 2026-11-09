import React from 'react';
import { Card, CardContent, Typography, Box, Button, Divider } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const RefundSummaryCard = ({ cancelCount, baseFarePerPassenger, onConfirmCancel }) => {
  const cancellationFeePerPassenger = 120; // Flat enterprise logic fee
  
  const totalBaseFare = cancelCount * baseFarePerPassenger;
  const totalCancellationFee = cancelCount * cancellationFeePerPassenger;
  const totalRefund = totalBaseFare - totalCancellationFee;

  return (
    <Card elevation={3} sx={{ borderRadius: 2, position: 'sticky', top: 24 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Refund Estimate
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={3} mb={1}>
          <Typography variant="body2">Ticket Fare ({cancelCount} pax)</Typography>
          <Typography variant="body2">₹ {totalBaseFare}</Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mb={2} color="error.main">
          <Typography variant="body2">Cancellation Fee (-)</Typography>
          <Typography variant="body2">₹ {totalCancellationFee}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">Net Refund Amount</Typography>
          <Typography variant="h6" fontWeight="bold" color="success.main">
            ₹ {totalRefund > 0 ? totalRefund : 0}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, bgcolor: 'warning.light', p: 1.5, borderRadius: 1, mb: 3 }}>
          <WarningAmberIcon color="warning" fontSize="small" />
          <Typography variant="caption" fontWeight="bold" color="warning.dark">
            Refunds will be credited to the original payment method in 3-5 business days.
          </Typography>
        </Box>

        <Button 
          fullWidth 
          variant="contained" 
          color="error" 
          size="large"
          disabled={cancelCount === 0}
          onClick={onConfirmCancel}
        >
          Confirm Cancellation
        </Button>
      </CardContent>
    </Card>
  );
};